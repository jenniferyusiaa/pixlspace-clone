import LocomotiveScroll from "locomotive-scroll";
import Header from "./header/Header";
import Intro from "./intro/Intro";
import Projects from "./projects/Projects";
import Clients from "./clients/Clients";
import Footer from "./footer/Footer";

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();

  return (
    <>
      <Header />
      <Intro />
      <Projects />
      <Clients />
      <Footer />
    </>
  );
};

export default App;
