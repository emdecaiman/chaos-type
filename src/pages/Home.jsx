import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx"
import Game from "../components/game/Game.jsx";
import About from "../components/game/About.jsx";
import { useRef } from "react";

const Home = () => {
  const aboutSection = useRef(null);
  
  return (
    <div className="flex flex-col font-sourcecodepro bg-gray-800 text-white">
      <Header aboutSectionRef={aboutSection}/>
      <Game />
      <About aboutSectionRef={aboutSection}/>
      <Footer />
    </div>
  );
}

export default Home;