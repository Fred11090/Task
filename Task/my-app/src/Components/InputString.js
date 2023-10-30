import React from 'react';
import { Form, Input, Button } from 'reactstrap';

const InputString = (props) => {
    
    return (
        <Form id="inputString" onSubmit={props.onInputSubmit}>
                <Input
                    id="input"
                    type="text"
                    name="input"
                    value={props.input}
                    onChange={props.onInputChange}
                    onKeyDown={props.onPushArrow}
                />
                <Button id="button" type="submit">Execute</Button>
        </Form>
    );
}

export default InputString;
