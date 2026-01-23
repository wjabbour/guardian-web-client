import { getWebConfigValue } from "guardian-common";

export default function Thumbnail({ img }) {
  // if there is no embroidery selected, we shouldnt show a thumbnail
  const show = img !== "" && getWebConfigValue("show_image_preview");

  function getImagePath(logo_name) {
    return `/images/${logo_name.toLowerCase().split(" ").join("_")}.png`;
  }

  return (
    <div
      className={`w-[200px] relative ml-[15px] ${show ? "block" : "hidden"}`}
    >
      {img && <img className="max-w-[180px]" src={getImagePath(img)}></img>}
    </div>
  );
}
