"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'RepresentOfficials',
        slug: "represent-officials",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://represent.opennorth.ca",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            boundary: {},
            boundary_set: {},
            candidate: {},
            election: {},
            postal_code: {},
            representatif: {},
            representative_set: {},
        }
    };
    entity = {
        "boundary": {
            "fields": [
                {
                    "name": "boundary_set_name",
                    "type": "`$STRING`"
                },
                {
                    "name": "external_id",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "objects",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "url",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "contain",
                                        "orig": "contain",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "external_id",
                                        "orig": "external_id",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "intersect",
                                        "orig": "intersect",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "set",
                                        "orig": "set",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "touch",
                                        "orig": "touch",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/",
                            "segments": [
                                {
                                    "lit": "boundaries"
                                }
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
                                    "touch"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundaries"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "contain",
                                        "orig": "contain",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "external_id",
                                        "orig": "external_id",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/{boundarySet}/",
                            "rename": {
                                "param": {
                                    "boundarySet": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundaries"
                                },
                                {
                                    "var": "id"
                                }
                            ],
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
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundaries",
                                "{id}"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "boundary",
                                        "orig": "boundary",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "boundary_set",
                                        "orig": "boundary_set",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/{boundarySet}/{boundary}/",
                            "rename": {
                                "param": {
                                    "boundarySet": "boundary_set"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundaries"
                                },
                                {
                                    "var": "boundary_set"
                                },
                                {
                                    "var": "boundary"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "boundary",
                                    "boundary_set",
                                    "callback",
                                    "format",
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.metadata`"
                            },
                            "parts": [
                                "boundaries",
                                "{boundary_set}",
                                "{boundary}"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "boundary",
                                        "orig": "boundary",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "boundary_set",
                                        "orig": "boundary_set",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/{boundarySet}/{boundary}/centroid",
                            "rename": {
                                "param": {
                                    "boundarySet": "boundary_set"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundaries"
                                },
                                {
                                    "var": "boundary_set"
                                },
                                {
                                    "var": "boundary"
                                },
                                {
                                    "lit": "centroid"
                                }
                            ],
                            "select": {
                                "$action": "centroid",
                                "exist": [
                                    "boundary",
                                    "boundary_set",
                                    "callback",
                                    "format"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundaries",
                                "{boundary_set}",
                                "{boundary}",
                                "centroid"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "boundary",
                                        "orig": "boundary",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "boundary_set",
                                        "orig": "boundary_set",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/{boundarySet}/{boundary}/shape",
                            "rename": {
                                "param": {
                                    "boundarySet": "boundary_set"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundaries"
                                },
                                {
                                    "var": "boundary_set"
                                },
                                {
                                    "var": "boundary"
                                },
                                {
                                    "lit": "shape"
                                }
                            ],
                            "select": {
                                "$action": "shape",
                                "exist": [
                                    "boundary",
                                    "boundary_set",
                                    "callback",
                                    "format"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundaries",
                                "{boundary_set}",
                                "{boundary}",
                                "shape"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "boundary",
                                        "orig": "boundary",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "boundary_set",
                                        "orig": "boundary_set",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/{boundarySet}/{boundary}/simple_shape",
                            "rename": {
                                "param": {
                                    "boundarySet": "boundary_set"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundaries"
                                },
                                {
                                    "var": "boundary_set"
                                },
                                {
                                    "var": "boundary"
                                },
                                {
                                    "lit": "simple_shape"
                                }
                            ],
                            "select": {
                                "$action": "simple_shape",
                                "exist": [
                                    "boundary",
                                    "boundary_set",
                                    "callback",
                                    "format"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundaries",
                                "{boundary_set}",
                                "{boundary}",
                                "simple_shape"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "boundary_set",
                                        "orig": "boundary_set",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/{boundarySet}/centroid",
                            "rename": {
                                "param": {
                                    "boundarySet": "boundary_set"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundaries"
                                },
                                {
                                    "var": "boundary_set"
                                },
                                {
                                    "lit": "centroid"
                                }
                            ],
                            "select": {
                                "$action": "centroid",
                                "exist": [
                                    "boundary_set",
                                    "callback",
                                    "format"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundaries",
                                "{boundary_set}",
                                "centroid"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "boundary_set",
                                        "orig": "boundary_set",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/{boundarySet}/shape",
                            "rename": {
                                "param": {
                                    "boundarySet": "boundary_set"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundaries"
                                },
                                {
                                    "var": "boundary_set"
                                },
                                {
                                    "lit": "shape"
                                }
                            ],
                            "select": {
                                "$action": "shape",
                                "exist": [
                                    "boundary_set",
                                    "callback",
                                    "format"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundaries",
                                "{boundary_set}",
                                "shape"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "boundary_set",
                                        "orig": "boundary_set",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/{boundarySet}/simple_shape",
                            "rename": {
                                "param": {
                                    "boundarySet": "boundary_set"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundaries"
                                },
                                {
                                    "var": "boundary_set"
                                },
                                {
                                    "lit": "simple_shape"
                                }
                            ],
                            "select": {
                                "$action": "simple_shape",
                                "exist": [
                                    "boundary_set",
                                    "callback",
                                    "format"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundaries",
                                "{boundary_set}",
                                "simple_shape"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "boundary"
                    ]
                ]
            }
        },
        "boundary_set": {
            "fields": [
                {
                    "name": "domain",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundary-sets/",
                            "segments": [
                                {
                                    "lit": "boundary-sets"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "callback",
                                    "domain",
                                    "format",
                                    "limit",
                                    "name",
                                    "offset",
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundary-sets"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundary-sets/{boundarySet}/",
                            "rename": {
                                "param": {
                                    "boundarySet": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundary-sets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "callback",
                                    "format",
                                    "id",
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "boundary-sets",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "candidate": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "objects",
                    "type": "`$ARRAY`"
                }
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/candidates/",
                            "segments": [
                                {
                                    "lit": "candidates"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "callback",
                                    "format",
                                    "limit",
                                    "offset",
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "candidates"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "election": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "objects",
                    "type": "`$ARRAY`"
                }
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/elections/",
                            "segments": [
                                {
                                    "lit": "elections"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "callback",
                                    "format",
                                    "limit",
                                    "offset",
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "elections"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "postal_code": {
            "fields": [
                {
                    "name": "boundaries_centroid",
                    "short": "Boundaries containing the postal code's centroid",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "boundaries_concordance",
                    "short": "Boundaries linked to postal code via official data",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "centroid",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "city",
                    "short": "City name",
                    "type": "`$STRING`"
                },
                {
                    "name": "code",
                    "short": "The postal code",
                    "type": "`$STRING`"
                },
                {
                    "name": "province",
                    "short": "Province code",
                    "type": "`$STRING`"
                },
                {
                    "name": "representatives_centroid",
                    "short": "Representatives for boundaries containing centroid",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "representatives_concordance",
                    "short": "Representatives for boundaries via concordance",
                    "type": "`$ARRAY`"
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "set",
                                        "orig": "set",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/postcodes/{postalCode}/",
                            "rename": {
                                "param": {
                                    "postalCode": "postal_code"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "postcodes"
                                },
                                {
                                    "var": "postal_code"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "callback",
                                    "format",
                                    "postal_code",
                                    "pretty",
                                    "set"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "postcodes",
                                "{postal_code}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "postcode"
                    ]
                ]
            }
        },
        "representatif": {
            "fields": [
                {
                    "name": "district_id",
                    "short": "District identifier if available",
                    "type": "`$STRING`"
                },
                {
                    "name": "district_name",
                    "req": true,
                    "short": "Name of the electoral district",
                    "type": "`$STRING`"
                },
                {
                    "name": "elected_office",
                    "req": true,
                    "short": "Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "email",
                    "short": "Email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "extra",
                    "short": "Additional data not covered by standard fields",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "first_name",
                    "short": "First name",
                    "type": "`$STRING`"
                },
                {
                    "name": "gender",
                    "short": "Gender",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "last_name",
                    "short": "Last name",
                    "type": "`$STRING`"
                },
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "name",
                    "req": true,
                    "short": "Full name of the representative",
                    "type": "`$STRING`"
                },
                {
                    "name": "objects",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "offices",
                    "short": "Contact information for representative's offices",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "party_name",
                    "short": "Political party name",
                    "type": "`$STRING`"
                },
                {
                    "name": "personal_url",
                    "short": "Personal website not on official legislature site",
                    "type": "`$STRING`"
                },
                {
                    "name": "photo_url",
                    "short": "URL to representative's photo",
                    "type": "`$STRING`"
                },
                {
                    "name": "source_url",
                    "short": "URL where the data is scraped from",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "short": "Representative's page on official legislature site",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "district",
                                        "orig": "district",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "district_name",
                                        "orig": "district_name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "elected_office",
                                        "orig": "elected_office",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "first_name",
                                        "orig": "first_name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "gender",
                                        "orig": "gender",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "last_name",
                                        "orig": "last_name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "party_name",
                                        "orig": "party_name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "point",
                                        "orig": "point",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/representatives/",
                            "segments": [
                                {
                                    "lit": "representatives"
                                }
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
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "representatives"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "boundary",
                                        "orig": "boundary",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "boundary_set",
                                        "orig": "boundary_set",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/boundaries/{boundarySet}/{boundary}/representatives/",
                            "rename": {
                                "param": {
                                    "boundarySet": "boundary_set"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "boundaries"
                                },
                                {
                                    "var": "boundary_set"
                                },
                                {
                                    "var": "boundary"
                                },
                                {
                                    "lit": "representatives"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "boundary",
                                    "boundary_set",
                                    "callback",
                                    "format",
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.objects`"
                            },
                            "parts": [
                                "boundaries",
                                "{boundary_set}",
                                "{boundary}",
                                "representatives"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "district_name",
                                        "orig": "district_name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "elected_office",
                                        "orig": "elected_office",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "first_name",
                                        "orig": "first_name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "gender",
                                        "orig": "gender",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "last_name",
                                        "orig": "last_name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "party_name",
                                        "orig": "party_name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "point",
                                        "orig": "point",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/representatives/{representativeSet}/",
                            "rename": {
                                "param": {
                                    "representativeSet": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "representatives"
                                },
                                {
                                    "var": "id"
                                }
                            ],
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
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "representatives",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "boundary"
                    ]
                ]
            }
        },
        "representative_set": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/representative-sets/",
                            "segments": [
                                {
                                    "lit": "representative-sets"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "callback",
                                    "format",
                                    "limit",
                                    "offset",
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "representative-sets"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "pretty",
                                        "orig": "pretty",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/representative-sets/{representativeSet}/",
                            "rename": {
                                "param": {
                                    "representativeSet": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "representative-sets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "callback",
                                    "format",
                                    "id",
                                    "pretty"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "representative-sets",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map