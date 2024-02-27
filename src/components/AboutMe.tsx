import React, { useEffect, useState } from "react"
import Loader from "./Loader"
import axios from "axios"

type about_me = {
    name: string,
    age: number,
    profession: string,
    description: string,
    language: string[],
    location: string,
    education: {
        college_name: string
        major: string
        graduation_year: number
    },
    email_id: string,
    last_update: string
}

const AboutMe: React.FC = () => {
    const [AboutMe, setAboutMe] = useState<about_me>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://portfolio-backend-res0.onrender.com/data/about_me").then((res) => {
            setAboutMe(res.data)
            setLoading(false);
        }).catch((err: any) => {
            console.log(err)
        })
    }, [])
    if (loading){
        return <Loader />
    }
    return (
        <p>
            Hello there, I'm {AboutMe?.name}<br />
            Glad to see you here ^^ <br />
            I'm a {AboutMe?.profession} at {AboutMe?.education.college_name} (Batch: {AboutMe?.education.graduation_year}) <br />
            Currently pursuing {AboutMe?.education.major} <br />
            Deep Learning and Cyber Security Enthusiast <br />
            Technical Team Member at ACM-SIST and GDSC-SIST <br />
            <br />
            {AboutMe?.description}
        </p>
        
    )
}

export default AboutMe