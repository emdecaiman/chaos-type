import { Link } from "react-router-dom";

const Header = ({ aboutSectionRef }) => {
    const scrollTo = () => {
        window.scrollTo({
            top:aboutSectionRef.current.offsetTop, 
            behavior: 'smooth'});
    }

    return (
        <div className="flex justify-between items-center p-10 bg-white bg-opacity-5 w-full h-20">
            <div>
                <Link className="text-xl" to="/home">Chaos Type v2</Link>
            </div>
            <div className="flex gap-5">
                <Link className="hover:text-blue-500" to="/home">Play</Link>
                <button className="hover:text-blue-500" onClick={scrollTo}>About</button>
                <Link className="hover:text-blue-500" to="/leaderboard">Leaderboard</Link>
            </div>
        </div>
    )
}

export default Header