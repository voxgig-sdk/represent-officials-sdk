# RepresentOfficials PHP SDK Reference

Complete API reference for the RepresentOfficials PHP SDK.


## RepresentOfficialsSDK

### Constructor

```php
require_once __DIR__ . '/represent-officials_sdk.php';

$client = new RepresentOfficialsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## BoundaryEntity

```php
$boundary = $client->Boundary();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Boundary()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Boundary()->load(["id" => "boundary_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BoundaryEntity`

Create a new `BoundaryEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## BoundarySetEntity

```php
$boundary_set = $client->BoundarySet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->BoundarySet()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->BoundarySet()->load(["id" => "boundary_set_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BoundarySetEntity`

Create a new `BoundarySetEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CandidateEntity

```php
$candidate = $client->Candidate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | ``$OBJECT`` | No |  |
| `object` | ``$ARRAY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Candidate()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CandidateEntity`

Create a new `CandidateEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ElectionEntity

```php
$election = $client->Election();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | ``$OBJECT`` | No |  |
| `object` | ``$ARRAY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Election()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ElectionEntity`

Create a new `ElectionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PostalCodeEntity

```php
$postal_code = $client->PostalCode();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->PostalCode()->load(["id" => "postal_code_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PostalCodeEntity`

Create a new `PostalCodeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RepresentatifEntity

```php
$representatif = $client->Representatif();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Representatif()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Representatif()->load(["id" => "representatif_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RepresentatifEntity`

Create a new `RepresentatifEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RepresentativeSetEntity

```php
$representative_set = $client->RepresentativeSet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->RepresentativeSet()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->RepresentativeSet()->load(["id" => "representative_set_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RepresentativeSetEntity`

Create a new `RepresentativeSetEntity` instance with the same client and
options.

#### `getName(): string`

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

