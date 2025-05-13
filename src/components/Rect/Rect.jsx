import React from "react";
import "./Rect.css"; // Import external stylesheet

const RedRectangle = ({ children }) => {
    return (
        <div className="red-rectangle">
            <div style={{display: "flex", flexDirection: "column"}}>{children}</div>
        </div>
    );
};

export default RedRectangle;
