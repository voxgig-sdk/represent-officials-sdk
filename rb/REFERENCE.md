# RepresentOfficials Ruby SDK Reference

Complete API reference for the RepresentOfficials Ruby SDK.


## RepresentOfficialsSDK

### Constructor

```ruby
require_relative 'RepresentOfficials_sdk'

client = RepresentOfficialsSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RepresentOfficialsSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = RepresentOfficialsSDK.test
```


### Instance Methods

#### `Boundary(data = nil)`

Create a new `Boundary` entity instance. Pass `nil` for no initial data.

#### `BoundarySet(data = nil)`

Create a new `BoundarySet` entity instance. Pass `nil` for no initial data.

#### `Candidate(data = nil)`

Create a new `Candidate` entity instance. Pass `nil` for no initial data.

#### `Election(data = nil)`

Create a new `Election` entity instance. Pass `nil` for no initial data.

#### `PostalCode(data = nil)`

Create a new `PostalCode` entity instance. Pass `nil` for no initial data.

#### `Representatif(data = nil)`

Create a new `Representatif` entity instance. Pass `nil` for no initial data.

#### `RepresentativeSet(data = nil)`

Create a new `RepresentativeSet` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BoundaryEntity

```ruby
boundary = client.Boundary
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundary_set_name` | `String` | No |  |
| `external_id` | `String` | No |  |
| `meta` | `Hash` | No |  |
| `metadata` | `Hash` | No |  |
| `name` | `String` | No |  |
| `object` | `Array` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Boundary.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Boundary.load({ "id" => "boundary_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BoundaryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BoundarySetEntity

```ruby
boundary_set = client.BoundarySet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `String` | No |  |
| `name` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.BoundarySet.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.BoundarySet.load({ "id" => "boundary_set_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BoundarySetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CandidateEntity

```ruby
candidate = client.Candidate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `object` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Candidate.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CandidateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ElectionEntity

```ruby
election = client.Election
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `object` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Election.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ElectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PostalCodeEntity

```ruby
postal_code = client.PostalCode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundaries_centroid` | `Array` | No |  |
| `boundaries_concordance` | `Array` | No |  |
| `centroid` | `Hash` | No |  |
| `city` | `String` | No |  |
| `code` | `String` | No |  |
| `province` | `String` | No |  |
| `representatives_centroid` | `Array` | No |  |
| `representatives_concordance` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PostalCode.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PostalCodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RepresentatifEntity

```ruby
representatif = client.Representatif
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `district_id` | `String` | No |  |
| `district_name` | `String` | Yes |  |
| `elected_office` | `String` | Yes |  |
| `email` | `String` | No |  |
| `extra` | `Hash` | No |  |
| `first_name` | `String` | No |  |
| `gender` | `String` | No |  |
| `last_name` | `String` | No |  |
| `meta` | `Hash` | No |  |
| `name` | `String` | Yes |  |
| `object` | `Array` | No |  |
| `office` | `Array` | No |  |
| `party_name` | `String` | No |  |
| `personal_url` | `String` | No |  |
| `photo_url` | `String` | No |  |
| `source_url` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Representatif.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Representatif.load({ "id" => "representatif_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RepresentatifEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RepresentativeSetEntity

```ruby
representative_set = client.RepresentativeSet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.RepresentativeSet.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.RepresentativeSet.load({ "id" => "representative_set_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RepresentativeSetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = RepresentOfficialsSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

