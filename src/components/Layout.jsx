import { Outlet, Link } from "react-router-dom";
import "./style.css";
const Layout = () => {
  return (
    <>
      <div className="navbar">
        <Link to="/">List</Link>

        <Link to="/list">Commnet</Link>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
