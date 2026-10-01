import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "boundary",
    "accessor": "Boundary",
    "op": "list",
    "method": "GET",
    "path": "/boundaries/",
    "args": [],
    "select": {
      "callback": "v1",
      "contain": "v1",
      "external_id": "v1",
      "format": "v1",
      "intersect": "v1",
      "limit": "v1",
      "name": "v1",
      "offset": "v1",
      "pretty": "v1",
      "set": "v1",
      "touch": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "offset",
      "sets",
      "name",
      "external_id",
      "contains",
      "touches",
      "intersects",
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "meta": {
        "next": "x",
        "previous": "x",
        "total_count": 1
      },
      "objects": [
        {
          "boundary_set_name": "x",
          "external_id": "x",
          "metadata": {},
          "name": "x",
          "url": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "boundary",
    "accessor": "Boundary",
    "op": "load",
    "method": "GET",
    "path": "/boundaries/{boundarySet}/",
    "args": [
      {
        "name": "id",
        "wire": "boundarySet",
        "value": "p1"
      }
    ],
    "select": {
      "callback": "v1",
      "contain": "v1",
      "external_id": "v1",
      "format": "v1",
      "limit": "v1",
      "name": "v1",
      "offset": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "offset",
      "name",
      "external_id",
      "contains",
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "meta": {
        "next": "x",
        "previous": "x",
        "total_count": 1
      },
      "objects": [
        {}
      ]
    },
    "idField": "id"
  },
  {
    "entity": "boundary",
    "accessor": "Boundary",
    "op": "load",
    "method": "GET",
    "path": "/boundaries/{boundarySet}/{boundary}/",
    "args": [
      {
        "name": "boundary",
        "wire": "boundary",
        "value": "p1"
      },
      {
        "name": "boundary_set",
        "wire": "boundarySet",
        "value": "p2"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "boundary_set_name": "x",
      "name": "x",
      "external_id": "x",
      "metadata": {},
      "url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "boundary",
    "accessor": "Boundary",
    "op": "load",
    "method": "GET",
    "path": "/boundaries/{boundarySet}/{boundary}/centroid",
    "action": "centroid",
    "args": [
      {
        "name": "boundary",
        "wire": "boundary",
        "value": "p1"
      },
      {
        "name": "boundary_set",
        "wire": "boundarySet",
        "value": "p2"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "boundary",
    "accessor": "Boundary",
    "op": "load",
    "method": "GET",
    "path": "/boundaries/{boundarySet}/{boundary}/shape",
    "action": "shape",
    "args": [
      {
        "name": "boundary",
        "wire": "boundary",
        "value": "p1"
      },
      {
        "name": "boundary_set",
        "wire": "boundarySet",
        "value": "p2"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "boundary",
    "accessor": "Boundary",
    "op": "load",
    "method": "GET",
    "path": "/boundaries/{boundarySet}/{boundary}/simple_shape",
    "action": "simple_shape",
    "args": [
      {
        "name": "boundary",
        "wire": "boundary",
        "value": "p1"
      },
      {
        "name": "boundary_set",
        "wire": "boundarySet",
        "value": "p2"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "boundary",
    "accessor": "Boundary",
    "op": "load",
    "method": "GET",
    "path": "/boundaries/{boundarySet}/centroid",
    "action": "centroid",
    "args": [
      {
        "name": "boundary_set",
        "wire": "boundarySet",
        "value": "p1"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "boundary",
    "accessor": "Boundary",
    "op": "load",
    "method": "GET",
    "path": "/boundaries/{boundarySet}/shape",
    "action": "shape",
    "args": [
      {
        "name": "boundary_set",
        "wire": "boundarySet",
        "value": "p1"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "boundary",
    "accessor": "Boundary",
    "op": "load",
    "method": "GET",
    "path": "/boundaries/{boundarySet}/simple_shape",
    "action": "simple_shape",
    "args": [
      {
        "name": "boundary_set",
        "wire": "boundarySet",
        "value": "p1"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "boundary_set",
    "accessor": "BoundarySet",
    "op": "list",
    "method": "GET",
    "path": "/boundary-sets/",
    "args": [],
    "select": {
      "callback": "v1",
      "domain": "v1",
      "format": "v1",
      "limit": "v1",
      "name": "v1",
      "offset": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "offset",
      "name",
      "domain",
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "meta": {
        "next": "x",
        "previous": "x",
        "total_count": 1
      },
      "objects": [
        {
          "domain": "x",
          "name": "x",
          "url": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "boundary_set",
    "accessor": "BoundarySet",
    "op": "load",
    "method": "GET",
    "path": "/boundary-sets/{boundarySet}/",
    "args": [
      {
        "name": "id",
        "wire": "boundarySet",
        "value": "p1"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "name": "x",
      "domain": "x",
      "url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "candidate",
    "accessor": "Candidate",
    "op": "list",
    "method": "GET",
    "path": "/candidates/",
    "args": [],
    "select": {
      "callback": "v1",
      "format": "v1",
      "limit": "v1",
      "offset": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "offset",
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "meta": {
        "next": "x",
        "previous": "x",
        "total_count": 1
      },
      "objects": [
        {}
      ]
    },
    "idField": "id"
  },
  {
    "entity": "election",
    "accessor": "Election",
    "op": "list",
    "method": "GET",
    "path": "/elections/",
    "args": [],
    "select": {
      "callback": "v1",
      "format": "v1",
      "limit": "v1",
      "offset": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "offset",
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "meta": {
        "next": "x",
        "previous": "x",
        "total_count": 1
      },
      "objects": [
        {}
      ]
    },
    "idField": "id"
  },
  {
    "entity": "postal_code",
    "accessor": "PostalCode",
    "op": "load",
    "method": "GET",
    "path": "/postcodes/{postalCode}/",
    "args": [
      {
        "name": "postal_code",
        "wire": "postalCode",
        "value": "p1"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1",
      "pretty": "v1",
      "set": "v1"
    },
    "headers": [],
    "query": [
      "sets",
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "code": "x",
      "city": "x",
      "province": "x",
      "centroid": {
        "type": "x",
        "coordinates": [
          1
        ]
      },
      "boundaries_centroid": [
        {}
      ],
      "boundaries_concordance": [
        {}
      ],
      "representatives_centroid": [
        {}
      ],
      "representatives_concordance": [
        {}
      ]
    },
    "idField": "id"
  },
  {
    "entity": "representative",
    "accessor": "Representative",
    "op": "list",
    "method": "GET",
    "path": "/representatives/",
    "args": [],
    "select": {
      "callback": "v1",
      "district": "v1",
      "district_name": "v1",
      "elected_office": "v1",
      "first_name": "v1",
      "format": "v1",
      "gender": "v1",
      "last_name": "v1",
      "limit": "v1",
      "name": "v1",
      "offset": "v1",
      "party_name": "v1",
      "point": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "offset",
      "point",
      "districts",
      "name",
      "first_name",
      "last_name",
      "gender",
      "district_name",
      "elected_office",
      "party_name",
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "meta": {
        "next": "x",
        "previous": "x",
        "total_count": 1
      },
      "objects": [
        {
          "district_id": "x",
          "district_name": "x",
          "elected_office": "x",
          "email": "x",
          "extra": {},
          "first_name": "x",
          "gender": "M",
          "last_name": "x",
          "name": "x",
          "offices": [
            {
              "fax": "x",
              "postal": "x",
              "tel": "x",
              "type": "x"
            }
          ],
          "party_name": "x",
          "personal_url": "x",
          "photo_url": "x",
          "source_url": "x",
          "url": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "representative",
    "accessor": "Representative",
    "op": "list",
    "method": "GET",
    "path": "/boundaries/{boundarySet}/{boundary}/representatives/",
    "args": [
      {
        "name": "boundary",
        "wire": "boundary",
        "value": "p1"
      },
      {
        "name": "boundary_set",
        "wire": "boundarySet",
        "value": "p2"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "objects": [
        {
          "district_id": "x",
          "district_name": "x",
          "elected_office": "x",
          "email": "x",
          "extra": {},
          "first_name": "x",
          "gender": "M",
          "last_name": "x",
          "name": "x",
          "offices": [
            {
              "fax": "x",
              "postal": "x",
              "tel": "x",
              "type": "x"
            }
          ],
          "party_name": "x",
          "personal_url": "x",
          "photo_url": "x",
          "source_url": "x",
          "url": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "representative",
    "accessor": "Representative",
    "op": "load",
    "method": "GET",
    "path": "/representatives/{representativeSet}/",
    "args": [
      {
        "name": "id",
        "wire": "representativeSet",
        "value": "p1"
      }
    ],
    "select": {
      "callback": "v1",
      "district_name": "v1",
      "elected_office": "v1",
      "first_name": "v1",
      "format": "v1",
      "gender": "v1",
      "last_name": "v1",
      "limit": "v1",
      "name": "v1",
      "offset": "v1",
      "party_name": "v1",
      "point": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "offset",
      "point",
      "name",
      "first_name",
      "last_name",
      "gender",
      "district_name",
      "elected_office",
      "party_name",
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "meta": {
        "next": "x",
        "previous": "x",
        "total_count": 1
      },
      "objects": [
        {
          "name": "x",
          "district_name": "x",
          "elected_office": "x",
          "source_url": "x",
          "first_name": "x",
          "last_name": "x",
          "party_name": "x",
          "email": "x",
          "url": "x",
          "photo_url": "x",
          "personal_url": "x",
          "district_id": "x",
          "gender": "M",
          "offices": [
            {
              "fax": "x",
              "postal": "x",
              "tel": "x",
              "type": "x"
            }
          ],
          "extra": {}
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "representative_set",
    "accessor": "RepresentativeSet",
    "op": "list",
    "method": "GET",
    "path": "/representative-sets/",
    "args": [],
    "select": {
      "callback": "v1",
      "format": "v1",
      "limit": "v1",
      "offset": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "limit",
      "offset",
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "meta": {
        "next": "x",
        "previous": "x",
        "total_count": 1
      },
      "objects": [
        {
          "name": "x",
          "url": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "representative_set",
    "accessor": "RepresentativeSet",
    "op": "load",
    "method": "GET",
    "path": "/representative-sets/{representativeSet}/",
    "args": [
      {
        "name": "id",
        "wire": "representativeSet",
        "value": "p1"
      }
    ],
    "select": {
      "callback": "v1",
      "format": "v1",
      "pretty": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "pretty",
      "callback"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "name": "x",
      "url": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
