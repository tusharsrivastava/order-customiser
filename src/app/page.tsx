"use client"
import {Button, Grid, Typography} from '@mui/material';
import {useCustomiserForm} from "@/core";
import {TextInput} from "@/core/components";
import styles from "./page.module.scss";
import clsx from "clsx";
import {useEffect} from "react";

export default function Home() {
  const methods = useCustomiserForm<any>();
  const { ctx, formState: { isSubmitted, errors }, handleSubmit, onSubmit } = methods;
  const { customiser: { steps, currentStep, enableSubmit, canPrev } } = ctx;

  useEffect(() => {
    console.log("Context Updated", ctx);
    }, [ctx]);

  return (
    <Grid container>
      <Grid item>
          <Typography variant="h5" mt={2}>Project Setup Complete!</Typography>
          { isSubmitted && <Typography variant='body1'>Form Submitted Successfully</Typography> }
          { errors.root && <Typography variant="caption">Form has errors!: {errors.root.message}</Typography>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" gap={5}>
              {Array.from(Array(steps).keys()).map((_,i) => (
                <Grid item key={i} className={clsx(styles.formStep, currentStep === (i+1) && styles.active)}>
                  <Typography variant="h5" mt={2}>Step {_ + 1}</Typography>
                </Grid>
               ))}
              <Grid item>
                <Button disabled={!canPrev} variant="outlined" onClick={methods.performPrev}>Prev</Button>
                <Button variant="contained" onClick={methods.performNext}>{enableSubmit ? "Submit":"Next"}</Button>
              </Grid>
            </Grid>
          </form>
      </Grid>
    </Grid>
  );
}
