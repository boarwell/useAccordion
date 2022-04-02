import { useAccordion, useAccordionX } from "./main.jsx";
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

export const ExampleX = () => {
  const { containerRef, toggle } = useAccordionX<HTMLDivElement>();

  return (
    <section>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
      <div ref={containerRef} className="content">
        <div style={{ height: "500px", background: "#fafafa" }}>Content</div>
      </div>
    </section>
  );
};
