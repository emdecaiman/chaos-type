import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex justify-between items-center p-10 bg-white bg-opacity-5 w-full h-20">
            <div>
                <Link className="text-xl" to="/home">Chaos Type v2</Link>
            </div>
            <div className="flex gap-5">
                <Link to="/home">Play</Link>
                <Link to="/leaderboard">Leaderboard</Link>
            </div>
        </div>
    )
}

export default Header