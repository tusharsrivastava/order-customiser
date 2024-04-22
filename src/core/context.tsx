"use client";
import {useForm, FieldValues, UseFormReturn, SubmitHandler} from "react-hook-form";
import React, {useContext, createContext, useCallback} from "react";
import {IRecordAction, RecordContainer} from "@/core/types";

export const CustomiserFormContext = createContext<RecordContainer>({
    record: {},
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
    performNext: () => void;
    performPrev: () => void;
    onSubmit: SubmitHandler<T>;
}

export function useCustomiserForm<T extends FieldValues>(): UseCustomiserForm<T, any> {
    const formMethods = useForm<T>();
    const ctx = useContext(CustomiserFormContext);
    const dispatch = useContext(DispatcherContext);
    const { enableSubmit } = ctx.customiser;

    const handleFormSubmission: SubmitHandler<T> = (data: T) => {};
    
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
    
    return {
        ...formMethods,
        ctx,
        performNext: () => performNext(),
        performPrev: () => performPrev(),
        onSubmit: handleFormSubmission,
    };
}
