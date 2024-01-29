import LogoIcon from "~/components/icons/Logo";

export const HeaderApp = () => {
  return (
    <header className="mb-10 bg-secondary">
      <div className="container mx-auto flex header-container h-[90px]">
        <LogoIcon className="w-[170px] flex justify-items-center" />
      </div>
    </header>
  );
};
