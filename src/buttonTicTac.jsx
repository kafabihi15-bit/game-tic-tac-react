import './index.css';

function ButtonTicTac({ value, handleClick }) {
  return (
    <button onClick={handleClick} className="square">
      {value}
    </button>
  );
}

export default ButtonTicTac;
