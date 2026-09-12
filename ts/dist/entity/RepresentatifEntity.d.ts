import { RepresentOfficialsEntityBase } from '../RepresentOfficialsEntityBase';
import type { RepresentOfficialsSDK } from '../RepresentOfficialsSDK';
import type { Control } from '../types';
import type { Representatif, RepresentatifLoadMatch, RepresentatifListMatch } from '../RepresentOfficialsTypes';
declare class RepresentatifEntity extends RepresentOfficialsEntityBase<Representatif> {
    constructor(client: RepresentOfficialsSDK, entopts: any);
    make(this: RepresentatifEntity): RepresentatifEntity;
    load(this: any, reqmatch?: RepresentatifLoadMatch, ctrl?: Control): Promise<RepresentatifEntity>;
    list(this: any, reqmatch?: RepresentatifListMatch, ctrl?: Control): Promise<RepresentatifEntity[]>;
}
export { RepresentatifEntity };
