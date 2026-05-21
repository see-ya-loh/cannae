# cannae

Local mock server that emulates the backend services a specific Unity / NHN
Cloud Gamebase based mobile game talks to, so the game can boot up and
progress through its title flow against an offline environment.

This repository pairs with [cannae-mod](../cannae-mod/) (an APK patching
pipeline). cannae-mod produces a modded APK that redirects the relevant URLs
at the client side; cannae answers the resulting HTTP and WebSocket traffic.

Current scope:

- HTTP and WebSocket listeners on a configurable port (default 3000).
- Gamebase WebSocket endpoints: `getLaunching`, `getLaunchingStatus`,
  `idPLogin`, `tokenLogin`. Guest login is backed by SQLite so a re-install
  with the same signing key reuses the existing user row.
- HTTP: `conninfo`, `cdn/manifest` (rewrites external CDN hosts back to the
  inbound host so rootless `/cdn/*` fetches return to cannae), static
  `/cdn/*` file server, and `/launching/*`.
- Game-internal binary protocol (`POST /api`) dispatches through a dynamic
  handler registry. Implemented handler families:
  - Login + registration: `userLoginReq`, `userRegisterReq`.
  - Tutorial progression: `tutorialProgressReq`, `updateUserAutoSequenceReq`.
  - Lobby / world-map footers and heartbeat: `heartbeatReq`,
    `lobbyFooterReq`, `worldMapFooterReq`.
  - Energy refresh: `checkEnergyChargeTimeReq`.
  - Quest reward claim: `getQuestClearRewardReq`.
  - Misc gameplay echo: `getDungeonMileageReq`, `getUserFamineRaidInfoReq`.
  - Battle pipeline: `battleStartReq`, `battleEndReq` — sufficient for the
    chapter 1-1 story clear path.
  Requests outside this set fall back to a generic empty-rsp envelope.
- Master tables dependency: gameplay handlers read a read-only SQLite
  snapshot of the production master tables via `paths.master_db`. The file
  is downloaded out-of-band and not tracked in this repo.

State as of this revision: the chapter 1-1 battle clear path runs
end-to-end against a rooted Android device. The `/system/etc/hosts`
mapping that redirects production hostnames to the cannae host is still
required at runtime; a separate plan tracks the work to eliminate the
hosts dependency on the cannae-mod side.

## Quick start

```bash
# 1. Install Node dependencies
npm install

# 2. Copy the config template and fill in absolute paths + advertised host
cp cannae_config.default.toml cannae_config.toml
# Edit cannae_config.toml — every PLACEHOLDER must be set

# 3. Run
npm run dev     # nodemon, auto-restart on edits
# or
npm start       # plain node
```

The server prints its bound port on startup.

## Configuration

Two files split along the same lines as cannae-mod:

| File                          | Tracked? | Purpose                                     |
|-------------------------------|----------|---------------------------------------------|
| `cannae_config.default.toml`  | yes      | Schema with `PLACEHOLDER` values            |
| `cannae_config.toml`          | no       | Local absolute paths + advertised host      |

`src/config.ts` loads `cannae_config.default.toml`, deep-merges
`cannae_config.toml` on top, and fails fast on any remaining `PLACEHOLDER`.
Write only the keys whose value differs from the default in the local file;
keys absent from the override inherit the template value.

Key fields:

- `paths.logs_dir` — where request logs go.
- `paths.cdn_dir` — CDN root. `assets/` and `meta/` subdirs are served via
  `/cdn/*`; the manifest file is served via `/v1/api/cdn/manifest`.
- `paths.cdn_manifest_file` — manifest filename inside `cdn_dir` (e.g.
  `new_manifest.json`).
- `paths.master_db` — SQLite snapshot of the production master tables
  (stage / monster / reward definitions). Read-only, queried by the
  gameplay handlers; the server will not start without it.
- `server.http_port` — listener port.

DB lives inside the repo (gitignored):

- `<repo>/db/cannae.db` — SQLite store (WAL/SHM sidecars created next to it,
  parent dir auto-created on startup).
- `advertised.host` — IP returned to the client in mock responses
  (`accessInfo.serverAddress`, `gamebaseUrl`).

## Endpoints

| Method | Path                                | Backed by                              |
|--------|-------------------------------------|----------------------------------------|
| GET    | `/v1/api/conninfo`                  | `src/routes/conninfo.ts`               |
| GET    | `/v1/api/cdn/manifest`              | `src/routes/cdn/manifest.ts`           |
| GET    | `/cdn/*`                            | `src/routes/cdn/cdnManager.ts`         |
| GET    | `/launching/*`                      | `src/routes/launching.ts`              |
| POST   | `/api`                              | `src/core/router.ts`                   |
| WS     | `/ws`                               | `src/routes/websocket.ts`              |

