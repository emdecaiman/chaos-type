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

export default ListItem;