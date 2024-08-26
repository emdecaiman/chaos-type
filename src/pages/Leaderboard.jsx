import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import Scores from "../components/leaderboard/Scores.jsx";
import About from "../components/game/About.jsx";
import { useRef } from "react";

const Leaderboard = () => {
  const aboutSection = useRef(null);

  return (
    <div className="flex flex-col min-h-screen font-sourcecodepro bg-gray-800 text-white">
      <Header aboutSectionRef={aboutSection}/>
      <div className="h-screen flex flex-col justify-between">
        <Scores />
        <About aboutSectionRef={aboutSection}/>
      </div>
      <Footer />
    </div>
  );
}

export default Leaderboard;
