import Navbar_Action from "./components/navbar_action";
import "./styles.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className="navbar"
      style={{
        background: `linear-gradient(to right, #7f3219, #070b14, #070b14)`,
      }}
    >
      <div className="container">
        <div className="logo">
          <Link href="https://www.spredd.ai" className="center">
            <img src="images/tr.png" alt="SPREDD" className="logo" />
          </Link>
        </div>
        <Navbar_Action />
      </div>
    </nav>
  );
};

export default Navbar;
