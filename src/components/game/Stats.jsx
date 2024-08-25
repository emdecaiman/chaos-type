import Timer from "../common/Timer";

const Stats = (props) => {
    return (
        <div className="w-[960px] mx-10 mt-20">
            <div className="flex justify-between">
                <div className="flex gap-6">
                    <Timer time={props.time} />
                    <div className="flex">
                        <span className="font-bold">Words:</span>
                        <h1 className="ml-1">{props.wordCount} </h1>
                    </div>
                    <div className="flex">
                        <span className="font-bold">WPM:</span>
                        <h1 className="ml-1">{props.wpm} </h1>
                    </div>
                    <div className="flex">
                        <span className="font-bold">Level: </span>
                        <h1 className="ml-1">{props.level} </h1>
                    </div>
                </div>
                <div className="flex">
                    <span className="font-bold">Lives:</span>
                    <h1 className="ml-1">{props.lives} </h1>
                </div>
            </div>
        </div>
    );
}

export default Stats; 