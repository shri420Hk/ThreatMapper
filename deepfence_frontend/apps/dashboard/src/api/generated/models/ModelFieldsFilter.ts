/* tslint:disable */
/* eslint-disable */
/**
 * Deepfence ThreatMapper
 * Deepfence Runtime API provides programmatic control over Deepfence microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: community@deepfence.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ModelKeyValues } from './ModelKeyValues';
import {
    ModelKeyValuesFromJSON,
    ModelKeyValuesFromJSONTyped,
    ModelKeyValuesToJSON,
} from './ModelKeyValues';

/**
 * 
 * @export
 * @interface ModelFieldsFilter
 */
export interface ModelFieldsFilter {
    /**
     * 
     * @type {Array<ModelKeyValues>}
     * @memberof ModelFieldsFilter
     */
    fields_values: Array<ModelKeyValues> | null;
}

/**
 * Check if a given object implements the ModelFieldsFilter interface.
 */
export function instanceOfModelFieldsFilter(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "fields_values" in value;

    return isInstance;
}

export function ModelFieldsFilterFromJSON(json: any): ModelFieldsFilter {
    return ModelFieldsFilterFromJSONTyped(json, false);
}

export function ModelFieldsFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelFieldsFilter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fields_values': (json['fields_values'] === null ? null : (json['fields_values'] as Array<any>).map(ModelKeyValuesFromJSON)),
    };
}

export function ModelFieldsFilterToJSON(value?: ModelFieldsFilter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'fields_values': (value.fields_values === null ? null : (value.fields_values as Array<any>).map(ModelKeyValuesToJSON)),
    };
}
