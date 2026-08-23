# RepresentOfficials TypeScript SDK Reference

Complete API reference for the RepresentOfficials TypeScript SDK.


## RepresentOfficialsSDK

### Constructor

```ts
new RepresentOfficialsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RepresentOfficialsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = RepresentOfficialsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `RepresentOfficialsSDK` instance in test mode.


### Instance Methods

#### `Boundary(data?: object)`

Create a new `Boundary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BoundaryEntity` instance.

#### `BoundarySet(data?: object)`

Create a new `BoundarySet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BoundarySetEntity` instance.

#### `Candidate(data?: object)`

Create a new `Candidate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CandidateEntity` instance.

#### `Election(data?: object)`

Create a new `Election` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ElectionEntity` instance.

#### `PostalCode(data?: object)`

Create a new `PostalCode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PostalCodeEntity` instance.

#### `Representatif(data?: object)`

Create a new `Representatif` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RepresentatifEntity` instance.

#### `RepresentativeSet(data?: object)`

Create a new `RepresentativeSet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RepresentativeSetEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `RepresentOfficialsSDK.test()`.

**Returns:** `RepresentOfficialsSDK` instance in test mode.


---

## BoundaryEntity

```ts
const boundary = client.Boundary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundary_set_name` | `string` | No |  |
| `external_id` | `string` | No |  |
| `meta` | `Record<string, any>` | No |  |
| `metadata` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `objects` | `any[]` | No |  |
| `url` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `centroid` | `/boundaries/{boundarySet}/{boundary}/centroid` | `client.Boundary().load({ $action: 'centroid', ... })` |
| `centroid` | `/boundaries/{boundarySet}/centroid` | `client.Boundary().load({ $action: 'centroid', ... })` |
| `shape` | `/boundaries/{boundarySet}/{boundary}/shape` | `client.Boundary().load({ $action: 'shape', ... })` |
| `shape` | `/boundaries/{boundarySet}/shape` | `client.Boundary().load({ $action: 'shape', ... })` |
| `simple_shape` | `/boundaries/{boundarySet}/{boundary}/simple_shape` | `client.Boundary().load({ $action: 'simple_shape', ... })` |
| `simple_shape` | `/boundaries/{boundarySet}/simple_shape` | `client.Boundary().load({ $action: 'simple_shape', ... })` |

An action returns that action's OWN response, which is not necessarily a
Boundary record — check the API definition for its shape.

```ts
const result = await client.Boundary().load({
  $action: 'centroid',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Boundary().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Boundary().load({ id: 'boundary_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BoundaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `RepresentOfficialsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BoundarySetEntity

```ts
const boundary_set = client.BoundarySet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No |  |
| `name` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BoundarySet().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BoundarySet().load({ id: 'boundary_set_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BoundarySetEntity` instance with the same client and
options.

#### `client()`

Return the parent `RepresentOfficialsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CandidateEntity

```ts
const candidate = client.Candidate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `objects` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Candidate().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CandidateEntity` instance with the same client and
options.

#### `client()`

Return the parent `RepresentOfficialsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ElectionEntity

```ts
const election = client.Election()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `objects` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Election().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ElectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `RepresentOfficialsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PostalCodeEntity

```ts
const postal_code = client.PostalCode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundaries_centroid` | `any[]` | No | Boundaries containing the postal code's centroid |
| `boundaries_concordance` | `any[]` | No | Boundaries linked to postal code via official data |
| `centroid` | `Record<string, any>` | No |  |
| `city` | `string` | No | City name |
| `code` | `string` | No | The postal code |
| `province` | `string` | No | Province code |
| `representatives_centroid` | `any[]` | No | Representatives for boundaries containing centroid |
| `representatives_concordance` | `any[]` | No | Representatives for boundaries via concordance |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PostalCode().load({ postal_code: 'postal_code' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PostalCodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `RepresentOfficialsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RepresentatifEntity

```ts
const representatif = client.Representatif()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `district_id` | `string` | No | District identifier if available |
| `district_name` | `string` | Yes | Name of the electoral district |
| `elected_office` | `string` | Yes | Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman) |
| `email` | `string` | No | Email address |
| `extra` | `Record<string, any>` | No | Additional data not covered by standard fields |
| `first_name` | `string` | No | First name |
| `gender` | `string` | No | Gender |
| `last_name` | `string` | No | Last name |
| `meta` | `Record<string, any>` | No |  |
| `name` | `string` | Yes | Full name of the representative |
| `objects` | `any[]` | No |  |
| `offices` | `any[]` | No | Contact information for representative's offices |
| `party_name` | `string` | No | Political party name |
| `personal_url` | `string` | No | Personal website not on official legislature site |
| `photo_url` | `string` | No | URL to representative's photo |
| `source_url` | `string` | No | URL where the data is scraped from |
| `url` | `string` | No | Representative's page on official legislature site |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Representatif().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Representatif().load({ id: 'representatif_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RepresentatifEntity` instance with the same client and
options.

#### `client()`

Return the parent `RepresentOfficialsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RepresentativeSetEntity

```ts
const representative_set = client.RepresentativeSet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.RepresentativeSet().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RepresentativeSet().load({ id: 'representative_set_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RepresentativeSetEntity` instance with the same client and
options.

#### `client()`

Return the parent `RepresentOfficialsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new RepresentOfficialsSDK({
  feature: {
    test: { active: true },
  }
})
```

