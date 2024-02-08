import styles from "./header.module.css";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { headerItems } from "../data";
import { Link } from "react-router-dom";

const Header = () => {
  const main = useRef();
  const [isSelected, setIsSelected] = useState({
    isHover: false,
    index: 0,
  });

  const { scrollYProgress } = useScroll({
    target: main,
    offset: ["start 20%", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const slide = {
    initial: {
      y: "0",
    },
    open: {
      y: "-100%",
      transition: { duration: 0.7, ease: [0.86, 0, 0.07, 1] },
    },
    close: {
      y: "0",
      transition: { duration: 0.7, ease: [0.86, 0, 0.07, 1] },
    },
  };

  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navHeight = 150;
  const delta = 10;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (Math.abs(lastScrollY - scrollY) > delta) {
        if (scrollY > lastScrollY && scrollY > navHeight) {
          setNavVisible(false);
        } else if (scrollY < lastScrollY) {
          setNavVisible(true);
        }

        setLastScrollY(scrollY);
      }
    };

    const onScroll = () => {
      handleScroll();
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [lastScrollY]);

  return (
    <div id="home" className={styles.header}>
      <div className={`${!navVisible && styles.navUp} ${styles.headerTop}`}>
        <div className={styles.signature}>
          <a href="">[ PIXLSPACE ]</a>
        </div>
        <div className={styles.headerNav}>
          {headerItems.map((headerItem, index) => {
            const { basic, hovered } = headerItem;
            const className = styles[basic.toLowerCase()];
            return (
              <motion.div
                onMouseOver={() => {
                  setIsSelected({
                    isHover: true,
                    index: index,
                  });
                }}
                onMouseLeave={() => {
                  setIsSelected({
                    isHover: true,
                    index: index,
                  });
                }}
                variants={slide}
                animate={
                  isSelected.isHover && isSelected.index === index
                    ? "open"
                    : "close"
                }
                key={index}
                className={className}
              >
                <Link to={`/${basic.toLowerCase()}`}>{basic}</Link>
                <a href={`#${basic.toLowerCase()}`}>{hovered}</a>
              </motion.div>
            );
          })}
        </div>
      </div>
      <motion.div style={{ scale }} ref={main} className={styles.headerMain}>
        <video autoPlay muted loop>
          <source src="./video/video-heroo.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
};

export default Header;
