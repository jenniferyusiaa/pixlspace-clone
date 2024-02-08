import styles from "./projects.module.css";
import gsap from "gsap";
import Services from "./services/Services";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsItems } from "../data";

const Projects = () => {
  const projects = useRef();
  const itemRefs = useRef(projectsItems.map(() => React.createRef()));

  const { scrollYProgress } = useScroll({
    target: projects,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    itemRefs.current.forEach((ref) => {
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "start bottom",
          end: "start center",
          scrub: true,
          onLeave: () => {
            gsap.to(ref.current, {
              filter: "blur(0)",
            });
          },
          onEnterBack: () => {
            gsap.to(ref.current, {
              filter: "blur(5px)",
            });
          },
        },
      });
    });
  }, []);

  return (
    <div id="projects" className={styles.projects}>
      <motion.div
        style={{ scale }}
        ref={projects}
        className={styles.projectsBg}
      >
        <motion.h1>
          Projects
          <span>.</span>
        </motion.h1>
      </motion.div>
      <div className={styles.mainImage}>
        {projectsItems.map((projectsItem, index) => {
          const { title, desc, src, speed } = projectsItem;
          const className = styles[title.toLowerCase()];
          return (
            <div
              data-scroll
              data-scroll-speed={speed}
              key={index}
              className={`${className} ${styles.imageContainer}`}
            >
              <div className={styles.title}>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
              <img ref={itemRefs.current[index]} src={src} alt="imageproject" />
            </div>
          );
        })}
      </div>
      <Services />
    </div>
  );
};

export default Projects;
