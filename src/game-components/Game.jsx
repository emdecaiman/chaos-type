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
    const [input, setInput] = useState("");
    
    useEffect(() => {
        const id = setInterval(() => {
            addWord();
        }, 750);

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

    const checkInputIsValid = (event) => {
        if (event.key === "Enter") {
            if (wordList.some(word => word.text === input)) {
                console.log("Input in wordlist")
                removeWord(input);
                setInput("");
            } else {
                console.log("Input not in wordlist");
            }
        }
    }

    const removeWord = (wordToRemove) => {
        const updatedWordList = wordList.filter(word => word.text !== wordToRemove);
        setWordList(updatedWordList);
    }

    return (
        <>
            <div className="flex flex-row justify-center h-full m-20">
                <div className="bg-green-500 w-3/4">
                    <List wordList={wordList} />
                </div>
                <Stats/>
            </div>
            <input 
                value={input} 
                onChange={e => setInput(e.target.value.trim())} 
                onKeyDown={checkInputIsValid} 
                type="text" 
            />
        </>
    );
}

export default Game;