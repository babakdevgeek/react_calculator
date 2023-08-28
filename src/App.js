import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [display, set_display] = useState("");
  const [expression, set_expression] = useState([]);
  const handle_click = (value) => {
    const items_to_check = ["+", "-", "*", "/"];
    for (let i = 0; i < expression.length; i++) {
      if (items_to_check.includes(expression[i])) {
        expression[i] = " " + expression[i] + " ";
      }
    }
    set_expression([...expression, value]);
    set_display(value);
    if (value === "clear") {
      set_expression([]);
      set_display("");
    }
  }
  const handle_result = () => {
    set_display(expression
      .join("")
      .replace(/\s+/g, "")
      .split(/(\D)/g)
      .map(item => item.match(/\d/g) ? parseInt(item, 0) : item)
      .reduce((acc, current, cindex, arr) => {
        switch (current) {
          case "+":
            return (acc = acc + arr[cindex + 1]);
          case "-":
            return (acc = acc - arr[cindex + 1]);
          case "*":
            return (acc = acc * arr[cindex + 1]);
          case "/":
            return (acc = acc / arr[cindex + 1]);
          default:
            return acc;
        }

      })
    )
    set_expression("");
  }
  return (
    <div className='app'>
      <h1 className="display">{display}</h1>
      <p className="expression">{expression}</p>
      <section className="panel">
        <section className="numbers">
          <button onClick={() => handle_click("clear")} className='clear'>clear</button>
          <button onClick={() => handle_click(7)}>7</button>
          <button onClick={() => handle_click(8)}>8</button>
          <button onClick={() => handle_click(9)}>9</button>
          <button onClick={() => handle_click(4)}>4</button>
          <button onClick={() => handle_click(5)}>5</button>
          <button onClick={() => handle_click(6)}>6</button>
          <button onClick={() => handle_click(1)}>1</button>
          <button onClick={() => handle_click(2)}>2</button>
          <button onClick={() => handle_click(3)}>3</button>
          <button onClick={() => handle_click(0)}>0</button>
        </section>
        <section className="operators">
          <button onClick={() => handle_click("+")}>+</button>
          <button onClick={() => handle_click("-")}>-</button>
          <button onClick={() => handle_click("*")}>*</button>
          <button onClick={() => handle_click("/")}>/</button>
          <button onClick={() => handle_result("=")}>=</button>

        </section>
      </section>
    </div>
  )

}

export default App;
