import ListItem from "./ListItem.jsx";

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

export default List;