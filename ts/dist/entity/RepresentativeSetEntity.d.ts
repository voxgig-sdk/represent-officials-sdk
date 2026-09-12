import { RepresentOfficialsEntityBase } from '../RepresentOfficialsEntityBase';
import type { RepresentOfficialsSDK } from '../RepresentOfficialsSDK';
import type { Control } from '../types';
import type { RepresentativeSet, RepresentativeSetLoadMatch, RepresentativeSetListMatch } from '../RepresentOfficialsTypes';
declare class RepresentativeSetEntity extends RepresentOfficialsEntityBase<RepresentativeSet> {
    constructor(client: RepresentOfficialsSDK, entopts: any);
    make(this: RepresentativeSetEntity): RepresentativeSetEntity;
    load(this: any, reqmatch?: RepresentativeSetLoadMatch, ctrl?: Control): Promise<RepresentativeSetEntity>;
    list(this: any, reqmatch?: RepresentativeSetListMatch, ctrl?: Control): Promise<RepresentativeSetEntity[]>;
}
export { RepresentativeSetEntity };
