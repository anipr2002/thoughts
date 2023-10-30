import { useState, useEffect } from "react";
import { AiOutlineDownload, AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import Logo from "./Logo";

const Texteditor = () => {
  const [inputText, setInputText] = useState<string>("");
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [displayedItems, setDisplayedItems] = useState<string[]>([]);
  const [inView, setInView] = useState<boolean>(false);
  const [mouseActive, setMouseActive] = useState<boolean>(false);

  //check if mouse moves for 3 seconds and then hide the icons
  useEffect(() => {
    const mouseMoveHandler = () => {
      setMouseActive(true);
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => window.removeEventListener("mousemove", mouseMoveHandler);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (mouseActive) {
      timeout = setTimeout(() => {
        setMouseActive(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [mouseActive]);

  const setPlaceHolderText = () => {
    if (inView) {
      return "";
    } else {
      return "Enter your thoughts";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputText.trim() !== "") {
      setInputArray([inputText, ...inputArray]);
      setDisplayedItems([inputText, ...displayedItems]);
      setInputText(""); // Clear the input field\
      setInView(true);
    }
  };

  // Define a maximum number of displayed items
  const maxDisplayedItems = 5;

  const opacities = [0.1, 0.2, 0.3, 0.4, 1];
  const blur = [2, 1.5, 1, 0.5, 0];

  useEffect(() => {
    // Ensure inputArray length doesn't exceed maxDisplayedItems
    if (inputArray.length > maxDisplayedItems) {
      setDisplayedItems(inputArray.slice(0, maxDisplayedItems));
    }
  }, [inputArray]);

  const downloadTxtFile = () => {
    const ascendingArray = [...inputArray].reverse(); // Create a reversed copy
    const element = document.createElement("a");
    const file = new Blob([ascendingArray.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "thoughts_" + ascendingArray[0] + ".txt";
    document.body.appendChild(element);
    element.click();
  };

  const clearFile = () => {
    setInputArray([]);
    setDisplayedItems([]);
    setInView(false);
  };

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
          absolute top-[50%] "
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

        <div className="absolute bottom-0 right-0 p-3 ">
          <span className=" md:text-5xl text-lg opacity-20 font-mono">
            {inputArray.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Texteditor;
