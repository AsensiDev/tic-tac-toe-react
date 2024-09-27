import { useState } from "react"
import confetti from "canvas-confetti"
import Square from "./components/Square"
import { TURNS, WINNER_COMBOS } from './constants'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null)) 
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // saber si hay alguna opcion ganadora
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] ===  boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    // no actualizamos si hay algo o hay ganador
    if (board[index] || winner) return
    
    // actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
             {board[index]} 
            </Square>
          )
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <button onClick={resetGame}>
        Reiniciar
      </button>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false 
                  ? 'Empate'
                  : 'Ganó:'
                }
              </h2>

              <header className="win">
                {winner ? <Square>{winner}</Square> : <Square>🤝</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Reiniciar</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
