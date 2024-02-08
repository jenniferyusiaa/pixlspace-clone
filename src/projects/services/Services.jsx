import styles from "./service.module.css";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesItems } from "../../data";

const Services = () => {
  const services = useRef();
  const itemRefs = useRef(servicesItems.map(() => React.createRef()));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(services.current, {
      scrollTrigger: {
        trigger: services.current,
        start: "start center",
        end: "start 20%",
        scrub: true,
      },
      opacity: 1,
    });

    itemRefs.current.forEach((ref) => {
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "start bottom",
          end: "start center",
          scrub: true,
          onLeave: () => {
            gsap.to(ref.current, {
              scale: 1,
            });
          },
          onEnterBack: () => {
            gsap.to(ref.current, {
              scale: 1.05,
            });
          },
        },
      });
    });
  }, []);

  return (
    <div ref={services} className={styles.services}>
      <div className={styles.title}>
        <h1>[Main Services]</h1>
      </div>
      <div className={styles.menu}>
        {servicesItems.map((servicesItem, index) => {
          const { title, desc } = servicesItem;
          return (
            <div
              ref={itemRefs.current[index]}
              key={index}
              className={styles.option}
            >
              <a href="">{title}</a>
              <p>{desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
