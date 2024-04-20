import type { Metadata } from "next";
import clsx from 'clsx';
import { Container } from "@mui/material";
import "./globals.scss";
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: "Order Customiser",
  description: "A Simple Tool to customize the orders for a user"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Container maxWidth="xl" className={clsx(styles.container)}>
          {children}
        </Container>
      </body>
    </html>
  );
}
