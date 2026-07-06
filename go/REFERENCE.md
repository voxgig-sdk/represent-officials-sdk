# RepresentOfficials Golang SDK Reference

Complete API reference for the RepresentOfficials Golang SDK.


## RepresentOfficialsSDK

### Constructor

```go
func NewRepresentOfficialsSDK(options map[string]any) *RepresentOfficialsSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *RepresentOfficialsSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *RepresentOfficialsSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Boundary(data map[string]any) RepresentOfficialsEntity`

Create a new `Boundary` entity instance. Pass `nil` for no initial data.

#### `BoundarySet(data map[string]any) RepresentOfficialsEntity`

Create a new `BoundarySet` entity instance. Pass `nil` for no initial data.

#### `Candidate(data map[string]any) RepresentOfficialsEntity`

Create a new `Candidate` entity instance. Pass `nil` for no initial data.

#### `Election(data map[string]any) RepresentOfficialsEntity`

Create a new `Election` entity instance. Pass `nil` for no initial data.

#### `PostalCode(data map[string]any) RepresentOfficialsEntity`

Create a new `PostalCode` entity instance. Pass `nil` for no initial data.

#### `Representatif(data map[string]any) RepresentOfficialsEntity`

Create a new `Representatif` entity instance. Pass `nil` for no initial data.

#### `RepresentativeSet(data map[string]any) RepresentOfficialsEntity`

Create a new `RepresentativeSet` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BoundaryEntity

```go
boundary := client.Boundary(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundary_set_name` | `string` | No |  |
| `external_id` | `string` | No |  |
| `meta` | `map[string]any` | No |  |
| `metadata` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `object` | `[]any` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Boundary(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Boundary(nil).Load(map[string]any{"id": "boundary_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BoundaryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BoundarySetEntity

```go
boundary_set := client.BoundarySet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No |  |
| `name` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.BoundarySet(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BoundarySet(nil).Load(map[string]any{"id": "boundary_set_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BoundarySetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CandidateEntity

```go
candidate := client.Candidate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `map[string]any` | No |  |
| `object` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Candidate(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CandidateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ElectionEntity

```go
election := client.Election(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `map[string]any` | No |  |
| `object` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Election(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ElectionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PostalCodeEntity

```go
postal_code := client.PostalCode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundaries_centroid` | `[]any` | No |  |
| `boundaries_concordance` | `[]any` | No |  |
| `centroid` | `map[string]any` | No |  |
| `city` | `string` | No |  |
| `code` | `string` | No |  |
| `province` | `string` | No |  |
| `representatives_centroid` | `[]any` | No |  |
| `representatives_concordance` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PostalCode(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PostalCodeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RepresentatifEntity

```go
representatif := client.Representatif(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `district_id` | `string` | No |  |
| `district_name` | `string` | Yes |  |
| `elected_office` | `string` | Yes |  |
| `email` | `string` | No |  |
| `extra` | `map[string]any` | No |  |
| `first_name` | `string` | No |  |
| `gender` | `string` | No |  |
| `last_name` | `string` | No |  |
| `meta` | `map[string]any` | No |  |
| `name` | `string` | Yes |  |
| `object` | `[]any` | No |  |
| `office` | `[]any` | No |  |
| `party_name` | `string` | No |  |
| `personal_url` | `string` | No |  |
| `photo_url` | `string` | No |  |
| `source_url` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Representatif(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Representatif(nil).Load(map[string]any{"id": "representatif_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RepresentatifEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RepresentativeSetEntity

```go
representative_set := client.RepresentativeSet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.RepresentativeSet(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RepresentativeSet(nil).Load(map[string]any{"id": "representative_set_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RepresentativeSetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewRepresentOfficialsSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

