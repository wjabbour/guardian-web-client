import styles from "./ClothingIcon.module.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function ClothingIcon(props) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [heightOffset, setHeight] = useState(0);

  /*
    some images are different aspect ratios so I use white space make them more similar

  */
  return (
    <div
      className="cursor-pointer relative flex flex-col justify-center border-[1px] border-solid border-gray-500"
      onClick={() => navigate(props.link)}
    >
      {props.no_space != true && (
        <div
          className={styles.space}
          style={{ height: 150 - heightOffset }}
        ></div>
      )}

      <img
        className="w-[200px] max-h-[300px]"
        ref={ref}
        onLoad={() => setHeight(ref.current.clientHeight / 2)}
        src={props.img}
      ></img>

      {props.no_space != true && (
        <div
          className={styles.space}
          style={{ height: 150 - heightOffset }}
        ></div>
      )}

      <div className="absolute bottom-0 w-full bg-slate-800 text-white p-1">
        <p>{props.label}</p>
      </div>
    </div>
  );
}
