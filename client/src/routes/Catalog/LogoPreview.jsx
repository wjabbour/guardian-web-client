import { getEmbroidery } from "../../lib/utils";

export default function LogoPreview({ catalogType }) {
  if (!getEmbroidery(catalogType)) {
    return null;
  }

  const logos = getEmbroidery(catalogType).map((l) => {
    l = l.toLowerCase().split(" ").join("_");
    if (l === "chrysler" || l === "dodge") {
      return (
        <img
          key={l}
          className="w-[100px] 2xl:w-[165px]"
          src={`/images/${l}.png`}
        ></img>
      );
    } else if (l === "quicklane") {
      return (
        <img
          key={l}
          className="w-[180px] 2xl:w-[200px]"
          src={`/images/${l}.png`}
        ></img>
      );
    } else {
      return <img key={l} className="w-[100px] 2xl:w-[140px]" src={`/images/${l}.png`}></img>;
    }
  });

  const logosDiv = <div className="flex items-center justify-center gap-5 2xl:flex-wrap">{logos}</div>;

  return (
    <div>
      {logos.length > 0 && (
        <div className="flex justify-center gap-5 ml-5 2xl:absolute 2xl:right-[50px] 2xl:top-[150px] 2xl:flex-col 2xl:items-center 2xl:w-[350px]">
          <div className="flex items-center">
            <p className="font-bold text-2xl">Available Logos:</p>
          </div>
          {logosDiv}
        </div>
      )}
    </div>
  );
}
