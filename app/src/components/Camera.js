import React from "react";
import Webcam from "react-webcam";
import axios from 'axios';

const key = "ya29.c.Ko8BvAcBk1eCtFhMMdPVNwMkfeQ1sJPE8iJDYjhWlr_upkFuCNnvO8Z2tdUCkhIE0CGSwGl5k6GL2sgFEXcCwxmap3BgXJJybawV0wWwFkc6qVSH7kkeCoyroJf7e8YgR587unXJRjiCuoBiAd9IzR6RQsFA_DM3Cp4aZ1VO-eqvBfWgPOnaFZwvJN-K-dY19nA"
const ENDPOINT = "https://automl.googleapis.com/v1beta1/projects/131528345364/locations/us-central1/models/ICN5163882748129050624:predict"
const BODY = (uri) => {
    return {
        "payload": {
            "image": {
                "imageBytes": uri
            }
        }
    }
}
const CONFIG = {
    headers: { 
        Authorization: `Bearer ${key}` 
    }
}
const videoConstraints = {
    width: 512,
    height: 384,
    facingMode: "user"
}
   
const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
   
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot().substring(23);

        axios.post(ENDPOINT, BODY(imageSrc), CONFIG)
            .then(res => {                
                if (res && res.data && res.data.payload) {
                    let data = {class: res.data.payload[0].displayName, confidence: res.data.payload[0].classification}
                    console.log(data)
                } else {
                    console.log("Not found")
                }
            })
            .catch(err => console.log(err))
        
      },
      [webcamRef]
    );
   
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotQuality={0.5}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
      </>
    );
  };

  export default WebcamCapture