import React from "react";
import { certificateType } from "../types/fileStructure";

type ShowCertificatesProps = {
    certificates: certificateType[]
    file: string
}

const ShowCertificates: React.FC<ShowCertificatesProps> = ({ certificates, file }) => {
    const CertMatch = certificates.find((item) => item.title === file.replace(".txt", ""))
    if (CertMatch) {
        return (
            <p>
                {CertMatch.title.replaceAll("_", " ")}    {CertMatch.completion_date}<br />
                <strong>By:</strong>{CertMatch.provider}<br />
                <br />
                {CertMatch.description} <br />
                <a className="underline text-yellow-300" href={CertMatch.verify_link} target="_blank">view certificate</a>
            </p>
        )
    }
    return <p className="error">cat: { file }: No such file or directory</p>
}

export default ShowCertificates