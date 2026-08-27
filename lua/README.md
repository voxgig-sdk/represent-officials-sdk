# RepresentOfficials Lua SDK



The Lua SDK for the RepresentOfficials API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Boundary()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/represent-officials-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("represent-officials_sdk")

local client = sdk.new()
```

### 2. List boundary records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local boundarys, err = client:Boundary():list()
if err then error(err) end

for _, item in ipairs(boundarys) do
  print(item["id"], item["boundary_set_name"])
end
```

### 3. Load a postalcode

PostalCode is nested under postal_code, so provide the `postal_code`.

```lua
local postalcode, err = client:PostalCode():load({ postal_code = "example_postal_code" })
if err then error(err) end
print(postalcode)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local boundarysets, err = client:BoundarySet():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:BoundarySet():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
REPRESENT_OFFICIALS_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### RepresentOfficialsSDK

```lua
local sdk = require("represent-officials_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### RepresentOfficialsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Boundary` | `(data) -> BoundaryEntity` | Create a Boundary entity instance. |
| `BoundarySet` | `(data) -> BoundarySetEntity` | Create a BoundarySet entity instance. |
| `Candidate` | `(data) -> CandidateEntity` | Create a Candidate entity instance. |
| `Election` | `(data) -> ElectionEntity` | Create an Election entity instance. |
| `PostalCode` | `(data) -> PostalCodeEntity` | Create a PostalCode entity instance. |
| `Representatif` | `(data) -> RepresentatifEntity` | Create a Representatif entity instance. |
| `RepresentativeSet` | `(data) -> RepresentativeSetEntity` | Create a RepresentativeSet entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local boundary, err = client:Boundary():load({ id = "example_id" })
    if err then error(err) end
    -- boundary is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Boundary

| Field | Description |
| --- | --- |
| `boundary_set_name` |  |
| `external_id` |  |
| `id` |  |
| `meta` |  |
| `metadata` |  |
| `name` |  |
| `objects` |  |
| `url` |  |

Operations: List, Load.

API path: `/boundaries/`

#### BoundarySet

| Field | Description |
| --- | --- |
| `domain` |  |
| `id` |  |
| `name` |  |
| `url` |  |

Operations: List, Load.

API path: `/boundary-sets/`

#### Candidate

| Field | Description |
| --- | --- |
| `meta` |  |
| `objects` |  |

Operations: List.

API path: `/candidates/`

#### Election

| Field | Description |
| --- | --- |
| `meta` |  |
| `objects` |  |

Operations: List.

API path: `/elections/`

#### PostalCode

| Field | Description |
| --- | --- |
| `boundaries_centroid` | Boundaries containing the postal code's centroid |
| `boundaries_concordance` | Boundaries linked to postal code via official data |
| `centroid` |  |
| `city` | City name |
| `code` | The postal code |
| `province` | Province code |
| `representatives_centroid` | Representatives for boundaries containing centroid |
| `representatives_concordance` | Representatives for boundaries via concordance |

Operations: Load.

API path: `/postcodes/{postalCode}/`

#### Representatif

| Field | Description |
| --- | --- |
| `district_id` | District identifier if available |
| `district_name` | Name of the electoral district |
| `elected_office` | Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman) |
| `email` | Email address |
| `extra` | Additional data not covered by standard fields |
| `first_name` | First name |
| `gender` | Gender |
| `id` |  |
| `last_name` | Last name |
| `meta` |  |
| `name` | Full name of the representative |
| `objects` |  |
| `offices` | Contact information for representative's offices |
| `party_name` | Political party name |
| `personal_url` | Personal website not on official legislature site |
| `photo_url` | URL to representative's photo |
| `source_url` | URL where the data is scraped from |
| `url` | Representative's page on official legislature site |

Operations: List, Load.

API path: `/representatives/`

#### RepresentativeSet

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `url` |  |

Operations: List, Load.

API path: `/representative-sets/`



## Entities


### Boundary

Create an instance: `local boundary = client:Boundary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boundary_set_name` | `string` |  |
| `external_id` | `string` |  |
| `id` | `string` |  |
| `meta` | `table` |  |
| `metadata` | `table` |  |
| `name` | `string` |  |
| `objects` | `table` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local boundary, err = client:Boundary():load({ id = "boundary_id" })
```

#### Example: List

```lua
local boundarys, err = client:Boundary():list()
```


### BoundarySet

Create an instance: `local boundary_set = client:BoundarySet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local boundary_set, err = client:BoundarySet():load({ id = "boundary_set_id" })
```

#### Example: List

```lua
local boundary_sets, err = client:BoundarySet():list()
```


### Candidate

Create an instance: `local candidate = client:Candidate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `objects` | `table` |  |

#### Example: List

```lua
local candidates, err = client:Candidate():list()
```


### Election

Create an instance: `local election = client:Election(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `objects` | `table` |  |

#### Example: List

```lua
local elections, err = client:Election():list()
```


### PostalCode

Create an instance: `local postal_code = client:PostalCode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boundaries_centroid` | `table` | Boundaries containing the postal code's centroid |
| `boundaries_concordance` | `table` | Boundaries linked to postal code via official data |
| `centroid` | `table` |  |
| `city` | `string` | City name |
| `code` | `string` | The postal code |
| `province` | `string` | Province code |
| `representatives_centroid` | `table` | Representatives for boundaries containing centroid |
| `representatives_concordance` | `table` | Representatives for boundaries via concordance |

#### Example: Load

```lua
local postal_code, err = client:PostalCode():load({ postal_code = "postal_code" })
```


### Representatif

Create an instance: `local representatif = client:Representatif(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `district_id` | `string` | District identifier if available |
| `district_name` | `string` | Name of the electoral district |
| `elected_office` | `string` | Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman) |
| `email` | `string` | Email address |
| `extra` | `table` | Additional data not covered by standard fields |
| `first_name` | `string` | First name |
| `gender` | `string` | Gender |
| `id` | `string` |  |
| `last_name` | `string` | Last name |
| `meta` | `table` |  |
| `name` | `string` | Full name of the representative |
| `objects` | `table` |  |
| `offices` | `table` | Contact information for representative's offices |
| `party_name` | `string` | Political party name |
| `personal_url` | `string` | Personal website not on official legislature site |
| `photo_url` | `string` | URL to representative's photo |
| `source_url` | `string` | URL where the data is scraped from |
| `url` | `string` | Representative's page on official legislature site |

#### Example: Load

```lua
local representatif, err = client:Representatif():load({ id = "representatif_id" })
```

#### Example: List

```lua
local representatifs, err = client:Representatif():list()
```


### RepresentativeSet

Create an instance: `local representative_set = client:RepresentativeSet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local representative_set, err = client:RepresentativeSet():load({ id = "representative_set_id" })
```

#### Example: List

```lua
local representative_sets, err = client:RepresentativeSet():list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── represent-officials_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`represent-officials_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local boundaryset = client:BoundarySet()
boundaryset:list()

-- boundaryset:data_get() now returns the boundaryset data from the last list
-- boundaryset:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
