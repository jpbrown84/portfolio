/* eslint-disable no-return-assign */
import { useFrame } from "@react-three/fiber";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";

type BubbleMeshProps = {
  onPop: () => void;
};

const BubbleMesh: FunctionComponent<BubbleMeshProps> = ({
  onPop,
}: BubbleMeshProps) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>();

  // CONSTS
  // opacity for our 'bubble'
  const bubbleTransparency = 0.4;

  // REFS
  // our bubble radius
  const rad = useRef(Math.random() * 0.3);

  // our rate of change in the Y direction (how fast the bubble rises)
  const rateY = useRef(Math.random() + 1);

  // our multiplier for x drift
  const driftX = useRef((Math.random() - 0.5) * 0.2);

  // our rate of oscillation for x drift
  const oscX = useRef(Math.random() * 4);

  // our multiplier for z drift
  const driftZ = useRef((Math.random() - 0.5) * 0.2);

  // our rate of oscillation for z drift
  const oscZ = useRef(Math.random() * 4);

  // our multiplier for x deformation
  const deformX = useRef(Math.random() * 0.2);

  // our rate of oscillation for x deformation
  const deformOscX = useRef(Math.random() * 1);

  // our multiplier for y deformation
  const deformY = useRef(Math.random() * 0.2);

  // our rate of oscillation for y deformation
  const deformOscY = useRef(Math.random() * 1);

  // our multiplier for z deformation
  const deformZ = useRef(Math.random() * 0.2);

  // our rate of oscillation for z deformation
  const deformOscZ = useRef(Math.random() * 1);

  // get some starting positions
  const startingX = useRef(Math.random() * 10 - 5);
  const startingY = useRef(Math.random() * 10 - 5);
  const startingZ = useRef(Math.random() * 10 - 5);

  // STATES
  // scales for deforming the bubble
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [scaleZ, setScaleZ] = useState(1);

  // position of the bubble in the scene
  const [xPos, setXPos] = useState(startingX.current);
  const [yPos, setYPos] = useState(startingY.current);
  const [zPos, setZPos] = useState(startingZ.current);

  // how see-through is our bubble?
  const [opacity, setOpacity] = useState(bubbleTransparency);

  // has our bubble been popped?
  const [isPopped, setIsPopped] = useState(false);

  // animation function
  useFrame(({ clock }) => {
    // bubbles float from y position -5 to 5
    setYPos(
      ((startingY.current + clock.getElapsedTime() * rateY.current) % 10) - 5
    );
    // wobble in the x direction
    setXPos(
      startingX.current +
        Math.sin(clock.elapsedTime * oscX.current) * driftX.current
    );
    // wobble in the z direction
    setZPos(
      startingZ.current +
        Math.sin(clock.elapsedTime * oscZ.current) * driftZ.current
    );
    // deform in the x direction
    setScaleX(
      1 + Math.sin(clock.elapsedTime * deformOscX.current) * deformX.current
    );
    // deform in the x direction
    setScaleY(
      1 + Math.sin(clock.elapsedTime * deformOscY.current) * deformY.current
    );
    // deform in the x direction
    setScaleZ(
      1 + Math.sin(clock.elapsedTime * deformOscZ.current) * deformZ.current
    );
  });

  // at each end of our Y scale, we'll set the opacity to fade to 0, so we don't get objects appearing and disappearing suddenly
  useEffect(() => {
    if (yPos > 4) {
      // if the bubble has been popped we dont want to show it
      if (isPopped) {
        return;
      }
      // else...
      setOpacity((5 - yPos) * bubbleTransparency);
      return;
    }
    if (yPos < -4) {
      setOpacity((5 + yPos) * bubbleTransparency);
      return;
    }
    // if the bubble has been popped we dont want to show it
    if (isPopped) {
      return;
    }
    // apart from the ends of our y scale, we'll default to our normal bubble opacity
    if (opacity !== 1) {
      setOpacity(bubbleTransparency);
    }
  }, [yPos, bubbleTransparency, opacity, isPopped]);

  const handlePop = () => {
    // pass the pop up to the parent (for audio)
    onPop();

    // hide our bubble
    setOpacity(0);
    // set the popped state to true
    setIsPopped(true);
  };

  return (
    <mesh
      position={[xPos, yPos, zPos]}
      ref={mesh}
      scale={[scaleX, scaleY, scaleZ]}
      onPointerDown={handlePop}
    >
      <sphereGeometry attach="geometry" args={[rad.current, 32, 32]} />
      <meshNormalMaterial attach="material" transparent opacity={opacity} />
    </mesh>
  );
};

export default BubbleMesh;
