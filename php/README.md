# RepresentOfficials PHP SDK



The PHP SDK for the RepresentOfficials API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/represent-officials-sdk/releases](https://github.com/voxgig-sdk/represent-officials-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'representofficials_sdk.php';

$client = new RepresentOfficialsSDK();
```

### 2. List boundary records

```php
try {
    // list() returns an array of Boundary records — iterate directly.
    $boundarys = $client->Boundary()->list();
    foreach ($boundarys as $item) {
        echo $item["id"] . " " . $item["name"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a boundary

```php
try {
    // load() returns the bare Boundary record (throws on error).
    $boundary = $client->Boundary()->load(["id" => "example_id"]);
    print_r($boundary);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = RepresentOfficialsSDK::test([
    "entity" => ["boundary" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$boundary = $client->Boundary()->load(["id" => "test01"]);
print_r($boundary);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new RepresentOfficialsSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
REPRESENT_OFFICIALS_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### RepresentOfficialsSDK

```php
require_once 'representofficials_sdk.php';
$client = new RepresentOfficialsSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = RepresentOfficialsSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### RepresentOfficialsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Boundary` | `($data): BoundaryEntity` | Create a Boundary entity instance. |
| `BoundarySet` | `($data): BoundarySetEntity` | Create a BoundarySet entity instance. |
| `Candidate` | `($data): CandidateEntity` | Create a Candidate entity instance. |
| `Election` | `($data): ElectionEntity` | Create an Election entity instance. |
| `PostalCode` | `($data): PostalCodeEntity` | Create a PostalCode entity instance. |
| `Representatif` | `($data): RepresentatifEntity` | Create a Representatif entity instance. |
| `RepresentativeSet` | `($data): RepresentativeSetEntity` | Create a RepresentativeSet entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$boundary = $client->Boundary();`

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

```php
// load() returns the bare Boundary record (throws on error).
$boundary = $client->Boundary()->load(["id" => "boundary_id"]);
```

#### Example: List

```php
// list() returns an array of Boundary records (throws on error).
$boundarys = $client->Boundary()->list();
```


### BoundarySet

Create an instance: `$boundary_set = $client->BoundarySet();`

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

```php
// load() returns the bare BoundarySet record (throws on error).
$boundary_set = $client->BoundarySet()->load(["id" => "boundary_set_id"]);
```

#### Example: List

```php
// list() returns an array of BoundarySet records (throws on error).
$boundary_sets = $client->BoundarySet()->list();
```


### Candidate

Create an instance: `$candidate = $client->Candidate();`

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

```php
// list() returns an array of Candidate records (throws on error).
$candidates = $client->Candidate()->list();
```


### Election

Create an instance: `$election = $client->Election();`

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

```php
// list() returns an array of Election records (throws on error).
$elections = $client->Election()->list();
```


### PostalCode

Create an instance: `$postal_code = $client->PostalCode();`

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

```php
// load() returns the bare PostalCode record (throws on error).
$postal_code = $client->PostalCode()->load(["id" => "postal_code_id"]);
```


### Representatif

Create an instance: `$representatif = $client->Representatif();`

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

```php
// load() returns the bare Representatif record (throws on error).
$representatif = $client->Representatif()->load(["id" => "representatif_id"]);
```

#### Example: List

```php
// list() returns an array of Representatif records (throws on error).
$representatifs = $client->Representatif()->list();
```


### RepresentativeSet

Create an instance: `$representative_set = $client->RepresentativeSet();`

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

```php
// load() returns the bare RepresentativeSet record (throws on error).
$representative_set = $client->RepresentativeSet()->load(["id" => "representative_set_id"]);
```

#### Example: List

```php
// list() returns an array of RepresentativeSet records (throws on error).
$representative_sets = $client->RepresentativeSet()->list();
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── representofficials_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`representofficials_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$boundary = $client->Boundary();
$boundary->load(["id" => "example_id"]);

// $boundary->dataGet() now returns the loaded boundary data
// $boundary->matchGet() returns the last match criteria
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
