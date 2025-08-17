# Versioned Key-Value Store (Node.js + Express)

A simple HTTP API for **version-controlled key-value store**.  
It supports storing JSON values by key, retrieving the latest value, and querying past values by timestamp.

## Features
- **POST /object** > Store a value for a key (creates a new version with timestamp)
- **GET /object/:key** > Get the latest value for a key
- **GET /object/:key?timestamp=...** > Get the value of a key *as of* a specific UNIX timestamp

Supports:
- JSON or string values
- Automatic versioning with server-side UTC timestamps
- Time-travel queries

---

## Getting Started

### 1. Clone the repo
```bash
> git clone https://github.com/johanhezri/kv-store.git
```

### 2. Run locally
```bash
> cd kv-store
> npm run local
