function Category(props) {
  return (
    <div
      onClick={() => {
        window.open(props.location, "_blank");
      }}
    >
      <div className="h-[375px] w-[300px] cursor-pointer">
        <img src={props.photo_url} className="h-full w-full"></img>
      </div>
      <div className="flex justify-center mt-3 cursor-default">
        <p className="text-2xl text-[#f54242] font-[700]">{props.title}</p>
      </div>
    </div>
  );
}

export default function LandingV2() {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-[105px] justify-center">
        <Category
          location="https://www.flipsnack.com/gpcorp/guardian-auto-catalog/full-view.html"
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
    </div>
  );
}
