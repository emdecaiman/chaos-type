import Header from "./Header.jsx";
import Game from "./game-components/Game.jsx";
import Footer from "./Footer.jsx"

const App = () => {
  return (
    <div className="flex flex-col font-sourcecodepro bg-gray-600 text-white">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;