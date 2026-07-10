# RepresentOfficials Python SDK Reference

Complete API reference for the RepresentOfficials Python SDK.


## RepresentOfficialsSDK

### Constructor

```python
from representofficials_sdk import RepresentOfficialsSDK

client = RepresentOfficialsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
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

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BoundaryEntity

```python
boundary = client.Boundary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boundary_set_name` | `str` | No |  |
| `external_id` | `str` | No |  |
| `meta` | `dict` | No |  |
| `metadata` | `dict` | No |  |
| `name` | `str` | No |  |
| `object` | `list` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Boundary().list()
for boundary in results:
    print(boundary)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Boundary().load({"id": "boundary_id"})
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
| `domain` | `str` | No |  |
| `name` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BoundarySet().list()
for boundary_set in results:
    print(boundary_set)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BoundarySet().load({"id": "boundary_set_id"})
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
| `meta` | `dict` | No |  |
| `object` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Candidate().list()
for candidate in results:
    print(candidate)
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
| `meta` | `dict` | No |  |
| `object` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Election().list()
for election in results:
    print(election)
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
| `boundaries_centroid` | `list` | No |  |
| `boundaries_concordance` | `list` | No |  |
| `centroid` | `dict` | No |  |
| `city` | `str` | No |  |
| `code` | `str` | No |  |
| `province` | `str` | No |  |
| `representatives_centroid` | `list` | No |  |
| `representatives_concordance` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PostalCode().load({"postal_code": "postal_code"})
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
| `district_id` | `str` | No |  |
| `district_name` | `str` | Yes |  |
| `elected_office` | `str` | Yes |  |
| `email` | `str` | No |  |
| `extra` | `dict` | No |  |
| `first_name` | `str` | No |  |
| `gender` | `str` | No |  |
| `last_name` | `str` | No |  |
| `meta` | `dict` | No |  |
| `name` | `str` | Yes |  |
| `object` | `list` | No |  |
| `office` | `list` | No |  |
| `party_name` | `str` | No |  |
| `personal_url` | `str` | No |  |
| `photo_url` | `str` | No |  |
| `source_url` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Representatif().list()
for representatif in results:
    print(representatif)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Representatif().load({"id": "representatif_id"})
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
| `name` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.RepresentativeSet().list()
for representative_set in results:
    print(representative_set)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.RepresentativeSet().load({"id": "representative_set_id"})
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

