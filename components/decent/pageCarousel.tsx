import Image from "next/image";
import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import css from "styled-jsx/css";
import stylingConfig from "../../stylingConfig";
import MagazineOverlay from "./magazineOverlay";

type PageCarouselProps = {
  children: ReactNode[];
  transitionColorSet: string[];
};

const styles = css`
  .panel {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: calc(100vh);
    z-index: 1;
  }
  .selectors {
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    background-color: ${stylingConfig.decentColors.coconutCream};
    padding: 20px 0;
    border-radius: 40px;
    z-index: 10;
  }
  .selector {
    margin: 0 20px;
    background-color: ${stylingConfig.decentColors.mineShaft};
    height: 44px;
    width: 44px;
    border-radius: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
  }
  .selector:hover:not(:disabled) {
    transform: translateY(-4px);
  }
  .selector:disabled {
    background-color: ${stylingConfig.decentColors.scorpion};
    cursor: auto;
  }
`;

// what is the length of our transition. This is the time it takes for the swipe to obscure the page (so we can move our panels around).
const overlayTransitionLength = 0.3;

// how long do the panels stay on-screen?
const panelDuration = 4;

const PageCarousel: FunctionComponent<PageCarouselProps> = ({
  children,
  transitionColorSet,
}: PageCarouselProps) => {
  // are we firing our overlay transition?
  const [transitionActive, setTransitionActive] = useState(false);

  // what is our current visible panel?
  const [currentPanel, setCurrentPanel] = useState(0);

  // what is our requested panel? Clicks or timers will request a panel using this state.
  const [requestedPanel, setRequestedPanel] = useState(0);

  // has the user disabled animation?
  const [animationDisabled, setAnimationDisabled] = useState(false);

  // if we request a new panel, fire the transition, change the panel.
  useEffect(() => {
    let panelTimer: any;
    let clearTransitionTimer: any;
    // if the requested panel is not the current panel, set things in motion
    if (requestedPanel !== currentPanel) {
      // fire our transition
      setTransitionActive(true);

      // reset our transition after it's done
      clearTransitionTimer = setTimeout(() => {
        setTransitionActive(false);
      }, 1000 * (overlayTransitionLength + (transitionColorSet.length + 1) * (overlayTransitionLength / 2) + overlayTransitionLength / 2));

      // wait for the page to be obscured, then move our panel
      panelTimer = setTimeout(() => {
        setCurrentPanel(requestedPanel);
      }, overlayTransitionLength * 1000);
    }
    // clear our timers in case of unmount
    return () => {
      clearTimeout(panelTimer);
      clearTimeout(clearTransitionTimer);
    };
  }, [requestedPanel, currentPanel, transitionColorSet]);

  // loop through our panels
  useEffect(() => {
    let requestPanelInterval: any;
    if (!animationDisabled) {
      requestPanelInterval = setInterval(() => {
        setRequestedPanel((curr) => (curr + 1) % children.length);
      }, panelDuration * 1000);
    }
    // clear our interval in case of unmount
    return () => {
      clearInterval(requestPanelInterval);
    };
  }, [animationDisabled, children.length]);

  return (
    <div className="wrapper">
      <MagazineOverlay
        transitionActive={transitionActive}
        transitionLength={overlayTransitionLength}
        colorSet={transitionColorSet}
      />
      {children?.map((child, i) => (
        <div
          className="panel"
          // eslint-disable-next-line react/no-array-index-key
          key={`panel-${i}`}
          style={{ visibility: currentPanel === i ? "visible" : "hidden" }}
        >
          {child}
        </div>
      ))}
      <div className="selectors">
        <button
          type="button"
          className="selector"
          onClick={() => {
            setRequestedPanel((curr) => {
              if (curr === 0) {
                return children.length - 1;
              }
              return curr - 1;
            });
            setAnimationDisabled(true);
          }}
          disabled={transitionActive}
        >
          <Image
            src={
              transitionActive
                ? "/icons/decent/arrow-left-disabled.svg"
                : "/icons/decent/arrow-left.svg"
            }
            alt="Previous"
            width={30}
            height={30}
          />
        </button>
        <button
          type="button"
          className="selector"
          onClick={() => {
            setAnimationDisabled(true);
          }}
          disabled={transitionActive}
        >
          <Image
            src={
              // eslint-disable-next-line no-nested-ternary
              animationDisabled
                ? transitionActive
                  ? "/icons/decent/play-circle-disabled.svg"
                  : "/icons/decent/play-circle.svg"
                : transitionActive
                ? "/icons/decent/pause-circle-disabled.svg"
                : "/icons/decent/pause-circle.svg"
            }
            alt="Previous"
            width={26}
            height={26}
          />
        </button>
        <button
          type="button"
          className="selector"
          onClick={() => {
            setRequestedPanel((curr) => (curr + 1) % children.length);
            setAnimationDisabled(true);
          }}
          disabled={transitionActive}
        >
          <Image
            src={
              transitionActive
                ? "/icons/decent/arrow-right-disabled.svg"
                : "/icons/decent/arrow-right.svg"
            }
            alt="Previous"
            width={30}
            height={30}
          />
        </button>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default PageCarousel;
