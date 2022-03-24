import { useAccordion } from "./main.jsx";
import "./Example.stories.css";

export const Example = () => {
  const [ref, dispatch] = useAccordion<HTMLDivElement>();
  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <section>
      <div ref={ref} className="content">
        <div style={{ height: "500px" }}>Content</div>
      </div>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
    </section>
  );
};
