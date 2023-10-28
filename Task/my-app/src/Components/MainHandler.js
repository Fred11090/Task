import React from 'react';
import InputString from './InputString';
import OutputArea from './OutputArea';

function MainHandler() {
    const [input, setInput] = React.useState('');
    const [output, setOutput] = React.useState('');
    const [inputList, setInputList] = React.useState([]);
    const [maxLength, setMaxLength] = React.useState('');
    const [currentPos, setCurrentPos] = React.useState('');



    async function getHistory() {
        const response = await fetch(`http://localhost:5294/InputCommands/GetHistory`)
        const stateList = await response.json();
        setInputList(stateList)
        setMaxLength(stateList.length)
        setCurrentPos(stateList.length)
        setInput(stateList.at(-1))
    }
   
    React.useEffect(() => {
        getHistory()
    },[output] );

    const inputChange = (e) => setInput(e.target.value);

    async function onSubmit (e) {
        e.preventDefault();
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
                input={input}
            />
            <OutputArea
                output={output}
            />
        </>
    );
}

export default MainHandler;
