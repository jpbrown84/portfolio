/* eslint-disable no-return-assign */
import { useLoader } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { MeshNormalMaterial } from "three";

const TextMesh = ({ position }: { position: any }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>();

  // text config
  const config = useMemo(
    () => ({
      size: 0.5,
      height: 0.2,
      curveSegments: 50,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 30,
    }),
    []
  );

  const matcapTexture = useLoader(TextureLoader, "/textures/matcaps/8.png");

  return (
    <mesh position={position} ref={mesh}>
      <Center>
        <Text3D
          ref={mesh}
          font="/fonts/decent/Senilita_Regular_otf.json"
          {...config}
        >
          DECENT
          <meshMatcapMaterial matcap={matcapTexture} />
          {/* <meshNormalMaterial /> */}
        </Text3D>
      </Center>
    </mesh>
  );
};

export default TextMesh;
