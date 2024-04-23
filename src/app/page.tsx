"use client"
import {Grid, Typography} from '@mui/material';
import {useCustomiserForm} from "@/core";
import {BaseSelector, GLTFViewer, VariantSelector} from "@/core/components";
import styles from "./page.module.scss";
import clsx from "clsx";
import { Shoe, shoeState } from './Shoe';
import { FormProvider } from 'react-hook-form';

export default function Home() {
  const methods = useCustomiserForm<any>(shoeState);
  const { ctx, state, formState: { isSubmitted, errors }, handleSubmit, onSubmit } = methods;
  const { customiser: { steps, currentStep, enableSubmit, canPrev } } = ctx;

  const handlePropertyUpdate = (key: string, value: string) => {
    switch(key) {
      case 'material-color':
        if (shoeState.currentSelection !== null) {
          (shoeState as any)[shoeState.currentSelection] = value;
        }
        break;
    }
  }

  const handleSelection = (key:string, value: any) => {
    methods.updateValue(key, value);
    methods.performNext();
  };


  return (
    <Grid container alignItems="center" padding={2} direction="column" gap={2}>
      <Grid item>
        <Typography variant='h6'>Product Customiser</Typography>
      </Grid>
      <Grid item>
        <FormProvider {...methods}>
          { errors.root && <Typography variant="caption">Form has errors!: {errors.root.message}</Typography>}
          {!isSubmitted &&
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" gap={5}>
              {Array.from(Array(steps).keys()).map((_,i) => (
                <Grid item key={i} className={clsx(styles.formStep, currentStep === (i+1) && styles.active)}>
                  {(() => {
                    switch(currentStep) {
                      case 1:
                        return <BaseSelector ctx={ctx} onSelection={handleSelection} />
                      case 2:
                        return <VariantSelector ctx={ctx} onSelection={handleSelection} />
                    }
                    return <></>;
                  })()}
                </Grid>
               ))}
            </Grid>
          </form>}
          { isSubmitted && <GLTFViewer state={state} onPropertyUpdate={handlePropertyUpdate}>
            <Shoe state={state} />
          </GLTFViewer> }
        </FormProvider>
      </Grid>
    </Grid>
  );
}
