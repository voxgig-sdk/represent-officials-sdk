# RepresentOfficials SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "RepresentOfficials",
            "slug": "represent-officials",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://represent.opennorth.ca",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "boundary": {},
                "boundary_set": {},
                "candidate": {},
                "election": {},
                "postal_code": {},
                "representatif": {},
                "representative_set": {},
            },
        },
        "entity": {
      "boundary": {
        "fields": [
          {
            "name": "boundary_set_name",
            "type": "`$STRING`",
          },
          {
            "name": "external_id",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "meta",
            "type": "`$OBJECT`",
          },
          {
            "name": "metadata",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "objects",
            "type": "`$ARRAY`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "boundary",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "contain",
                      "orig": "contain",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "external_id",
                      "orig": "external_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "intersect",
                      "orig": "intersect",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "set",
                      "orig": "set",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "touch",
                      "orig": "touch",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/",
                "parts": [
                  "boundaries",
                ],
                "select": {
                  "exist": [
                    "callback",
                    "contain",
                    "external_id",
                    "format",
                    "intersect",
                    "limit",
                    "name",
                    "offset",
                    "pretty",
                    "set",
                    "touch",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "contain",
                      "orig": "contain",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "external_id",
                      "orig": "external_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/{boundarySet}/",
                "parts": [
                  "boundaries",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "id",
                  },
                },
                "select": {
                  "exist": [
                    "callback",
                    "contain",
                    "external_id",
                    "format",
                    "id",
                    "limit",
                    "name",
                    "offset",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "boundary",
                      "orig": "boundary",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "boundary_set",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/{boundarySet}/{boundary}/",
                "parts": [
                  "boundaries",
                  "{boundary_set}",
                  "{boundary}",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "boundary_set",
                  },
                },
                "select": {
                  "exist": [
                    "boundary",
                    "boundary_set",
                    "callback",
                    "format",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.metadata`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "boundary",
                      "orig": "boundary",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "boundary_set",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/{boundarySet}/{boundary}/centroid",
                "parts": [
                  "boundaries",
                  "{boundary_set}",
                  "{boundary}",
                  "centroid",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "boundary_set",
                  },
                },
                "select": {
                  "$action": "centroid",
                  "exist": [
                    "boundary",
                    "boundary_set",
                    "callback",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "boundary",
                      "orig": "boundary",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "boundary_set",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/{boundarySet}/{boundary}/shape",
                "parts": [
                  "boundaries",
                  "{boundary_set}",
                  "{boundary}",
                  "shape",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "boundary_set",
                  },
                },
                "select": {
                  "$action": "shape",
                  "exist": [
                    "boundary",
                    "boundary_set",
                    "callback",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "boundary",
                      "orig": "boundary",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "boundary_set",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/{boundarySet}/{boundary}/simple_shape",
                "parts": [
                  "boundaries",
                  "{boundary_set}",
                  "{boundary}",
                  "simple_shape",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "boundary_set",
                  },
                },
                "select": {
                  "$action": "simple_shape",
                  "exist": [
                    "boundary",
                    "boundary_set",
                    "callback",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "boundary_set",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/{boundarySet}/centroid",
                "parts": [
                  "boundaries",
                  "{boundary_set}",
                  "centroid",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "boundary_set",
                  },
                },
                "select": {
                  "$action": "centroid",
                  "exist": [
                    "boundary_set",
                    "callback",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "boundary_set",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/{boundarySet}/shape",
                "parts": [
                  "boundaries",
                  "{boundary_set}",
                  "shape",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "boundary_set",
                  },
                },
                "select": {
                  "$action": "shape",
                  "exist": [
                    "boundary_set",
                    "callback",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "boundary_set",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/{boundarySet}/simple_shape",
                "parts": [
                  "boundaries",
                  "{boundary_set}",
                  "simple_shape",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "boundary_set",
                  },
                },
                "select": {
                  "$action": "simple_shape",
                  "exist": [
                    "boundary_set",
                    "callback",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "boundary",
            ],
          ],
        },
      },
      "boundary_set": {
        "fields": [
          {
            "name": "domain",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "boundary_set",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundary-sets/",
                "parts": [
                  "boundary-sets",
                ],
                "select": {
                  "exist": [
                    "callback",
                    "domain",
                    "format",
                    "limit",
                    "name",
                    "offset",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundary-sets/{boundarySet}/",
                "parts": [
                  "boundary-sets",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "id",
                  },
                },
                "select": {
                  "exist": [
                    "callback",
                    "format",
                    "id",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "candidate": {
        "fields": [
          {
            "name": "meta",
            "type": "`$OBJECT`",
          },
          {
            "name": "objects",
            "type": "`$ARRAY`",
          },
        ],
        "name": "candidate",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/candidates/",
                "parts": [
                  "candidates",
                ],
                "select": {
                  "exist": [
                    "callback",
                    "format",
                    "limit",
                    "offset",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "election": {
        "fields": [
          {
            "name": "meta",
            "type": "`$OBJECT`",
          },
          {
            "name": "objects",
            "type": "`$ARRAY`",
          },
        ],
        "name": "election",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/elections/",
                "parts": [
                  "elections",
                ],
                "select": {
                  "exist": [
                    "callback",
                    "format",
                    "limit",
                    "offset",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "postal_code": {
        "fields": [
          {
            "name": "boundaries_centroid",
            "short": "Boundaries containing the postal code's centroid",
            "type": "`$ARRAY`",
          },
          {
            "name": "boundaries_concordance",
            "short": "Boundaries linked to postal code via official data",
            "type": "`$ARRAY`",
          },
          {
            "name": "centroid",
            "type": "`$OBJECT`",
          },
          {
            "name": "city",
            "short": "City name",
            "type": "`$STRING`",
          },
          {
            "name": "code",
            "short": "The postal code",
            "type": "`$STRING`",
          },
          {
            "name": "province",
            "short": "Province code",
            "type": "`$STRING`",
          },
          {
            "name": "representatives_centroid",
            "short": "Representatives for boundaries containing centroid",
            "type": "`$ARRAY`",
          },
          {
            "name": "representatives_concordance",
            "short": "Representatives for boundaries via concordance",
            "type": "`$ARRAY`",
          },
        ],
        "name": "postal_code",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "postal_code",
                      "orig": "postal_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "set",
                      "orig": "set",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/postcodes/{postalCode}/",
                "parts": [
                  "postcodes",
                  "{postal_code}",
                ],
                "rename": {
                  "param": {
                    "postalCode": "postal_code",
                  },
                },
                "select": {
                  "exist": [
                    "callback",
                    "format",
                    "postal_code",
                    "pretty",
                    "set",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "postcode",
            ],
          ],
        },
      },
      "representatif": {
        "fields": [
          {
            "name": "district_id",
            "short": "District identifier if available",
            "type": "`$STRING`",
          },
          {
            "name": "district_name",
            "req": True,
            "short": "Name of the electoral district",
            "type": "`$STRING`",
          },
          {
            "name": "elected_office",
            "req": True,
            "short": "Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "short": "Email address",
            "type": "`$STRING`",
          },
          {
            "name": "extra",
            "short": "Additional data not covered by standard fields",
            "type": "`$OBJECT`",
          },
          {
            "name": "first_name",
            "short": "First name",
            "type": "`$STRING`",
          },
          {
            "name": "gender",
            "short": "Gender",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "last_name",
            "short": "Last name",
            "type": "`$STRING`",
          },
          {
            "name": "meta",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Full name of the representative",
            "type": "`$STRING`",
          },
          {
            "name": "objects",
            "type": "`$ARRAY`",
          },
          {
            "name": "offices",
            "short": "Contact information for representative's offices",
            "type": "`$ARRAY`",
          },
          {
            "name": "party_name",
            "short": "Political party name",
            "type": "`$STRING`",
          },
          {
            "name": "personal_url",
            "short": "Personal website not on official legislature site",
            "type": "`$STRING`",
          },
          {
            "name": "photo_url",
            "short": "URL to representative's photo",
            "type": "`$STRING`",
          },
          {
            "name": "source_url",
            "short": "URL where the data is scraped from",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "short": "Representative's page on official legislature site",
            "type": "`$STRING`",
          },
        ],
        "name": "representatif",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "district",
                      "orig": "district",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "district_name",
                      "orig": "district_name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "elected_office",
                      "orig": "elected_office",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "first_name",
                      "orig": "first_name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "gender",
                      "orig": "gender",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "last_name",
                      "orig": "last_name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "party_name",
                      "orig": "party_name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "point",
                      "orig": "point",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/representatives/",
                "parts": [
                  "representatives",
                ],
                "select": {
                  "exist": [
                    "callback",
                    "district",
                    "district_name",
                    "elected_office",
                    "first_name",
                    "format",
                    "gender",
                    "last_name",
                    "limit",
                    "name",
                    "offset",
                    "party_name",
                    "point",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "boundary",
                      "orig": "boundary",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "boundary_set",
                      "orig": "boundary_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boundaries/{boundarySet}/{boundary}/representatives/",
                "parts": [
                  "boundaries",
                  "{boundary_set}",
                  "{boundary}",
                  "representatives",
                ],
                "rename": {
                  "param": {
                    "boundarySet": "boundary_set",
                  },
                },
                "select": {
                  "exist": [
                    "boundary",
                    "boundary_set",
                    "callback",
                    "format",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.objects`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "representative_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "district_name",
                      "orig": "district_name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "elected_office",
                      "orig": "elected_office",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "first_name",
                      "orig": "first_name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "gender",
                      "orig": "gender",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "last_name",
                      "orig": "last_name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "party_name",
                      "orig": "party_name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "point",
                      "orig": "point",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/representatives/{representativeSet}/",
                "parts": [
                  "representatives",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "representativeSet": "id",
                  },
                },
                "select": {
                  "exist": [
                    "callback",
                    "district_name",
                    "elected_office",
                    "first_name",
                    "format",
                    "gender",
                    "id",
                    "last_name",
                    "limit",
                    "name",
                    "offset",
                    "party_name",
                    "point",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "boundary",
            ],
          ],
        },
      },
      "representative_set": {
        "fields": [
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "representative_set",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/representative-sets/",
                "parts": [
                  "representative-sets",
                ],
                "select": {
                  "exist": [
                    "callback",
                    "format",
                    "limit",
                    "offset",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "representative_set",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "pretty",
                      "orig": "pretty",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/representative-sets/{representativeSet}/",
                "parts": [
                  "representative-sets",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "representativeSet": "id",
                  },
                },
                "select": {
                  "exist": [
                    "callback",
                    "format",
                    "id",
                    "pretty",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
