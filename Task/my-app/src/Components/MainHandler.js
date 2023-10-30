import React,{useState,useEffect} from 'react';
import InputString from './InputString';
import OutputArea from './OutputArea';

function MainHandler() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [inputList, setInputList] = useState([]);
    const [maxLength, setMaxLength] = useState(0);
    const [currentPos, setCurrentPos] = useState(0);

    const inputChange = (event) =>setInput(event.target.value)

    const getHistory = async () => {
        const response = await fetch(`http://localhost:5294/inputCommands/getHistory`)
        const stateList = await response.json();
        const inputArray = (stateList.map(n => n.input))
        setInputList(inputArray)
        setMaxLength(inputArray.length)
        setCurrentPos(inputArray.length)
        setInput(inputArray[inputArray.length -1])
    }
    
    useEffect( () => {
         getHistory()
    }, [] );

    React.useEffect( () => {
        setInputList([...inputList,input])
        setMaxLength(inputList.length)
        setCurrentPos(inputList.length)
    },[output])

    const pushArrow = (event) => {
        if (event.key === "ArrowUp" && currentPos > 0) {
            setInput(inputList[currentPos -1])
            setCurrentPos(currentPos -1)
        }

        if (event.key === "ArrowDown" && currentPos < maxLength) {
            setInput(inputList[currentPos +1])
            setCurrentPos(currentPos +1)
        }
    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
        if (input <= 0){
            alert('The input field should`t be empty')
            return
        }
        const response = await fetch(`http://localhost:5294/inputCommands/toExecute`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        const serverOutput = await response.text();
        setOutput(serverOutput)
    }

    return (
        <>
            <InputString
                onInputChange={inputChange}
                onInputSubmit={onSubmit}
                onPushArrow={pushArrow}
                input={input}
                
            />
            <OutputArea
                output={output}
            />
        </>
    );
}

export default MainHandler;
