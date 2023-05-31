import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import AppContext from "../../Context/AppContext";

//function to return the menu item
function NavItem(props) {
  return (
    <li>
      <NavLink className={props.cn} to={props.path} onClick={props.close}>
        <i className={props.icon} />
        {props.name}
      </NavLink>
    </li>
  );
}

function Header() {
  //menu icon click, will invert each time clicking
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const {
    account,
    setAccount,
  } = useContext(AppContext);

  //Account Pengguna click, will invert each time clicking
  const [subMenuClick, setSubmenuClick] = useState(false);
  const handleSubMenuClick = () => setSubmenuClick(!subMenuClick);

  //close hamburger menu icon
  const closeMobileMenu = () => {
    setClick(false);
    setSubmenuClick(false);
  }

  let menuRef = useRef();
  let subMenuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      //if the user click the place other than the menu icon, the menu will close
      if (!menuRef.current.contains(e.target)) {
        setClick(false);
      }
      //if the user click the place other than the Account Pengguna, the submenu will close
      if (!subMenuRef.current.contains(e.target)) {
        setSubmenuClick(false);
      }
    };
    //attach event handler to the document
    document.addEventListener("mousedown", handler);

    return () => {
      //removes event handler from a document.
      document.removeEventListener("mousedown", handler);
    };
  });

  //get user from local storage
  let user = JSON.parse(sessionStorage.getItem("user"));
  //identify whether the user is logged in
  const authIdentify = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  //identify the role of the user
  const roleChoice = () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user.role === "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  const navigate = useNavigate();
  //logout
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setAccount("");
    navigate("");
  }

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink className="nav-logo" to="/">
            <img
              id="logo"
              src="https://www.dtims.intan.my/theme/images/logo.png"
              alt="Intan logo"
            />
          </NavLink>
          <div ref={menuRef}>
            {/* hamburger menu will show when screen is smaller than 960px, else it is hidden */}
            <div className="menu-icon" onClick={handleClick}>
              <i className={!click ? "bi bi-list" : "bi bi-x-lg"}></i>
            </div>
            {/* nav-menu active class is to display menu in hamburger menu, nav-menu is to display menu in menu bar */}
            <ul className={click ? "nav-menu active" : "nav-menu"} ref={subMenuRef}>
              <NavItem
                cn="navlink"
                path="/"
                icon="bi bi-house-fill"
                name="Laman Utama"
                close={closeMobileMenu}
              />
              <NavItem
                cn="navlink"
                path="/maklumat-penyemak"
                icon="bi bi-search"
                name="Semak Sijil"
                close={closeMobileMenu}
              />
              {/* identify the header for different user type, if the user is logged in then show user header, else show general header */}
              {authIdentify() ?
                <li className={subMenuClick ? "menu-has-children active" : "menu-has-children"} onClick={handleSubMenuClick} ref={subMenuRef}>
                  <span className="akaun">
                    <i className="bi bi-person-square"></i>Nama Pengguna
                  </span>
                  <ul
                    className={subMenuClick ? "sub-menu active" : "sub-menu"}
                  >
                    <NavItem
                      cn="navlink subItem"
                      path={roleChoice() ? "/admin/home" : "/user/senarai-program-sedia-ada"}
                      icon="bi bi-person-fill"
                      name="Dashboard"
                      close={closeMobileMenu}
                    />
                    <NavItem
                      cn="navlink subItem"
                      path=""
                      icon="bi bi-box-arrow-in-left"
                      name="Keluar"
                      close={logout}
                    />
                  </ul>
                </li>
                :
                <li className={subMenuClick ? "menu-has-children active" : "menu-has-children"} onClick={handleSubMenuClick} >
                  <span className="akaun">
                    <i className="bi bi-person-fill"></i>Akaun Pengguna
                  </span>
                  {/* submenu will show when hover the Akaun Pengguna or in active class, else it is hidden */}
                  <ul
                    className={subMenuClick ? "sub-menu active" : "sub-menu"}
                  >
                    <NavItem
                      cn="navlink subItem"
                      path="/login"
                      icon="bi bi-box-arrow-in-right"
                      name="Log Masuk"
                      close={closeMobileMenu}
                    />
                    <NavItem
                      cn="navlink subItem"
                      path="/register"
                      icon="bi bi-pencil-square"
                      name="Daftar Akaun"
                      close={closeMobileMenu}
                    />
                  </ul>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Header;
