import React from 'react';
import { Input } from 'reactstrap';

const OutputArea = (props) => {
    return (
        <Input
            readOnly
            className="outputArea"
            type="textarea"
            name="powershellOutput"
            rows="10"
            value={props.output}
        />
    );
}

export default OutputArea