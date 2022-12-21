import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generatePrompt(animal) {
  const typeœuvres = ['sculpture', 'photographie', 'peinture', 'performance', 'instalation']
  const description = ['et décrit moi ses aspects politiques et sociaux', '', '', '']
  const langue = "(réponds moi en français)"
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  return `Cree .... ${typeœuvres[getRandomInt(typeœuvres.length)]} ....... ${description[getRandomInt(description.length)]} ..... ${langue[getRandomInt(langue.length)]} ...... ${capitalizedAnimal}`;

}
