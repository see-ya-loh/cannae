#!/usr/bin/env bash
# Regenerate the self-signed cert/key pair the mock server uses for HTTPS.
#
# The same cert.pem is embedded into the modded APK by apk_mod.py Phase 7h,
# so the SAN list below must cover every hostname the client will reach.
#
# Usage:
#   ./regen_certs.sh [advertised_ip]
#
# The IP argument (default 127.0.0.1) is added to the SAN list so HTTPS
# works when the client targets the IP directly (no DNS spoofing).
#
# Output files (written into ./certs/, gitignored):
#   cert.pem  cert.der  key.pem

set -euo pipefail

IP="${1:-127.0.0.1}"
OUT_DIR="$(cd "$(dirname "$0")" && pwd)/certs"
mkdir -p "$OUT_DIR"

# On Windows Git Bash, OUT_DIR is in MSYS form (e.g. /c/path/to/repo/...) which
# the native OpenSSL build does not understand. Convert it to a mixed Windows
# path (C:/path/to/repo/...) when cygpath is available. On Linux/macOS this
# branch is skipped.
if command -v cygpath >/dev/null 2>&1; then
    OUT_DIR="$(cygpath -m "$OUT_DIR")"
fi

SAN="DNS:gms-api.clovergames.io,\
DNS:launching.api.nhncloudservice.com,\
DNS:gslb-gamebase.nhncloudservice.com,\
DNS:gslb-gamebase.nhngameplatform.com,\
DNS:gslb-gamebase.alpha-nhncloudservice.com,\
DNS:gslb-gamebase.beta-nhncloudservice.com,\
DNS:alpha-gslb-gamebase.nhngameplatform.com,\
DNS:beta-gslb-gamebase.nhngameplatform.com,\
DNS:api-logncrash.cloud.toast.com,\
DNS:datadog-log.clovergames.io,\
IP:$IP"

echo "Generating self-signed cert with SAN: $SAN"

# MSYS_NO_PATHCONV stops Git Bash on Windows from mangling the -subj path-like
# argument (e.g. turning "/CN=..." into "C:/Program Files/Git/CN=..."). It is a
# no-op on Linux/macOS where Bash does not perform this conversion.
MSYS_NO_PATHCONV=1 openssl req -x509 -newkey rsa:2048 -nodes -days 365 \
    -subj "/CN=gms-api.clovergames.io" \
    -addext "subjectAltName=$SAN" \
    -keyout "$OUT_DIR/key.pem" \
    -out    "$OUT_DIR/cert.pem"

openssl x509 -in "$OUT_DIR/cert.pem" -outform DER -out "$OUT_DIR/cert.der"

echo
echo "Wrote:"
ls -la "$OUT_DIR"
echo
echo "If the modded APK is already installed, rebuild it with apk_mod.py so"
echo "the new cert is re-embedded into res/raw/cannae_root.crt."
