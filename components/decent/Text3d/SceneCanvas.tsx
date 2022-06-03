import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { AxesHelper } from "three";
import useViewportHeight from "../../../helpers/useViewportHeight";
import useScreenWidth from "../../../hooks/useScreenWidth";
import BubbleMesh from "./BubbleMesh";
import TextMesh from "./TextMesh";

const SceneCanvas = () => {
  const screenWidth = useScreenWidth();

  const [currentAudioChannel, setCurrentAudioChannel] = useState(0);

  const bubblePopAudioSamples = useRef([
    new Audio("/audio/pop1.wav"),
    new Audio("/audio/pop2.wav"),
    new Audio("/audio/pop3.wav"),
    new Audio("/audio/pop4.wav"),
    new Audio("/audio/pop5.wav"),
    new Audio("/audio/pop6.wav"),
    new Audio("/audio/pop7.wav"),
    new Audio("/audio/pop8.wav"),
  ]);

  const handleBubblePop = useCallback(() => {
    bubblePopAudioSamples.current[currentAudioChannel].play();
    setCurrentAudioChannel((currentAudioChannel + 1) % 8);
  }, [currentAudioChannel]);

  // camera position based on viewport size
  let cameraPos = 1.5;
  if (screenWidth < 769) {
    cameraPos = 5;
  }

  const vh = useViewportHeight();
  return ReactDOM.createPortal(
    <div style={{ width: "100%", height: vh }}>
      <Canvas
        camera={{ position: [cameraPos, 1, 2], fov: 70, near: 0.1, far: 100 }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <TextMesh position={[0, 0, 0]} />
        {/* <primitive object={new AxesHelper(10)} /> */}
        {new Array(150).fill("bubble").map((x, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <BubbleMesh key={`${x}-${i}`} onPop={handleBubblePop} />
        ))}
        <OrbitControls
          autoRotate
          autoRotateSpeed={0}
          minDistance={1}
          maxDistance={8}
        />
      </Canvas>
    </div>,
    document.getElementById("canvasWrapper")!
  );
};

export default SceneCanvas;
