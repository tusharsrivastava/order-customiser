import type { Metadata } from "next";
import clsx from 'clsx';
import { Container } from "@mui/material";
import "./globals.scss";
import styles from './layout.module.scss';
import {CustomiserFormProvider} from "@/core";

export const metadata: Metadata = {
  title: "Order Customiser",
  description: "A Simple Tool to customize the orders for a user"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const maxSteps = 3;

  return (
    <html lang="en">
      <body>
        <Container maxWidth="xl" className={clsx(styles.container)}>
          <CustomiserFormProvider maxSteps={maxSteps}>
            {children}
          </CustomiserFormProvider>
        </Container>
      </body>
    </html>
  );
}
