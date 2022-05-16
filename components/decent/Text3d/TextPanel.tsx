import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import css from "styled-jsx/css";
import stylingConfig from "../../../stylingConfig";
import TextCanvas from "./TextCanvas";

const styles = css`
  .wrapper {
    min-height: 100vh;
    width: 100%;
  }
  .panel {
    min-height: 100vh;
    width: 100%;
    position: relative;
    background-color: ${stylingConfig.decentColors.coconutCream};
  }
`;

const TextPanel = () => {
  // only render the portal client-side
  const [showTextPanel, setShowTextPanel] = useState(false);
  useEffect(() => {
    setShowTextPanel(true);
  }, []);

  return (
    <div className="wrapper">
      <div className="panel" id="canvasWrapper" />
      {showTextPanel && <TextCanvas />}
      <style jsx>{styles}</style>
    </div>
  );
};

export default TextPanel;
