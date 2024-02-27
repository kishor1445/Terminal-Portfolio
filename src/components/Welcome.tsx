import React from "react";
import MobileBanner from "./MobileBanner";
import DesktopBanner from "./DesktopBanner";
import { useGlobalContext } from "./Context";

interface WelcomeProps {
    isMobileDevice: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({ isMobileDevice }) => {
    const { showWelcome } = useGlobalContext();
    return showWelcome && (
        <>
            {isMobileDevice ? <MobileBanner /> : <DesktopBanner />}
            <p className="animate__animated animate__fadeIn animate__delay-1s">Arch Linux 6.6.9.arch1-1 (web)</p>
            <p className="animate__animated animate__fadeIn animate__delay-2s">Current Device: {isMobileDevice ? "Mobile": "PC"}</p>
            <br />
            <p className="animate__animated animate__fadeIn animate__delay-3s">k1sh0r login: <span className="text-teal-400">guest</span></p>
            <p className="animate__animated animate__fadeIn animate__delay-4s">Password:</p>
            <p className="animate__animated animate__fadeIn animate__delay-5s">Type <span className="command">`help`</span> or <span className="command">`?`</span> to get started.</p>
        </>
    );
};

export default Welcome;