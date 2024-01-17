import Navbar_Action from "../navbar_action";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src="images/tr.png" alt="SPREDD" className="logo"/>
        </div>
        <Navbar_Action />
      </div>
    </nav>
  );
};

export default Navbar;
