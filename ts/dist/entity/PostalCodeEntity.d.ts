import { RepresentOfficialsEntityBase } from '../RepresentOfficialsEntityBase';
import type { RepresentOfficialsSDK } from '../RepresentOfficialsSDK';
import type { Control } from '../types';
import type { PostalCode, PostalCodeLoadMatch } from '../RepresentOfficialsTypes';
declare class PostalCodeEntity extends RepresentOfficialsEntityBase<PostalCode> {
    constructor(client: RepresentOfficialsSDK, entopts: any);
    make(this: PostalCodeEntity): PostalCodeEntity;
    load(this: any, reqmatch?: PostalCodeLoadMatch, ctrl?: Control): Promise<PostalCodeEntity>;
}
export { PostalCodeEntity };
