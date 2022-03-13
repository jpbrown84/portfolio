import React, { FunctionComponent, useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import css from "styled-jsx/css";
import stylingConfig from "../stylingConfig";

const styles = css`
  .scene {
    min-height: 100vh;
    width: 100%;
    background-color: ${stylingConfig.colors.mineShaft};
    perspective: 700px;
    position: relative;
  }
  .card {
    position: absolute;
    width: 425px;
    height: 275px;
    background-color: ${stylingConfig.colors.petiteOrchard};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.33) 20px 40px 40px;
    transform-style: flat;
    font-family: ${stylingConfig.fonts.openSans};
    backface-visibility: hidden;
    top: calc(50% - 137.5px);
    left: calc(50% - 212.5px);
    border-radius: 2px;
    cursor: url("repeat.svg"), auto;
  }
  .face {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    filter: url(#wavy2);
    box-shadow: inset 0 0 10px ${stylingConfig.colors.matrix};
  }
  .name {
    text-transform: uppercase;
    font-size: 38px;
    line-height: 48px;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .subTitle {
    margin-top: 30px;
    font-family: ${stylingConfig.fonts.courierPrime};
    text-transform: uppercase;
    font-size: 18px;
  }
  .flipText {
    margin-top: 30px;
    font-family: ${stylingConfig.fonts.courierPrime};
    text-transform: uppercase;
    font-size: 13px;
  }
  .turbulence {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.2;
    pointer-events: none;
  }
  .lowercase {
    text-transform: none;
  }
  .noTopMar {
    margin-top: 0;
  }

  .link {
    color: transparent;
    cursor: pointer;
  }
  .underlineWrapper {
    width: 100%;
    height: 2px;
    position: relative;
  }
  .underline {
    position: absolute;
    height: 2px;
    background-color: transparent;
    transition: all 0.3s;
  }
  .underline.left {
    clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
    top: 0;
    left: 0;
    width: 100%;
  }
  .underline.right {
    clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
    top: 0;
    right: 0;
    width: 100%;
  }
  .underline.left.hovered {
    clip-path: polygon(50% 0, 0 0, 0 100%, 50% 100%);
  }
  .underline.right.hovered {
    clip-path: polygon(100% 0%, 50% 0, 50% 100%, 100% 100%);
  }
`;

const BusinessCard: FunctionComponent = () => {
  // ref for our scene so we can get dimensions
  const sceneRef = useRef<HTMLDivElement>(null);

  // state to house our scene dimensions
  const [sceneWidth, setSceneWidth] = useState(0);
  const [sceneHeight, setSceneHeight] = useState(0);

  // create state to house our mouse position inside the div.
  // this will be from -100 to 100. -100 being left / bottom, and 100 being right / top
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  // state to determine whether the card is flipped
  const [flipped, setFlipped] = useState(false);

  // are we mid-flip?
  const [flipping, setFlipping] = useState(false);

  // our extra rotation to animate the card flip
  const [extraXRotation, setExtraXRotation] = useState(0);

  // create state to house radial gradient center (i.e. light source)
  const [radialCenterX, setRadialCenterX] = useState(50);
  const [radialCenterY, setRadialCenterY] = useState(50);

  // is the email link hovered
  const [emailHovered, setEmailHovered] = useState(false);

  // when we have a scene div, measure it and assign the height and width to state
  useEffect(() => {
    if (sceneRef && sceneRef.current) {
      const sceneDimensions = sceneRef.current.getBoundingClientRect();
      setSceneWidth(sceneDimensions.width);
      setSceneHeight(sceneDimensions.height);
    }
  }, []);

  // this variable caps the amount of rotation of the card
  const rotationMultiplier = 0.15;

  return (
    <div
      className="scene"
      ref={sceneRef}
      onMouseMove={(e) => {
        // get the percentage of the mouse position from the center of the div
        const mouseXFromCenter =
          (100 / sceneWidth) * (e.clientX - sceneWidth / 2);
        const mouseYFromCenter =
          (100 / sceneHeight) * (e.clientY - sceneHeight / 2) * -1;
        // get the percentage of the mouse position from the top left of the div
        const mouseXFromLeft = (100 / sceneWidth) * e.clientX;
        const mouseYFromTop = (100 / sceneHeight) * e.clientY;
        setRotationX(mouseXFromCenter);
        setRotationY(mouseYFromCenter);
        setRadialCenterX(100 - mouseXFromLeft);
        setRadialCenterY(100 - mouseYFromTop);
      }}
    >
      {["front", "back"].map((face) => (
        <button
          key={face}
          type="button"
          onClick={() => {
            if (!flipping) {
              setFlipping(true);
              setFlipped(!flipped);
              let increment = face === "front" ? 0 : 180;
              const incrementor = setInterval(() => {
                if (face === "front") {
                  increment += 1;
                  if (increment <= 180) {
                    setExtraXRotation(increment);
                  }
                }
                if (face === "back") {
                  increment -= 1;
                  if (increment >= 0) {
                    setExtraXRotation(increment);
                  }
                }
              }, 1000 / 180);
              setTimeout(() => {
                clearInterval(incrementor);
                setFlipping(false);
              }, 1000);
            }
          }}
          className={`card ${face}`}
          style={{
            // rotate our card in the X and Y plane depending on mouse position. Use the multiplier to cap the rotation
            transform:
              face === "front"
                ? `rotateY(${
                    rotationX * rotationMultiplier + extraXRotation
                  }deg) rotateX(${rotationY * rotationMultiplier}deg)`
                : `rotateY(${
                    rotationX * rotationMultiplier + 180 + extraXRotation
                  }deg) rotateX(${rotationY * rotationMultiplier}deg)`,
            // our radial background center should move as the card tilts
            backgroundImage:
              face === "front"
                ? `radial-gradient(
            ellipse at ${
              radialCenterX - (100 / 180) * extraXRotation
            }% ${radialCenterY}%,
            ${stylingConfig.colors.petiteOrchard},
            ${stylingConfig.colors.petiteOrchard}
          )`
                : `radial-gradient(
            ellipse at ${
              100 - (100 / 180) * extraXRotation + radialCenterX
            }% ${radialCenterY}%,
            ${stylingConfig.colors.petiteOrchard},
            ${stylingConfig.colors.petiteOrchard}
          )`,
          }}
        >
          <div
            className="face"
            style={{
              // our radial background center should move as the card tilts
              backgroundImage:
                face === "front"
                  ? `radial-gradient(ellipse at ${
                      radialCenterX - (100 / 180) * extraXRotation
                    }% ${radialCenterY}%, ${stylingConfig.colors.copper},
                ${stylingConfig.colors.craterBrown})`
                  : `radial-gradient(ellipse at ${
                      100 - (100 / 180) * extraXRotation + radialCenterX
                    }% ${radialCenterY}%, ${stylingConfig.colors.copper},
                      ${stylingConfig.colors.craterBrown})`,
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            {face === "front" && <h1 className="name">James Brown</h1>}
            {face === "front" ? (
              <p className="subTitle">React Developer</p>
            ) : (
              <>
                <div className="linkWrapper">
                  <a
                    role="link"
                    tabIndex={0}
                    className="subTitle lowercase noTopMar link"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onKeyDown={() => {}}
                    onMouseOver={() => {
                      setEmailHovered(true);
                    }}
                    onMouseOut={() => {
                      setEmailHovered(false);
                    }}
                    onFocus={() => {
                      setEmailHovered(true);
                    }}
                    onBlur={() => {
                      setEmailHovered(false);
                    }}
                  >
                    jpbrown.dev@gmail.com
                  </a>
                  <div className="underlineWrapper">
                    {["left", "right"].map((ul) => (
                      <div
                        key={ul}
                        className={`underline ${
                          emailHovered ? "hovered" : ""
                        } ${ul}`}
                        style={{
                          backgroundImage: `radial-gradient(ellipse at ${
                            100 - (100 / 180) * extraXRotation + radialCenterX
                          }% ${radialCenterY}%, ${stylingConfig.colors.copper},
                      ${stylingConfig.colors.craterBrown})`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p className="subTitle">(07445) 769690</p>
              </>
            )}
            <p className="flipText">[ Click card to flip ]</p>
            <svg
              viewBox="0 0 200 130"
              xmlns="http://www.w3.org/2000/svg"
              className="turbulence"
            >
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>
        </button>
      ))}
      <style jsx>{styles}</style>
    </div>
  );
};

export default BusinessCard;