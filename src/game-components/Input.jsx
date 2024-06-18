import { useState, useEffect, useRef } from "react";

const Input = (props) => {
    const [input, setInput] = useState("");
    const [incorrectInput, setIncorrectInput] = useState(false);
    const inputRef = useRef(null);

    const checkInputIsValid = (event) => {
        if (event.keyCode === 32 || event.keyCode === 13) {
            if (props.wordList.some(word => word.text === input)) {
                removeWordByCorrectInput(input);
                setInput("");
            } else {
                setIncorrectInput(true);
            }
        }
    }

    const removeWordByCorrectInput = (wordToRemove) => {
        const wordToRemoveObj = props.wordList.find(word => word.text === wordToRemove);
        clearTimeout(wordToRemoveObj.timerId);
        props.handleRemoveWord(wordToRemoveObj)
    }
    
    // reset input flag
    useEffect(() => {
        if (incorrectInput) {
            const timer = setTimeout(() => {
                setIncorrectInput(false);
            }, 100)
    
            return () => clearTimeout(timer);
        }
    }, [incorrectInput]);


    useEffect(() => {
        if (props.gameState == "running") {
            setInput("");
            inputRef.current.focus();
        }
    }, [props.gameState])

    return (
        <input
            className={`input input-bordered rounded-xl text-black mx-10 mb-5 w-[960px] ${incorrectInput ? 'animate-wiggle' : 'none'}`}
            value={input}
            onChange={e => setInput(e.target.value.trim())}
            onKeyDown={checkInputIsValid}
            type="text"
            placeholder="Type Here"
            ref={inputRef} // react sets 'current' property of the ref object to this DOM node
        />
    )
}

export default Input;