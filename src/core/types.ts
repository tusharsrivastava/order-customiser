import {FieldValues} from "react-hook-form";

import {z} from 'zod';

export const recordContainerSchema = z.object({
    record: z.any(),
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
