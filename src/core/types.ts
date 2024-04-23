import {FieldValues} from "react-hook-form";

import {z} from 'zod';

export const recordSchema = z.object({
    bases: z.object({
        id: z.string(),
        label: z.string(),
        imageSrc: z.string(),
    }).array(),
    variants: z.object({
        id: z.string(),
        label: z.string(),
        data: z.any(),
        imageSrc: z.string(),
    }).array(),
    selectedBase: z.string(),
    selectedVariant: z.string(),
});

export type RecordType = z.infer<typeof recordSchema>;

export const recordContainerSchema = z.object({
    record: recordSchema,
    customiser: z.object({
        steps: z.number().int().positive(),
        currentStep: z.number().int().positive(),
        canNext: z.boolean(),
        canPrev: z.boolean(),
        enableSubmit: z.boolean(),
    })
});

export type RecordContainer = z.infer<typeof recordContainerSchema>;

export interface IRecordAction {
    type: IRecordActionType;
    payload: any;
}

export type IRecordActionType = 'init'|'next'|'prev'|'reset'|'update';

export type ReducerFn = (state: RecordContainer, action: IRecordAction) => RecordContainer;
