function Category(props) {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        window.open(props.location, "_blank");
      }}
    >
      <div className="h-[375px] w-[300px]  shadow-lg">
        <img src={props.photo_url} className="h-full w-full"></img>
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
      className="text-2xl font-bold text-cyan-600 cursor-pointer underline"
      onClick={() =>
        window.open(
          "https://www.flipsnack.com/gpcorp/2025-guardian-auto-catalog-lb/full-view.html?p=" +
            props.page,
          "_blank"
        )
      }
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
          location="https://www.flipsnack.com/gpcorp/2025-guardian-auto-catalog-lb/full-view.html"
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
        <AutoCatalogLink text="Promotional" page="2" />
        <AutoCatalogLink text="Sales" page="34" />
        <AutoCatalogLink text="Service" page="114" />
        <AutoCatalogLink text="Office" page="168" />
        <AutoCatalogLink text="Parts" page="186" />
        <AutoCatalogLink text="Body Shop" page="192" />
        <AutoCatalogLink text="Detail" page="196" />
      </div>
    </div>
  );
}
