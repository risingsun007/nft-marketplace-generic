import React from "react";
import '../../styles/base/Image.css';

const Image = ({src ,width, height}: {src: string, width: string, height: string}) => {

    return (
        <img className="image" 
        style={{
            width:`${width}`,
            height:`${height}`
        }}
        src={src} />
    );
}

export default Image;