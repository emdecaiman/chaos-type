import { useState, useEffect } from "react";
import { generate } from "random-words";
import { v4 as uuidv4 } from 'uuid';
import Stats from "./Stats.jsx";



const ListItem = (props) => {
    return <li>{props.word}</li>;
}

const List = (props) => {
    return (
        <ul>
            {props.wordList.map((word) =>{
                return <ListItem key={word.id} word={word.text} />;
            })}
        </ul>
    );
}

const Game = () => {
    const [wordList, setWordList] = useState([]);
    
    useEffect(() => {
        const id = setInterval(() => {
            addWord();
        }, 2000);

        return () => clearInterval(id);
    }, [wordList]); // interval resets everytime wordList changes

    const addWord = () => {
        const newWord = {
            id: uuidv4(),
            text: generate(),
        };

        const newWordList = [...wordList, newWord];
        setWordList(newWordList);
    }

    return (
        <div className="flex flex-row justify-center h-full m-20">
            <div className="bg-green-500 w-3/4">
                <List wordList={wordList} />
            </div>
            <Stats/>
        </div>
    );
}

export default Game;