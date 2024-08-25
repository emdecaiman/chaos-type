import { useState, useEffect, useRef } from "react";

const Input = (props) => {
    const [input, setInput] = useState("");
    const [incorrectInput, setIncorrectInput] = useState(false);
    const [disabled, setDisabled] = useState(true);
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
    
    // reset incorrect input flag after .1 sec, that is the error animation will trigger for .1 sec
    useEffect(() => {
        if (incorrectInput) {
            const timer = setTimeout(() => {
                setIncorrectInput(false);
            }, 100)
    
            return () => clearTimeout(timer);
        }
    }, [incorrectInput]);

    // // when game is is running state, reset the input text and focus on the input box
    useEffect(() => {
        if (props.gameState == "running") {
            setInput("");
            setDisabled(false);
            inputRef.current.focus();
        } else {
            setDisabled(true);
        }
    }, [props.gameState, disabled])

    return (
        <input
            className={`input input-bordered input-sm rounded-xl text-white mx-10 mb-5 w-64 ${incorrectInput ? 'input-error animate-wiggle' : 'none'}`}
            value={input}
            onChange={e => setInput(e.target.value.trim())}
            onKeyDown={checkInputIsValid}
            type="text"
            placeholder="Type Here"
            disabled={disabled}
            ref={inputRef} // react sets 'current' property of the ref object to this DOM node
        />
    )
}

export default Input;