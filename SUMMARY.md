# Represent Officials API

This API provides access to information about elected officials and electoral districts in Canada. Users can find representatives based on postal codes or geographical coordinates, retrieve boundary sets, and explore details about elections and candidates.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 19 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Boundary

Results: Successful response.

SDK operations: `list`, `load`.

### BoundarySet

Results: Successful response.

SDK operations: `list`, `load`.

### Candidate

Results: Successful response.

SDK operations: `list`.

### Election

Results: Successful response.

SDK operations: `list`.

### PostalCode

Results: Successful response.

SDK operations: `load`.

Key fields to recognise:

- `boundaries_centroid`: Boundaries containing the postal code&#39;s centroid
- `boundaries_concordance`: Boundaries linked to postal code via official data
- `city`: City name
- `code`: The postal code
- `province`: Province code

### Representatif

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `district_id`: District identifier if available
- `district_name`: Name of the electoral district
- `elected_office`: Type of office (for example, MP, MLA, Mayor, Councillor, Alderman)
- `email`: Email address
- `extra`: Additional data not covered by standard fields

### RepresentativeSet

Results: Successful response.

SDK operations: `list`, `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Boundary | `list` | `GET /boundaries/` | See reference |
| Boundary | `load` | `GET /boundaries/{boundarySet}/` | See reference |
| Boundary | `load` | `GET /boundaries/{boundarySet}/{boundary}/` | See reference |
| Boundary | `load` | `GET /boundaries/{boundarySet}/{boundary}/centroid` | See reference |
| Boundary | `load` | `GET /boundaries/{boundarySet}/{boundary}/shape` | See reference |
| Boundary | `load` | `GET /boundaries/{boundarySet}/{boundary}/simple_shape` | See reference |
| Boundary | `load` | `GET /boundaries/{boundarySet}/centroid` | See reference |
| Boundary | `load` | `GET /boundaries/{boundarySet}/shape` | See reference |
| Boundary | `load` | `GET /boundaries/{boundarySet}/simple_shape` | See reference |
| BoundarySet | `list` | `GET /boundary-sets/` | See reference |
| BoundarySet | `load` | `GET /boundary-sets/{boundarySet}/` | See reference |
| Candidate | `list` | `GET /candidates/` | See reference |
| Election | `list` | `GET /elections/` | See reference |
| PostalCode | `load` | `GET /postcodes/{postalCode}/` | See reference |
| Representatif | `list` | `GET /representatives/` | See reference |
| Representatif | `list` | `GET /boundaries/{boundarySet}/{boundary}/representatives/` | See reference |
| Representatif | `load` | `GET /representatives/{representativeSet}/` | See reference |
| RepresentativeSet | `list` | `GET /representative-sets/` | See reference |
| RepresentativeSet | `load` | `GET /representative-sets/{representativeSet}/` | See reference |

## Connect to the API

- Production server: `https://represent.opennorth.ca`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `represent-officials_list`: List records for an entity. Supported entities: `boundary`, `boundary_set`, `candidate`, `election`, `representatif`, `representative_set`.
- `represent-officials_load`: Load one record for an entity. Supported entities: `boundary`, `boundary_set`, `postal_code`, `representatif`, `representative_set`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

