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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RepresentativeSetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when REPRESENT_OFFICIALS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('REPRESENT_OFFICIALS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RepresentOfficialsSDK.test();
        const ent = testsdk.RepresentativeSet();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.REPRESENT_OFFICIALS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'representative_set.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 1 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "representative_set", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /representative-sets/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "callback", "or": "callback", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "pretty", "or": "pretty", "r": false, "t": "`$INTEGER`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/representative-sets/", "q": { "exist": ["callback", "format", "limit", "offset", "pretty"] }, "r": {}, "s": [{ "lit": "representative-sets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /representative-sets/{representativeSet}/", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "representative_set", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "callback", "or": "callback", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "pretty", "or": "pretty", "r": false, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/representative-sets/{representativeSet}/", "q": { "exist": ["callback", "format", "id", "pretty"] }, "r": { "param": { "representativeSet": "id" } }, "s": [{ "lit": "representative-sets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "representative_set", "name__orig": "representative_set", "Name": "RepresentativeSet", "name_": "representative_set", "name-": "representative-set", "NAME": "REPRESENTATIVE_SET", "index$": 6 }, { "active": true, "entity": "representative_set", "key$": "BasicRepresentativeSetFlow", "kind": "basic", "name": "BasicRepresentativeSetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "representative_set_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "representative_set_ref01", "srcdatavar": "representative_set_ref01_data", "suffix": "_dt0" }, "m": { "id": "representative_set01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-representative_set_ref01" } }], "index$": 1 }] }, 'RepresentativeSet', { "GET /representative-sets/": { "protocol": "http", "operationId": "getRepresentativeSets", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "meta": { "key$": "meta", "properties": { "next": { "nullable": true, "type": "string" }, "previous": { "nullable": true, "type": "string" }, "total_count": { "type": "integer" } }, "type": "object" }, "objects": { "items": { "properties": { "name": { "type": "string", "key$": "name" }, "url": { "type": "string", "key$": "url" } }, "type": "object", "index$": 0 }, "key$": "objects", "type": "array" } } } } } } }, "parameters": [{ "name": "limit", "in": "query", "description": "Number of results per page (default: 20)", "schema": { "type": "integer", "default": 20 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "Offset for pagination", "schema": { "type": "integer", "default": 0 }, "index$": 1 }, { "name": "format", "in": "query", "description": "Output format", "schema": { "type": "string", "enum": ["json", "apibrowser"] }, "index$": 2 }, { "name": "pretty", "in": "query", "description": "Pretty print JSON output", "schema": { "type": "integer", "enum": [0, 1] }, "index$": 3 }, { "name": "callback", "in": "query", "description": "JSONP callback function name", "schema": { "type": "string" }, "index$": 4 }], "securitySource": "unspecified" }, "GET /representative-sets/{representativeSet}/": { "protocol": "http", "operationId": "getRepresentativeSet", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "key$": "name" }, "url": { "type": "string", "key$": "url" } }, "index$": 0 } } } } }, "parameters": [{ "name": "representativeSet", "in": "path", "required": true, "description": "Representative set identifier (e.g., ontario-legislature)", "schema": { "type": "string" }, "index$": 0 }, { "name": "format", "in": "query", "description": "Output format", "schema": { "type": "string", "enum": ["json", "apibrowser"] }, "index$": 1 }, { "name": "pretty", "in": "query", "description": "Pretty print JSON output", "schema": { "type": "integer", "enum": [0, 1] }, "index$": 2 }, { "name": "callback", "in": "query", "description": "JSONP callback function name", "schema": { "type": "string" }, "index$": 3 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let representative_set_ref01_data = Object.values(setup.data.existing.representative_set)[0];
        // LIST
        const representative_set_ref01_ent = client.RepresentativeSet();
        const representative_set_ref01_match = {};
        const representative_set_ref01_list = (await representative_set_ref01_ent.list(representative_set_ref01_match)).map((e) => e.data());
        // LOAD
        const representative_set_ref01_match_dt0 = {};
        representative_set_ref01_match_dt0.id = representative_set_ref01_data.id;
        const representative_set_ref01_data_dt0 = (await representative_set_ref01_ent.load(representative_set_ref01_match_dt0)).data();
        (0, node_assert_1.default)(representative_set_ref01_data_dt0.id === representative_set_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/representative_set/RepresentativeSetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RepresentOfficialsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['representative_set01', 'representative_set02', 'representative_set03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'REPRESENT_OFFICIALS_TEST_REPRESENTATIVE_SET_ENTID': idmap,
        'REPRESENT_OFFICIALS_TEST_LIVE': 'FALSE',
        'REPRESENT_OFFICIALS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['REPRESENT_OFFICIALS_TEST_REPRESENTATIVE_SET_ENTID'];
    const live = 'TRUE' === env.REPRESENT_OFFICIALS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['REPRESENT_OFFICIALS_TEST_REPRESENTATIVE_SET_ENTID'];
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
//# sourceMappingURL=RepresentativeSetEntity.test.js.map