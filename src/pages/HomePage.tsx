import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HomePage = () => {
  const [modal, setModal] = useState(false);
  const animationVariants = {
    hidden: { x: -1000, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const listVariants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.4,
      },
    }),
    hidden: (i: number) => ({
      opacity: 0,
      transition: {
        delay: i * 0.4,
      },
    }),
  };

  const items = ["Item1", "Item2", "Item3"];
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
      <motion.a whileHover={{ scaleY: 1.2, color: "red" }}>
        Animated link!
      </motion.a>

      <AnimatePresence>
        {modal &&
          items.map((el, ind) => (
            <motion.li
              key={el}
              variants={listVariants}
              initial={"hidden"}
              animate={"visible"}
              custom={ind}
              exit={"hidden"}
            >
              {el}
            </motion.li>
          ))}
      </AnimatePresence>
      <button onClick={() => setModal(!modal)}>set modal</button>
    </>
  );
};

export default HomePage;
