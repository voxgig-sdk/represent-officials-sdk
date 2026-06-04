# RepresentOfficials SDK

Look up Canadian elected officials and electoral districts at every level of government by postal code or coordinates

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Represent Officials API

[Represent](https://represent.opennorth.ca) is a civic API maintained by [Open North](https://represent.opennorth.ca) that maps Canadian postal codes and geographic coordinates to the elected officials and electoral districts that cover them. It is widely used by nonprofits, unions, and advocacy groups to power tools like election guides, letter-writing campaigns, and canvassing apps.

What you get from the API:

- Lookups of representatives by postal code via `/postcodes/{postcode}/`.
- Lists and searches of representatives across federal, provincial, and municipal levels via `/representatives/`.
- Electoral district (riding) boundaries and simplified geometry via `/boundaries/`.
- Groupings of related boundaries and representative bodies via `/boundary-sets/` and `/representative-sets/`.
- Candidate and election records via `/candidates/` and `/elections/`.

The service covers Members of Parliament, MLAs/MPPs/MNAs/MHAs, and roughly 7,000+ mayors and councillors across 8,000+ municipal wards. No API key is required; requests are subject to a 60-per-minute rate limit, results are paginated (default 20 per page, adjustable with `limit`), and JSONP callbacks are supported for browser use. CORS is enabled.

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

## 30-second quickstart

### TypeScript

```ts
import { RepresentOfficialsSDK } from 'represent-officials'

const client = new RepresentOfficialsSDK({})

// List all boundarys
const boundarys = await client.Boundary().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **Boundary** | An electoral district or ward polygon (federal riding, provincial riding, or municipal ward) exposed under `/boundaries/`. | `/boundaries/` |
| **BoundarySet** | A named collection of related boundaries, such as all federal ridings or all wards in a given municipality, exposed under `/boundary-sets/`. | `/boundary-sets/` |
| **Candidate** | A person running in an upcoming or recent Canadian election, exposed under `/candidates/`. | `/candidates/` |
| **Election** | A scheduled or past Canadian election at a given level of government, exposed under `/elections/`. | `/elections/` |
| **PostalCode** | A Canadian postal code used as a lookup key to retrieve the matching representatives and districts via `/postcodes/{postcode}/`. | `/postcodes/{postalCode}/` |
| **Representatif** | An elected official (MP, MLA/MPP/MNA/MHA, mayor, or councillor) returned by `/representatives/`, searchable by name, district, or postal code. | `/representatives/` |
| **RepresentativeSet** | A named collection of representatives such as the House of Commons or a specific municipal council, exposed under `/representative-sets/`. | `/representative-sets/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from representofficials_sdk import RepresentOfficialsSDK

client = RepresentOfficialsSDK({})

# List all boundarys
boundarys, err = client.Boundary(None).list(None, None)

# Load a specific boundary
boundary, err = client.Boundary(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'representofficials_sdk.php';

$client = new RepresentOfficialsSDK([]);

// List all boundarys
[$boundarys, $err] = $client->Boundary(null)->list(null, null);

// Load a specific boundary
[$boundary, $err] = $client->Boundary(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/represent-officials-sdk/go"

client := sdk.NewRepresentOfficialsSDK(map[string]any{})

// List all boundarys
boundarys, err := client.Boundary(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "RepresentOfficials_sdk"

client = RepresentOfficialsSDK.new({})

# List all boundarys
boundarys, err = client.Boundary(nil).list(nil, nil)

# Load a specific boundary
boundary, err = client.Boundary(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("represent-officials_sdk")

local client = sdk.new({})

-- List all boundarys
local boundarys, err = client:Boundary(nil):list(nil, nil)

-- Load a specific boundary
local boundary, err = client:Boundary(nil):load(
  { id = "example_id" }, nil
)
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
client = RepresentOfficialsSDK.test(None, None)
result, err = client.Boundary(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = RepresentOfficialsSDK::test(null, null);
[$result, $err] = $client->Boundary(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Boundary(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = RepresentOfficialsSDK.test(nil, nil)
result, err = client.Boundary(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Boundary(nil):load(
  { id = "test01" }, nil
)
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

## Using the Represent Officials API

- Upstream: [https://represent.opennorth.ca](https://represent.opennorth.ca)
- API docs: [https://represent.opennorth.ca/api/](https://represent.opennorth.ca/api/)

- Run by [Open North](https://represent.opennorth.ca), a Canadian nonprofit focused on government transparency and civic participation.
- Source code and bulk data are published via the `opennorth/represent-canada` GitHub organisation.
- Free tier permits up to 60 requests per minute (approx. 86,400/day); higher volumes require contacting Open North.
- Underlying boundary and representative data come from a mix of government and community-maintained sources; verify before using for official purposes.

---

Generated from the Represent Officials API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
