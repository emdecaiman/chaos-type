import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx"
import Game from "../components/game/Game.jsx";

const Home = () => {
  return (
    <div className="flex flex-col font-sourcecodepro bg-gray-800 text-white">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default Home;