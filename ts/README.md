# RepresentOfficials TypeScript SDK



The TypeScript SDK for the RepresentOfficials API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Boundary()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/represent-officials-sdk/releases](https://github.com/voxgig-sdk/represent-officials-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { RepresentOfficialsSDK } from '@voxgig-sdk/represent-officials'

const client = new RepresentOfficialsSDK()
```

### 2. List boundary records

`list()` resolves to an array of Boundary ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const boundarys = await client.Boundary().list()

for (const boundary of boundarys) {
  console.log(boundary)
}
```

### 3. Load a postalcode

PostalCode is nested under postal_code, so provide the `postal_code`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const postalcode = await client.PostalCode().load({
    postal_code: 'example_postal_code',
  })
  console.log(postalcode)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const boundarysets = await client.BoundarySet().list()
  console.log(boundarysets)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = RepresentOfficialsSDK.test()

const boundaryset = await client.BoundarySet().list()
// boundaryset is the entity, populated with mock response data
// — call boundaryset.data() for the record itself
console.log(boundaryset)
```

You can also use the instance method:

```ts
const client = new RepresentOfficialsSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.BoundarySet()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new RepresentOfficialsSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
REPRESENT_OFFICIALS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### RepresentOfficialsSDK

#### Constructor

```ts
new RepresentOfficialsSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Boundary(data?)` | `BoundaryEntity` | Create a Boundary entity instance. |
| `BoundarySet(data?)` | `BoundarySetEntity` | Create a BoundarySet entity instance. |
| `Candidate(data?)` | `CandidateEntity` | Create a Candidate entity instance. |
| `Election(data?)` | `ElectionEntity` | Create an Election entity instance. |
| `PostalCode(data?)` | `PostalCodeEntity` | Create a PostalCode entity instance. |
| `Representatif(data?)` | `RepresentatifEntity` | Create a Representatif entity instance. |
| `RepresentativeSet(data?)` | `RepresentativeSetEntity` | Create a RepresentativeSet entity instance. |
| `tester(testopts?, sdkopts?)` | `RepresentOfficialsSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `RepresentOfficialsSDK.test(testopts?, sdkopts?)` | `RepresentOfficialsSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): RepresentOfficialsSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

API path: `/boundaries/`

#### BoundarySet

| Field | Description |
| --- | --- |
| `domain` |  |
| `id` |  |
| `name` |  |
| `url` |  |

Operations: list, load.

API path: `/boundary-sets/`

#### Candidate

| Field | Description |
| --- | --- |
| `meta` |  |
| `objects` |  |

Operations: list.

API path: `/candidates/`

#### Election

| Field | Description |
| --- | --- |
| `meta` |  |
| `objects` |  |

Operations: list.

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

Operations: load.

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

Operations: list, load.

API path: `/representatives/`

#### RepresentativeSet

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `url` |  |

Operations: list, load.

API path: `/representative-sets/`



## Entities


### Boundary

Create an instance: `const boundary = client.Boundary()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boundary_set_name` | `string` |  |
| `external_id` | `string` |  |
| `id` | `string` |  |
| `meta` | `Record<string, any>` |  |
| `metadata` | `Record<string, any>` |  |
| `name` | `string` |  |
| `objects` | `any[]` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const boundary = await client.Boundary().load({ id: 'boundary_id' })
```

#### Example: List

```ts
const boundarys = await client.Boundary().list()
```


### BoundarySet

Create an instance: `const boundary_set = client.BoundarySet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const boundary_set = await client.BoundarySet().load({ id: 'boundary_set_id' })
```

#### Example: List

```ts
const boundary_sets = await client.BoundarySet().list()
```


### Candidate

Create an instance: `const candidate = client.Candidate()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Record<string, any>` |  |
| `objects` | `any[]` |  |

#### Example: List

```ts
const candidates = await client.Candidate().list()
```


### Election

Create an instance: `const election = client.Election()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Record<string, any>` |  |
| `objects` | `any[]` |  |

#### Example: List

```ts
const elections = await client.Election().list()
```


### PostalCode

Create an instance: `const postal_code = client.PostalCode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boundaries_centroid` | `any[]` | Boundaries containing the postal code's centroid |
| `boundaries_concordance` | `any[]` | Boundaries linked to postal code via official data |
| `centroid` | `Record<string, any>` |  |
| `city` | `string` | City name |
| `code` | `string` | The postal code |
| `province` | `string` | Province code |
| `representatives_centroid` | `any[]` | Representatives for boundaries containing centroid |
| `representatives_concordance` | `any[]` | Representatives for boundaries via concordance |

#### Example: Load

```ts
const postal_code = await client.PostalCode().load({ postal_code: 'postal_code' })
```


### Representatif

Create an instance: `const representatif = client.Representatif()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `district_id` | `string` | District identifier if available |
| `district_name` | `string` | Name of the electoral district |
| `elected_office` | `string` | Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman) |
| `email` | `string` | Email address |
| `extra` | `Record<string, any>` | Additional data not covered by standard fields |
| `first_name` | `string` | First name |
| `gender` | `string` | Gender |
| `id` | `string` |  |
| `last_name` | `string` | Last name |
| `meta` | `Record<string, any>` |  |
| `name` | `string` | Full name of the representative |
| `objects` | `any[]` |  |
| `offices` | `any[]` | Contact information for representative's offices |
| `party_name` | `string` | Political party name |
| `personal_url` | `string` | Personal website not on official legislature site |
| `photo_url` | `string` | URL to representative's photo |
| `source_url` | `string` | URL where the data is scraped from |
| `url` | `string` | Representative's page on official legislature site |

#### Example: Load

```ts
const representatif = await client.Representatif().load({ id: 'representatif_id' })
```

#### Example: List

```ts
const representatifs = await client.Representatif().list()
```


### RepresentativeSet

Create an instance: `const representative_set = client.RepresentativeSet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const representative_set = await client.RepresentativeSet().load({ id: 'representative_set_id' })
```

#### Example: List

```ts
const representative_sets = await client.RepresentativeSet().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
represent-officials/
├── src/
│   ├── RepresentOfficialsSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { RepresentOfficialsSDK } from '@voxgig-sdk/represent-officials'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const boundaryset = client.BoundarySet()
await boundaryset.list()

// boundaryset.data() now returns the boundaryset data from the last `list`
// boundaryset.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
