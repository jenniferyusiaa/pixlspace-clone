import styles from "./intro.module.css";
import gsap from "gsap";
import SplitType from "split-type";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Intro = () => {
  const refText = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const split = new SplitType(refText.current, { type: "chars" });

    gsap.to(split.chars, {
      scrollTrigger: {
        trigger: refText.current,
        start: "start 80%",
        end: "bottom center",
        scrub: 2,
      },
      color: "white",
      stagger: 1,
    });
  }, []);

  return (
    <div id="intro" className={styles.intro}>
      <h1 ref={refText}>
        We craft intriguing
        <br />
        stories to help your brand
        <br />
        connect with your audience
        <br />
        in <span>creative</span> and <b>meaningful</b> ways
      </h1>
    </div>
  );
};

export default Intro;
