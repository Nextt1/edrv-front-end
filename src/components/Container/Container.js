import React from 'react';

export default function Container(props){

    return (
        <div style={{display: "flex", flex: 1, flexDirection: "column", overflow: "auto", padding: "0px 0", backgroundColor: "#EAEAEA"}}>
            {props.children}
        </div>
    )
}
