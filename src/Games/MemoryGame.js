import { useEffect, useState, useContext, useRef } from "react";
import { currentUserInfo } from "../App";
import "./MemoryGame.css";
import SingleCard from "./SingleCard";

const cardImages = [
  { src: "/img/elephant.png", matched: false },
  { src: "/img/cat.png", matched: false },
  { src: "/img/dog.png", matched: false },
  { src: "/img/goat.png", matched: false },
  { src: "/img/rabbit.png", matched: false },
  { src: "/img/horse.png", matched: false },
  { src: "/img/duck.png", matched: false },
  { src: "/img/monkey.png", matched: false },
];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { useScore, setUserScore } = useContext(currentUserInfo);
  const scoreRef = useRef(useScore);

  useEffect(() => {
    scoreRef.current = useScore;
  }, [useScore]);

  const shuffleCard = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne === null ? setChoiceOne(card) : setChoiceTwo(card);
  };

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    setDisabled(true);
    if (choiceOne.src === choiceTwo.src) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.src === choiceOne.src ? { ...card, matched: true } : card
        )
      );
      scoreRef.current += 50;
      setUserScore(scoreRef.current);
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns((prev) => prev + 1);
      setDisabled(false);
    } else {
      const timer = setTimeout(() => {
        scoreRef.current -= 10;
        setUserScore(scoreRef.current);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prev) => prev + 1);
        setDisabled(false);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [choiceOne, choiceTwo, setUserScore]);

  // start a fresh board on first load
  useEffect(() => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
  }, []);

  return (
    <div className="memory-game">
      <h1>Yal3ab Memory Game</h1>
      <h2>Flips: {turns}</h2>

      <button type="button" onClick={shuffleCard}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
            card={card}
            key={card.id}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
