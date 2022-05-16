import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom";
import { AxesHelper } from "three";
import TextMesh from "./TextMesh";

const TextCanvas = () => {
  return ReactDOM.createPortal(
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [1, 1, 2], fov: 70, near: 0.1, far: 100 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <TextMesh position={[0, 0, 0]} />
        {/* <primitive object={new AxesHelper(10)} /> */}
      </Canvas>
    </div>,
    document.getElementById("canvasWrapper")!
  );
};

export default TextCanvas;
