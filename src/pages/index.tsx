import type { NextPage } from "next";
import Head from "next/head";

// import Counter from '../features/counter/Counter'
import Vehicles from "./vehicles";
import NavBar from "../components/shared/navbar";
import styles from "../styles/Home.module.css";
import MainLayout from "../components/layouts/main-layout";

const IndexPage: NextPage = () => {
  const indexItem = <Vehicles />;
  return indexItem;
};

export default IndexPage;
