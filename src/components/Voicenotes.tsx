// // // import { BsFillMicFill } from "react-icons/bs";
// // // import useTextEditorStore from "../store/textEditorStore";
// // import React, { useState, useEffect } from "react";

// // const Voicenotes = () => {
// //   const SpeechRecognition =
// //    window.SpeechRecognition || window.webkitSpeechRecognition;
//   const mic = new SpeechRecognition();

//   mic.continuous = true;
//   mic.interimResults = true;
//   mic.lang = "en-US";

//   const [isListening, setIsListening] = useState(false);
//   const [note, setNote] = useState(null);
//   const [savedNotes, setSavedNotes] = useState([]);

//   useEffect(() => {
//     handleListen();
//   }, [isListening]);

//   const handleListen = () => {
//     if (isListening) {
//       mic.start();
//       mic.onend = () => {
//         console.log("continue..");
//         mic.start();
//       };
//     } else {
//       mic.stop();
//       mic.onend = () => {
//         console.log("Stopped Mic on Click");
//       };
//     }
//     mic.onstart = () => {
//       console.log("Mics on");
//     };

//     mic.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map((result) => result[0])
//         .map((result) => result.transcript)
//         .join("");
//       console.log(transcript);
//       setNote(transcript);
//       mic.onerror = (event) => {
//         console.log(event.error);
//       };
//     };
//   };

//   const handleSaveNote = () => {
//     setSavedNotes([...savedNotes, note]);
//     setNote("");
//   };

//   return (
//     <div className="absolute bottom-24 left-[47%] p-10">
//       <div className="" role="button" onClick={handleSaveNote}>
//         <BsFillMicFill />
//       </div>
//     </div>
//   );
// };

// //https://codesandbox.io/p/sandbox/how-to-convert-speech-to-text-in-react-js-o5pxi?file=%2Fsrc%2FApp.js%3A17%2C3-54%2C5
// export default Voicenotes;

import { BsFillMicFill } from "react-icons/bs";

const Voicenotes = () => {
  return (
    <div className="absolute bottom-24 left-[47%] p-10">
      <div className="" role="button">
        <BsFillMicFill />
      </div>
    </div>
  );
};

export default Voicenotes;
