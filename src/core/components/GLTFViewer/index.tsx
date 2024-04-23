'use client';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { FC, PropsWithChildren, Suspense } from 'react';
import styles from './style.module.scss';
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import clsx from 'clsx';

export type MaterialSelectionChoice = {
    label: string;
    color: string;
};

export type BaseViewerStateType = {
    hovering: string|null;
    currentSelection: string|null;
    choices: MaterialSelectionChoice[];
};

export type GLTFViewerPropsType = {
    state: BaseViewerStateType;
    onPropertyUpdate: (key: string, selectedValue: any) => void;
} & CanvasProps;

export const GLTFViewer: FC<PropsWithChildren<GLTFViewerPropsType>> = ({children, ...props}) => {
    const { state, onPropertyUpdate, ...restProps } = props;

    function isDarkColor(hexCode: string): boolean {
        // Convert hex color code to RGB
        let r = parseInt(hexCode.substr(1, 2), 16);
        let g = parseInt(hexCode.substr(3, 2), 16);
        let b = parseInt(hexCode.substr(5, 2), 16);
    
        // Calculate relative luminance
        let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
        // Check if the luminance indicates a dark color
        return luminance < 128;
    }

    return <Grid container gap={1} direction="row">
        <Grid item>
            <Grid container direction="column">
                <Grid item>
                    <Canvas shadows camera={{ position: [0, 0, 4], fov: 45, zoom: 1.5 }} className={styles.gltfViewer} {...restProps}>
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.1} />
                            <spotLight intensity={0.05} angle={0.1} penumbra={1} position={[10,15,10]} castShadow />
                            {children}
                            <Environment preset="city" />
                            <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
                            <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={false} />
                        </Suspense>
                    </Canvas>
                </Grid>
                <Grid item className={styles.statusBar}>
                    <Typography variant='caption' className={styles.hoveringText}>{state.hovering ? state.hovering : ''}</Typography>
                    <Typography variant='caption' className={styles.selectedText}>{state.currentSelection ? state.currentSelection : 'No Selection'}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid container direction="column" gap={2} className={styles.propertyViewer}>
            <Grid item>
                <Typography variant="body1" className={styles.propertyViewerTitle}>Properties {state.currentSelection && `: ${state.currentSelection}`}</Typography>
            </Grid>
            <Grid container gap={2} mt={1} direction="row">
                {state.currentSelection && (
                state.choices.length > 0 ? state.choices.map((choice, i) => {
                    return <Grid item key={i} xs={5}><Paper 
                        elevation={1} 
                        square={false} 
                        className={clsx(styles.choiceCard, choice.color === (state as any)[state.currentSelection||''] && styles.selected)} 
                        style={{backgroundColor:choice.color,color:isDarkColor(choice.color) ? '#fff':'#222'}}
                        onClick={() => onPropertyUpdate('material-color', choice.color)}
                    >{choice.label}</Paper></Grid>;
                }) : <Typography variant="body1" className={styles.emptyInfo}>No Materials Available</Typography>)}
            </Grid>
            {(state as any)[state.currentSelection||''] && (state as any)[state.currentSelection||''] !== '#fff' && <>
            <Divider orientation="horizontal" flexItem />
            <Grid item>
                <Button variant="outlined" onClick={()=>onPropertyUpdate('material-color', '#fff')}>Reset</Button>
            </Grid>
            </>}
        </Grid>
    </Grid>;
}
