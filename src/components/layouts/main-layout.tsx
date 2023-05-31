// components/layout.js

import NavBar from "../shared/navbar";
import Footer from "../shared/footer";
import { AppProps } from "next/app";
import Head from "next/head";

export default function MainLayout({ children }: any) {
  return (
    <>
      <div className="h-screen">
        <Head>
          <title>Taller Mecánico 3BS</title>
          <link rel="icon" href="/favicon.ico" />
          <script src="https://unpkg.com/feather-icons"></script>
          <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
        </Head>
        <NavBar></NavBar>
        <main>{children}</main>
        <Footer></Footer>
      </div>
    </>
  );
}
