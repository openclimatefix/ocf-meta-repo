import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

type SideLayoutProps = {
  className?: string;
};

const SideLayout: React.FC<SideLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={
        "border-t border-black h-full text-white justify-between flex flex-col bg-mapbox-black-500 	z-20 " +
        (className || "")
      }
    >
      <Navbar />

      <div className="h-10 mb-auta">{children}</div>
      <div className="relative h-full " style={{ zIndex: "-1" }}>
        <div
          className="absolute bottom-0 bg-mapbox-black p-2"
          style={{ right: "-120px" }}
        >
          <img src="/OCF_icon_wht.svg" alt="ofc" width={100} />
        </div>
      </div>
    </div>
  );
};

export default SideLayout;
