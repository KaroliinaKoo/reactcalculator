import { useReducer } from "react";

function reducer() {
  
}

function App() {

  const [state, dispatch] = useReducer(reducer)

  return (
    <div className="calc-container">
      <div className="output span">
        <div className="previous-operand"></div>
        <div className="current-operand"></div>
      </div>
      <div className="span">
        <button>C</button>
        <button>DEL</button>
      </div>
      <div className="span">
      <button>+</button>
      <button>−</button>
      <button>×</button>
      <button>÷</button>
      
      </div>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>

      <div className="span">
        <button>,</button>
        <button>0</button>
        <button>=</button>
        
      </div>
    </div>
  );
}

export default App;
