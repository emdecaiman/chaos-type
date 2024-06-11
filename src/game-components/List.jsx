const List = (props) => {
    return (
        <div className="relative w-full h-full">
            {props.wordList.map((word) =>{
                return <ListItem 
                            key={word.id} 
                            word={word.text}
                            x={word.x} 
                            y={word.y}
                        />;
            })}
        </div>
    );
}

const ListItem = (props) => {
    return (
        <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2" // make position centered
            style={{
                top: `${props.y}%`, // Template literals are string literals that allow embedded expressions.
                left: `${props.x}%`,
            }}
        >
            {props.word}
        </div>

    )
}

export default List;