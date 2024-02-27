import React, { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import Terminal from "./components/Terminal";
import WaitScreen from "./components/WaitScreen";
import axios from "axios";

const App: React.FC = () => {
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
  const [isBackendUP, setBackendUp] = useState(false)
  useEffect(() => {
    axios.get("https://portfolio-backend-res0.onrender.com/ping").then(() => {
      console.log("Backend is up!");
      setBackendUp(true);
    }).catch((err: any) => {
      console.log(err);
    })
  })
  if (isBackendUP) {
    return (
      <main className="flex-grow text-sky-400 font-display min-h-screen">
        <Welcome isMobileDevice={ isMobileDevice } />
        <Terminal isMobileDevice={ isMobileDevice } />
      </main>
    )
  } else {
    return <WaitScreen />
  }
};

export default App;
