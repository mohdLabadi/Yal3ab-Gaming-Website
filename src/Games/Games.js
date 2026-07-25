import "./Games.css";
import { useState, useEffect } from "react";
import MemoryGame from "./MemoryGame";
import Hangman from "./Hangman";
import { FaGamepad, FaHeadset } from "react-icons/fa";
import { useParams } from "react-router-dom";

function Games() {
  const [display, setDisplay] = useState("logo");
  const [games, setGames] = useState(false);
  const { type } = useParams();

  useEffect(() => {
    setDisplay(type);
  }, [type]);

  let allgames = null;
  if (games) {
    allgames = (
      <div className="all-games">
        <p onClick={() => setDisplay("memory-game")}>Memory Game</p>
        <p onClick={() => setDisplay("hangman")}>Hangman</p>
      </div>
    );
  }

  let game = null;
  if (display === "hangman") {
    game = <Hangman />;
  } else if (display === "memory-game") {
    game = <MemoryGame />;
  }

  return (
    <div className="entire-thing">
      <div className="container game-shell">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">{game}</div>
        </div>
      </div>

      <div className="icon-bar">
        <a className="icon" href="mailto:yal3ab@example.com">
          <div className="text">
            <h5>Contact us</h5>
            <FaHeadset size={25} className="ic" id="about-us" />
          </div>
        </a>

        <div
          className="icon"
          id="show-games"
          onMouseEnter={() => setGames(true)}
          onMouseLeave={() => setGames(false)}
        >
          <div className="text">
            <h5>Games</h5>
            <FaGamepad size={30} className="ic" id="game" />
          </div>
          {allgames}
        </div>
      </div>
    </div>
  );
}

export default Games;
