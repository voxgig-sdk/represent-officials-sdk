import { RepresentOfficialsEntityBase } from '../RepresentOfficialsEntityBase';
import type { RepresentOfficialsSDK } from '../RepresentOfficialsSDK';
import type { Control } from '../types';
import type { Boundary, BoundaryLoadMatch, BoundaryListMatch } from '../RepresentOfficialsTypes';
declare class BoundaryEntity extends RepresentOfficialsEntityBase<Boundary> {
    constructor(client: RepresentOfficialsSDK, entopts: any);
    make(this: BoundaryEntity): BoundaryEntity;
    load(this: any, reqmatch?: BoundaryLoadMatch, ctrl?: Control): Promise<BoundaryEntity>;
    list(this: any, reqmatch?: BoundaryListMatch, ctrl?: Control): Promise<BoundaryEntity[]>;
}
export { BoundaryEntity };
