export default function LandingV2() {
  function Category(title) {
    return (
      <div>
        <div className="border-solid border-black border h-[375px] w-[300px]"></div>
        <div className="flex justify-center mt-3">
          <p className="text-2xl text-[#f54242] font-[700]">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="flex items-center gap-[105px] justify-center">
        {Category("Auto Catalog")}
        {Category("Apparel Catalog")}
        {Category("Promotional Catalog")}
      </div>
    </div>
  );
}
