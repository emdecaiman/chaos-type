const EndGame = (props) => {
    if (props.gameState == "end") {
        return (
            <div className="backdrop-blur-sm h-full w-full top-0 left-0 block absolute">
                <button
                    className="btn btn-neutral btn-active rounded-xl absolute inset-0 mx-auto my-auto w-60 z-50"
                    onClick={props.onRestart}>
                    Restart
                </button>
            </div>
        )
    }
}

export default EndGame;