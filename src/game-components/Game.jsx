import { useState, useEffect } from "react";
import { generate } from "random-words";
import { v4 as uuidv4 } from 'uuid';
import Stats from "./Stats.jsx";
import List from "./List.jsx";

const Game = () => {
    const [wordList, setWordList] = useState([]);
    const [input, setInput] = useState("");
    const [lives, setLives] = useState(3);
    
    useEffect(() => {
        if (lives > 0) {
            const id = setInterval(() => {
                addWord();
            }, 1000);
            return () => clearInterval(id);
        }
    }, [wordList]); // interval resets everytime wordList changes

    const addWord = () => {
        const newWord = {
            id: uuidv4(),
            text: generate(),
            y: Math.random() * 100,
            x: Math.random() * 100,
            timerId: setTimeout(() => {
                removeWordByTimeout(newWord);
            }, 5000)
        };

        setWordList(prevWordList => [...prevWordList, newWord]);
    }

    const checkInputIsValid = (event) => {
        if (event.key === "Enter") {
            if (wordList.some(word => word.text === input)) {
                removeWordByCorrectInput(input);
                setInput("");
            }
        }
    }

    const removeWordByTimeout = (wordToRemove) => {
        clearTimeout(wordToRemove.timerId);

        // functional updates ensure we are working with latest state values
        setWordList(prevWordList => prevWordList.filter(word => word.id !== wordToRemove.id));
        setLives(prevLives => prevLives - 1);

    }
    const removeWordByCorrectInput = (wordToRemove) => {
        const wordToRemoveObj = wordList.find(word => word.text === wordToRemove);
        clearTimeout(wordToRemoveObj.timerId);
        setWordList(prevWordList => prevWordList.filter(word => word.id !== wordToRemoveObj.id));
    }
    
    return (
        <>
            <div className="flex flex-col items-center">
                <Stats lives={lives}/>
                <div className="h-[640px] w-[960px] my-5">
                    <div className="h-[640px] relative bg-white bg-opacity-5 shadow-2xl">
                        <List wordList={wordList} />
                    </div>
                </div>
                <input
                    className="text-black mx-10 mb-5 w-[960px]"
                    value={input} 
                    onChange={e => setInput(e.target.value.trim())} 
                    onKeyDown={checkInputIsValid} 
                    type="text" 
                />
            </div>
            </>
    );
}

export default Game;