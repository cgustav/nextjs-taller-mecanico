import type { NextPage } from "next";
import Head from "next/head";

// import Counter from '../features/counter/Counter'
import Vehicles from "./vehicles";
import styles from "../styles/Home.module.css";

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Vehicles></Vehicles>
    </div>
  );
};

export default IndexPage;
