import { WEBAPP } from "../../config/config";

const Header = () => {
  return (
    <>
      <header className="fixed w-full bg-white p-3 z-50 flex items-center gap-5">
        <img src={WEBAPP.LOGO} alt={WEBAPP.NAME} width={35} />
        <h1 className="text-black font-bold">{WEBAPP.NAME}</h1>
      </header>
    </>
  );
};

export default Header;
