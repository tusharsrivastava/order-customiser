"use client";
import {useForm, FieldValues, UseFormReturn, SubmitHandler} from "react-hook-form";
import React, {useContext, createContext, useCallback, useEffect} from "react";
import {IRecordAction, RecordContainer} from "@/core/types";
import { useSnapshot } from "valtio";
import { BaseViewerStateType } from "./components";
import { watch } from "valtio/utils";

export const CustomiserFormContext = createContext<RecordContainer>({
    record: {
        bases: [],
        variants: [],
        selectedBase: '',
        selectedVariant: '',
    },
    customiser: {
        canNext: false,
        canPrev: false,
        enableSubmit: true,
        steps: 1,
        currentStep: 1,
    }
});

export const DispatcherContext = createContext<React.Dispatch<IRecordAction>>(()=>{});

export interface UseCustomiserForm<T extends FieldValues, K> extends UseFormReturn<T, K, undefined> {
    ctx: RecordContainer;
    state: BaseViewerStateType & any;
    performNext: () => void;
    performPrev: () => void;
    updateValue: (key: string, value: any) => void;
    onSubmit: SubmitHandler<T>;
}

export function useCustomiserForm<T extends FieldValues>(modelProxy:BaseViewerStateType): UseCustomiserForm<T, any> {
    const formMethods = useForm<any>();
    const snapshot = useSnapshot<any & BaseViewerStateType>(modelProxy);
    const ctx = useContext(CustomiserFormContext);
    const dispatch = useContext(DispatcherContext);
    const { enableSubmit } = ctx.customiser;

    watch((get) => {
        const obj = get(modelProxy).currentSelection;
        if (obj) {
        }
    });

    const handleFormSubmission: SubmitHandler<T> = (data: T) => {
        console.log("data submitted", data);
        // get variant for now
        if (data.selectedVariant !== '') {
            const variant = ctx.record.variants.find(v => v.id === data.selectedVariant);
            Object.keys(variant?.data || {}).forEach(k => {
                (modelProxy as any)[k] = variant?.data[k];
            });
        }
    };
    
    const performNext = useCallback(() => {
        if (enableSubmit) {
            formMethods.handleSubmit(handleFormSubmission)();
        } else {
            dispatch({ type: 'next', payload: {} });
        }
    }, [enableSubmit]);
    
    const performPrev = () => {
        dispatch({ type: 'prev', payload: {} });
    }
    
    const performValueUpdate = (obj: any) => {
        dispatch({ type: 'update', payload: obj });
    };

    return {
        ...formMethods,
        ctx,
        state: snapshot,
        performNext: () => performNext(),
        performPrev: () => performPrev(),
        updateValue: (key: string, value: any) => performValueUpdate({ [key]: value }),
        onSubmit: handleFormSubmission,
    };
}
