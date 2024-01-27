import Navbar_Action from "./components/navbar_action";
import "./styles.css";

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
          <img src="images/tr.png" alt="SPREDD" className="logo" />
        </div>
        <Navbar_Action />
      </div>
    </nav>
  );
};

export default Navbar;
