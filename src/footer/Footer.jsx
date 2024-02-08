import styles from "./footer.module.css";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const Footer = () => {
  const caption = useRef();
  const footer = useRef();

  useGSAP(() => {
    gsap.fromTo(
      caption.current,
      {
        x: "100%",
        y: "100%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: footer.current,
          start: "top bottom",
          end: "top top",
          scrub: 2,
        },
        x: 0,
        y: 0,
        opacity: 1,
        duration: 2,
      }
    );
  }, {});

  return (
    <div ref={footer} className={styles.footer}>
      <div ref={caption} className={styles.caption}>
        <div className={styles.content}>
          <h1>
            The only person you are destined to become is the person you decide
            to be.
          </h1>
        </div>
        <div className={styles.person}>
          <p>- Ralph Waldo Emerson</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
