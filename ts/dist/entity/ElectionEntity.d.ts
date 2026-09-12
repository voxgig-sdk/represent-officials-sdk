import { RepresentOfficialsEntityBase } from '../RepresentOfficialsEntityBase';
import type { RepresentOfficialsSDK } from '../RepresentOfficialsSDK';
import type { Control } from '../types';
import type { Election, ElectionListMatch } from '../RepresentOfficialsTypes';
declare class ElectionEntity extends RepresentOfficialsEntityBase<Election> {
    constructor(client: RepresentOfficialsSDK, entopts: any);
    make(this: ElectionEntity): ElectionEntity;
    list(this: any, reqmatch?: ElectionListMatch, ctrl?: Control): Promise<ElectionEntity[]>;
}
export { ElectionEntity };
