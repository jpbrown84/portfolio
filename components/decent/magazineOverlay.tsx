import React, { FunctionComponent } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import css from "styled-jsx/css";
import useViewportHeight from "../../helpers/useViewportHeight";

type MagazineOverlayProps = {
  transitionActive: boolean;
  colorSet: string[];
  transitionLength: number;
};

const styles = css`
  .wrapper {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1000;
  }
  .layer {
    position: absolute;
    top: 0;
    bottom: 0;
  }
`;

const MagazineOverlay: FunctionComponent<MagazineOverlayProps> = ({
  transitionActive,
  transitionLength,
  colorSet,
}: MagazineOverlayProps) => {
  const vh = useViewportHeight();
  return (
    <div
      className={`wrapper ${transitionActive ? "transitionActive" : ""}`}
      style={{ minHeight: vh }}
    >
      {colorSet.map((color, i) => (
        <div
          // we need the index in the key for duplicate colors.
          // eslint-disable-next-line react/no-array-index-key
          key={`${color}-${i}`}
          className="layer"
          style={{
            backgroundColor: color,
            transition: transitionActive
              ? `left ${transitionLength}s ease ${
                  (i * transitionLength) / 2
                }s, right ${2 * transitionLength}s ease ${
                  i * (transitionLength / 2) + transitionLength / 2
                }s`
              : "none",
            zIndex: 1000 - i,
            left: transitionActive ? "0" : "100%",
            right: transitionActive ? "100%" : "0",
          }}
        />
      ))}
      <style jsx>{styles}</style>
    </div>
  );
};

export default MagazineOverlay;
