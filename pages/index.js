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
      setName(response.data.payload.replace("Product names: ", ""))
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="text-[#fff] min-h-screen w-screen">
        <section className="w-screen mt-32 text-center flex items-center justify-center">
          <div className="lg:text-3xl text-2xl px-5 font-[600] max-w-3xl m-auto lg:leading-[43px] flex-col flex">
            <div className="py-3 text-sm absolute top-0">
              <b>NameGen.ai</b>
            </div>
            <h1>Generate a cool name for</h1>
            <h1 className="m-auto w-max">
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
          <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter a description" className={styles.input} />
          <input value={seeds} onChange={e => setSeeds(e.target.value)} placeholder="Choose some name keywords" className={styles.input} />
          <p className="my-3">{name}</p>
          <button onClick={generate} className={styles.button}>{loading ? "beep boop... 🤖" : "Generate"}</button>
        </section>
      </div>
    </>
  );
}

const styles = {
  input: `border m-auto px-3 py-2 text-[14px] max-w-[300px] rounded-full outline-none my-3 w-full text-[#222]`,
  button: `text-[13px] bg-blue-800 whitespace-nowrap text-[#fff] w-max m-auto font-[500] active:scale-90 transition-all p-3 px-4 rounded-full`,
}
