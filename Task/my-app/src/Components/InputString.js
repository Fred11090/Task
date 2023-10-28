import React from 'react';
import { Form, Input, Button } from 'reactstrap';

function InputString(props)  {
    return (
        <Form onSubmit={props.onInputSubmit} className="inputString">
            <p>
                <label>Enter the command for PowerShell</label><br />
                <Input
                    type="text"
                    name="input"
                    value={props.input}
                    onChange={props.onInputChange}
                    onKeyDown={props.onPushArrow}
                />
            </p>
            <p>
                <Button type="submit">Execute</Button>
            </p>
        </Form>
    );
}

export default InputString;
