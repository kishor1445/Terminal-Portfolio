import React, { useEffect, useReducer, useState, KeyboardEvent } from "react";
import TermDir from "./TermDir";
import Command from "./Command";
import { useGlobalContext } from "./Context";
import axios from "axios";
import { projectType, experienceType, certificateType } from "../types/fileStructure"

type TerminalProps = {
    isMobileDevice: boolean;
}

type cdProps = {
    action?: "change" | null
    path: string
}


let global_cmds: string[] = [];
let current_cmd = 0;

const Terminal: React.FC<TerminalProps> = ({ isMobileDevice }) => {
    const { setWelcome } = useGlobalContext();
    const KNOWN_COMMANDS = ['help', '?', 'clear', 'banner', 'cd', 'pwd', 'ls', 'cat', 'whoami'];
    const RESTRICTED_LOC = ["/", "/bin", "/boot", "/div", "/etc", "/home", "/lib", "/lib64", "/mnt", "/opt", "/sys", "/sbin", "/usr", "/tmp", "/run", "/proc", "/root"];
      
    const cd = (state: string, prop: cdProps) => {
        if (prop.action === 'change') {
            return prop.path;
        }
        switch (prop.path) {
            case '/home/guest':
            case '~':
                return '~';
            case '..':
                const parts = state.split('/');
                if (parts.length > 1) {
                    parts.pop();
                    return parts.join('/');
                } else {
                    return state;
                }
            default:
                return state + '/' + prop.path;
        }
    };

    const change_text = (state: string, prop: any) => {
        switch (prop.action) {
            case "append":
                return state + prop.key;
            case "entire":
                return prop.key
            case "remove":
                return state.slice(0, -1)
            case "clear":
                return '';
        }
    };

    const add_output = (state: any, prop: any) => {
        if (prop.action === 'clear') {
            return [];
        } else {
            return [...state, prop];
        }
    };

    const [errorStatus, setCmdError] = useState('');
    const [dir_path, dir_path_dispatch] = useReducer(cd, "~");
    const [typed, typed_dispatch] = useReducer(change_text, "");
    const [output, output_dispatch] = useReducer(add_output, []);
    const [TerminalCursor, setTerminalCursor] = useState(true);
    const [projects, setProjects] = useState<projectType[]>([]);
    const [experience, setExperience] = useState<experienceType[]>([]);
    const [certificates, setCertificates] = useState<certificateType[]>([]);
    
    const handleMobileKey = (e: any) => {
        const inputEvent = e.nativeEvent;
        console.log(inputEvent)
        console.log(typeof inputEvent.data)
        if (inputEvent.inputType === "insertText") {
            typed_dispatch({key: inputEvent.data, action: 'append'});
        } 
        else if (inputEvent.inputType === "insertCompositionText") {
            typed_dispatch({key: inputEvent.data.slice(-1), action: 'append'});
        } 
        else if (inputEvent.inputType === "insertLineBreak") {
            executeCommand();
            typed_dispatch({ action: 'clear' });
        } else if (inputEvent.inputType === "deleteContentBackward") {
            typed_dispatch({ action: 'remove' });
        }
    }

    const handleDesktopKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            executeCommand();
            typed_dispatch({ action: 'clear' });
        } else if (e.key === 'Backspace'){
            typed_dispatch({ action: 'remove' });
        } else if (e.key === 'Escape'|| e.key === 'Tab' || e.key === 'Control' || e.key === 'Shift' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'CapsLock'){
            // Just to remember e.key also contains those values. It might helpful in future
        } else if (e.key === 'ArrowUp') {
            if (current_cmd !== 0) {
                current_cmd -= 1;
                typed_dispatch({action: 'entire', key: global_cmds[current_cmd]});
            }
        } else if (e.key === 'ArrowDown') {
            if (current_cmd < global_cmds.length - 1) {
                current_cmd += 1;
                typed_dispatch({action: 'entire', key: global_cmds[current_cmd]});
            }
        } else {
            typed_dispatch({key: e.key, action: 'append'});
        }
    }


    const handleCD = (args: string[]) => {
        const cmd = "cd";
        if (args[0] === undefined) {
            output_dispatch({ cmd: cmd, cmd_args: args,dir_path: dir_path, type: 'command'});
            dir_path_dispatch({path:'~'});
        } else {
            switch (args[0]) {
                case "..":
                case "~":
                case "/home/guest":
                case "Projects":
                case "~/Projects":
                case "/home/guest/Projects":
                case "Certificates":
                case "~/Certificates":
                case "/home/guest/Certificates":
                case "Experience":
                case "~/Experience":
                case "/home/guest/Experience":
                    if (dir_path === "~" && args[0] !== '..') {
                        output_dispatch({ cmd: cmd, cmd_args: args, dir_path: dir_path, type: 'command' })
                        dir_path_dispatch({path: args[0]});
                        break;
                    } else if (dir_path === "~/Projects" || dir_path === "~/Certificates" || dir_path === "~/Experience") {
                        if (args[0] === ".." || args[0] === "~") {
                            output_dispatch({ cmd: cmd, cmd_args: args, dir_path: dir_path, type: 'command' });
                            dir_path_dispatch({path: args[0]});
                        } else {
                            output_dispatch({cmd: 'cd', cmd_args: args, type: 'error', msg: "cd: no such file or directory: " + args[0], dir_path: dir_path});
                        }
                        break;
                    }
                    break
                case "Skills.txt":
                case "Social.txt":
                case "AboutMe.txt":
                    if (dir_path === "~") {
                        output_dispatch({cmd: 'cd', cmd_args: args, type: 'command', msg: "cd: not a directory: " + args[0], dir_path: dir_path});
                        break
                    }
                    break
                default:
                    if (RESTRICTED_LOC.includes(args[0])) {
                        output_dispatch({cmd: 'cd', cmd_args: args, type: 'command', msg: "cd: "+args[0]+": Permission denied" , dir_path: dir_path});
                        break;
                    }
                    output_dispatch({cmd: 'cd', cmd_args: args, type: 'command', msg: "cd: no such file or directory: " + args[0], dir_path: dir_path});
            }
        }
    }

    const executeCommand = () => {
        let scroll_val = document.body.scrollHeight;
        let cmd = typed.trim().split(' ')[0].toLowerCase();
        let args = typed.trim().split(' ').slice(1);
        if (cmd !== '') {
            current_cmd = global_cmds.length + 1;
            global_cmds.push(typed.trim());
            switch (cmd) {
                case "cd":
                    handleCD(args)
                    break
                case "clear":
                    scroll_val = 0
                    setWelcome(false);
                    output_dispatch({action: 'clear', dir_path: dir_path});
                    break
                default:
                    output_dispatch({cmd: cmd, type: 'command', cmd_args: args, dir_path: dir_path});
            }
        }
        console.log(0)
        window.scrollTo({
            top: scroll_val,
            behavior: 'smooth' 
        });
    }

    const handleFocus = () => {
        document.getElementById('texter')?.focus();
        setTerminalCursor(true);
    }

    useEffect(() => {
        if (typed === '') {
            return;
        }
        let cmd = typed.trim().split(' ')[0].toLowerCase();
        setCmdError(KNOWN_COMMANDS.includes(cmd) ? '' : 'error')
    }, [typed]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const projectRes = await axios.get("https://portfolio-backend-res0.onrender.com/data/projects")
                setProjects(projectRes.data["projects"]);

                const experienceRes = await axios.get("https://portfolio-backend-res0.onrender.com/data/experience")
                setExperience(experienceRes.data["experiences"])

                const certificatesRes = await axios.get("https://portfolio-backend-res0.onrender.com/data/certificates")
                setCertificates(certificatesRes.data["certificates"])
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    return (
        <>
        {
            output.map((item, index) => (
                <Command key={index} type={item.type} cmd={item.cmd} cmd_args={item.cmd_args} dir_name={item.dir_path} msg={item.msg} isMobileDevice={isMobileDevice} projects={projects} experience={experience} certificates={certificates}/>
            ))
        }
        <div className="animate__animated animate__fadeIn animate__delay-6s" onClick={handleFocus}>
            <textarea id="texter" onChange={isMobileDevice ? handleMobileKey: () => {}} onKeyDown={isMobileDevice ? () => {} : handleDesktopKey} onBlur={() => setTerminalCursor(false)} autoFocus></textarea>
            <div id="liner">
                <p>
                    <span className="command-prompt">guest@k1sh0r:</span>
                    <span className="dir-path"><TermDir dir_name={dir_path}/></span>
                    <span className="command-prompt">$ </span>
                    <span className={`typer ${errorStatus}`}>{typed}</span>
                    <b className={TerminalCursor ? "cursor" : "inactivecursor"} id="cursor">█</b>
                </p>
            </div>
        </div>
        </>
    );
};

export default Terminal;