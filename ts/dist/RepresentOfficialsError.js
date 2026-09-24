"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentOfficialsError = void 0;
class RepresentOfficialsError extends Error {
    isRepresentOfficialsError = true;
    sdk = 'RepresentOfficials';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.RepresentOfficialsError = RepresentOfficialsError;
//# sourceMappingURL=RepresentOfficialsError.js.map