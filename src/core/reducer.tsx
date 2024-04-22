import {RecordContainer, IRecordAction, ReducerFn} from "@/core/types";

export const customiserFormReducer: ReducerFn = (oldState, action) => {
    const {type} = action;
    let state = {
        ...oldState
    };
    
    switch(type) {
        case 'init':
            state = onInit(state, action);
            break;
        case 'next':
            state = onNext(state, action);
            break;
        case 'prev':
            state = onPrev(state, action);
            break;
        case 'update':
            state = onUpdate(state, action);
            break;
    }
    
    return {
        ...state
    };
}

// Utils for Reducer
const onInit: ReducerFn = (state, action) => {
    const { maxSteps } = action.payload;
    
    let canNext = maxSteps > 1;
    let canPrev = false;
    let canSubmit = maxSteps === 1;
    
    return {
        ...state,
        customiser: {
            steps: maxSteps,
            currentStep: 1,
            canNext: canNext,
            canPrev: canPrev,
            enableSubmit: canSubmit,
        }
    };
};

const onNext: ReducerFn = (state, action) => {
    const { customiser: { steps, currentStep } } = state;
    let nextStep = currentStep;
    
    if (currentStep < steps) {
        nextStep = currentStep + 1;
    }
    
    let canNext = steps > currentStep;
    let canPrev = currentStep > 1;
    let canSubmit = nextStep == steps;
    
    return {
        ...state,
        customiser: {
            ...state.customiser,
            currentStep: nextStep,
            canNext: canNext,
            canPrev: canPrev,
            enableSubmit: canSubmit,
        }
    };
};

const onPrev: ReducerFn = (state, action) => {
    const { customiser: { steps, currentStep } } = state;
    let prevStep = currentStep;
    
    if (currentStep > 1) {
        prevStep -= 1;
    }
        
    let canNext = steps > currentStep;
    let canPrev = currentStep > 1;
    let canSubmit = prevStep == steps;
        
    return {
        ...state,
        customiser: {
            ...state.customiser,
            currentStep: prevStep,
            canNext: canNext,
            canPrev: canPrev,
            enableSubmit: canSubmit,
        }
    };
};

const onUpdate: ReducerFn = (state, action) => {
    return {
        ...state,
    };
};
