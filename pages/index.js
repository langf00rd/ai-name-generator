import axios from "axios";
import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [seeds, setSeeds] = useState("")
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    try {
      setLoading(true)
      const response = await axios.post("https://grand-near-century.glitch.me/generate-product-name", {
        "seedWords": seeds,
        "description": description
      })
      setName(response.data)
      setLoading(false)
    } catch (e) {
      console.log(e.message)
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col max-w-xl m-auto py-10 px-5 text-center">
      <h1 className="font-bold text-3xl mb-3">Product Name Generator</h1>
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your product" className={styles.input} />
      <input value={seeds} onChange={e => setSeeds(e.target.value)} placeholder="Choose some keywords" className={styles.input} />
      {loading ? <p>beep boop generating</p> : <p className="text-[#5341FF] font-[500] my-4">{name}</p>}
      <button onClick={generate} className={styles.button}>Generate</button>
    </main>
  );
}

const styles = {
  input: `border p-3 px-4 rounded-full outline-none my-3 w-full`,
  button: `bg-[#5341FF] text-[#fff] font-[500] mt-5 active:scale-90 transition-all p-3 px-4 rounded-full`,
}
