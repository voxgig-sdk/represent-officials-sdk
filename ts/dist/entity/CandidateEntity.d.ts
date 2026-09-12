import { RepresentOfficialsEntityBase } from '../RepresentOfficialsEntityBase';
import type { RepresentOfficialsSDK } from '../RepresentOfficialsSDK';
import type { Control } from '../types';
import type { Candidate, CandidateListMatch } from '../RepresentOfficialsTypes';
declare class CandidateEntity extends RepresentOfficialsEntityBase<Candidate> {
    constructor(client: RepresentOfficialsSDK, entopts: any);
    make(this: CandidateEntity): CandidateEntity;
    list(this: any, reqmatch?: CandidateListMatch, ctrl?: Control): Promise<CandidateEntity[]>;
}
export { CandidateEntity };
