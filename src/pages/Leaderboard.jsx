import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import Scores from "../components/leaderboard/Scores.jsx";

const Leaderboard = () => {
  return (
    <div className="flex flex-col min-h-screen font-sourcecodepro bg-gray-800 text-white">
      <Header />
      <div className="flex-grow">
        <Scores />
      </div>
      <Footer />
    </div>
  );
}

export default Leaderboard;
