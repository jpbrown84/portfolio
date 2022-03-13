import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
    padding: 20px;
  }
  .card {
    position: absolute;
    width: 425px;
    height: 275px;
    background-color: ${stylingConfig.colors.petiteOrchard};
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: flat;
    font-family: ${stylingConfig.fonts.openSans};
    backface-visibility: hidden;
    top: calc(50% - 137.5px);
    left: calc(50% - 212.5px);
    border-radius: 2px;
    cursor: url("repeat.svg"), auto;
    overflow: hidden;
  }
  .face {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    filter: url(#wavy2);
    box-shadow: inset 0 0 10px ${stylingConfig.colors.matrix};
    padding: 60px 0;
  }
  .name {
    text-transform: uppercase;
    font-size: 38px;
    line-height: 48px;
    font-weight: 700;
    letter-spacing: 1px;
    display: inline;
  }
  .subTitle {
    margin-top: 30px;
    font-family: ${stylingConfig.fonts.courierPrime};
    text-transform: uppercase;
    font-size: 18px;
    display: inline;
  }
  .flipText {
    margin-top: 30px;
    font-family: ${stylingConfig.fonts.courierPrime};
    text-transform: uppercase;
    font-size: 13px;
    display: inline;
  }
  .turbulence {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.15;
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
    width: 224px;
    height: 2px;
    position: relative;
    margin: 0 auto;
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
  .subSpacer {
    height: 20px;
  }
  .phoneSpacer {
    height: 30px;
  }
  .flipSpacer {
    height: 40px;
  }
  @media screen and (max-width: 500px) {
    .card {
      width: 350px;
      height: 220px;
      top: calc(50% - 110px);
      left: calc(50% - 175px);
    }
    .face {
      padding: 40px 0;
    }
    .name {
      font-size: 30px;
    }
    .subTitle {
      font-size: 16px;
    }
    .subSpacer {
      height: 15px;
    }
    .flipSpacer {
      height: 30px;
    }
    .flipText {
      font-size: 12px;
    }
    .phoneSpacer {
      height: 25px;
    }
    .underlineWrapper {
      width: 201px;
    }
  }
  @media screen and (max-width: 389px) {
    .card {
      width: 280px;
      height: 200px;
      top: calc(50% - 100px);
      left: calc(50% - 140px);
    }
    .face {
      padding: 35px 0;
    }
    .name {
      font-size: 26px;
    }
    .subTitle {
      font-size: 14px;
    }
    .subSpacer {
      height: 10px;
    }
    .flipSpacer {
      height: 20px;
    }
    .phoneSpacer {
      height: 20px;
    }
    .underlineWrapper {
      width: 176px;
    }
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

  // is the user using a mobile device?
  const [usingMobileDevice, setUsingMobileDevice] = useState(false);

  // states for mobile device rotation (IRL rotation using javascript)
  const [deviceFrontToBack, setDeviceFrontToBack] = useState(0);
  const [deviceLeftToRight, setDeviceLeftToRight] = useState(0);

  // when we have a scene div, measure it and assign the height and width to state
  useEffect(() => {
    if (sceneRef && sceneRef.current) {
      const sceneDimensions = sceneRef.current.getBoundingClientRect();
      setSceneWidth(sceneDimensions.width);
      setSceneHeight(sceneDimensions.height);
    }
  }, []);

  // if we have orientation events, set them to state
  const handleOrientationEvent = useCallback(
    (frontToBack: number | null, leftToRight: number | null) => {
      if (frontToBack) {
        const roundedFrontToBack = Math.round(frontToBack * 10) / 10;
        if (deviceFrontToBack !== roundedFrontToBack)
          setDeviceFrontToBack(roundedFrontToBack);
      }
      if (leftToRight) {
        const roundedLeftToRight = Math.round(leftToRight * 10) / 10;
        if (deviceLeftToRight !== roundedLeftToRight) {
          setDeviceLeftToRight(roundedLeftToRight);
        }
      }
    },
    [deviceFrontToBack, deviceLeftToRight]
  );

  // check to see if we're on a mobile device
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      /Mobi|Android/i.test(navigator.userAgent)
    ) {
      setUsingMobileDevice(true);
    }
  }, []);

  // if we're on a mobile device, set a listener on our device orientation
  useEffect(() => {
    window.addEventListener("deviceorientation", (event): any => {
      // gamma: left to right
      const leftToRight = event.gamma;
      // beta: front back motion
      const frontToBack = event.beta;
      if (usingMobileDevice) {
        handleOrientationEvent(frontToBack, leftToRight);
      }
    });

    return () => {
      window.removeEventListener(
        "deviceorientation",
        handleOrientationEvent as any
      );
    };
  }, [handleOrientationEvent, usingMobileDevice]);

  // this variable caps the amount of rotation of the card
  const rotationMultiplier = 0.15;

  return (
    <div
      className="scene"
      ref={sceneRef}
      onMouseMove={(e) => {
        // if we're on desktop (otherwise we use device rotation)
        if (!usingMobileDevice) {
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
        }
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
                  increment += 3;
                  if (increment <= 180) {
                    setExtraXRotation(increment);
                  }
                }
                if (face === "back") {
                  increment -= 3;
                  if (increment >= 0) {
                    setExtraXRotation(increment);
                  }
                }
              }, 1000 / 60);
              setTimeout(() => {
                clearInterval(incrementor);
                setFlipping(false);
              }, 1000);
            }
          }}
          className={`card ${face}`}
          style={{
            boxShadow: usingMobileDevice
              ? `rgba(0, 0, 0, 0.33) ${deviceLeftToRight * 1.5}px ${
                  deviceFrontToBack * 1.5
                }px 30px 20px`
              : "rgba(0, 0, 0, 0.33) 40px 40px 20px",
            // rotate our card in the X and Y plane depending on mouse position. Use the multiplier to cap the rotation
            transform:
              face === "front"
                ? `rotateY(${
                    usingMobileDevice
                      ? 0 + extraXRotation
                      : rotationX * rotationMultiplier + extraXRotation
                  }deg) rotateX(${
                    usingMobileDevice ? 0 : rotationY * rotationMultiplier
                  }deg)`
                : `rotateY(${
                    usingMobileDevice
                      ? 0 + 180 + extraXRotation
                      : rotationX * rotationMultiplier + 180 + extraXRotation
                  }deg) rotateX(${
                    usingMobileDevice ? 0 : rotationY * rotationMultiplier
                  }deg)`,
            // our radial background center should move as the card tilts
            backgroundImage:
              face === "front"
                ? `radial-gradient(ellipse at ${
                    usingMobileDevice
                      ? 50 - deviceLeftToRight - (100 / 180) * extraXRotation
                      : radialCenterX - (100 / 180) * extraXRotation
                  }% ${
                    usingMobileDevice ? 50 - deviceFrontToBack : radialCenterY
                  }%,
            ${stylingConfig.colors.petiteOrchard},
            ${stylingConfig.colors.petiteOrchard}
          )`
                : `radial-gradient(ellipse at ${
                    usingMobileDevice
                      ? 100 -
                        (100 / 180) * extraXRotation +
                        50 -
                        deviceLeftToRight
                      : 100 - (100 / 180) * extraXRotation + radialCenterX
                  }% ${
                    usingMobileDevice ? 50 - deviceFrontToBack : radialCenterY
                  }%,
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
                      usingMobileDevice
                        ? 50 - deviceLeftToRight - (100 / 180) * extraXRotation
                        : radialCenterX - (100 / 180) * extraXRotation
                    }% ${
                      usingMobileDevice ? 50 - deviceFrontToBack : radialCenterY
                    }%, ${
                      usingMobileDevice
                        ? stylingConfig.colors.tussock
                        : stylingConfig.colors.copper
                    },
                ${stylingConfig.colors.craterBrown})`
                  : `radial-gradient(ellipse at ${
                      usingMobileDevice
                        ? 100 -
                          (100 / 180) * extraXRotation +
                          50 -
                          deviceLeftToRight
                        : 100 - (100 / 180) * extraXRotation + radialCenterX
                    }% ${
                      usingMobileDevice ? 50 - deviceFrontToBack : radialCenterY
                    }%, ${
                      usingMobileDevice
                        ? stylingConfig.colors.tussock
                        : stylingConfig.colors.copper
                    },
                      ${stylingConfig.colors.craterBrown})`,
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            {face === "front" && <h2 className="name">James Brown</h2>}
            <br />
            {face === "front" ? (
              <>
                <div className="subSpacer" />
                <p className="subTitle">React Developer</p>
                <br />
              </>
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
                <div className="phoneSpacer" />
                <p className="subTitle">(07445) 769690</p>
                <br />
              </>
            )}
            <div className="flipSpacer" />
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
