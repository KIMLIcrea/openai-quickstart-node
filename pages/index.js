import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="https://benoit-barbagli.com/wp-content/uploads/2022/08/BenoitB_3_bodies_entwined_hugging_each_other_tight_filled_with__0c73b8c6-49db-4b65-953a-2c2acfb83cf8-550x550.jpg" />
      </Head>

      <main className={styles.main}>
        <img src="https://benoit-barbagli.com/wp-content/uploads/2022/08/BenoitB_3_bodies_entwined_hugging_each_other_tight_filled_with__0c73b8c6-49db-4b65-953a-2c2acfb83cf8-550x550.jpg" className={styles.icon} />
        <h3>ecrit un mot</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
