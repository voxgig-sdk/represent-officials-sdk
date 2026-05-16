# RepresentOfficials Python SDK Reference

Complete API reference for the RepresentOfficials Python SDK.


## RepresentOfficialsSDK

### Constructor

```python
from represent-officials_sdk import RepresentOfficialsSDK

client = RepresentOfficialsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RepresentOfficialsSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = RepresentOfficialsSDK.test()
```


### Instance Methods

#### `Boundary(data=None)`

Create a new `BoundaryEntity` instance. Pass `None` for no initial data.

#### `BoundarySet(data=None)`

Create a new `BoundarySetEntity` instance. Pass `None` for no initial data.

#### `Candidate(data=None)`

Create a new `CandidateEntity` instance. Pass `None` for no initial data.

#### `Election(data=None)`

Create a new `ElectionEntity` instance. Pass `None` for no initial data.

#### `PostalCode(data=None)`

Create a new `PostalCodeEntity` instance. Pass `None` for no initial data.

#### `Representatif(data=None)`

Create a new `RepresentatifEntity` instance. Pass `None` for no initial data.

#### `RepresentativeSet(data=None)`

Create a new `RepresentativeSetEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## BoundaryEntity

```python
boundary = client.Boundary()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Boundary().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Boundary().load({"id": "boundary_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoundaryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BoundarySetEntity

```python
boundary_set = client.BoundarySet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.BoundarySet().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.BoundarySet().load({"id": "boundary_set_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoundarySetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CandidateEntity

```python
candidate = client.Candidate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | ``$OBJECT`` | No |  |
| `object` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Candidate().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CandidateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ElectionEntity

```python
election = client.Election()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | ``$OBJECT`` | No |  |
| `object` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Election().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ElectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PostalCodeEntity

```python
postal_code = client.PostalCode()
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.PostalCode().load({"id": "postal_code_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PostalCodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RepresentatifEntity

```python
representatif = client.Representatif()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Representatif().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Representatif().load({"id": "representatif_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RepresentatifEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RepresentativeSetEntity

```python
representative_set = client.RepresentativeSet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.RepresentativeSet().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.RepresentativeSet().load({"id": "representative_set_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RepresentativeSetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = RepresentOfficialsSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

