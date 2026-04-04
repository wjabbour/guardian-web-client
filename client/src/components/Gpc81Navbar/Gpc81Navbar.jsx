export default function Gpc81Navbar({ setModalOpen }) {
  return (
    <div>
      <div className="flex items-center justify-center bg-[#1a3a8f] h-[50px] cursor-default">
        <p className="text-white text-sm tracking-wide">
          Contact us at 800-727-7222 or email us at support@gpcorp.com
        </p>
      </div>
      <div className="relative h-[140px]">
        <img
          src="/images/guardian_nav.jpg"
          className="w-full h-full"
          alt="Guardian Navigation"
        />
        <div
          onClick={() => {
            setModalOpen(true);
          }}
          className="absolute right-10 top-1/2 -translate-y-1/2 px-6 py-2 bg-white border-2 border-white text-[#0324fc] text-lg font-semibold tracking-widest cursor-pointer hover:bg-[#0324fc] hover:text-white transition-colors duration-200 shadow-lg"
        >
          LOGIN
        </div>
      </div>
    </div>
  );
}
