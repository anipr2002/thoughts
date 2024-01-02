import { useEffect } from "react";
import { AiOutlineDownload, AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import Logo from "./Logo";
import Voicenotes from "./Voicenotes";
import Timings from "./ui/Timings.tsx";
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
    downloadTxtFile,
    clearFile,
  } = useTextEditorStore();

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
          placeholder={setPlaceHolderText()}
          className="bg-transparent w-full text-center flex-1 flex items-center justify-center
           absolute top-[50%]"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />

        <motion.div
          className="absolute top-0 right-0 p-3 md:p-10 cursor-pointer text-[#F9A28E]"
          animate={{ opacity: mouseActive ? 1 : 0 }}
          role="button"
          onClick={downloadTxtFile}
        >
          <AiOutlineDownload
            size={40}
            className=" opacity-50 hover:opacity-100 transition-all ease-in"
          />
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
        <Voicenotes />

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
