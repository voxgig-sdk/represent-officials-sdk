import { RepresentOfficialsEntityBase } from '../RepresentOfficialsEntityBase';
import type { RepresentOfficialsSDK } from '../RepresentOfficialsSDK';
import type { Control } from '../types';
import type { BoundarySet, BoundarySetLoadMatch, BoundarySetListMatch } from '../RepresentOfficialsTypes';
declare class BoundarySetEntity extends RepresentOfficialsEntityBase<BoundarySet> {
    constructor(client: RepresentOfficialsSDK, entopts: any);
    make(this: BoundarySetEntity): BoundarySetEntity;
    load(this: any, reqmatch?: BoundarySetLoadMatch, ctrl?: Control): Promise<BoundarySetEntity>;
    list(this: any, reqmatch?: BoundarySetListMatch, ctrl?: Control): Promise<BoundarySetEntity[]>;
}
export { BoundarySetEntity };
