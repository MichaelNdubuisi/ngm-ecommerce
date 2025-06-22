import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import bg1 from "../assets/images/bg1.jpg";
import bg2 from "../assets/images/bg2.jpg";
import bg3 from "../assets/images/bg3.jpg";

// Slides with different text and images
const slides = [
  {
    image: bg1,
    title: "Style Redefined for Every Body",
    description: "Shop the trendiest unisex fashion from NGM and Luxury 🛍️",
  },
  {
    image: bg2,
    title: "Confidence Starts with What You Wear",
    description: "Elevate your look with high-quality streetwear and essentials.",
  },
  {
    image: bg3,
    title: "Express Yourself Boldly",
    description: "From bold prints to clean minimalism — we’ve got your style.",
  },
];

const animations = [
  {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 1.2, ease: "easeInOut" } },
  },
  {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: { duration: 1.2 } },
    exit: { opacity: 0, x: 100, transition: { duration: 1.2 } },
  },
  {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.2 } },
    exit: { opacity: 0, y: -100, transition: { duration: 1.2 } },
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);
  const [showText, setShowText] = useState(true);
  const [paused, setPaused] = useState(false);

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setShowText(true), 1000);
    return () => clearTimeout(timeout);
  }, [current]);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setShowText(false);
      setCurrent((prev) => (prev + 1) % slides.length);
      setAnimIndex((prev) => (prev + 1) % animations.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [paused]);

  const { image, title, description } = slides[current];
  const imageAnimation = animations[animIndex];

  return (
    <section
      className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[450px] overflow-hidden"
      aria-label="Hero Banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Helmet>
        <title>NGM and Luxury 🛍️ | Trendy Unisex Fashion</title>
        <meta
          name="description"
          content="Shop the trendiest unisex fashion from NGM and Luxury. Stylish clothing, hair, nails & accessories."
        />
      </Helmet>

      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={image}
          alt={`Fashion showcase ${current + 1}`}
          role="img"
          aria-label={`Fashion showcase ${current + 1}`}
          initial={imageAnimation.initial}
          animate={imageAnimation.animate}
          exit={imageAnimation.exit}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40 z-10" />

      {showText && (
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-8 lg:px-16">
          <motion.h1
            className="text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight max-w-3xl"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            key={`title-${current}`}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mt-2 text-xs sm:text-sm md:text-lg max-w-xl"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {description}
          </motion.p>
        </div>
      )}
    </section>
  );
};

export default Hero;
