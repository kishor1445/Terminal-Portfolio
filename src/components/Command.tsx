import React from 'react';
import InvalidArgs from './InvalidArg';
import TermDir from './TermDir';
import DesktopBanner from './DesktopBanner';
import MobileBanner from './MobileBanner';
import AboutMe from './AboutMe';
import Social from './Social';
import Help from './Help';
import Skills from './Skills';
import { projectType, experienceType, certificateType } from "../types/fileStructure"
import LsDisplay from './LsDisplay';
import ShowProject from './ShowProject';
import ShowExperience from './ShowExperience';
import ShowCertificates from './ShowCertificates';

const RESTRICTED_LOC = ["/", "/bin", "/boot", "/div", "/etc", "/home", "/lib", "/lib64", "/mnt", "/opt", "/sys", "/sbin", "/usr", "/tmp", "/run", "/proc", "/root"];

const getCommandOutput = (cmd: string, cmd_args: string[], dir_name: string, msg: string, isMobileDevice: boolean, projects: projectType[], experience: experienceType[], certificates: certificateType[]) => {
    switch (cmd) {
        case "?":
        case "help":
            if (cmd_args.length === 0) {
                return <Help />
            } else {
                return <InvalidArgs cmd={cmd} cmd_args={cmd_args} />
            }
        case "banner":
            if (cmd_args.length === 0) {
                return isMobileDevice ? <MobileBanner /> : <DesktopBanner />
            } else {
                if (cmd_args[0] === '-h' || cmd_args[0] === '--help') {
                    return <div><p>Shows the luffy banner with the text K1SH0R in it</p></div>
                } else {
                    return <InvalidArgs cmd={cmd} cmd_args={cmd_args} />
                }
            }
        case "ls":
            switch (cmd_args[0]) {
                case "-h":
                case "--help":
                    return <div><p>list directory contents</p></div>
                case "~":
                case "/home/guest":
                case "/home/guest/":
                    return <div><p><span className="dir">Certificates</span>    <span className="dir">Experience</span>   <span className="dir">Projects</span>    <span className="file">Skills.txt</span>    <span className="file">Social.txt</span>    <span className='file'>AboutMe.txt</span></p></div>
                case "~/Projects":
                case "/home/guest/Projects": 
                    return <LsDisplay folder={projects} />
                case "~/Certificates":
                case "/home/guest/Certificates":
                    return <LsDisplay folder={certificates} />
                case "~/Experience":
                case "/home/guest/Experience":
                    return <LsDisplay folder={experience} />
                case "~/AboutMe.txt":
                case "/home/guest/AboutMe.txt":
                case "~/Social.txt":
                case "/home/guest/Social.txt":
                case "~/Skills.txt":
                case "/home/guest/Skills.txt":
                    return <div><p className="file">{cmd_args[0]}</p></div>
                case "~/Projects/BlankBot.txt":
                case "/home/guest/Projects/BlankBot.txt":
                    return <div><p className='file'>/home/guest/Projects/BlankBot.txt</p></div>
                case "~/Certificates/NeuralNetworks.txt":
                case "/home/guest/Certificates/NeuralNetworks.txt":
                    return <div><p className='file'>/home/guest/Certificates/NeuralNetworks.txt</p></div>
                default:
                    if (RESTRICTED_LOC.includes(cmd_args[0])) {
                        return <div><p className="error">ls: cannot open directory '{cmd_args[0]}': Permission denied</p></div>
                    }
            }
            switch (dir_name) {
                case "~":
                    if (cmd_args.length == 0) {
                        return <div><p><span className="dir">Certificates</span>    <span className="dir">Experience</span>   <span className="dir">Projects</span>    <span className="file">Skills.txt</span>    <span className="file">Social.txt</span>    <span className='file'>AboutMe.txt</span></p></div>
                    } else {
                        switch (cmd_args[0]) {
                            case "Projects":
                                return <LsDisplay folder={projects} />
                            case "Certificates":
                                return <LsDisplay folder={certificates} />
                            case "Experience":
                                return <LsDisplay folder={experience} />
                            case "AboutMe.txt":
                            case "Social.txt":
                            case "Skills.txt":
                                return <div><p className="file">{cmd_args[0]}</p></div>
                            default:
                                return <div><p className="error">ls: { cmd_args[0] }: No such file or directory</p></div>
                        }
                    }
                case "~/Projects":
                    if (cmd_args.length == 0) {
                        return <LsDisplay folder={projects} />
                    }
                    break
                case "~/Certificates":
                    if (cmd_args.length == 0) {
                        return <LsDisplay folder={certificates} />
                    } 
                    break
                case "~/Experience":
                    if (cmd_args.length == 0) {
                        return <LsDisplay folder={experience} />
                    }
                    break
                default:
                    return <InvalidArgs cmd={cmd} cmd_args={cmd_args} />;
            }
            break
        case "cat":
            if (cmd_args.length === 0) {
                return <p>No Input file is given. I won't eat your files. Give it to me! 😼</p>
            } else {
                switch (cmd_args[0]) {
                    case "-h":
                    case "--help":
                        return <p>concatenate and print files</p>
                    case "~/AboutMe.txt":
                    case "/home/guest/AboutMe.txt":
                        return <AboutMe />
                    case "~/Skills.txt":
                    case "/home/guest/Skills.txt":
                        return <Skills />
                    case "~/Social.txt":
                    case "/home/guest/Social.txt":
                        return <Social />
                }
                switch (dir_name) {
                    case "~":
                        switch (cmd_args[0]) {
                            case "Projects":
                            case "Certificates":
                            case "Experience":
                                return <p className="error">cat: {cmd_args[0]}: Is a directory</p>
                            case "AboutMe.txt":
                                return <AboutMe />
                            case "Social.txt":
                                return <Social />
                            case "Skills.txt":
                                return <Skills />
                            default:
                                return <p className="error">cat: { cmd_args[0] }: No such file or directory</p>
                        }
                    case "~/Projects":
                        return <ShowProject projects={projects} file={cmd_args[0]}/>
                    case "~/Certificates":
                        return <ShowCertificates certificates={certificates} file={cmd_args[0]}/>
                    case "~/Experience":
                        return <ShowExperience experience={experience} file={cmd_args[0]}/>
                    default:
                        return <p className="error">what the... o.o how did you come here?</p>
                }
            }
        case "pwd":
            if (cmd_args.length === 0) {
                return <div><p>{dir_name.includes('~') ? dir_name.replace('~', '/home/guest') : dir_name.replace('~', '/home/guest/')}</p></div>
            } else {
                return <InvalidArgs cmd={cmd} cmd_args={cmd_args} />
            }
        case "whoami":
            if (cmd_args.length === 0) {
                return <p>I didn't give you a cookie and tracked you. So idk <span className="animate-charcter">¯\_(ツ)_/¯</span></p>
            } else {
                return <InvalidArgs cmd={cmd} cmd_args={cmd_args} />
            }
        case "cd":
            if (msg) {
                return <p className="error">{msg}</p>
            }
            return null;
        default:
            return <p className="error">command not found: {cmd}</p>;
    }
}

type CommandProps = {
    type: string;
    cmd: string;
    dir_name: string;
    cmd_args: string[];
    msg: string;
    isMobileDevice: boolean;
    projects: projectType[];
    experience: experienceType[];
    certificates: certificateType[];
}

const Command: React.FC<CommandProps> = ({type, cmd, dir_name, cmd_args, msg, isMobileDevice, projects, experience, certificates}) => {
    return (
        <>
            <p className='command-prompt'>
                guest@k1sh0r:<TermDir dir_name={dir_name} />${' '}
                <span className={type}>{cmd} {cmd_args}</span>
            </p>
            <div className="animate__animated animate__fadeIn animate__fast output">
                {getCommandOutput(cmd, cmd_args, dir_name, msg, isMobileDevice, projects, experience, certificates)}
            </div>
        </>
    );
};

export default Command;