# RepresentOfficials Python SDK



The Python SDK for the RepresentOfficials API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Boundary()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/represent-officials-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from representofficials_sdk import RepresentOfficialsSDK

client = RepresentOfficialsSDK()
```

### 2. List boundary records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    boundarys = client.Boundary().list()
    for boundary in boundarys:
        print(boundary)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a postalcode

PostalCode is nested under postal_code, so provide the `postal_code`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    postalcode = client.PostalCode().load({"postal_code": "example_postal_code"})
    print(postalcode)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    boundarysets = client.BoundarySet().list()
    print(boundarysets)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = RepresentOfficialsSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
boundaryset = client.BoundarySet().list()
# boundaryset contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = RepresentOfficialsSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### RepresentOfficialsSDK

```python
from representofficials_sdk import RepresentOfficialsSDK

client = RepresentOfficialsSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = RepresentOfficialsSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### RepresentOfficialsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `boundary = client.Boundary()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boundary_set_name` | `str` |  |
| `external_id` | `str` |  |
| `id` | `str` |  |
| `meta` | `dict` |  |
| `metadata` | `dict` |  |
| `name` | `str` |  |
| `objects` | `list` |  |
| `url` | `str` |  |

#### Example: Load

```python
boundary = client.Boundary().load({"id": "boundary_id"})
```

#### Example: List

```python
boundarys = client.Boundary().list()
```


### BoundarySet

Create an instance: `boundary_set = client.BoundarySet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
boundary_set = client.BoundarySet().load({"id": "boundary_set_id"})
```

#### Example: List

```python
boundary_sets = client.BoundarySet().list()
```


### Candidate

Create an instance: `candidate = client.Candidate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `dict` |  |
| `objects` | `list` |  |

#### Example: List

```python
candidates = client.Candidate().list()
```


### Election

Create an instance: `election = client.Election()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `dict` |  |
| `objects` | `list` |  |

#### Example: List

```python
elections = client.Election().list()
```


### PostalCode

Create an instance: `postal_code = client.PostalCode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boundaries_centroid` | `list` | Boundaries containing the postal code's centroid |
| `boundaries_concordance` | `list` | Boundaries linked to postal code via official data |
| `centroid` | `dict` |  |
| `city` | `str` | City name |
| `code` | `str` | The postal code |
| `province` | `str` | Province code |
| `representatives_centroid` | `list` | Representatives for boundaries containing centroid |
| `representatives_concordance` | `list` | Representatives for boundaries via concordance |

#### Example: Load

```python
postal_code = client.PostalCode().load({"postal_code": "postal_code"})
```


### Representatif

Create an instance: `representatif = client.Representatif()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `district_id` | `str` | District identifier if available |
| `district_name` | `str` | Name of the electoral district |
| `elected_office` | `str` | Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman) |
| `email` | `str` | Email address |
| `extra` | `dict` | Additional data not covered by standard fields |
| `first_name` | `str` | First name |
| `gender` | `str` | Gender |
| `id` | `str` |  |
| `last_name` | `str` | Last name |
| `meta` | `dict` |  |
| `name` | `str` | Full name of the representative |
| `objects` | `list` |  |
| `offices` | `list` | Contact information for representative's offices |
| `party_name` | `str` | Political party name |
| `personal_url` | `str` | Personal website not on official legislature site |
| `photo_url` | `str` | URL to representative's photo |
| `source_url` | `str` | URL where the data is scraped from |
| `url` | `str` | Representative's page on official legislature site |

#### Example: Load

```python
representatif = client.Representatif().load({"id": "representatif_id"})
```

#### Example: List

```python
representatifs = client.Representatif().list()
```


### RepresentativeSet

Create an instance: `representative_set = client.RepresentativeSet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `name` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
representative_set = client.RepresentativeSet().load({"id": "representative_set_id"})
```

#### Example: List

```python
representative_sets = client.RepresentativeSet().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── representofficials_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`representofficials_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
boundaryset = client.BoundarySet()
boundaryset.list()

# boundaryset.data_get() now returns the boundaryset data from the last list
# boundaryset.match_get() returns the last match criteria
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
