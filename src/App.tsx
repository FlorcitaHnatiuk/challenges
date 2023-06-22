import {useEffect, useState, useMemo} from "react";

type Color = {
  name: string;
  color: string;
  correct: boolean;
};

const COLORS: Color[] = [
  {
    name: "rojo",
    color: "#D7263D",
    correct: false,
  },
  {
    name: "verde",
    color: "#1B998B",
    correct: false,
  },
  {
    name: "rosa",
    color: "#D96CB8",
    correct: false,
  },
  {
    name: "naranja",
    color: "#F46036",
    correct: false,
  },
  {
    name: "azul",
    color: "#2E294E",
    correct: false,
  },
  {
    name: "amarillo",
    color: "#D9D36C",
    correct: false,
  },
];

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">("initial");
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameColors, setGameColors] = useState<Color[]>([]);
  const correctColor = useMemo<Color>(
    () => gameColors.find((color) => color.correct)!,
    [gameColors],
  );

  function handlePlay() {
    setStatus("playing");
    setTime(0);
    setScore(0);

    const [correctColor, wrongColor] = COLORS.slice().sort(() => Math.random() - 0.5);

    setGameColors([{...correctColor, correct: true}, wrongColor].sort(() => Math.random() - 0.5));
  }

  function handleColorClick(clickedColor: Color) {
    if (clickedColor.correct) {
      setScore((score) => score + 1);

      if (score === 9) {
        setStatus("finished");
      } else {
        const [correctColor, wrongColor] = COLORS.slice().sort(() => Math.random() - 0.5);

        setGameColors(
          [{...correctColor, correct: true}, wrongColor].sort(() => Math.random() - 0.5),
        );
      }
    }
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
    <main style={{backgroundColor: status === "playing" ? gameColors[1].color : "inherit"}}>
      <header style={{backgroundColor: "#333"}}>
        <h1>{score} puntos</h1>
        <h1>{time} segundos</h1>
      </header>
      {status === "playing" && (
        <section>
          <span style={{textTransform: "capitalize", color: gameColors[0].color}}>
            {correctColor.name}
          </span>
        </section>
      )}
      <footer>
        {status === "initial" && <button onClick={handlePlay} style={{width: 128, height: 64, backgroundColor: "#333"}}>Jugar</button>}
        {status === "finished" && <button onClick={() => setStatus("initial")} style={{width: 128, height: 64, backgroundColor: "#333"}}>Reiniciar</button>}
        {status === "playing" && (
          <>
            <button
              style={{border: `4px solid ${gameColors[1].color}`, width: 128, height: 128, backgroundColor: gameColors[0].color}}
              onClick={() => handleColorClick(gameColors[0])}
            />
            <button
              style={{border: `4px solid ${gameColors[0].color}`, width: 128, height: 128, backgroundColor: gameColors[1].color}}
              onClick={() => handleColorClick(gameColors[1])}
            />
          </>
        )}
      </footer>
    </main>
  );
}

export default App;
