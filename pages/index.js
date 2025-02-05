import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { Configuration, OpenAIApi } from "openai";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generatePrompt(animal) {
  const typeœuvres = ['sculpture', 'photographie', 'peinture', 'performance', 'instalation']
  const description = ['et décrit moi ses aspects politiques et sociaux', '', '', '']
  const langue = "(réponds moi en français)"
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  return `Cree une ${typeœuvres[getRandomInt(typeœuvres.length - 1)]} ${description[getRandomInt(description.length - 1)]} ${langue[getRandomInt(langue.length - 1)]} ${capitalizedAnimal}`;

}


export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [prompt, setPrompt] = useState();


  async function onSubmit(event) {
    event.preventDefault();
    const new_prompt = generatePrompt(animalInput)
    setPrompt(new_prompt);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: new_prompt }),
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
            placeholder="Ecrit un mot clef ou une expression "
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        {prompt && <div className={styles.result}>{prompt}</div>}
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
