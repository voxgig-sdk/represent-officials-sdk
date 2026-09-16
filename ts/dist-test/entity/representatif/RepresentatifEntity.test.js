"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RepresentatifEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when REPRESENT_OFFICIALS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('REPRESENT_OFFICIALS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RepresentOfficialsSDK.test();
        const ent = testsdk.Representatif();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.REPRESENT_OFFICIALS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'representatif.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "district_id", "req": false, "short": "District identifier if available", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "district_name", "req": true, "short": "Name of the electoral district", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "elected_office", "req": true, "short": "Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "email", "name": "email", "req": false, "short": "Email address", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "extra", "req": false, "short": "Additional data not covered by standard fields", "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "first_name", "req": false, "short": "First name", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "gender", "req": false, "short": "Gender", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "last_name", "req": false, "short": "Last name", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "meta", "req": false, "type": "`$OBJECT`", "index$": 9 }, { "active": true, "name": "name", "req": true, "short": "Full name of the representative", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "objects", "req": false, "type": "`$ARRAY`", "index$": 11 }, { "active": true, "name": "offices", "req": false, "short": "Contact information for representative's offices", "type": "`$ARRAY`", "index$": 12 }, { "active": true, "name": "party_name", "req": false, "short": "Political party name", "type": "`$STRING`", "index$": 13 }, { "active": true, "name": "personal_url", "req": false, "short": "Personal website not on official legislature site", "type": "`$STRING`", "index$": 14 }, { "active": true, "name": "photo_url", "req": false, "short": "URL to representative's photo", "type": "`$STRING`", "index$": 15 }, { "active": true, "name": "source_url", "req": false, "short": "URL where the data is scraped from", "type": "`$STRING`", "index$": 16 }, { "active": true, "name": "url", "req": false, "short": "Representative's page on official legislature site", "type": "`$STRING`", "index$": 17 }], "id": { "field": "id", "name": "id" }, "name": "representatif", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "callback", "orig": "callback", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "district", "orig": "district", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "district_name", "orig": "district_name", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "elected_office", "orig": "elected_office", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "kind": "query", "name": "first_name", "orig": "first_name", "reqd": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "kind": "query", "name": "gender", "orig": "gender", "reqd": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "kind": "query", "name": "last_name", "orig": "last_name", "reqd": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 8 }, { "active": true, "kind": "query", "name": "name", "orig": "name", "reqd": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 10 }, { "active": true, "kind": "query", "name": "party_name", "orig": "party_name", "reqd": false, "type": "`$STRING`", "index$": 11 }, { "active": true, "kind": "query", "name": "point", "orig": "point", "reqd": false, "type": "`$STRING`", "index$": 12 }, { "active": true, "kind": "query", "name": "pretty", "orig": "pretty", "reqd": false, "type": "`$INTEGER`", "index$": 13 }] }, "contract": { "id": "GET /representatives/", "json": "{\"operationId\":\"getRepresentatives\",\"parameters\":[{\"description\":\"Number of results per page (default: 20)\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Find representatives by latitude,longitude (e.g., 45.524,-73.596)\",\"in\":\"query\",\"name\":\"point\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by districts (comma-separated)\",\"in\":\"query\",\"name\":\"districts\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by representative name\",\"in\":\"query\",\"name\":\"name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by first name\",\"in\":\"query\",\"name\":\"first_name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by last name\",\"in\":\"query\",\"name\":\"last_name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by gender (M or F)\",\"in\":\"query\",\"name\":\"gender\",\"schema\":{\"enum\":[\"M\",\"F\"],\"type\":\"string\"}},{\"description\":\"Filter by district name\",\"in\":\"query\",\"name\":\"district_name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by elected office (e.g., MP, MLA, Mayor, Councillor)\",\"in\":\"query\",\"name\":\"elected_office\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by party name\",\"in\":\"query\",\"name\":\"party_name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meta\":{\"properties\":{\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"total_count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"objects\":{\"items\":{\"properties\":{\"district_id\":{\"description\":\"District identifier if available\",\"type\":\"string\"},\"district_name\":{\"description\":\"Name of the electoral district\",\"type\":\"string\"},\"elected_office\":{\"description\":\"Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"format\":\"email\",\"type\":\"string\"},\"extra\":{\"description\":\"Additional data not covered by standard fields\",\"type\":\"object\"},\"first_name\":{\"description\":\"First name\",\"type\":\"string\"},\"gender\":{\"description\":\"Gender\",\"enum\":[\"M\",\"F\"],\"type\":\"string\"},\"last_name\":{\"description\":\"Last name\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the representative\",\"type\":\"string\"},\"offices\":{\"description\":\"Contact information for representative's offices\",\"items\":{\"properties\":{\"fax\":{\"description\":\"Fax number\",\"type\":\"string\"},\"postal\":{\"description\":\"Mailing address\",\"type\":\"string\"},\"tel\":{\"description\":\"Telephone number\",\"type\":\"string\"},\"type\":{\"description\":\"Office type (e.g., constituency, legislature)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"party_name\":{\"description\":\"Political party name\",\"type\":\"string\"},\"personal_url\":{\"description\":\"Personal website not on official legislature site\",\"type\":\"string\"},\"photo_url\":{\"description\":\"URL to representative's photo\",\"type\":\"string\"},\"source_url\":{\"description\":\"URL where the data is scraped from\",\"type\":\"string\"},\"url\":{\"description\":\"Representative's page on official legislature site\",\"type\":\"string\"}},\"required\":[\"name\",\"district_name\",\"elected_office\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/representatives/", "segments": [{ "lit": "representatives" }], "select": { "exist": ["callback", "district", "district_name", "elected_office", "first_name", "format", "gender", "last_name", "limit", "name", "offset", "party_name", "point", "pretty"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "boundary", "orig": "boundary", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "boundary_set", "orig": "boundary_set", "reqd": true, "type": "`$STRING`", "index$": 1 }], "query": [{ "active": true, "kind": "query", "name": "callback", "orig": "callback", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "pretty", "orig": "pretty", "reqd": false, "type": "`$INTEGER`", "index$": 2 }] }, "contract": { "id": "GET /boundaries/{boundarySet}/{boundary}/representatives/", "json": "{\"operationId\":\"getBoundaryRepresentatives\",\"parameters\":[{\"description\":\"Boundary set identifier\",\"in\":\"path\",\"name\":\"boundarySet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Boundary identifier\",\"in\":\"path\",\"name\":\"boundary\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"objects\":{\"items\":{\"properties\":{\"district_id\":{\"description\":\"District identifier if available\",\"type\":\"string\"},\"district_name\":{\"description\":\"Name of the electoral district\",\"type\":\"string\"},\"elected_office\":{\"description\":\"Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"format\":\"email\",\"type\":\"string\"},\"extra\":{\"description\":\"Additional data not covered by standard fields\",\"type\":\"object\"},\"first_name\":{\"description\":\"First name\",\"type\":\"string\"},\"gender\":{\"description\":\"Gender\",\"enum\":[\"M\",\"F\"],\"type\":\"string\"},\"last_name\":{\"description\":\"Last name\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the representative\",\"type\":\"string\"},\"offices\":{\"description\":\"Contact information for representative's offices\",\"items\":{\"properties\":{\"fax\":{\"description\":\"Fax number\",\"type\":\"string\"},\"postal\":{\"description\":\"Mailing address\",\"type\":\"string\"},\"tel\":{\"description\":\"Telephone number\",\"type\":\"string\"},\"type\":{\"description\":\"Office type (e.g., constituency, legislature)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"party_name\":{\"description\":\"Political party name\",\"type\":\"string\"},\"personal_url\":{\"description\":\"Personal website not on official legislature site\",\"type\":\"string\"},\"photo_url\":{\"description\":\"URL to representative's photo\",\"type\":\"string\"},\"source_url\":{\"description\":\"URL where the data is scraped from\",\"type\":\"string\"},\"url\":{\"description\":\"Representative's page on official legislature site\",\"type\":\"string\"}},\"required\":[\"name\",\"district_name\",\"elected_office\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/boundaries/{boundarySet}/{boundary}/representatives/", "rename": { "param": { "boundarySet": "boundary_set" } }, "segments": [{ "lit": "boundaries" }, { "var": "boundary_set" }, { "var": "boundary" }, { "lit": "representatives" }], "select": { "exist": ["boundary", "boundary_set", "callback", "format", "pretty"] }, "transform": { "req": "`reqdata`", "res": "`body.objects`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "representative_set", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "callback", "orig": "callback", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "district_name", "orig": "district_name", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "elected_office", "orig": "elected_office", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "first_name", "orig": "first_name", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "kind": "query", "name": "gender", "orig": "gender", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "kind": "query", "name": "last_name", "orig": "last_name", "reqd": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 7 }, { "active": true, "kind": "query", "name": "name", "orig": "name", "reqd": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 9 }, { "active": true, "kind": "query", "name": "party_name", "orig": "party_name", "reqd": false, "type": "`$STRING`", "index$": 10 }, { "active": true, "kind": "query", "name": "point", "orig": "point", "reqd": false, "type": "`$STRING`", "index$": 11 }, { "active": true, "kind": "query", "name": "pretty", "orig": "pretty", "reqd": false, "type": "`$INTEGER`", "index$": 12 }] }, "contract": { "id": "GET /representatives/{representativeSet}/", "json": "{\"operationId\":\"getRepresentativesFromSet\",\"parameters\":[{\"description\":\"Representative set identifier (e.g., house-of-commons)\",\"in\":\"path\",\"name\":\"representativeSet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Find representatives by latitude,longitude\",\"in\":\"query\",\"name\":\"point\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by representative name\",\"in\":\"query\",\"name\":\"name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by first name\",\"in\":\"query\",\"name\":\"first_name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by last name\",\"in\":\"query\",\"name\":\"last_name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by gender\",\"in\":\"query\",\"name\":\"gender\",\"schema\":{\"enum\":[\"M\",\"F\"],\"type\":\"string\"}},{\"description\":\"Filter by district name\",\"in\":\"query\",\"name\":\"district_name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by elected office\",\"in\":\"query\",\"name\":\"elected_office\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by party name\",\"in\":\"query\",\"name\":\"party_name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meta\":{\"properties\":{\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"total_count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"objects\":{\"items\":{\"properties\":{\"district_id\":{\"description\":\"District identifier if available\",\"type\":\"string\"},\"district_name\":{\"description\":\"Name of the electoral district\",\"type\":\"string\"},\"elected_office\":{\"description\":\"Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"format\":\"email\",\"type\":\"string\"},\"extra\":{\"description\":\"Additional data not covered by standard fields\",\"type\":\"object\"},\"first_name\":{\"description\":\"First name\",\"type\":\"string\"},\"gender\":{\"description\":\"Gender\",\"enum\":[\"M\",\"F\"],\"type\":\"string\"},\"last_name\":{\"description\":\"Last name\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the representative\",\"type\":\"string\"},\"offices\":{\"description\":\"Contact information for representative's offices\",\"items\":{\"properties\":{\"fax\":{\"description\":\"Fax number\",\"type\":\"string\"},\"postal\":{\"description\":\"Mailing address\",\"type\":\"string\"},\"tel\":{\"description\":\"Telephone number\",\"type\":\"string\"},\"type\":{\"description\":\"Office type (e.g., constituency, legislature)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"party_name\":{\"description\":\"Political party name\",\"type\":\"string\"},\"personal_url\":{\"description\":\"Personal website not on official legislature site\",\"type\":\"string\"},\"photo_url\":{\"description\":\"URL to representative's photo\",\"type\":\"string\"},\"source_url\":{\"description\":\"URL where the data is scraped from\",\"type\":\"string\"},\"url\":{\"description\":\"Representative's page on official legislature site\",\"type\":\"string\"}},\"required\":[\"name\",\"district_name\",\"elected_office\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/representatives/{representativeSet}/", "rename": { "param": { "representativeSet": "id" } }, "segments": [{ "lit": "representatives" }, { "var": "id" }], "select": { "exist": ["callback", "district_name", "elected_office", "first_name", "format", "gender", "id", "last_name", "limit", "name", "offset", "party_name", "point", "pretty"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["boundary"]] }, "key$": "representatif", "name__orig": "representatif", "Name": "Representatif", "name_": "representatif", "name-": "representatif", "NAME": "REPRESENTATIF", "index$": 5 }, { "active": true, "entity": "representatif", "key$": "BasicRepresentatifFlow", "kind": "basic", "name": "BasicRepresentatifFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "boundary": "boundary01", "boundary_set": "boundary_set01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "representatif_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "representatif_ref01", "srcdatavar": "representatif_ref01_data", "suffix": "_dt0" }, "match": { "id": "representatif01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-representatif_ref01" } }], "index$": 1 }] }, 'Representatif');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let representatif_ref01_data = Object.values(setup.data.existing.representatif)[0];
        // LIST
        const representatif_ref01_ent = client.Representatif();
        const representatif_ref01_match = {};
        representatif_ref01_match['boundary'] = setup.idmap['boundary01'];
        representatif_ref01_match['boundary_set'] = setup.idmap['boundary_set01'];
        const representatif_ref01_list = (await representatif_ref01_ent.list(representatif_ref01_match)).map((e) => e.data());
        // LOAD
        const representatif_ref01_match_dt0 = {};
        representatif_ref01_match_dt0.id = representatif_ref01_data.id;
        const representatif_ref01_data_dt0 = (await representatif_ref01_ent.load(representatif_ref01_match_dt0)).data();
        (0, node_assert_1.default)(representatif_ref01_data_dt0.id === representatif_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/representatif/RepresentatifTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RepresentOfficialsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['representatif01', 'representatif02', 'representatif03', 'boundary01', 'boundary02', 'boundary03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'REPRESENT_OFFICIALS_TEST_REPRESENTATIF_ENTID': idmap,
        'REPRESENT_OFFICIALS_TEST_LIVE': 'FALSE',
        'REPRESENT_OFFICIALS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['REPRESENT_OFFICIALS_TEST_REPRESENTATIF_ENTID'];
    const live = 'TRUE' === env.REPRESENT_OFFICIALS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['REPRESENT_OFFICIALS_TEST_REPRESENTATIF_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.RepresentOfficialsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.REPRESENT_OFFICIALS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=RepresentatifEntity.test.js.map