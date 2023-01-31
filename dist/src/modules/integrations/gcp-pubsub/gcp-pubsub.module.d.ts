import { OnApplicationBootstrap } from '@nestjs/common';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { GcpPubsubService } from './gcp-pubsub.service';
export declare class GcpPubsubModule implements OnApplicationBootstrap {
    private readonly discoveryService;
    private readonly gcpPubsubService;
    private readonly externalContextCreator;
    private readonly logger;
    constructor(discoveryService: DiscoveryService, gcpPubsubService: GcpPubsubService, externalContextCreator: ExternalContextCreator);
    onApplicationBootstrap(): Promise<void>;
}
