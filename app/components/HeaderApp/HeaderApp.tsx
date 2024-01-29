import { Link } from "@remix-run/react";
import LogoIcon from "~/components/icons/Logo";

export const HeaderApp = () => {
  return (
    <header className="mb-10 bg-secondary">
      <div className="container mx-auto flex header-container h-[90px]">
        <Link
          to="/"
          className=" flex justify-items-center"
        >
          <LogoIcon className="w-[170px]" />
        </Link>
      </div>
    </header>
  );
};
