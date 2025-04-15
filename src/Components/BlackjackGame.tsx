import React, { JSX } from "react";
import Deck from "./Deck";
import Player from "./Player";
import Hand from "./Hand";
import Message from "./Message";
import Card from "./Card";

interface BlackjackGameProps {
  [key: string]: any;
}

interface BlackjackGameState {
  deck: Deck;
  player: Player;
  dealer: Player;
}

export default class BlackjackGame extends React.Component<
  BlackjackGameProps,
  BlackjackGameState
> {
  constructor(props: BlackjackGameProps) {
    super(props);
    this.playerTurn = 0;
    this.gameStarted = false;
    this.gameOver = false;
    this.roundWinner = "none";
    this.state = {
      deck: this.state.deck,
      player: this.state.player,
      dealer: this.state.dealer,
    };
    this.start();
  }

  playerTurn = 0;
  gameStarted = false;
  gameOver = false;
  roundWinner = "";
  state = {
    deck: new Deck({}),
    player: new Player({ hand: new Hand({ isDealer: false }) }),
    dealer: new Player({ hand: new Hand({ isDealer: true }) }),
  };

  start() {
    const _deck: Deck = new Deck({});
    const _player: Player = new Player({ hand: new Hand({ isDealer: false }) });
    const _dealer: Player = new Player({ hand: new Hand({ isDealer: true }) });

    this.state.dealer = _dealer;
    this.state.player = _player;
    this.state.deck = _deck;
  }

  update(): string {
    if (!this.gameStarted) {
      this.dealInitialCards();
      this.gameStarted = true;
    }

    let playerScore: number = this.state.player.hand.calculateValue();
    const isBlackjack: boolean = this.state.player.hand.isBlackjack();
    const isBust: boolean = this.state.player.hand.isBust();
    if (isBust) {
      // player bust
      this.playerTurn = 1;
      this.gameOver = true;
      this.roundWinner = "Dealer";
      this.forceUpdate();
      return this.roundWinner;
    } else if (isBlackjack) {
      // player won!
      this.playerTurn = 1;
      this.gameOver = true;
      this.roundWinner = "Player";
      this.state.dealer.hand.isDealer = false;
      this.state.dealer.hand.calculateValue();
      const dealerBlackjack: boolean = this.state.dealer.hand.isBlackjack();
      if (isBlackjack && dealerBlackjack) {
        // there was a tie!
        this.roundWinner = "Tie";
      }
      this.forceUpdate();
      return this.roundWinner;
    }

    if (this.gameStarted && !this.gameOver && this.playerTurn != 0) {
      let dealerScore: number = this.state.dealer.hand.value;
      this.state.dealer.hand.isDealer = false;
      while (dealerScore < 17) {
        this.state.dealer.hit(this.state.deck.drawCard() as Card);
        dealerScore = this.state.dealer.hand.calculateValue();
      }

      if (dealerScore > 21) {
        // dealer bust
        this.roundWinner = "Player";
      } else if (dealerScore > playerScore) {
        // dealer won
        this.roundWinner = "Dealer";
      } else if (playerScore > dealerScore) {
        // player won
        this.roundWinner = "Player";
      } else {
        // tie condition
        this.roundWinner = "Tie";
      }
      this.gameOver = true;
    }

    this.forceUpdate();

    return this.roundWinner;
  }

  // componentDidUpdate(prevProps: Readonly<BlackjackGameProps>, prevState: Readonly<BlackjackGameState>, snapshot?: any): void {
  //   if(this.state.player !== prevState.player) {
  //     let d = 0;
  //   }
  //   if(this.state.dealer !== prevState.dealer) {
  //     let d = 0;
  //   }
  //   if(this.state.deck !== prevState.deck) {
  //     let d =0;
  //   }
  // }

  stop(): void {}

  continue(): void {}

  reset(): void {
    this.state.deck.resetDeck();
    this.state.player.hand.clearHand();
    this.state.dealer.hand.clearHand();
    this.state.player.hand.value = 0;
    this.state.dealer.hand.value = 0;
    this.playerTurn = 0;
    this.gameStarted = false;
  }

  dealInitialCards(): void {
    for (let i = 0; i < 2; ++i) {
      this.state.player.hit(this.state.deck.drawCard() as Card);
      this.state.dealer.hit(this.state.deck.drawCard() as Card);
    }

    // this.state.player.hand.addCard(new Card({ face: "A", suit: "♥" }));
    // this.state.player.hand.addCard(new Card({ face: "K", suit: "♥" }));
    // this.state.dealer.hand.addCard(new Card({ face: "A", suit: "♥" }));
    // this.state.dealer.hand.addCard(new Card({ face: "K", suit: "♥" }));
  }

  handlePlayerTurns(): string {
    return "";
  }

  determineWinner(): string {
    return "";
  }

  render(): JSX.Element {
    const { dealer, player } = this.state;
    const textJSXtext =
      "pt-2 pb-10 text-center text-3xl text-white drop-shadow-lg text-shadow-lg text-shadow-black";
    return (
      <>
        <div className={textJSXtext}>
          {!this.gameOver ? (
            <Message onClick={undefined}>
              {this.playerTurn == 0 ? "Player's Turn" : "Dealer's Turn"}
            </Message>
          ) : (
            <Message onClick={undefined}>
              <b>
                Game Over! The Result is:&nbsp;
                {this.roundWinner}
              </b>
            </Message>
          )}
        </div>
        <div className="flex me-2 mb-2 pt-10 pb-10">
          <div className="drop-shadow-xl drop-shadow-black border-4 border-yellow-500 rounded-3xl ml-3 mr-3 flex-wrap w-1/2 p-8 justify-items-center bg-[url(/assets/felt-blue.jpg)]">
            {player.render()}
          </div>
          <div className="drop-shadow-xl drop-shadow-black border-4 border-yellow-500 rounded-3xl ml-3 mr-3 flex-wrap-reverse w-1/2 p-8 justify-items-center bg-[url(/assets/felt-red.jpg)]">
            {dealer.render()}
          </div>
        </div>
        <div className={textJSXtext}>
          <Message onClick={undefined}>
            Player's Score: {player.hand.calculateValue()}
            &nbsp; Dealer's Score: {dealer.hand.calculateValue()}
          </Message>
        </div>
      </>
    );
  }
}
