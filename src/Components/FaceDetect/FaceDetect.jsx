import React from "react";

import "./FaceDetect.css";


const FaceDetect = ({ imageUrl }) => {
    return (
        <div className="center ma">
            <div className="absoluute mt2">
                <img alt=""src={imageUrl} width="500px" height="auto" />
                <div 
                className="bounding-box"

                style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol,
                    
                }}
                ></div>
            </div>
        </div>
    );
};

export default FaceDetect;
