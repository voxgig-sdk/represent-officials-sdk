import { RepresentOfficialsEntityBase } from '../RepresentOfficialsEntityBase';
import type { RepresentOfficialsSDK } from '../RepresentOfficialsSDK';
import type { Control } from '../types';
import type { Representative, RepresentativeLoadMatch, RepresentativeListMatch } from '../RepresentOfficialsTypes';
declare class RepresentativeEntity extends RepresentOfficialsEntityBase<Representative> {
    constructor(client: RepresentOfficialsSDK, entopts: any);
    make(this: RepresentativeEntity): RepresentativeEntity;
    load(this: any, reqmatch?: RepresentativeLoadMatch, ctrl?: Control): Promise<RepresentativeEntity>;
    list(this: any, reqmatch?: RepresentativeListMatch, ctrl?: Control): Promise<RepresentativeEntity[]>;
}
export { RepresentativeEntity };
