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
				"representative": map[string]any{},
				"representative_set": map[string]any{},
			},
		},
		"entity": map[string]any{
			"boundary": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "boundary_set_name",
						"title": "Boundary Set Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "external_id",
						"title": "External Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objects",
						"title": "Objects",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
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
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/",
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
								},
								"parts": []any{
									"boundaries",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "contain",
											"orig": "contain",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "external_id",
											"orig": "external_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "intersect",
											"orig": "intersect",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "set",
											"orig": "set",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "touch",
											"orig": "touch",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/",
								"segments": []any{
									map[string]any{
										"lit": "boundaries",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"boundaries",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "contain",
											"orig": "contain",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "external_id",
											"orig": "external_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/",
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
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.metadata`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "boundary",
											"orig": "boundary",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "boundary_set",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/centroid",
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
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
									"centroid",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "boundary",
											"orig": "boundary",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "boundary_set",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/shape",
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
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
									"shape",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "boundary",
											"orig": "boundary",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "boundary_set",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/simple_shape",
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
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
									"simple_shape",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "boundary",
											"orig": "boundary",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "boundary_set",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/centroid",
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
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"centroid",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "boundary_set",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/shape",
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
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"shape",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "boundary_set",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/simple_shape",
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
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"simple_shape",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "boundary_set",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"boundary_set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
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
								"kind": "http",
								"method": "GET",
								"orig": "/boundary-sets/",
								"segments": []any{
									map[string]any{
										"lit": "boundary-sets",
									},
								},
								"parts": []any{
									"boundary-sets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundary-sets/{boundarySet}/",
								"segments": []any{
									map[string]any{
										"lit": "boundary-sets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"boundary-sets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
						"title": "Meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "objects",
						"title": "Objects",
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
								"kind": "http",
								"method": "GET",
								"orig": "/candidates/",
								"segments": []any{
									map[string]any{
										"lit": "candidates",
									},
								},
								"parts": []any{
									"candidates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
						"title": "Meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "objects",
						"title": "Objects",
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
								"kind": "http",
								"method": "GET",
								"orig": "/elections/",
								"segments": []any{
									map[string]any{
										"lit": "elections",
									},
								},
								"parts": []any{
									"elections",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
						"title": "Boundaries Centroid",
						"type": "`$ARRAY`",
						"short": "Boundaries containing the postal code's centroid",
					},
					map[string]any{
						"name": "boundaries_concordance",
						"title": "Boundaries Concordance",
						"type": "`$ARRAY`",
						"short": "Boundaries linked to postal code via official data",
					},
					map[string]any{
						"name": "centroid",
						"title": "Centroid",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"short": "City name",
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"short": "The postal code",
					},
					map[string]any{
						"name": "province",
						"title": "Province",
						"type": "`$STRING`",
						"short": "Province code",
					},
					map[string]any{
						"name": "representatives_centroid",
						"title": "Representatives Centroid",
						"type": "`$ARRAY`",
						"short": "Representatives for boundaries containing centroid",
					},
					map[string]any{
						"name": "representatives_concordance",
						"title": "Representatives Concordance",
						"type": "`$ARRAY`",
						"short": "Representatives for boundaries via concordance",
					},
				},
				"name": "postal_code",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/postcodes/{postalCode}/",
								"segments": []any{
									map[string]any{
										"lit": "postcodes",
									},
									map[string]any{
										"var": "postal_code",
									},
								},
								"parts": []any{
									"postcodes",
									"{postal_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"postalCode": "postal_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "postal_code",
											"orig": "postal_code",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "set",
											"orig": "set",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"representative": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "district_id",
						"title": "District Id",
						"type": "`$STRING`",
						"short": "District identifier if available",
					},
					map[string]any{
						"name": "district_name",
						"title": "District Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the electoral district",
					},
					map[string]any{
						"name": "elected_office",
						"title": "Elected Office",
						"type": "`$STRING`",
						"req": true,
						"short": "Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "Email address",
						"format": "email",
					},
					map[string]any{
						"name": "extra",
						"title": "Extra",
						"type": "`$OBJECT`",
						"short": "Additional data not covered by standard fields",
					},
					map[string]any{
						"name": "first_name",
						"title": "First Name",
						"type": "`$STRING`",
						"short": "First name",
					},
					map[string]any{
						"name": "gender",
						"title": "Gender",
						"type": "`$STRING`",
						"short": "Gender",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_name",
						"title": "Last Name",
						"type": "`$STRING`",
						"short": "Last name",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Full name of the representative",
					},
					map[string]any{
						"name": "objects",
						"title": "Objects",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "offices",
						"title": "Offices",
						"type": "`$ARRAY`",
						"short": "Contact information for representative's offices",
					},
					map[string]any{
						"name": "party_name",
						"title": "Party Name",
						"type": "`$STRING`",
						"short": "Political party name",
					},
					map[string]any{
						"name": "personal_url",
						"title": "Personal Url",
						"type": "`$STRING`",
						"short": "Personal website not on official legislature site",
					},
					map[string]any{
						"name": "photo_url",
						"title": "Photo Url",
						"type": "`$STRING`",
						"short": "URL to representative's photo",
					},
					map[string]any{
						"name": "source_url",
						"title": "Source Url",
						"type": "`$STRING`",
						"short": "URL where the data is scraped from",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "Representative's page on official legislature site",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "representative",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/representatives/",
								"segments": []any{
									map[string]any{
										"lit": "representatives",
									},
								},
								"parts": []any{
									"representatives",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "district",
											"orig": "district",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "district_name",
											"orig": "district_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "elected_office",
											"orig": "elected_office",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "first_name",
											"orig": "first_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "gender",
											"orig": "gender",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "last_name",
											"orig": "last_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "party_name",
											"orig": "party_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "point",
											"orig": "point",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/boundaries/{boundarySet}/{boundary}/representatives/",
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
								"parts": []any{
									"boundaries",
									"{boundary_set}",
									"{boundary}",
									"representatives",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "boundary_set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.objects`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "boundary",
											"orig": "boundary",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "boundary_set",
											"orig": "boundary_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/representatives/{representativeSet}/",
								"segments": []any{
									map[string]any{
										"lit": "representatives",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"representatives",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"representativeSet": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "representative_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "district_name",
											"orig": "district_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "elected_office",
											"orig": "elected_office",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "first_name",
											"orig": "first_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "gender",
											"orig": "gender",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "last_name",
											"orig": "last_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "party_name",
											"orig": "party_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "point",
											"orig": "point",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.boundary",
						},
					},
				},
			},
			"representative_set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
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
								"kind": "http",
								"method": "GET",
								"orig": "/representative-sets/",
								"segments": []any{
									map[string]any{
										"lit": "representative-sets",
									},
								},
								"parts": []any{
									"representative-sets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/representative-sets/{representativeSet}/",
								"segments": []any{
									map[string]any{
										"lit": "representative-sets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"representative-sets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"representativeSet": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "representative_set",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "pretty",
											"orig": "pretty",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
