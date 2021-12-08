import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Snowfall from "react-snowfall";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Secret Santa</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Rochester&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Snowfall />
      <h1 className={styles.title}>Secret Santa</h1>
      <Link href="/people">
        <a className={styles.button}>Start</a>
      </Link>
    </div>
  );
}
