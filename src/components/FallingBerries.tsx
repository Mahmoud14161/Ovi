import { motion, useScroll, useTransform } from 'motion/react';

const strawberryImg = "https://drive.google.com/thumbnail?id=1FURKfpppRsalzXtvzDsgJ2RCjyug8EFP&sz=w500";
const blueberryImg = "https://drive.google.com/thumbnail?id=1le60dx37njHGiayDUbP1B06OZZ7S0212&sz=w500";

function Berry({ type, x, speed, rotateRange, size }: { type: 'strawberry' | 'blueberry', x: string, speed: string[], rotateRange: number[], size: string }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], speed);
  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);

  return (
    <motion.img
      src={type === 'strawberry' ? strawberryImg : blueberryImg}
      className={`absolute top-0 drop-shadow-2xl mix-blend-darken ${size}`}
      style={{ left: x, y, rotate }}
      alt={type}
      onError={(e) => e.currentTarget.style.display = 'none'}
    />
  );
}

export default function FallingBerries() {
  const berries = [
    { type: 'strawberry', x: '10%', speed: [ '-20vh', '150vh' ], rotateRange: [0, 360], size: 'w-16 md:w-24' },
    { type: 'blueberry', x: '80%', speed: [ '-10vh', '200vh' ], rotateRange: [45, -180], size: 'w-12 md:w-20' },
    { type: 'strawberry', x: '35%', speed: [ '-40vh', '190vh' ], rotateRange: [-45, 220], size: 'w-10 md:w-16 blur-[1px]' },
    { type: 'blueberry', x: '65%', speed: [ '-5vh', '180vh' ], rotateRange: [90, -290], size: 'w-14 md:w-20' },
    { type: 'strawberry', x: '85%', speed: [ '-60vh', '110vh' ], rotateRange: [180, -90], size: 'w-12 md:w-20' },
    { type: 'blueberry', x: '20%', speed: [ '-30vh', '170vh' ], rotateRange: [0, 470], size: 'w-10 md:w-16 blur-[2px]' },
    { type: 'strawberry', x: '55%', speed: [ '-15vh', '250vh' ], rotateRange: [-90, 90], size: 'w-20 md:w-32' },
  ] as const;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {berries.map((berry, i) => (
        <Berry key={i} {...berry} />
      ))}
    </div>
  );
}
