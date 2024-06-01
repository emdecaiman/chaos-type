import Header from "./Header.jsx";
import Game from "./game-components/Game.jsx";
import Footer from "./Footer.jsx"

const App = () => {
  return (
    <div className="h-screen min-h-screen flex flex-col">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;