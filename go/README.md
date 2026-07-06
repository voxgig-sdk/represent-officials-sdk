# RepresentOfficials Golang SDK



The Golang SDK for the RepresentOfficials API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Boundary(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/represent-officials-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/represent-officials-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/represent-officials-sdk/go=../represent-officials-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/represent-officials-sdk/go"
)

func main() {
    client := sdk.New()

    // List boundary records — the value is the array of records itself.
    boundarys, err := client.Boundary(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range boundarys.([]any) {
        fmt.Println(item)
    }

    // Load a single boundary — the value is the loaded record.
    boundary, err := client.Boundary(nil).Load(map[string]any{"id": "example"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(boundary)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
boundarys, err := client.Boundary(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = boundarys
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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
client := sdk.Test()

boundary, err := client.Boundary(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(boundary) // the returned mock data
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
REPRESENT_OFFICIALS_TEST_LIVE=TRUE
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
| `Election` | `(data map[string]any) RepresentOfficialsEntity` | Create an Election entity instance. |
| `PostalCode` | `(data map[string]any) RepresentOfficialsEntity` | Create a PostalCode entity instance. |
| `Representatif` | `(data map[string]any) RepresentOfficialsEntity` | Create a Representatif entity instance. |
| `RepresentativeSet` | `(data map[string]any) RepresentOfficialsEntity` | Create a RepresentativeSet entity instance. |

### Entity interface (RepresentOfficialsEntity)

All entities implement the `RepresentOfficialsEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    boundary, err := client.Boundary(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // boundary is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `boundary_set_name` | `string` |  |
| `external_id` | `string` |  |
| `meta` | `map[string]any` |  |
| `metadata` | `map[string]any` |  |
| `name` | `string` |  |
| `object` | `[]any` |  |
| `url` | `string` |  |

#### Example: Load

```go
boundary, err := client.Boundary(nil).Load(map[string]any{"id": "boundary_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(boundary) // the loaded record
```

#### Example: List

```go
boundarys, err := client.Boundary(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(boundarys) // the array of records
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
| `domain` | `string` |  |
| `name` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
boundary_set, err := client.BoundarySet(nil).Load(map[string]any{"id": "boundary_set_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(boundary_set) // the loaded record
```

#### Example: List

```go
boundary_sets, err := client.BoundarySet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(boundary_sets) // the array of records
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
| `meta` | `map[string]any` |  |
| `object` | `[]any` |  |

#### Example: List

```go
candidates, err := client.Candidate(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(candidates) // the array of records
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
| `meta` | `map[string]any` |  |
| `object` | `[]any` |  |

#### Example: List

```go
elections, err := client.Election(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(elections) // the array of records
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
| `boundaries_centroid` | `[]any` |  |
| `boundaries_concordance` | `[]any` |  |
| `centroid` | `map[string]any` |  |
| `city` | `string` |  |
| `code` | `string` |  |
| `province` | `string` |  |
| `representatives_centroid` | `[]any` |  |
| `representatives_concordance` | `[]any` |  |

#### Example: Load

```go
postal_code, err := client.PostalCode(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(postal_code) // the loaded record
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
| `district_id` | `string` |  |
| `district_name` | `string` |  |
| `elected_office` | `string` |  |
| `email` | `string` |  |
| `extra` | `map[string]any` |  |
| `first_name` | `string` |  |
| `gender` | `string` |  |
| `last_name` | `string` |  |
| `meta` | `map[string]any` |  |
| `name` | `string` |  |
| `object` | `[]any` |  |
| `office` | `[]any` |  |
| `party_name` | `string` |  |
| `personal_url` | `string` |  |
| `photo_url` | `string` |  |
| `source_url` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
representatif, err := client.Representatif(nil).Load(map[string]any{"id": "representatif_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(representatif) // the loaded record
```

#### Example: List

```go
representatifs, err := client.Representatif(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(representatifs) // the array of records
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
| `name` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
representative_set, err := client.RepresentativeSet(nil).Load(map[string]any{"id": "representative_set_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(representative_set) // the loaded record
```

#### Example: List

```go
representative_sets, err := client.RepresentativeSet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(representative_sets) // the array of records
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

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
boundary := client.Boundary(nil)
boundary.List(nil, nil)

// boundary.Data() now returns the boundary data from the last list
// boundary.Match() returns the last match criteria
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
