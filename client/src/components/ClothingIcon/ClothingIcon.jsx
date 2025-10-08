import styles from "./ClothingIcon.module.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { getDomainAwarePath } from "../../lib/utils";

export default function ClothingIcon(props) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [heightOffset, setHeight] = useState(0);
  const [isLoading, setLoading] = useState(true);

  /*
    some images are different aspect ratios so I use white space make them more similar

  */
  return (
    <div
      className="cursor-pointer relative flex flex-col justify-center border-[1px] border-solid border-gray-500"
      onClick={() => navigate(getDomainAwarePath(props.link))}
    >
      {props.no_space != true && (
        <div className="bg-white" style={{ height: 150 - heightOffset }}></div>
      )}

      <div className="w-[200px] h-[300px]">
        {isLoading &&
          <div className="absolute animate-pulse bg-gray-200 z-10 h-full w-full"></div>}
        <img
          className={`w-full h-full transition-opacity duration-[2000ms] ease-in-out ${isLoading ? "opacity-0" : "opacity-100"
            }`}
          ref={ref}
          onLoad={() => {
            setHeight(ref.current.clientHeight / 2);
            setLoading(false);
          }}
          src={props.img}
        ></img>
      </div>




      {
        props.no_space != true && (
          <div className="bg-white" style={{ height: 150 - heightOffset }}></div>
        )
      }

      <div className="absolute bottom-0 w-full bg-slate-800 text-white p-1">
        <p>{props.label}</p>
      </div>
    </div >
  );
}
