# RepresentOfficials Lua SDK Reference

Complete API reference for the RepresentOfficials Lua SDK.


## RepresentOfficialsSDK

### Constructor

```lua
local sdk = require("represent-officials_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Boundary(data)`

Create a new `Boundary` entity instance. Pass `nil` for no initial data.

#### `BoundarySet(data)`

Create a new `BoundarySet` entity instance. Pass `nil` for no initial data.

#### `Candidate(data)`

Create a new `Candidate` entity instance. Pass `nil` for no initial data.

#### `Election(data)`

Create a new `Election` entity instance. Pass `nil` for no initial data.

#### `PostalCode(data)`

Create a new `PostalCode` entity instance. Pass `nil` for no initial data.

#### `Representatif(data)`

Create a new `Representatif` entity instance. Pass `nil` for no initial data.

#### `RepresentativeSet(data)`

Create a new `RepresentativeSet` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BoundaryEntity

```lua
local boundary = client:Boundary(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundary_set_name` | `string` | No |  |
| `external_id` | `string` | No |  |
| `id` | `string` | No |  |
| `meta` | `table` | No |  |
| `metadata` | `table` | No |  |
| `name` | `string` | No |  |
| `objects` | `table` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Boundary():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Boundary():load({ id = "boundary_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoundaryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BoundarySetEntity

```lua
local boundary_set = client:BoundarySet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:BoundarySet():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:BoundarySet():load({ id = "boundary_set_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoundarySetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CandidateEntity

```lua
local candidate = client:Candidate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `table` | No |  |
| `objects` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Candidate():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CandidateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ElectionEntity

```lua
local election = client:Election(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `table` | No |  |
| `objects` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Election():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ElectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PostalCodeEntity

```lua
local postal_code = client:PostalCode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundaries_centroid` | `table` | No | Boundaries containing the postal code's centroid |
| `boundaries_concordance` | `table` | No | Boundaries linked to postal code via official data |
| `centroid` | `table` | No |  |
| `city` | `string` | No | City name |
| `code` | `string` | No | The postal code |
| `province` | `string` | No | Province code |
| `representatives_centroid` | `table` | No | Representatives for boundaries containing centroid |
| `representatives_concordance` | `table` | No | Representatives for boundaries via concordance |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PostalCode():load({ postal_code = "postal_code" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PostalCodeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RepresentatifEntity

```lua
local representatif = client:Representatif(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `district_id` | `string` | No | District identifier if available |
| `district_name` | `string` | Yes | Name of the electoral district |
| `elected_office` | `string` | Yes | Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman) |
| `email` | `string` | No | Email address |
| `extra` | `table` | No | Additional data not covered by standard fields |
| `first_name` | `string` | No | First name |
| `gender` | `string` | No | Gender |
| `id` | `string` | No |  |
| `last_name` | `string` | No | Last name |
| `meta` | `table` | No |  |
| `name` | `string` | Yes | Full name of the representative |
| `objects` | `table` | No |  |
| `offices` | `table` | No | Contact information for representative's offices |
| `party_name` | `string` | No | Political party name |
| `personal_url` | `string` | No | Personal website not on official legislature site |
| `photo_url` | `string` | No | URL to representative's photo |
| `source_url` | `string` | No | URL where the data is scraped from |
| `url` | `string` | No | Representative's page on official legislature site |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Representatif():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Representatif():load({ id = "representatif_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RepresentatifEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RepresentativeSetEntity

```lua
local representative_set = client:RepresentativeSet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:RepresentativeSet():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:RepresentativeSet():load({ id = "representative_set_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RepresentativeSetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

