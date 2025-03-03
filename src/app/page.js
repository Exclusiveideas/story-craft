"use client";

import styles from "./page.module.css";
import LandingPage from "./landing-page";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LandingPage />
      </main>
    </div>
  );
}
