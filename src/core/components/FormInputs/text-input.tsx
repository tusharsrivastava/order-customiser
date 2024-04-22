import {Control, Controller, FieldValues} from "react-hook-form";
import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export interface TextInputPropsType {
    name: string;
    control: Control<FieldValues>;
}

export const TextInput: React.FC<TextInputPropsType & TextFieldProps> = (props) => {
    const {name, control, ...restProps} = props;
    
    return <Controller
        name={name}
        control={control}
        render={() => <TextField {...restProps} />}
    />;
}
