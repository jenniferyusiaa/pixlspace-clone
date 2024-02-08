import styles from "./clients.module.css";
import gsap from "gsap";
import { clientsItems } from "../data";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

const Trial = () => {
  const cursor = useRef();
  const slider = useRef();
  const clients = useRef();
  const [isHover, setIsHover] = useState(false);

  useGSAP(() => {
    // cursorEffect
    const xTo = gsap.quickTo(cursor.current, "left", {
      duration: 0.25,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursor.current, "top", {
      duration: 0.25,
      ease: "power3",
    });
    document.addEventListener("mousemove", (ev) => {
      const { clientX, clientY } = ev;
      xTo(clientX);
      yTo(clientY);
    });

    // horizontalScroll
    let panels = gsap.utils.toArray(".panel");
    gsap.to(panels, {
      xPercent: -100 * (panels.length + 3),
      ease: "power1",
      scrollTrigger: {
        trigger: slider.current,
        pin: true,
        scrub: 2,
        snap: 1 / (panels.length + 3),
        end: () => "+=" + slider.current.offsetWidth,
      },
    });

    // clientsBg
    gsap.fromTo(
      clients.current,
      {
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: slider.current,
          //   start: "top end",
          end: "top end",
          onEnterBack: () => {
            gsap.to(clients.current, {
              opacity: 0,
              duration: 1,
            });
          },
          onLeave: () => {
            gsap.to(clients.current, {
              opacity: 1,
              duration: 1,
            });
          },
        },
      }
    );

    gsap.fromTo(
      clients.current,
      {
        filter: "blur(0)",
        duration: 2,
      },
      {
        scrollTrigger: {
          trigger: slider.current,
          start: "top top",
          //   end: "top 50%",
          onEnterBack: () => {
            gsap.to(clients.current, {
              filter: "blur(0)",
              duration: 1,
            });
          },
          onLeave: () => {
            gsap.to(clients.current, {
              filter: "blur(5px)",
            });
          },
        },
      }
    );
  }, {});

  return (
    <div className={styles.trial}>
      <div
        ref={cursor}
        className={`${isHover && styles.cursorActive}  ${styles.cursor}`}
      ></div>
      <div ref={clients} className={styles.clientsBg}>
        <h1>
          Clients
          <span>.</span>
        </h1>
      </div>
      <div className={styles.slider}>
        <div ref={slider} className={styles.sliderChild}>
          {clientsItems.map((clientsItem, index) => {
            const { name, narrative, src } = clientsItem;
            return (
              <div key={index} className={`panel ${styles.clientsContainer}`}>
                <div className={styles.mains}>
                  <h1>{name}</h1>
                  <img
                    onMouseEnter={() => {
                      setIsHover(true);
                    }}
                    onMouseLeave={() => {
                      setIsHover(false);
                    }}
                    src={src}
                    alt="imageclients"
                  />
                </div>
                <p>{narrative}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trial;
