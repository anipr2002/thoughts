import { useEffect, useMemo, useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { DownloadDialog } from "./DownloadDialog";
import Voicenotes from "./Voicenotes";
import Timings from "./Timings.tsx";
import useTextEditorStore from "../store/textEditorStore.ts";

const Texteditor = () => {
  const {
    inputText,
    setInputText,
    inputArray,
    addInputText,
    displayedItems,
    inView,
    setInView,
    mouseActive,
    setMouseActive,
    clearFile,
    isListening,
    setIsListening,
  } = useTextEditorStore();

  const [transcript, setTranscript] = useState("");
  const recognition = useMemo(() => new window.webkitSpeechRecognition(), []);
  const inputRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef(null);

  useEffect(() => {
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript;
      setTranscript(transcript);
      setInputText(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    return () => {
      recognition.stop();
    };
  }, [recognition, setIsListening, setInputText]);

  const startListening = () => {
    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    const mouseMoveHandler = () => {
      setMouseActive(true);
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => window.removeEventListener("mousemove", mouseMoveHandler);
  }, [setMouseActive]);

  useEffect(() => {
    let timeout;
    if (mouseActive) {
      timeout = setTimeout(() => {
        setMouseActive(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [mouseActive, setMouseActive]);

  const setPlaceHolderText = () => {
    return inView ? "" : "Enter your thoughts...";
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputText.trim() !== "") {
      addInputText();
      setInView(true);
    }
  };

  const maxDisplayedItems = 5;

  const opacities = [0.1, 0.2, 0.3, 0.4, 1];
  const blur = [2, 1.5, 1, 0.5, 0];

  useEffect(() => {
    // Ensure inputArray length doesn't exceed maxDisplayedItems
    if (inputArray.length > maxDisplayedItems) {
      // Update displayedItems
      useTextEditorStore.setState({
        displayedItems: inputArray.slice(0, maxDisplayedItems),
      });
    }
  }, [inputArray]);

  const openDownloadDialog = () => {
    downloadRef.current.click();
  };

  const [downloadShortcut, setDownloadShortcut] = useState(false);

  const toggleDownloadShortcut = () => {
    setDownloadShortcut(!downloadShortcut);
    console.log("Download shortcut toggled");
  };

  const handleShortcuts = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      console.log("Save");
      toggleDownloadShortcut(); // JUST REMOVE IT LATER
    } else if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      clearFile();
    } else if (e.ctrlKey && e.key === "e") {
      e.preventDefault();
      toggleListening();
    } else if (e.ctrlKey && e.key === "t") {
      e.preventDefault();
      setInView(!inView);
    } else if (e.ctrlKey && e.key === "a") {
      e.preventDefault();
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleShortcuts);
    return () => document.removeEventListener("keydown", handleShortcuts);
  }, [downloadShortcut]);

  return (
    <div className="w-screen h-screen bg-[#27272B] text-[#F9A28E] font-mono text-3xl flex flex-col justify-center items-center">
      <div className="w-full text-center mb-3 flex flex-col">
        <div className="w-full text-center relative opacity-75">
          {displayedItems
            .slice()
            .reverse()
            .map((item, index) => (
              <p
                key={5 - index}
                className="fading-element text-white/60"
                style={{
                  opacity: opacities[index] || 0.5,
                  filter: `blur(${blur[index] || 0}px)`,
                  transition: "opacity 1s ease-out",
                }}
              >
                {item}
              </p>
            ))}
        </div>

        <input
          type="text"
          ref={inputRef}
          placeholder={setPlaceHolderText()}
          className="bg-transparent w-full text-center flex-1 flex items-center justify-center
           absolute top-[50%]"
          value={isListening ? transcript : inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />

        <motion.div
          className="absolute top-0 right-0 p-3 md:p-10 cursor-pointer text-[#F9A28E]"
          animate={{ opacity: mouseActive ? 1 : 0 }}
          role="button"
          onClick={openDownloadDialog}
          ref={downloadRef}
        >
          {setDownloadShortcut && <DownloadDialog />}
        </motion.div>

        <motion.div
          className="absolute top-0 left-0 p-3 md:p-10 cursor-pointer text-[#F9A28E]"
          animate={{ opacity: mouseActive ? 1 : 0 }}
          // style={{ opacity: mouseActive ? 1 : 0 }}
          role="button"
          onClick={clearFile}
        >
          <AiFillDelete
            size={40}
            className=" opacity-50 hover:opacity-100 transition-all ease-in"
          />
        </motion.div>

        <Logo />
        <Voicenotes onClick={toggleListening} />

        <div className="absolute bottom-0 right-0 p-3 ">
          <span className=" md:text-5xl text-lg opacity-20 font-mono">
            {inputArray.length}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 p-3 ">
          <span className=" md:text-5xl text-lg opacity-20 font-mono">
            <Timings />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Texteditor;
