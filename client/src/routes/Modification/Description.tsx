import { useEffect, useRef, useState } from "react";

const Description = ({ description }) => {
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [description]);

  if (!description) return null;
  return (
    <div className="w-[500px]">
      <p className="font-bold">Product Description</p>

      <div
        className={`whitespace-pre-wrap text-wrap  overflow-hidden transition-all duration-300 ${
          expanded ? "h-auto" : "h-[25px]"
        }`}
        ref={contentRef}
      >
        <p>{description}</p>
      </div>

      {isOverflowing && (
        <button
          className="text-blue-500 text-sm mt-1 ml-auto"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default Description;