The WebSocket dispatcher switches on the `apiId` field of each JSON frame.
Current handled apiIds: `getLaunching`, `getLaunchingStatus`, `idPLogin`,
`tokenLogin`. Anything else returns a generic success header — extend the
switch in `src/routes/websocket.ts` to cover new apiIds.

### Guest login: token cache, UUID matching, and the dev adoption toggle

A guest cold launch goes through two stages:

1. **`tokenLogin` fast path.** If the Gamebase SDK has a cached
   `access_token` in `shared_prefs/`, every cold launch sends `tokenLogin`
   first. The server looks the token up directly in the `users` table; on
   a hit it returns the matching row and no further authentication runs.
   The token is reissued only by `createUser`, so once a row exists the
   cached token is effectively stable.
2. **`idPLogin` fallback.** If `tokenLogin` is absent (fresh install /
   `shared_prefs/` wiped) or the cached token no longer maps to a row
   (manual `DELETE`, DB wipe), the client falls back to `idPLogin`. The
   server matches by `(idp_code, idp_user_key)` where the key is
   Gamebase's per-install UUID (`payload.member.uuid`). On a hit it
   returns the row; on a miss the behaviour depends on the dev toggle
   below.

To keep dev state across rebuilds:

- Prefer `adb install-multiple -r ...` over `adb uninstall` + install.
  uber-apk-signer (with `--allowResign`) uses a deterministic debug
  keystore embedded in the jar, so successive rebuilds on the same machine
  produce the same signature — `-r` then preserves `shared_prefs/` and
  the UUID stays stable.
- `[dev].reuse_latest_guest_on_uuid_mismatch` (in
  `cannae_config.default.toml`; default `false`) controls the `idPLogin`
  miss path:
  - `false` — `createUser` issues a fresh row with a new `access_token`.
    Pick this when a different device (fresh emulator, real phone) should
    receive its own guest account.
  - `true` — adopt the most-recently-active guest row, rewrite its
    `idp_user_key` to the incoming UUID, and return the existing
    `access_token`. The client caches that token, so subsequent cold
    launches from the same install resolve via `tokenLogin` directly. Set
    this in the gitignored `cannae_config.toml` for the dev workstation
    where you want the same single guest account to survive rebuilds.
    Because the row is chosen purely by `last_login_date`, multi-device
    setups will see whichever install logged in most recently "steal" the
    row — keep it off in those scenarios.

`.toml` files are outside nodemon's watch set; restart the server after
toggling the value.

Multi-guest scenarios (pinning to a specific `user_id`) are not
implemented; the existing toggle is a binary "adopt the latest row or
not". A `[dev].guest_user_id` key can be added if that becomes necessary.

The `POST /api` route decodes a length-prefixed protobuf-style binary frame
into a JSON object, then dispatches on the field name ending in `Req` (e.g.
`userLoginReq` → `src/handlers/user.ts::handleUserLogin`). To add a new
handler, drop a file in `src/handlers/` that exports a function and register
it in `src/core/registry.ts`.

## Adding a new handler

1. Identify the request name from the client's binary frame; the server
   prints it as `[<sessionId>] → <name>Req`.
2. Add a handler module under `src/handlers/`:
   ```ts
   import type { Request } from "../types/cannae_protocol";
   export function handleSomethingReq(req: Request) {
       return { somethingRsp: { /* fields */ } };
   }
   ```
3. Register it in `src/core/registry.ts` so the router can resolve the
   handler by request name.
4. Restart the server (nodemon handles this for you under `npm run dev`).

## Repository layout

```
src/
  config.ts            # toml loader
  server.ts            # HTTP + WS bootstrap
  core/
    router.ts          # POST /api dispatcher
    registry.ts        # handler name -> function map
    builder.ts         # response envelope builder
    session.ts         # per-session ticket bookkeeping
  routes/              # express route handlers
  handlers/            # POST /api binary protocol handlers
  types/               # protobuf-derived TypeScript types
  utils/               # proto encode/decode helpers
proto/                 # extracted .proto definitions
data_list/             # captured CDN manifest snapshots
cannae_config.default.toml
```

## Logs

Listener traffic is appended to files under `paths.logs_dir`:

- `all_requests.log` — every HTTP request (method, URL, source IP).
- `conninfo.log` — full request dump (URL, headers, UA) for conninfo / manifest.
- `launching.log` — launching endpoint hits.
- `websocket.log` — per-frame WS log (apiId, txId, response size).

The `[WS] ...` lines on stdout match the `websocket.log` content; useful
when developing handlers under `npm run dev`.
