import { MouseEventHandler } from "react";
import { BsFillMicFill } from "react-icons/bs";

const Voicenotes = (props: { onClick: MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div
      className="absolute bottom-24 left-[47%] p-10"
      role="button"
      onClick={props.onClick}
    >
      <div className="" role="button">
        <BsFillMicFill />
      </div>
    </div>
  );
};

export default Voicenotes;
