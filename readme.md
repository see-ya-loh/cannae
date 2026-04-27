# Cannae

A server implementation built with Node.js and Python, using mitmproxy for traffic interception and proxying.
(temporarily generated with Claude, will manually write it once everything works)

---

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (with npm)
- [Python](https://www.python.org/downloads/)
- [mitmproxy](https://mitmproxy.org/) — both `mitmproxy` and `mitmweb` must be available in your system `PATH`

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/i-Ac1D-i/cannae.git
cd cannae
```

### 2. Install Node.js dependencies

```bash
npm install
```

### 3. Add mitmproxy to PATH

Download mitmproxy from [mitmproxy.org](https://mitmproxy.org/) and ensure both `mitmproxy` and `mitmweb` executables are accessible from your system PATH.

**Windows:**
```
setx PATH "%PATH%;C:\path\to\mitmproxy"
```

**macOS / Linux:**
```bash
export PATH="$PATH:/path/to/mitmproxy"
```

Verify the installation:
```bash
mitmproxy --version
mitmweb --version
```

### 4. Install Python

Download and install Python from [python.org](https://www.python.org/downloads/).

Verify the installation:
```bash
python --version
```

---

## Running the Server

Once all prerequisites are in place, start the server by running:

```bat
start.bat
```

This will initialize the server and all required processes.

---

## Project Structure

```
cannae/
├── start.bat          # Entry point — starts the server
├── package.json       # Node.js dependencies
├── ...
```

---

## Troubleshooting

- **`mitmproxy` not found** — Make sure both `mitmproxy` and `mitmweb` are added to your system PATH and that you've restarted your terminal after doing so.
- **Python not found** — Ensure Python is installed and added to PATH. On Windows, check the *"Add Python to PATH"* option during installation.
- **npm install fails** — Make sure you're running a supported version of Node.js. Check with `node --version`.

---

## License

[MIT](LICENSE)