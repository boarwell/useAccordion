import { useAccordion } from "./main.jsx";
import "./Example.stories.css";

export const Example = () => {
  const { containerRef, toggle } = useAccordion<HTMLDivElement>();
  const { containerRef: nestedRef, toggle: nestedToggle } =
    useAccordion<HTMLDivElement>();

  return (
    <section>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
      <div ref={containerRef} className="content">
        <div style={{ height: "500px", background: "#fafafa" }}>
          Content
          <button type="button" onClick={nestedToggle}>
            Nested Toggle
          </button>
        </div>

        <div ref={nestedRef} className="content">
          <div style={{ height: "500px", background: "#f0f0f0" }}>
            Nested Content
          </div>
        </div>
      </div>
    </section>
  );
};
