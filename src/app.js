import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Die from "./Die";
import config from "./config.json";
import { nanoid } from "nanoid";

const App = () => {
  const rng = () => {
    // return config.MAX_NUMBER;
    return Math.ceil(Math.random() * config.MAX_NUMBER);
  };

  const oneNewDie = () => ({
    isHeld: false,
    value: rng(),
    id: nanoid(),
  });

  const allNewdice = () =>
    new Array(config.TOTAL_DIE).fill().map(() => oneNewDie());

  const [dice, setDice] = useState(allNewdice());
  const [isSoved, setIssolved] = useState(false);
  const [totlRols, setTotlRols] = useState(0);
  const record = localStorage.getItem(`record`);

  const dieClick = (dieid) =>
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === dieid ? { ...die, isHeld: !die.isHeld } : die
      )
    );

  useEffect(() => {
    if (!dice.every((die) => die.isHeld)) return;
    const firstDieValue = dice[0].value;
    setIssolved(() => dice.every((die) => die.value === firstDieValue));
  }, [dice]);

  const diceEelements = dice.map((dic) => (
    <Die
      value={dic.value}
      key={dic.id}
      isHeld={dic.isHeld}
      handleClick={() => dieClick(dic.id)}
    />
  ));
  const roolMoreDice = () => {
    setDice((prevDice) =>
      prevDice.map((die) => (die.isHeld ? die : oneNewDie()))
    );
    setTotlRols((rools) => rools + 1);
  };

  const newGame = () => {
    if (record > totlRols || !record) localStorage.setItem(`record`, totlRols);
    setDice(allNewdice());
    setIssolved(false);
    setTotlRols(0);
  };

  const rool = () => {
    if (!isSoved) return roolMoreDice();
    newGame();
  };

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p>
        rolls:{totlRols} {record && `best game:${record}`}
      </p>
      <div className="die-container">{diceEelements}</div>
      <button className="roll-dice" onClick={rool}>
        {isSoved ? `new game` : `roll dice`}
        {isSoved && <Confetti />}
      </button>
    </main>
  );
};
export default App;
