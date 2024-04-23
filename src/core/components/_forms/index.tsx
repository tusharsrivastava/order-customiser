import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import clsx from "clsx";
import styles from './style.module.scss';
import { RecordContainer } from "@/core/types";
import { useFormContext } from "react-hook-form";

export type SelectorPropsType = {
    ctx: RecordContainer;
    onSelection: (key: string, value: any) => void;
    onPrev?: () => void;
};

export const BaseSelector: React.FC<SelectorPropsType> = (props) => {
    const {ctx, onSelection} = props;
    const { record, customiser: { enableSubmit } } = ctx;
    const [localSelection, setSelection] = useState('');
    const { setValue } = useFormContext();

    useEffect(() => {
        if (localSelection !== '') {
            setValue('selectedBase', localSelection);
        }
    }, [localSelection]);

    return <Grid container direction="column" gap={2}>
        <Grid item>
            <Grid container direction="column" gap={2}>
            {record.bases.length > 0 ? record.bases.map((choice:any, i:number) => {
                return <Grid item key={i} xs={6}><Paper 
                    elevation={1} 
                    square={false} 
                    className={clsx(styles.choiceCard, choice.id === record.selectedBase && styles.selected, choice.id === localSelection && styles.picked)}
                    onClick={() => setSelection(choice.id)}
                >{choice.label}</Paper></Grid>;
            }) : <Typography variant="body1" className={styles.emptyInfo}>No Products Available</Typography>}
            </Grid>
        </Grid>
    <Grid item>
        <Button variant="contained" disabled={localSelection===''} onClick={() => onSelection('selectedBase',localSelection)}>{enableSubmit ? "Submit":"Next"}</Button>
    </Grid>
    </Grid>;
}

export const VariantSelector: React.FC<SelectorPropsType> = (props) => {
    const {ctx, onSelection, onPrev} = props;
    const { record, customiser: { enableSubmit, canPrev } } = ctx;
    const [localSelection, setSelection] = useState('');
    const { setValue } = useFormContext();

    useEffect(() => {
        if (localSelection !== '') {
            setValue('selectedVariant', localSelection);
        }
    }, [localSelection]);

    return <Grid container direction="column" gap={2}>
        <Grid item>
            <Grid container direction="column" gap={2}>
            {record.variants.length > 0 ? record.variants.map((choice:any, i:number) => {
                return <Grid item key={i} xs={6}><Paper 
                    elevation={1} 
                    square={false} 
                    className={clsx(styles.choiceCard, choice.id === record.selectedVariant && styles.selected, choice.id === localSelection && styles.picked)}
                    onClick={() => setSelection(choice.id)}
                >{choice.label}</Paper></Grid>;
            }) : <Typography variant="body1" className={styles.emptyInfo}>No Products Available</Typography>}
            </Grid>
        </Grid>
    <Grid item>
        <Button variant="outlined" disabled={!canPrev} onClick={() => onPrev?.()}>Prev</Button>
        <Button variant="contained" disabled={localSelection===''} onClick={() => onSelection('selectedVariant',localSelection)}>{enableSubmit ? "Submit":"Next"}</Button>
    </Grid>
    </Grid>;
}