import "./Hangman.css";
import { useState, useContext } from "react";
import { currentUserInfo } from "../App";

function Hangman() {
  const [guess, setGuess] = useState("");
  const [feedback, setFeedBack] = useState("");
  const [allGuessed, setAllGuessed] = useState([]);
  const [word] = useState("SIMPLE");
  const [letter, setLetter] = useState(["-", "-", "-", "-", "-", "-"]);
  const value = useContext(currentUserInfo);

  function toClick() {
    const nextGuess = (guess || "").toUpperCase().trim();
    if (!nextGuess || allGuessed.includes(nextGuess) || letter.includes(nextGuess)) {
      setFeedBack(nextGuess ? "Already tried" : "Enter a letter");
      return;
    }

    if (word.includes(nextGuess)) {
      const updated = letter.map((char, i) =>
        word[i] === nextGuess ? nextGuess : char
      );
      setLetter(updated);
      setFeedBack("Correct +50");
      value.setUserScore(value.useScore + 50);
    } else {
      setFeedBack("Wrong -50");
      value.setUserScore(value.useScore - 50);
      setAllGuessed((prev) => [...prev, nextGuess]);
    }

    setGuess("");
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      toClick();
    }
  };

  return (
    <div className="hangman">
      <div className="score-hangman">
        <h1>Total Points: {value.useScore}</h1>
        <hr />
      </div>

      <div className="letters-container">
        {letter.map((char, index) => (
          <div className="letter-slot" key={index}>
            <h1>{char}</h1>
          </div>
        ))}
      </div>

      <div className="guess-row">
        <input
          className="input-guess"
          type="text"
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          value={guess}
          onKeyDown={handleKeyDown}
          maxLength={1}
          aria-label="Guess a letter"
        />
        <button type="button" onClick={toClick} className="input-submit">
          Guess
        </button>
      </div>

      {feedback && (
        <div className="feedback">
          <h3>{feedback}</h3>
        </div>
      )}

      <div className="missed-letters">
        {allGuessed.map((item) => (
          <div className="one-word" key={item}>
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hangman;
