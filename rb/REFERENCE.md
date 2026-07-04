# RepresentOfficials Ruby SDK Reference

Complete API reference for the RepresentOfficials Ruby SDK.


## RepresentOfficialsSDK

### Constructor

```ruby
require_relative 'represent-officials_sdk'

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
boundary = client.boundary
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.boundary.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.boundary.load({ "id" => "boundary_id" })
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
boundary_set = client.boundary_set
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.boundary_set.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.boundary_set.load({ "id" => "boundary_set_id" })
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
candidate = client.candidate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | ``$OBJECT`` | No |  |
| `object` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.candidate.list(nil)
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
election = client.election
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | ``$OBJECT`` | No |  |
| `object` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.election.list(nil)
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
postal_code = client.postal_code
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.postal_code.load({ "id" => "postal_code_id" })
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
representatif = client.representatif
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.representatif.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.representatif.load({ "id" => "representatif_id" })
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
representative_set = client.representative_set
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.representative_set.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.representative_set.load({ "id" => "representative_set_id" })
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

