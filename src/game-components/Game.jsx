import { useState, useEffect, useCallback } from "react";
import { count, generate } from "random-words";
import { v4 as uuidv4 } from 'uuid';
import Stats from "./Stats.jsx";
import List from "./List.jsx";
import EndGame from "./EndGame.jsx";

const Game = () => {
    const [wordList, setWordList] = useState([]);
    const [input, setInput] = useState("");
    const [lives, setLives] = useState(3);
    const [isEnd, setIsEnd] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [wordGeneratedSpeed, setWordGeneratedSpeed] = useState(1500);

    // add words every second
    useEffect(() => {
        if (lives > 0) {
            const id = setInterval(() => {
                addWord();
            }, wordGeneratedSpeed);
            return () => clearInterval(id);
        } else {
            endGame();
        }

    }, [lives]); // interval resets everytime wordList changes

    useEffect(() => {
        if (wordCount != 0 && wordCount % 10 == 0 ) {
            if (wordGeneratedSpeed <= 1000) {
                setWordGeneratedSpeed(prevSpeed => prevSpeed -= 50);
            } else {
                setWordGeneratedSpeed(prevSpeed => prevSpeed -= 100);
            }
            // console.log(`Word generation speed adjusted to ${wordGeneratedSpeed}ms`); investigate later
        }
    }, [wordCount])

    const addWord = () => {
        const newWord = {
            id: uuidv4(),
            text: generate(),
            y: Math.random() * 100,
            x: Math.random() * 100,
            timerId: setTimeout(() => {
                removeWordByTimeout(newWord);
            }, 10000)
        };

        setWordList(prevWordList => [...prevWordList, newWord]);
    }

    const checkInputIsValid = (event) => {
        if (event.keyCode === 32) {
            if (wordList.some(word => word.text === input)) {
                removeWordByCorrectInput(input);
                setInput("");
            }
        }
    }

    const endGame = () => {
        setWordList(prevWordList => {
            prevWordList.forEach(word => clearTimeout(word.timerId));
            return wordList;
        })

        setIsEnd(true);
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
        setWordCount(prevWordCount => prevWordCount + 1);
    }
    
    return (
        <>
            <div className="flex flex-col items-center">
                <Stats lives={lives} wordCount={wordCount} isEnd={isEnd} wordList={wordList}/>
                <div className="h-[640px] w-[960px] my-5 relative">
                    <div className="h-[640px] px-20 py-5 relative bg-white bg-opacity-5 shadow-2xl">
                        <List wordList={wordList} isEnd={isEnd}/>
                    </div>
                    <EndGame isEnd={isEnd} />
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