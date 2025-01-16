import {AuditedEntity} from "../../../core/entities/AuditedEntity";
import {Column, Entity, ManyToOne} from "typeorm";
import {Property} from "../../properties/entities/property.entity";
import {DemandLevel, MarketTrendDirection} from "../types/intelligence.enums";

@Entity('intelligence')
export class Intelligence extends AuditedEntity{
    @ManyToOne(() => Property)
    property: Property;

    @Column('jsonb')
    priceAnalysis: {
        predictedPrice: number;
        confidenceScore: number;
        marketTrends: {
            direction: MarketTrendDirection;
            percentage: number;
        };
    };

    @Column('jsonb')
    locationInsights: {
        neighborhoodScore: number;
        safetyScore: number;
        accessibilityScore: number;
        amenitiesNearby: string[];
    };

    @Column('jsonb')
    demandMetrics: {
        viewsLast24h: number;
        inquiriesLast24h: number;
        similarPropertiesDemand: DemandLevel;
    };
}
