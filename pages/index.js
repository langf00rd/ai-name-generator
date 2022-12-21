import axios from "axios";
import React, { useState } from "react";
import Typewriter from 'typewriter-effect';

export default function Home() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [seeds, setSeeds] = useState("")
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    try {
      setLoading(true)
      const response = await axios.post("https://ai-server-qjof.onrender.com/generate-product-name", {
        "seed_words": seeds,
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
    <>

      <section className="bg-blue-100 w-screen h-[50vh] text-center flex items-center justify-center">
        <div className="text-6xl font-[600] max-w-3xl m-auto leading-[80px] flex-col flex">
          <h1>Generate a cool name for your</h1>
          <h1 className="ml-2 text-[#5341FF]">
            <Typewriter
              options={{
                strings: ['App', 'Website', 'Blog', 'Anything'],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </div>
      </section>

      <section className="flex flex-col max-w-xl m-auto py-10 px-5 text-center">
        {/* <h1 className="font-bold text-3xl mb-3">Product Name Generator</h1> */}
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter a description" className={styles.input} />
        <input value={seeds} onChange={e => setSeeds(e.target.value)} placeholder="Choose some name keywords" className={styles.input} />
        {loading ? <p className="mb-2">beep boop generating</p> : <p className="text-[#5341FF] font-[500] my-4">{name.replace("Product names: ", "")}</p>}
        <button onClick={generate} className={styles.button}>Generate</button>
      </section>

      {/* <section className="bg-blue-100 p-5 py-20">
        <h1 className="text-2xl text-center max-w-5xl leading-10 m-auto font-[500]">A great business name should help your company stand out and provide a canvas to paint your own meaning on. The Looka Business Name Generator helps you brainstorm ideas, check availability, and see logo ideas instantly.</h1>
      </section> */}

    </>
  );
}

const styles = {
  input: `border p-3 px-4 rounded-full outline-none my-3 w-full`,
  button: `bg-[#5341FF] text-[#fff] max-w-[200px] m-auto font-[500] active:scale-90 transition-all p-3 px-4 rounded-full`,
}
