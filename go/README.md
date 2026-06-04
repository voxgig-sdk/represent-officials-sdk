# RepresentOfficials Golang SDK

The Golang SDK for the RepresentOfficials API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/represent-officials-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/represent-officials-sdk/go=../path/to/github.com/voxgig-sdk/represent-officials-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"

    sdk "github.com/voxgig-sdk/represent-officials-sdk/go"
    "github.com/voxgig-sdk/represent-officials-sdk/go/core"
)

func main() {
    client := sdk.NewRepresentOfficialsSDK(map[string]any{})
```

### 2. List boundarys

```go
    result, err := client.Boundary(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a boundary

```go
    result, err = client.Boundary(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewRepresentOfficialsSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
REPRESENT-OFFICIALS_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewRepresentOfficialsSDK

```go
func NewRepresentOfficialsSDK(options map[string]any) *RepresentOfficialsSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *RepresentOfficialsSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### RepresentOfficialsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Boundary` | `(data map[string]any) RepresentOfficialsEntity` | Create a Boundary entity instance. |
| `BoundarySet` | `(data map[string]any) RepresentOfficialsEntity` | Create a BoundarySet entity instance. |
| `Candidate` | `(data map[string]any) RepresentOfficialsEntity` | Create a Candidate entity instance. |
| `Election` | `(data map[string]any) RepresentOfficialsEntity` | Create a Election entity instance. |
| `PostalCode` | `(data map[string]any) RepresentOfficialsEntity` | Create a PostalCode entity instance. |
| `Representatif` | `(data map[string]any) RepresentOfficialsEntity` | Create a Representatif entity instance. |
| `RepresentativeSet` | `(data map[string]any) RepresentOfficialsEntity` | Create a RepresentativeSet entity instance. |

### Entity interface (RepresentOfficialsEntity)

All entities implement the `RepresentOfficialsEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Boundary

| Field | Description |
| --- | --- |
| `"boundary_set_name"` |  |
| `"external_id"` |  |
| `"meta"` |  |
| `"metadata"` |  |
| `"name"` |  |
| `"object"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/boundaries/`

#### BoundarySet

| Field | Description |
| --- | --- |
| `"domain"` |  |
| `"name"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/boundary-sets/`

#### Candidate

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"object"` |  |

Operations: List.

API path: `/candidates/`

#### Election

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"object"` |  |

Operations: List.

API path: `/elections/`

#### PostalCode

| Field | Description |
| --- | --- |
| `"boundaries_centroid"` |  |
| `"boundaries_concordance"` |  |
| `"centroid"` |  |
| `"city"` |  |
| `"code"` |  |
| `"province"` |  |
| `"representatives_centroid"` |  |
| `"representatives_concordance"` |  |

Operations: Load.

API path: `/postcodes/{postalCode}/`

#### Representatif

| Field | Description |
| --- | --- |
| `"district_id"` |  |
| `"district_name"` |  |
| `"elected_office"` |  |
| `"email"` |  |
| `"extra"` |  |
| `"first_name"` |  |
| `"gender"` |  |
| `"last_name"` |  |
| `"meta"` |  |
| `"name"` |  |
| `"object"` |  |
| `"office"` |  |
| `"party_name"` |  |
| `"personal_url"` |  |
| `"photo_url"` |  |
| `"source_url"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/representatives/`

#### RepresentativeSet

| Field | Description |
| --- | --- |
| `"name"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/representative-sets/`



## Entities


### Boundary

Create an instance: `boundary := client.Boundary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Boundary(nil).Load(map[string]any{"id": "boundary_id"}, nil)
```

#### Example: List

```go
results, err := client.Boundary(nil).List(nil, nil)
```


### BoundarySet

Create an instance: `boundary_set := client.BoundarySet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.BoundarySet(nil).Load(map[string]any{"id": "boundary_set_id"}, nil)
```

#### Example: List

```go
results, err := client.BoundarySet(nil).List(nil, nil)
```


### Candidate

Create an instance: `candidate := client.Candidate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `object` | ``$ARRAY`` |  |

#### Example: List

```go
results, err := client.Candidate(nil).List(nil, nil)
```


### Election

Create an instance: `election := client.Election(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `object` | ``$ARRAY`` |  |

#### Example: List

```go
results, err := client.Election(nil).List(nil, nil)
```


### PostalCode

Create an instance: `postal_code := client.PostalCode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.PostalCode(nil).Load(map[string]any{"id": "postal_code_id"}, nil)
```


### Representatif

Create an instance: `representatif := client.Representatif(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Representatif(nil).Load(map[string]any{"id": "representatif_id"}, nil)
```

#### Example: List

```go
results, err := client.Representatif(nil).List(nil, nil)
```


### RepresentativeSet

Create an instance: `representative_set := client.RepresentativeSet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.RepresentativeSet(nil).Load(map[string]any{"id": "representative_set_id"}, nil)
```

#### Example: List

```go
results, err := client.RepresentativeSet(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/represent-officials-sdk/go/
├── represent-officials.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/represent-officials-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
