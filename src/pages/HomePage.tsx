import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  const animationVariants = {
    hidden: { x: -1000, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  return (
    <>
      <motion.h1
        className={"font-bold text-4xl text-center w-full"}
        initial={"hidden"}
        animate={"visible"}
        transition={{ duration: 1 }}
        variants={animationVariants}
      >
        HomePage
      </motion.h1>
      <motion.img
        style={{ width: "230px", height: "200px" }}
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
        }
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          // repeatDelay: 1,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      <br />
      <motion.a whileHover={{ scaleY: 2, color: "red" }}>
        Animated link!
      </motion.a>
    </>
  );
};

export default HomePage;
