package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "RepresentOfficials",
			"slug": "represent-officials",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://represent.opennorth.ca",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"boundary": map[string]any{},
				"boundary_set": map[string]any{},
				"candidate": map[string]any{},
				"election": map[string]any{},
				"postal_code": map[string]any{},
				"representatif": map[string]any{},
				"representative_set": map[string]any{},
			},
		},
		"entity": map[string]any{
			"boundary": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "boundary_set_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "external_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objects",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "boundary",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "contain",
											"orig": "contain",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "external_id",
											"orig": "external_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "intersect",
											"orig": "intersect",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "set",
											"orig": "set",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "touch",
											"orig": "touch",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/",
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundaries",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "contain",
											"orig": "contain",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "external_id",
											"orig": "external_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"contain",
										"external_id",
										"format",
										"id",
										"limit",
										"name",
										"offset",
										"pretty",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundaries",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "boundary",
											"orig": "boundary",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "boundary_set",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "boundary_set",
									},
									map[string]any{
										"var": "boundary",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"boundary",
										"boundary_set",
										"callback",
										"format",
										"pretty",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.metadata`",
								},
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "boundary",
											"orig": "boundary",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "boundary_set",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/centroid",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "boundary_set",
									},
									map[string]any{
										"var": "boundary",
									},
									map[string]any{
										"lit": "centroid",
									},
								},
								"select": map[string]any{
									"$action": "centroid",
									"exist": []any{
										"boundary",
										"boundary_set",
										"callback",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
									"centroid",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "boundary",
											"orig": "boundary",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "boundary_set",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/shape",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "boundary_set",
									},
									map[string]any{
										"var": "boundary",
									},
									map[string]any{
										"lit": "shape",
									},
								},
								"select": map[string]any{
									"$action": "shape",
									"exist": []any{
										"boundary",
										"boundary_set",
										"callback",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
									"shape",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "boundary",
											"orig": "boundary",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "boundary_set",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/simple_shape",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "boundary_set",
									},
									map[string]any{
										"var": "boundary",
									},
									map[string]any{
										"lit": "simple_shape",
									},
								},
								"select": map[string]any{
									"$action": "simple_shape",
									"exist": []any{
										"boundary",
										"boundary_set",
										"callback",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
									"simple_shape",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "boundary_set",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/centroid",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "boundary_set",
									},
									map[string]any{
										"lit": "centroid",
									},
								},
								"select": map[string]any{
									"$action": "centroid",
									"exist": []any{
										"boundary_set",
										"callback",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"centroid",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "boundary_set",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/shape",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "boundary_set",
									},
									map[string]any{
										"lit": "shape",
									},
								},
								"select": map[string]any{
									"$action": "shape",
									"exist": []any{
										"boundary_set",
										"callback",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"shape",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "boundary_set",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/simple_shape",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "boundary_set",
									},
									map[string]any{
										"lit": "simple_shape",
									},
								},
								"select": map[string]any{
									"$action": "simple_shape",
									"exist": []any{
										"boundary_set",
										"callback",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"simple_shape",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"boundary",
						},
					},
				},
			},
			"boundary_set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "boundary_set",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundary-sets/",
								"segments": []any{
									map[string]any{
										"lit": "boundary-sets",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"domain",
										"format",
										"limit",
										"name",
										"offset",
										"pretty",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundary-sets",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundary-sets/{boundarySet}/",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundary-sets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"format",
										"id",
										"pretty",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boundary-sets",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"candidate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "objects",
						"type": "`$ARRAY`",
					},
				},
				"name": "candidate",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/candidates/",
								"segments": []any{
									map[string]any{
										"lit": "candidates",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"format",
										"limit",
										"offset",
										"pretty",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"candidates",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"election": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "objects",
						"type": "`$ARRAY`",
					},
				},
				"name": "election",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/elections/",
								"segments": []any{
									map[string]any{
										"lit": "elections",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"format",
										"limit",
										"offset",
										"pretty",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"elections",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"postal_code": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "boundaries_centroid",
						"short": "Boundaries containing the postal code's centroid",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "boundaries_concordance",
						"short": "Boundaries linked to postal code via official data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "centroid",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "city",
						"short": "City name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"short": "The postal code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "province",
						"short": "Province code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "representatives_centroid",
						"short": "Representatives for boundaries containing centroid",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "representatives_concordance",
						"short": "Representatives for boundaries via concordance",
						"type": "`$ARRAY`",
					},
				},
				"name": "postal_code",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "postal_code",
											"orig": "postal_code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "set",
											"orig": "set",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/postcodes/{postalCode}/",
								"rename": map[string]any{
									"param": map[string]any{
										"postalCode": "postal_code",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "postcodes",
									},
									map[string]any{
										"var": "postal_code",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"format",
										"postal_code",
										"pretty",
										"set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"postcodes",
									"{postal_code}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"postcode",
						},
					},
				},
			},
			"representatif": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "district_id",
						"short": "District identifier if available",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "district_name",
						"req": true,
						"short": "Name of the electoral district",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elected_office",
						"req": true,
						"short": "Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "email",
						"short": "Email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "extra",
						"short": "Additional data not covered by standard fields",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "first_name",
						"short": "First name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gender",
						"short": "Gender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_name",
						"short": "Last name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Full name of the representative",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objects",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "offices",
						"short": "Contact information for representative's offices",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "party_name",
						"short": "Political party name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "personal_url",
						"short": "Personal website not on official legislature site",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photo_url",
						"short": "URL to representative's photo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_url",
						"short": "URL where the data is scraped from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "Representative's page on official legislature site",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "representatif",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "district",
											"orig": "district",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "district_name",
											"orig": "district_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "elected_office",
											"orig": "elected_office",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "first_name",
											"orig": "first_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "gender",
											"orig": "gender",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "last_name",
											"orig": "last_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "party_name",
											"orig": "party_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "point",
											"orig": "point",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/representatives/",
								"segments": []any{
									map[string]any{
										"lit": "representatives",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"representatives",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "boundary",
											"orig": "boundary",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "boundary_set",
											"orig": "boundary_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/representatives/",
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "boundary_set",
									},
									map[string]any{
										"var": "boundary",
									},
									map[string]any{
										"lit": "representatives",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"boundary",
										"boundary_set",
										"callback",
										"format",
										"pretty",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.objects`",
								},
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
									"representatives",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "representative_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "district_name",
											"orig": "district_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "elected_office",
											"orig": "elected_office",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "first_name",
											"orig": "first_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "gender",
											"orig": "gender",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "last_name",
											"orig": "last_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "party_name",
											"orig": "party_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "point",
											"orig": "point",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/representatives/{representativeSet}/",
								"rename": map[string]any{
									"param": map[string]any{
										"representativeSet": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "representatives",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"representatives",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"boundary",
						},
					},
				},
			},
			"representative_set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "representative_set",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/representative-sets/",
								"segments": []any{
									map[string]any{
										"lit": "representative-sets",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"format",
										"limit",
										"offset",
										"pretty",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"representative-sets",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "representative_set",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/representative-sets/{representativeSet}/",
								"rename": map[string]any{
									"param": map[string]any{
										"representativeSet": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "representative-sets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"format",
										"id",
										"pretty",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"representative-sets",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
