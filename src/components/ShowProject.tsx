import React from "react"
import { projectType } from "../types/fileStructure"

type showProjectsProps = {
    projects: projectType[],
    file: string
}

const ShowProject: React.FC<showProjectsProps> = ({projects, file}) => {
    const ProjectMatch = projects.find((item) => item.title === file.replace(".txt", ""))
    if (ProjectMatch) {
        return (
            <p>
            <strong>{ProjectMatch.title.replaceAll('_', ' ')}</strong>    Status: {ProjectMatch.status.replace('_', ' ').toUpperCase()}<br />
            <br />
            {ProjectMatch.description}<br />
            <br />
            GitHub: <a className="underline text-yellow-300" href={ProjectMatch.link} target="_blank">{ProjectMatch.title}</a>
            </p>
        )
    }
    return <p className="error">cat: { file }: No such file or directory</p>
}

export default ShowProject