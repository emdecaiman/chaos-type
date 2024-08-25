import Timer from "./Timer";

const Stats = (props) => {
    return (
        <div className="w-[960px] mx-10 mt-20">
            <div className="flex justify-between">
                <div className="flex gap-6">
                    <Timer time={props.time} />
                    <h1>Words: {props.wordCount} </h1>
                    <h1>WPM: {props.wpm}</h1>
                    <h1>Level: {props.level}</h1>
                </div>
                <h1>Lives: {props.lives}</h1>
            </div>
        </div>
    );
}

export default Stats; 