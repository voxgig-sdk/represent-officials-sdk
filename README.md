# RepresentOfficials SDK

Represent Officials API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install represent-officials
```

**Python**
```bash
pip install represent-officials-sdk
```

**PHP**
```bash
composer require voxgig/represent-officials-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/represent-officials-sdk/go
```

**Ruby**
```bash
gem install represent-officials-sdk
```

**Lua**
```bash
luarocks install represent-officials-sdk
```

## Quickstart

### TypeScript

```ts
import { RepresentOfficialsSDK } from 'represent-officials'

const client = new RepresentOfficialsSDK({
  apikey: process.env.REPRESENT-OFFICIALS_APIKEY,
})

// List all boundarys
const boundarys = await client.Boundary().list()
console.log(boundarys.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o represent-officials-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "represent-officials": {
      "command": "/abs/path/to/represent-officials-mcp"
    }
  }
}
```

## Entities

The API exposes 7 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Boundary** |  | `/boundaries/` |
| **BoundarySet** |  | `/boundary-sets/` |
| **Candidate** |  | `/candidates/` |
| **Election** |  | `/elections/` |
| **PostalCode** |  | `/postcodes/{postalCode}/` |
| **Representatif** |  | `/representatives/` |
| **RepresentativeSet** |  | `/representative-sets/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from representofficials_sdk import RepresentOfficialsSDK

client = RepresentOfficialsSDK({
    "apikey": os.environ.get("REPRESENT-OFFICIALS_APIKEY"),
})

# List all boundarys
boundarys, err = client.Boundary().list()
print(boundarys)

# Load a specific boundary
boundary, err = client.Boundary().load({"id": "example_id"})
print(boundary)
```

### PHP

```php
<?php
require_once 'representofficials_sdk.php';

$client = new RepresentOfficialsSDK([
    "apikey" => getenv("REPRESENT-OFFICIALS_APIKEY"),
]);

// List all boundarys
[$boundarys, $err] = $client->Boundary()->list();
print_r($boundarys);

// Load a specific boundary
[$boundary, $err] = $client->Boundary()->load(["id" => "example_id"]);
print_r($boundary);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/represent-officials-sdk/go"

client := sdk.NewRepresentOfficialsSDK(map[string]any{
    "apikey": os.Getenv("REPRESENT-OFFICIALS_APIKEY"),
})

// List all boundarys
boundarys, err := client.Boundary(nil).List(nil, nil)
fmt.Println(boundarys)
```

### Ruby

```ruby
require_relative "RepresentOfficials_sdk"

client = RepresentOfficialsSDK.new({
  "apikey" => ENV["REPRESENT-OFFICIALS_APIKEY"],
})

# List all boundarys
boundarys, err = client.Boundary().list
puts boundarys

# Load a specific boundary
boundary, err = client.Boundary().load({ "id" => "example_id" })
puts boundary
```

### Lua

```lua
local sdk = require("represent-officials_sdk")

local client = sdk.new({
  apikey = os.getenv("REPRESENT-OFFICIALS_APIKEY"),
})

-- List all boundarys
local boundarys, err = client:Boundary():list()
print(boundarys)

-- Load a specific boundary
local boundary, err = client:Boundary():load({ id = "example_id" })
print(boundary)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = RepresentOfficialsSDK.test()
const result = await client.Boundary().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = RepresentOfficialsSDK.test()
result, err = client.Boundary().load({"id": "test01"})
```

### PHP

```php
$client = RepresentOfficialsSDK::test();
[$result, $err] = $client->Boundary()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Boundary(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = RepresentOfficialsSDK.test
result, err = client.Boundary().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Boundary():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the Represent Officials API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
