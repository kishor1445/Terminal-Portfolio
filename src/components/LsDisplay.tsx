import React from "react"
import { projectType, experienceType, certificateType } from "../types/fileStructure"

type LsDisplayProps = {
    folder: projectType[] | experienceType[] | certificateType[]
}

const LsDisplay: React.FC<LsDisplayProps> = ({ folder }) => {
   return (
    <p>
    {
        folder.map((item, index) => (
            <span key={index}>{item.title + ".txt"}    </span>
        ))
    }
    </p>
   ) 
}

export default LsDisplay