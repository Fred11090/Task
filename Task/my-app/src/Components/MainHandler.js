import React from 'react';
import InputString from './InputString';
import OutputArea from './OutputArea';

function MainHandler() {
    const [input, setInput] = React.useState('');
    const [output, setOutput] = React.useState('');
    const [inputList, setInputList] = React.useState([]);
    const [maxLength, setMaxLength] = React.useState(0);
    const [currentPos, setCurrentPos] = React.useState(0);

    const inputChange = (e) => setInput(e.target.value);

    async function getHistory() {
        const response = await fetch(`http://localhost:5294/InputCommands/GetHistory`)
        const stateList = await response.json();
        const inputArray = (stateList.map(n => n.input))
        setInputList(inputArray)
        setMaxLength(inputArray.length)
        setCurrentPos(inputArray.length)
        setInput(inputArray[inputArray.length -1])
    }
    
    React.useEffect( () => {
         getHistory()
    }, [] );

    React.useEffect( () => {
        setInputList([...inputList,input])
        setMaxLength(inputList.length)
        setCurrentPos(inputList.length)
    },[output])

    function pushArrow(event){
        if (event.key === "ArrowUp" && currentPos > 0) {
            setInput(inputList[currentPos -1])
            setCurrentPos(currentPos -1)
        }

        if (event.key === "ArrowDown" && currentPos < maxLength) {
            setInput(inputList[currentPos +1])
            setCurrentPos(currentPos +1)
        }
    }
    
    async function onSubmit (event) {
        event.preventDefault();
        if (input <= 0){
            alert('The input field should`t be empty')
            return
        }
        const response = await fetch(`http://localhost:5294/InputCommands/ToExecute`, {
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
