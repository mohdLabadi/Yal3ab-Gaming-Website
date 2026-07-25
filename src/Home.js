import "./Home.css";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { currentUserInfo } from "./App";

const CAT_FACTS = [
  "Cool interesting fact: this is officially the coolest cat without ears ever.",
  "Scientists measured the earlessness. Peak vibes. Zero ears. Do not trust your eyes.",
  "Those folds? Pure swagger. Ears were never invited to this party.",
];

function HomePage() {
  const [display, setDisplay] = useState(null);
  const [name, setName] = useState("");
  const [catFactStep, setCatFactStep] = useState(0);
  const [catFactOpen, setCatFactOpen] = useState(false);
  const { setUserName } = useContext(currentUserInfo);
  const history = useHistory();

  function redirecting() {
    const playerName = name.trim() || "Guest";
    setUserName(playerName);
    history.push(`/game/${display}`);
  }

  function revealCatFact() {
    if (!catFactOpen) {
      setCatFactOpen(true);
      setCatFactStep(0);
      return;
    }
    setCatFactStep((step) => (step + 1) % CAT_FACTS.length);
  }

  let moreInfo = null;

  if (display === "hangman") {
    moreInfo = (
      <div className="game-details">
        <div className="game-title">
          <h2>Hangman</h2>
        </div>
        <div className="row align-items-center g-4">
          <div className="col-12">
            <p>
              Guess the hidden word one letter at a time. Correct guesses earn
              points — wrong guesses cost you. Clear the word to climb the
              leaderboard.
            </p>
          </div>
          <div className="col-12">
            <div className="cat-fact-stage">
              <button
                type="button"
                className={`cat-mascot ${catFactOpen ? "revealed" : ""}`}
                onClick={revealCatFact}
                aria-expanded={catFactOpen}
                aria-controls="hangman-cat-fact"
              >
                <img src="/img/cover.jpeg" alt="The coolest cat without ears ever" />
                <span className="cat-hint">
                  {catFactOpen ? "Tap for more" : "Tap the cat"}
                </span>
              </button>

              <div
                id="hangman-cat-fact"
                className={`cat-fact-bubble ${catFactOpen ? "open" : ""}`}
                role="status"
                aria-live="polite"
              >
                <p key={catFactStep}>{CAT_FACTS[catFactStep]}</p>
                <button
                  type="button"
                  className="fact-next"
                  onClick={revealCatFact}
                >
                  Wait, what?
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="play-form">
          <label htmlFor="hangman-name">Name</label>
          <input
            id="hangman-name"
            maxLength={8}
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="button" onClick={redirecting} className="play-btn">
            Play
          </button>
        </div>
      </div>
    );
  } else if (display === "memory-game") {
    moreInfo = (
      <div className="game-details">
        <div className="game-title">
          <h2>Memory Game</h2>
        </div>
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <p>
              Flip two cards at a time and match the animal pairs. Remember
              where each image sits — fewer flips means a stronger score.
            </p>
          </div>
          <div className="col-md-6 detail-image">
            <img
              src="/img/memory-game-icon.png"
              alt="Memory game preview"
            />
          </div>
        </div>
        <div className="play-form">
          <label htmlFor="memory-name">Name</label>
          <input
            id="memory-name"
            maxLength={8}
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="button" onClick={redirecting} className="play-btn">
            Play
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="all-page">
      <div className="container home-container">
        <section className="main-content">
          <h1>Come and Play Games</h1>
          <p className="intro-text">
            Two quick games from Muhammad Mushoffa and Labadi. Pick one below,
            enter your name, and start earning points.
          </p>
          <div className="accent-lines" aria-hidden="true">
            <div className="box-sm black"></div>
            <div className="box-sm white"></div>
            <div className="box-sm green"></div>
            <div className="box-sm red"></div>
          </div>
        </section>

        <section className="row g-3 games-content">
          <div className="col-sm-6">
            <button
              type="button"
              onClick={() => {
                setDisplay("hangman");
                setCatFactOpen(false);
                setCatFactStep(0);
              }}
              className={`one-game ${display === "hangman" ? "active" : ""}`}
            >
              <h2>Hangman</h2>
            </button>
          </div>
          <div className="col-sm-6">
            <button
              type="button"
              onClick={() => setDisplay("memory-game")}
              className={`one-game ${
                display === "memory-game" ? "active" : ""
              }`}
            >
              <h2>Memory Card</h2>
            </button>
          </div>
        </section>

        {moreInfo && (
          <>
            <hr className="divider" />
            {moreInfo}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
