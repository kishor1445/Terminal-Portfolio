import React from "react";

interface TermDirProps {
    dir_name: string
}

const TermDir: React.FC<TermDirProps> = ({ dir_name }) => {
    return (
        <span className="">
            {dir_name}
        </span>
    )
}

export default TermDir;