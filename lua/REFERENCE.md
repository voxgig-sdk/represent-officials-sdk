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
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts, sdkopts)`

Create a test client with mock features active. Both arguments may be `nil`.

```lua
local client = sdk.test(nil, nil)
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
| `boundary_set_name` | ``$STRING`` | No |  |
| `external_id` | ``$STRING`` | No |  |
| `meta` | ``$OBJECT`` | No |  |
| `metadata` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `object` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Boundary(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Boundary(nil):load({ id = "boundary_id" }, nil)
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
| `domain` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:BoundarySet(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:BoundarySet(nil):load({ id = "boundary_set_id" }, nil)
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
| `meta` | ``$OBJECT`` | No |  |
| `object` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Candidate(nil):list(nil, nil)
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
| `meta` | ``$OBJECT`` | No |  |
| `object` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Election(nil):list(nil, nil)
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
| `boundaries_centroid` | ``$ARRAY`` | No |  |
| `boundaries_concordance` | ``$ARRAY`` | No |  |
| `centroid` | ``$OBJECT`` | No |  |
| `city` | ``$STRING`` | No |  |
| `code` | ``$STRING`` | No |  |
| `province` | ``$STRING`` | No |  |
| `representatives_centroid` | ``$ARRAY`` | No |  |
| `representatives_concordance` | ``$ARRAY`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PostalCode(nil):load({ id = "postal_code_id" }, nil)
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
| `district_id` | ``$STRING`` | No |  |
| `district_name` | ``$STRING`` | Yes |  |
| `elected_office` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | No |  |
| `extra` | ``$OBJECT`` | No |  |
| `first_name` | ``$STRING`` | No |  |
| `gender` | ``$STRING`` | No |  |
| `last_name` | ``$STRING`` | No |  |
| `meta` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | Yes |  |
| `object` | ``$ARRAY`` | No |  |
| `office` | ``$ARRAY`` | No |  |
| `party_name` | ``$STRING`` | No |  |
| `personal_url` | ``$STRING`` | No |  |
| `photo_url` | ``$STRING`` | No |  |
| `source_url` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Representatif(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Representatif(nil):load({ id = "representatif_id" }, nil)
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
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:RepresentativeSet(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:RepresentativeSet(nil):load({ id = "representative_set_id" }, nil)
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

