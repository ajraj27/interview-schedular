import React from 'react';

const Input =(props) => (
    <div className="form-group mb-5">
        <label for={props.name} className="form-label">{props.title}</label>
        <input 
            className="form-control"
            id={props.name}
            name={props.name}
            type={props.type}
            onChange={props.controlFunc}
        />
    </div>
)

export default Input;