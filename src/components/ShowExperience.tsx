import React from "react";
import { experienceType } from "../types/fileStructure";

type ShowExperienceProp = {
    experience: experienceType[]
    file: string
}

const ShowExperience: React.FC<ShowExperienceProp> = ({experience, file}) => {
    const ExpMatch = experience.find((item) => item.title === file.replace(".txt", ""))
    
    if (ExpMatch) {
        return (
            <p>
            <strong>{ExpMatch.title.replaceAll("_", " ")}    [ {ExpMatch.duration} ]</strong><br />
            <strong>Company:</strong> {ExpMatch.company}<br />
            <br />
            {ExpMatch.description}<br />
            <br />
            <strong>Technologies Used:</strong>
            {
                ExpMatch.technologies_used.map((item) => (
                    <span> {item} <span className="pipe">|</span></span>
                ))
            }<br />
            <br />
            <a className="underline text-yellow-300" href={ExpMatch.link} target="_blank">Certificate</a>
            </p>
        )
    }
    return <p className="error">cat: { file }: No such file or directory</p>
}

export default ShowExperience