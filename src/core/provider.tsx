"use client";
import React, {PropsWithChildren, useReducer, useEffect} from "react";
import {CustomiserFormContext,DispatcherContext} from "./context";
import {RecordContainer} from "./types";
import {customiserFormReducer} from "./reducer";

export type CustomiserFormProviderPropsType = {
    maxSteps: number;
}

const Provider = CustomiserFormContext.Provider;
const Dispatcher = DispatcherContext.Provider;

const INITIAL_STATE: RecordContainer = {
    record: {},
    customiser: {
        steps: 3,
        currentStep: 1,
        canNext: true,
        canPrev: false,
        enableSubmit: false,
    }
};

export const CustomiserFormProvider: React.FC<PropsWithChildren<CustomiserFormProviderPropsType>> = ({ children, ...props }) => {
    const [ record, dispatch ] = useReducer(customiserFormReducer, INITIAL_STATE);
    
    useEffect(() => {
        dispatch({ type: 'init', payload: { maxSteps: props.maxSteps } });
    }, [props.maxSteps]);
    
    return <Provider value={record}>
        <Dispatcher value={dispatch}>
            {children}
        </Dispatcher>
    </Provider>
}
