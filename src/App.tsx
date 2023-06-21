import { useEffect, useState } from "react";

type Color = {
  name: string;
  color: string;
};

const COLORS: Color[] = [
  {
    name: "rojo",
    color: "#f00",
  },
  {
    name: "verde",
    color: "#0f0",
  },
  {
    name: "azul",
    color: "#00f",
  },
  {
    name: "amarillo",
    color: "#ff0",
  },
];

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">("initial");
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctColor, setCorrectColor] = useState<null | Color>(null);
  const [wrongColor, setWrongColor] = useState<null | Color>(null);

  function handlePlay() {
    setStatus("playing");
    setTime(0);
    setScore(0);

    const [correctColor, wrongColor] = COLORS.slice().sort(() => Math.random() - 0.5);

    setCorrectColor(correctColor);
    setWrongColor(wrongColor);
  }

  useEffect(() => {
    let interval: number;

    if (status === "playing") {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <main>
      <header>
        <h1>{0} puntos</h1>
        <h1>{time} segundos</h1>
      </header>
      {status === "playing" && (
        <section>
          <span style={{ textTransform: "capitalize", color: wrongColor?.color }}>{correctColor?.name}</span>
        </section>
      )}
      <footer>
        {status === "initial" && <button onClick={handlePlay}>Jugar</button>}
        {status === "finished" && <button onClick={() => setStatus("initial")}>Reiniciar</button>}
        {status === "playing" && correctColor && wrongColor && (
          <>
            <button onClick={() => handleColorClick(correctColor)} style={{ width: 128, height: 128, backgroundColor: correctColor.color }} />
            <button onClick={() => handleColorClick(wrongColor)} style={{ width: 128, height: 128, backgroundColor: wrongColor.color }} />
          </>)}
      </footer>
    </main>
  );
}

export default App;
