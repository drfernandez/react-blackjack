import { useEffect, useRef, useState } from "react";
import BlackjackGame from "./Components/BlackjackGame.tsx";
import Card from "./Components/Card.tsx";
import Button from "./Components/Button.tsx";
import BettingInterface from "./Components/BettingInterface.tsx";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const game = useRef(new BlackjackGame({}));
  const [clicked, setClicked] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const [isBetting, setIsBetting] = useState(true);
  const bettingRef = useRef(null);

  useEffect(() => {
    if (!isBetting) {
      const winner: string = game.current.update();
      if (winner != "none") {
        setGameOver(game.current.gameOver);
      }
    }
  }, [clicked]);

  useEffect(() => {
    if (bettingRef.current && bettingRef.current.betAmount > 0) {
      setIsBetting(false);
      handleResetGame();
    }
  }, [playClicked]);

  useEffect(() => {
    if (game.current.gameOver) {
      setIsBetting(true);
      if (bettingRef.current) {
        bettingRef.current.handleGameResult(game.current.roundWinner);
      }
    }
  }, [gameOver]);

  const handleHitPlayer = () => {
    let c = game.current.state.deck.drawCard();
    game.current.state.player.hit(c as Card);
    if (game.current.state.player.hand.isBust()) {
      game.current.gameOver = true;
    }
    setClicked(!clicked);
  };

  const handleStandPlayer = () => {
    game.current.playerTurn++;
    game.current.state.dealer.hand.isDealer = false;
    setClicked(!clicked);
  };

  const handleResetGame = () => {
    game.current.reset();
    game.current.gameOver = false;
    game.current.gameStarted = false;
    game.current.state.dealer.hand.isDealer = true;
    setClicked(!clicked);
    setGameOver(false);
  };

  const handlePlay = () => {
    setPlayClicked(!playClicked);
    if(bettingRef.current) {
      bettingRef.current.handleRemoveFromWallet();
    }
  };

  return (
    <div className="bg-[url(/assets/bg.png)] bg-cover bg-center h-screen font-bold">
      <div className="flex place-content-center pt-20 pb-10">
        {!isBetting && !gameOver && game.current.playerTurn == 0 && (
          <Button onClick={handleHitPlayer} children={"Hit Player"} />
        )}
        {!isBetting && !gameOver && game.current.playerTurn == 0 && (
          <Button onClick={handleStandPlayer} children={"Stand Player"} />
        )}
        {isBetting && <Button onClick={handlePlay} children={"Play"} />}
      </div>
      <div>
        <BlackjackGame ref={game} />
      </div>
      <div className="drop-shadow-xl drop-shadow-black border-4 border-yellow-500 rounded-3xl justify-items-center pt-5 ml-5 mr-5 bg-[url(/assets/felt-green.jpg)] bg-center bg-repeat">
        <BettingInterface ref={bettingRef} wallet={100} isBetting={!isBetting}/>
      </div>
    </div>
  );
}

export default App;
