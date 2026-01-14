export default function Gpc81Navbar({ setModalOpen }) {
  return (
    <div>
      <div className="flex items-center justify-center bg-[#0324fc] h-[70px] cursor-default">
        <p className="text-white text-4xl drop-shadow-lg">
          Contact us at 800-727-7222 or email us at support@gpcorp.com
        </p>
      </div>
      <div className="relative h-[190px]">
        <img
          src="/images/guardian_nav.jpg"
          className="w-full h-full"
          alt="Guardian Navigation"
        />
        <div
          onClick={() => {
            setModalOpen(true);
          }}
          className="absolute right-10 top-12 h-[70px] w-[220px] bg-[#0324fc] flex items-center justify-center text-5xl text-white drop-shadow-lg cursor-pointer rounded-md"
        >
          LOGIN
        </div>
      </div>
    </div>
  );
}
