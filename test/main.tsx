import React from "react";
import ReactDOM from "react-dom";
import { useAccordion } from "../src/main";

const App: React.FC = () => {
  const [ref, dispatch] = useAccordion();

  return (
    <div>
      <button type="button" onClick={() => dispatch({ type: "TOGGLE" })}>
        Toggle
      </button>

      <div
        className="container"
        ref={ref}
        style={{
          height: 0,
          overflow: "hidden",
          transition: "height .3s ease-in-out",
        }}
      >
        <div
          style={{
            height: "500px",
            width: "500px",
            backgroundColor: "rebeccapurple",
          }}
        ></div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
