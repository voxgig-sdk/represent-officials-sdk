# RepresentOfficials TypeScript SDK

The TypeScript SDK for the RepresentOfficials API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install represent-officials
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { RepresentOfficialsSDK } from 'represent-officials'

const client = new RepresentOfficialsSDK({})
```

### 2. List boundarys

```ts
const result = await client.Boundary().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a boundary

```ts
const result = await client.Boundary().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
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

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new RepresentOfficialsSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
REPRESENT-OFFICIALS_TEST_LIVE=TRUE
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
| `Election(data?)` | `ElectionEntity` | Create a Election entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): RepresentOfficialsSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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
| `meta` |  |
| `metadata` |  |
| `name` |  |
| `object` |  |
| `url` |  |

Operations: list, load.

API path: `/boundaries/`

#### BoundarySet

| Field | Description |
| --- | --- |
| `domain` |  |
| `name` |  |
| `url` |  |

Operations: list, load.

API path: `/boundary-sets/`

#### Candidate

| Field | Description |
| --- | --- |
| `meta` |  |
| `object` |  |

Operations: list.

API path: `/candidates/`

#### Election

| Field | Description |
| --- | --- |
| `meta` |  |
| `object` |  |

Operations: list.

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

Operations: load.

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

Operations: list, load.

API path: `/representatives/`

#### RepresentativeSet

| Field | Description |
| --- | --- |
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
| `boundary_set_name` | ``$STRING`` |  |
| `external_id` | ``$STRING`` |  |
| `meta` | ``$OBJECT`` |  |
| `metadata` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `object` | ``$ARRAY`` |  |
| `url` | ``$STRING`` |  |

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
| `domain` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

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
| `meta` | ``$OBJECT`` |  |
| `object` | ``$ARRAY`` |  |

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
| `meta` | ``$OBJECT`` |  |
| `object` | ``$ARRAY`` |  |

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
| `boundaries_centroid` | ``$ARRAY`` |  |
| `boundaries_concordance` | ``$ARRAY`` |  |
| `centroid` | ``$OBJECT`` |  |
| `city` | ``$STRING`` |  |
| `code` | ``$STRING`` |  |
| `province` | ``$STRING`` |  |
| `representatives_centroid` | ``$ARRAY`` |  |
| `representatives_concordance` | ``$ARRAY`` |  |

#### Example: Load

```ts
const postal_code = await client.PostalCode().load({ id: 'postal_code_id' })
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
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const representative_set = await client.RepresentativeSet().load({ id: 'representative_set_id' })
```

#### Example: List

```ts
const representative_sets = await client.RepresentativeSet().list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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
import { RepresentOfficialsSDK } from 'represent-officials'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
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
