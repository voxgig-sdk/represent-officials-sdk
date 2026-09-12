import { BoundaryEntity } from './entity/BoundaryEntity';
import { BoundarySetEntity } from './entity/BoundarySetEntity';
import { CandidateEntity } from './entity/CandidateEntity';
import { ElectionEntity } from './entity/ElectionEntity';
import { PostalCodeEntity } from './entity/PostalCodeEntity';
import { RepresentatifEntity } from './entity/RepresentatifEntity';
import { RepresentativeSetEntity } from './entity/RepresentativeSetEntity';
export type * from './RepresentOfficialsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { RepresentOfficialsEntityBase } from './RepresentOfficialsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class RepresentOfficialsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Boundary(entopts?: Record<string, any>): BoundaryEntity;
    BoundarySet(entopts?: Record<string, any>): BoundarySetEntity;
    Candidate(entopts?: Record<string, any>): CandidateEntity;
    Election(entopts?: Record<string, any>): ElectionEntity;
    PostalCode(entopts?: Record<string, any>): PostalCodeEntity;
    Representatif(entopts?: Record<string, any>): RepresentatifEntity;
    RepresentativeSet(entopts?: Record<string, any>): RepresentativeSetEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): RepresentOfficialsSDK;
    tester(testopts?: any, sdkopts?: any): RepresentOfficialsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof RepresentOfficialsSDK;
export { stdutil, config, BaseFeature, RepresentOfficialsEntityBase, RepresentOfficialsSDK, SDK, };
