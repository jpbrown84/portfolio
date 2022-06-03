import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import css from "styled-jsx/css";
import stylingConfig from "../../../stylingConfig";
import TextCanvas from "./SceneCanvas";

const styles = css`
  .wrapper {
    min-height: 100vh;
    width: 100%;
  }
  .panel {
    min-height: 100vh;
    width: 100%;
    position: relative;
    background: linear-gradient(
        217deg,
        ${stylingConfig.decentColors.coconutCream},
        rgba(255, 0, 0, 0) 70.71%
      ),
      linear-gradient(
        127deg,
        ${stylingConfig.decentColors.spray},
        rgba(0, 255, 0, 0) 70.71%
      ),
      linear-gradient(
        336deg,
        ${stylingConfig.decentColors.mineShaft},
        rgba(0, 0, 255, 0) 70.71%
      );
    background-color: ${stylingConfig.decentColors.spray};
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
