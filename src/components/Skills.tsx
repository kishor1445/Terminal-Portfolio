import React, { useEffect, useState } from "react"
import axios from "axios"
import Loader from "./Loader"

type skills = {
    programming_languages: string[]
    frameworks_or_libraries: string[]
}

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<skills>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://portfolio-backend-res0.onrender.com/data/skills").then((res) => {
            setSkills(res.data);
            setLoading(false);
        }).catch((err: any) => {
            console.log(err)
        })
    }, [])

    if (loading){
        return <Loader />
    }
    return (
        <>
            <p className="text-indigo-400"><strong>Programming Languages:</strong></p>
            <p className="pl-5">
                {
                    skills?.programming_languages.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))
                }
            </p>
            <br />
            <p className="text-indigo-400"><strong>Frameworks/Libraries:</strong></p>
            <p className="pl-5">
                {
                    skills?.frameworks_or_libraries.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))
                }
            </p>
        </>
    )
}

export default Skills