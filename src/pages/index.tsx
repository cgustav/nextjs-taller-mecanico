import type { NextPage } from "next";
import Head from "next/head";

// import Counter from '../features/counter/Counter'
import Vehicles from "./vehicles";
import NavBar from "../components/shared/navbar";
import styles from "../styles/Home.module.css";
import MainLayout from "../components/layouts/main-layout";

const IndexPage: NextPage = () => {
  return (
    // <div className="flex items-center justify-center text-white py-4 md:py-0">

    <Vehicles></Vehicles>
    // </div>
  );
};

export default IndexPage;
