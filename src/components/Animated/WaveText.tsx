import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const AnimFeTurbulence = animated("feTurbulence");
const AnimFeDisplacementMap = animated("feDisplacementMap");

export default function WaveText() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, []);

  const [{ freq, factor, scale, opacity }] = useSpring(() => ({
    reverse: open,
    from: { factor: 150, opacity: 1, scale: 1, freq: "0.0, 0.0" },
    to: { factor: 10, opacity: 0, scale: 0.9, freq: "0.0175, 0.0" },
    config: { duration: 3000 },
  }));

  return (
    <div className="flex items-center justify-center h-full">
      <animated.svg
        className="w-[350px]"
        style={{ scale, opacity }}
        viewBox="0 0 200 50"
      >
        <defs>
          <filter id="waves">
            <AnimFeTurbulence
              type="fractalNoise"
              baseFrequency={freq}
              numOctaves="2"
              result="TURB"
              seed="8"
            />
            <AnimFeDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              in="SourceGraphic"
              in2="TURB"
              result="DISP"
              scale={factor}
            />
          </filter>
        </defs>
        <g filter="url(#waves)">
          <text
            x="10"
            y="35"
            fill="white"
            fontFamily="Arial, sans-serif"
            fontSize="30"
            fontWeight="bold"
          >
            Netwiz
          </text>
        </g>
      </animated.svg>
    </div>
  );
}
