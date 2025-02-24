import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS} from "./winning-combinations"
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_BORAD_GAME  = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns)
{
  let activePlayer = 'X';
      
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        activePlayer = 'O';
      }
      return activePlayer;
}

function derivedWinner(gameBoard, players)
{
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function derivedGameBorad(gameTurns)
{
  let gameBoard = [...INITIAL_BORAD_GAME.map(innerArray => [...innerArray])];

  for(const turn of gameTurns){
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  const [ players, setPlayers ] = useState(PLAYERS)
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBorad(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSqaure(rowIndex, colIndex)
  {
    setGameTurns((prevTurns) => {
      let currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex , col: colIndex }, player: currentPlayer},
        ...prevTurns,
      ];
      return updatedTurns;
    })
  }

  function handleRematch()
  {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName)
  {
    setPlayers(prevPlayers => {
      return{
          ...prevPlayers,
          [symbol]: newName
      };
    });
  }

  return <main>
    <div id="game-container"> 
      <ol id="players" className="highlight-player">
       <Player 
          initname={PLAYERS.X} 
          symbol="X" 
          isActive={ activePlayer === 'X'} 
          onChangeName={handlePlayerNameChange}
       />
       <Player 
          initname={PLAYERS.O} 
          symbol="O" 
          isActive={ activePlayer === 'O'} 
          onChangeName={handlePlayerNameChange}
        />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
      <GameBoard onSelectSquare={handleSelectSqaure} board={gameBoard} />
    </div>
    <Log turns={gameTurns}/>
  </main>;
}

export default App
