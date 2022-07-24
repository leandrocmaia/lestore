import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import Header from "./header";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = "TypeScript Next.js Stripe Example",
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <div className="container mx-auto">
      <Header />
      {children}
    </div>
  </>
);

export default Layout;
