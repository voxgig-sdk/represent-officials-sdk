# RepresentOfficials PHP SDK Reference

Complete API reference for the RepresentOfficials PHP SDK.


## RepresentOfficialsSDK

### Constructor

```php
require_once __DIR__ . '/representofficials_sdk.php';

$client = new RepresentOfficialsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RepresentOfficialsSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = RepresentOfficialsSDK::test();
```


### Instance Methods

#### `Boundary($data = null)`

Create a new `BoundaryEntity` instance. Pass `null` for no initial data.

#### `BoundarySet($data = null)`

Create a new `BoundarySetEntity` instance. Pass `null` for no initial data.

#### `Candidate($data = null)`

Create a new `CandidateEntity` instance. Pass `null` for no initial data.

#### `Election($data = null)`

Create a new `ElectionEntity` instance. Pass `null` for no initial data.

#### `PostalCode($data = null)`

Create a new `PostalCodeEntity` instance. Pass `null` for no initial data.

#### `Representatif($data = null)`

Create a new `RepresentatifEntity` instance. Pass `null` for no initial data.

#### `RepresentativeSet($data = null)`

Create a new `RepresentativeSetEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): RepresentOfficialsUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BoundaryEntity

```php
$boundary = $client->Boundary();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundary_set_name` | `string` | No |  |
| `external_id` | `string` | No |  |
| `meta` | `array` | No |  |
| `metadata` | `array` | No |  |
| `name` | `string` | No |  |
| `object` | `array` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Boundary()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Boundary()->load(["id" => "boundary_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BoundaryEntity`

Create a new `BoundaryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BoundarySetEntity

```php
$boundary_set = $client->BoundarySet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No |  |
| `name` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->BoundarySet()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->BoundarySet()->load(["id" => "boundary_set_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BoundarySetEntity`

Create a new `BoundarySetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CandidateEntity

```php
$candidate = $client->Candidate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `object` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Candidate()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CandidateEntity`

Create a new `CandidateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ElectionEntity

```php
$election = $client->Election();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `object` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Election()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ElectionEntity`

Create a new `ElectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PostalCodeEntity

```php
$postal_code = $client->PostalCode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundaries_centroid` | `array` | No |  |
| `boundaries_concordance` | `array` | No |  |
| `centroid` | `array` | No |  |
| `city` | `string` | No |  |
| `code` | `string` | No |  |
| `province` | `string` | No |  |
| `representatives_centroid` | `array` | No |  |
| `representatives_concordance` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PostalCode()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PostalCodeEntity`

Create a new `PostalCodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RepresentatifEntity

```php
$representatif = $client->Representatif();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `district_id` | `string` | No |  |
| `district_name` | `string` | Yes |  |
| `elected_office` | `string` | Yes |  |
| `email` | `string` | No |  |
| `extra` | `array` | No |  |
| `first_name` | `string` | No |  |
| `gender` | `string` | No |  |
| `last_name` | `string` | No |  |
| `meta` | `array` | No |  |
| `name` | `string` | Yes |  |
| `object` | `array` | No |  |
| `office` | `array` | No |  |
| `party_name` | `string` | No |  |
| `personal_url` | `string` | No |  |
| `photo_url` | `string` | No |  |
| `source_url` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Representatif()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Representatif()->load(["id" => "representatif_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RepresentatifEntity`

Create a new `RepresentatifEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RepresentativeSetEntity

```php
$representative_set = $client->RepresentativeSet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->RepresentativeSet()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RepresentativeSet()->load(["id" => "representative_set_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RepresentativeSetEntity`

Create a new `RepresentativeSetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new RepresentOfficialsSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

