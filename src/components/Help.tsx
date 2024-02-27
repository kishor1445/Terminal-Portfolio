import React from "react";

const Help: React.FC = () => {
    return (
        <div className="whitespace-pre">
            <p><span className="command">ls</span>           list directory contents</p>
            <p><span className="command">cd</span>           change the working directory</p>
            <p><span className="command">cat</span>          concatenate and print files</p>
            <p><span className="command">banner</span>       show the banner</p>
            <p><span className="command">whoami</span>       who are you again?</p>
            <p><span className="command">clear</span>        clear the screen</p>
            <p><span className="command">pwd</span>          return working directory name</p>
            <p><span className="command">help</span><span className="cyan"> | </span><span className="command">?</span>     show this help message</p>
        </div>
    )
}

export default Help;