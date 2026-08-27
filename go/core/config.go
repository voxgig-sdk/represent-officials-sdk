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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
								"parts": []any{
									"boundaries",
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
								"parts": []any{
									"boundaries",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "id",
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
								"parts": []any{
									"boundary-sets",
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
								"parts": []any{
									"boundary-sets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boundarySet": "id",
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
								"parts": []any{
									"candidates",
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
								"parts": []any{
									"elections",
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
								"parts": []any{
									"postcodes",
									"{postal_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"postalCode": "postal_code",
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
								"parts": []any{
									"representatives",
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
								"parts": []any{
									"representatives",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"representativeSet": "id",
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
								"parts": []any{
									"representative-sets",
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
								"parts": []any{
									"representative-sets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"representativeSet": "id",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
