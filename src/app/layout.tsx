import type { Metadata } from "next";
import clsx from 'clsx';
import { Container } from "@mui/material";
import "./globals.scss";
import styles from './layout.module.scss';
import {CustomiserFormProvider} from "@/core";
import { shoeRecord } from "./data";

export const metadata: Metadata = {
  title: "Order Customiser",
  description: "A Simple Tool to customize the orders for a user"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const maxSteps = 2;

  return (
    <html lang="en">
      <body>
        <Container maxWidth="xl" className={clsx(styles.container)}>
          <CustomiserFormProvider maxSteps={maxSteps} record={shoeRecord}>
            {children}
          </CustomiserFormProvider>
        </Container>
      </body>
    </html>
  );
}
