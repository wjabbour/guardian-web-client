function Category(props) {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        window.open(props.location, "_blank");
      }}
    >
      <div className="h-[375px] w-[300px]  shadow-lg">
        <img src={props.photo_url} className="h-full w-full" alt={props.title}></img>
      </div>
      <div className="flex justify-center mt-3">
        <p className="text-2xl text-[#f54242] font-[700]">{props.title}</p>
      </div>
    </div>
  );
}

function AutoCatalogLink(props) {
  return (
    <p
      className="text-2xl font-bold text-cyan-700 cursor-pointer underline tracking-tight"
      onClick={() => window.open(props.link, "_blank")}
    >
      {props.text}
    </p>
  );
}

export default function LandingV2() {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-[105px] justify-center">
        <Category
          location="https://www.flipsnack.com/gpcorp/guardian-catalog-5-20-25/full-view.html"
          photo_url="/images/auto.png"
          title={"Auto Catalog"}
        ></Category>
        <Category
          location="https://www.flipsnack.com/gpcorp/2024apparelcatalog-v7/full-view.html"
          photo_url="/images/apparel.png"
          title={"Apparel Catalog"}
        ></Category>
        <Category
          location="https://www.flipsnack.com/gpcorp/24-25-guardian-hit-promo-catalog/full-view.html"
          photo_url="/images/promotion.png"
          title={"Promotional Catalog"}
        ></Category>
      </div>
      <div className="mt-[35px] flex gap-[25px] justify-center">
        <AutoCatalogLink text="More promotional" link="https://hitpromo.net" />
        <AutoCatalogLink text="More apparel" link="https://sanmar.com" />
      </div>
    </div>
  );
}
