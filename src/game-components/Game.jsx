import Stats from "./Stats.jsx"

const Game = () => {
    return (
        <div className="flex flex-row justify-center h-full m-20">
            <div className="bg-green-500 w-3/4">
                <h1>Game</h1>
            </div>
            <Stats/>
        </div>
    );
}

export default Game;