# RepresentOfficials Lua SDK



The Lua SDK for the RepresentOfficials API — an entity-oriented client using Lua conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
luarocks install represent-officials-sdk
```

If the module is not yet published, add the source directory to
your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("represent-officials_sdk")

local client = sdk.new({
  apikey = os.getenv("REPRESENT-OFFICIALS_APIKEY"),
})
```

### 2. List boundarys

```lua
local result, err = client:Boundary():list()
if err then error(err) end

if type(result) == "table" then
  for _, item in ipairs(result) do
    local d = item:data_get()
    print(d["id"], d["name"])
  end
end
```

### 3. Load a boundary

```lua
local result, err = client:Boundary():load({ id = "example_id" })
if err then error(err) end
print(result)
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

local result, err = client:RepresentOfficials():load({ id = "test01" })
-- result contains mock response data
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
REPRESENT-OFFICIALS_TEST_LIVE=TRUE
REPRESENT-OFFICIALS_APIKEY=<your-key>
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
| `apikey` | `string` | API key for authentication. |
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
| `Election` | `(data) -> ElectionEntity` | Create a Election entity instance. |
| `PostalCode` | `(data) -> PostalCodeEntity` | Create a PostalCode entity instance. |
| `Representatif` | `(data) -> RepresentatifEntity` | Create a Representatif entity instance. |
| `RepresentativeSet` | `(data) -> RepresentativeSetEntity` | Create a RepresentativeSet entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`table` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `boolean` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `table` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

### Entities

#### Boundary

| Field | Description |
| --- | --- |
| `boundary_set_name` |  |
| `external_id` |  |
| `meta` |  |
| `metadata` |  |
| `name` |  |
| `object` |  |
| `url` |  |

Operations: List, Load.

API path: `/boundaries/`

#### BoundarySet

| Field | Description |
| --- | --- |
| `domain` |  |
| `name` |  |
| `url` |  |

Operations: List, Load.

API path: `/boundary-sets/`

#### Candidate

| Field | Description |
| --- | --- |
| `meta` |  |
| `object` |  |

Operations: List.

API path: `/candidates/`

#### Election

| Field | Description |
| --- | --- |
| `meta` |  |
| `object` |  |

Operations: List.

API path: `/elections/`

#### PostalCode

| Field | Description |
| --- | --- |
| `boundaries_centroid` |  |
| `boundaries_concordance` |  |
| `centroid` |  |
| `city` |  |
| `code` |  |
| `province` |  |
| `representatives_centroid` |  |
| `representatives_concordance` |  |

Operations: Load.

API path: `/postcodes/{postalCode}/`

#### Representatif

| Field | Description |
| --- | --- |
| `district_id` |  |
| `district_name` |  |
| `elected_office` |  |
| `email` |  |
| `extra` |  |
| `first_name` |  |
| `gender` |  |
| `last_name` |  |
| `meta` |  |
| `name` |  |
| `object` |  |
| `office` |  |
| `party_name` |  |
| `personal_url` |  |
| `photo_url` |  |
| `source_url` |  |
| `url` |  |

Operations: List, Load.

API path: `/representatives/`

#### RepresentativeSet

| Field | Description |
| --- | --- |
| `name` |  |
| `url` |  |

Operations: List, Load.

API path: `/representative-sets/`



## Entities


### Boundary

Create an instance: `const boundary = client.Boundary()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boundary_set_name` | ``$STRING`` |  |
| `external_id` | ``$STRING`` |  |
| `meta` | ``$OBJECT`` |  |
| `metadata` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `object` | ``$ARRAY`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const boundary = await client.Boundary().load({ id: 'boundary_id' })
```

#### Example: List

```ts
const boundarys = await client.Boundary().list()
```


### BoundarySet

Create an instance: `const boundary_set = client.BoundarySet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const boundary_set = await client.BoundarySet().load({ id: 'boundary_set_id' })
```

#### Example: List

```ts
const boundary_sets = await client.BoundarySet().list()
```


### Candidate

Create an instance: `const candidate = client.Candidate()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `object` | ``$ARRAY`` |  |

#### Example: List

```ts
const candidates = await client.Candidate().list()
```


### Election

Create an instance: `const election = client.Election()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `object` | ``$ARRAY`` |  |

#### Example: List

```ts
const elections = await client.Election().list()
```


### PostalCode

Create an instance: `const postal_code = client.PostalCode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boundaries_centroid` | ``$ARRAY`` |  |
| `boundaries_concordance` | ``$ARRAY`` |  |
| `centroid` | ``$OBJECT`` |  |
| `city` | ``$STRING`` |  |
| `code` | ``$STRING`` |  |
| `province` | ``$STRING`` |  |
| `representatives_centroid` | ``$ARRAY`` |  |
| `representatives_concordance` | ``$ARRAY`` |  |

#### Example: Load

```ts
const postal_code = await client.PostalCode().load({ id: 'postal_code_id' })
```


### Representatif

Create an instance: `const representatif = client.Representatif()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `district_id` | ``$STRING`` |  |
| `district_name` | ``$STRING`` |  |
| `elected_office` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `extra` | ``$OBJECT`` |  |
| `first_name` | ``$STRING`` |  |
| `gender` | ``$STRING`` |  |
| `last_name` | ``$STRING`` |  |
| `meta` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `object` | ``$ARRAY`` |  |
| `office` | ``$ARRAY`` |  |
| `party_name` | ``$STRING`` |  |
| `personal_url` | ``$STRING`` |  |
| `photo_url` | ``$STRING`` |  |
| `source_url` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const representatif = await client.Representatif().load({ id: 'representatif_id' })
```

#### Example: List

```ts
const representatifs = await client.Representatif().list()
```


### RepresentativeSet

Create an instance: `const representative_set = client.RepresentativeSet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const representative_set = await client.RepresentativeSet().load({ id: 'representative_set_id' })
```

#### Example: List

```ts
const representative_sets = await client.RepresentativeSet().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local moon = client:Moon(nil)
moon:load({ planet_id = "earth", id = "luna" }, nil)

-- moon:data_get() now returns the loaded moon data
-- moon:match_get() returns the last match criteria
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
