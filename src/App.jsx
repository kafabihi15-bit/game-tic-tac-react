import { useState } from 'react'

// Button component for each square
function ButtonTicTac({ value, handleClick, isWinning }) {
  return (
    <button 
      onClick={handleClick}
      className={`
        w-24 h-24 text-4xl font-bold border-2 border-gray-300 
        bg-white hover:bg-gray-50 transition-all duration-200 
        rounded-lg shadow-md hover:shadow-lg transform hover:scale-105
        ${isWinning ? 'bg-green-200 border-green-400' : ''}
        ${value === 'X' ? 'text-blue-600' : 'text-red-500'}
        disabled:cursor-not-allowed
      `}
      disabled={value !== null}
    >
      {value && (
        <span className="animate-pulse">{value}</span>
      )}
    </button>
  )
}

export default function App(){
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('Pemain X');
  const [winningLine, setWinningLine] = useState([]);
  const [gameCount, setGameCount] = useState({ X: 0, O: 0, draw: 0 });

  function handleClick(i){
    if (squares[i] || checkWinner(squares).winner){
      return;
    }
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    
    const result = checkWinner(newSquares);
    
    if (result.winner) {
      setGameStatus(`🎉 Pemenangnya: ${result.winner}!`);
      setWinningLine(result.line);
      setGameCount(prev => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1
      }));
    } else if (newSquares.every(square => square !== null)) {
      setGameStatus('🤝 Permainan Seri!');
      setGameCount(prev => ({
        ...prev,
        draw: prev.draw + 1
      }));
    } else {
      setXIsNext(!xIsNext);
      setGameStatus(`Giliran: ${!xIsNext ? 'X' : 'O'}`);
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus('Pemain X');
    setWinningLine([]);
  }

  function resetScore() {
    setGameCount({ X: 0, O: 0, draw: 0 });
    resetGame();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎮 Tic Tac Toe
          </h1>
          <div className="text-xl font-semibold text-gray-600 mb-4">
            {gameStatus}
          </div>
        </div>

        {/* Score Board */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-blue-100 rounded-lg p-3">
            <div className="text-blue-600 font-bold text-lg">X</div>
            <div className="text-2xl font-bold text-blue-800">{gameCount.X}</div>
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="text-gray-600 font-bold text-lg">Seri</div>
            <div className="text-2xl font-bold text-gray-800">{gameCount.draw}</div>
          </div>
          <div className="bg-red-100 rounded-lg p-3">
            <div className="text-red-600 font-bold text-lg">O</div>
            <div className="text-2xl font-bold text-red-800">{gameCount.O}</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 mb-6 mx-auto max-w-xs">
          {squares.map((val, idx) => (
            <ButtonTicTac 
              key={idx} 
              value={val} 
              handleClick={() => handleClick(idx)}
              isWinning={winningLine.includes(idx)}
            />
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 justify-center">
          <button 
            onClick={resetGame}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔄 Main Lagi
          </button>
          <button 
            onClick={resetScore}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔢 Reset Skor
          </button>
        </div>

        {/* Current Player Indicator */}
        {!checkWinner(squares).winner && !squares.every(square => square !== null) && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <div className={`w-4 h-4 rounded-full ${xIsNext ? 'bg-blue-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-700 font-medium">
                Giliran: <span className={xIsNext ? 'text-blue-600' : 'text-red-500'}>{xIsNext ? 'X' : 'O'}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function checkWinner(squares){
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]            // diagonal
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}