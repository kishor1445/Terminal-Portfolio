import React from "react"

const WaitScreen: React.FC = () => {
    return (
      <div className="loading-screen ">
        <div className="loading-spinner"></div>
        <p className="loading-text">Connecting to the backend...</p>
      </div>
    );
}

export default WaitScreen