import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import "./Header.css";
import loginStore from "../../stores/useLoginStore";

const Header = () => {
  const navigate = useNavigate();
  const { userName, isLoggedIn, logout } = loginStore();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const profileDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate("/login");
  };

  const handleClickOutside = (e) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(e.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
    if (
      categoryDropdownRef.current &&
      !categoryDropdownRef.current.contains(e.target)
    ) {
      setIsCategoryDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand sticky-top bg-body-tertiary top-0 start-0 w-100 border-bottom d-flex align-items-center">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>

      <div className="nav-right d-flex flex-row justify-content-between align-items-center">
        <div className="head justify-content-start ms-sm-2">
          <ul className="navbar-nav me-auto mb-2 ms-sm-1 mb-lg-0 d-flex flex-row justify-content-center align-items-center align-self-center">
            <li className="nav-item px-sm-2">
              <Link
                className="nav-link DM_Sans text-secondary fw-medium"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item mx-sm-2 px-sm-2">
              <a className="nav-link DM_Sans text-secondary fw-medium" href="#">
                About
              </a>
            </li>
            <li
              className="nav-item dropdown-btn position-relative px-sm-2"
              onClick={toggleCategoryDropdown}
              ref={categoryDropdownRef}
            >
              <a
                href="#"
                className="nav-link DM_Sans text-secondary fw-medium d-flex flex-row"
              >
                Category
                <span className="ms-sm-1">
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </a>

              {isCategoryDropdownOpen && (
                <ul className="dropdown-list p-0">
                  <li className="dropdown-list-item list-unstyled">
                    <a
                      className="text-decoration-none DM_Sans text-secondary fw-medium"
                      href="#"
                    >
                      Design & Technology
                    </a>
                  </li>
                  <li className="dropdown-list-item list-unstyled">
                    <a
                      className="text-decoration-none DM_Sans text-secondary fw-medium"
                      href="#"
                    >
                      Marketing
                    </a>
                  </li>
                  <li className="dropdown-list-item list-unstyled">
                    <a
                      className="text-decoration-none DM_Sans text-secondary fw-medium"
                      href="#"
                    >
                      Business
                    </a>
                  </li>
                  <li className="dropdown-list-item list-unstyled">
                    <a
                      className="text-decoration-none DM_Sans text-secondary fw-medium"
                      href="#"
                    >
                      Design
                    </a>
                  </li>
                  <hr className="m-0" />
                  <li className="dropdown-list-item list-unstyled">
                    <a
                      className="text-decoration-none DM_Sans text-secondary fw-medium"
                      href="#"
                    >
                      Consultation
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {isLoggedIn ? (
          <div
            className="profile-dropdown position-relative ms-auto me-sm-2"
            ref={profileDropdownRef}
          >
            <div
              className="profile-dropdown-btn fw-medium"
              onClick={toggleProfileDropdown}
            >
              <div className="profile-img position-relative">
                <i className="fa-solid fa-circle"></i>
              </div>
              <span className="DM_Sans fw-semibold fs-6">
                {userName}
                <i className="fa-solid fa-angle-down ms-2"></i>
              </span>
            </div>

            {isProfileDropdownOpen && (
              <ul className="profile-dropdown-list poppins fw-medium p-0">
                <li className="profile-dropdown-list-item list-unstyled">
                  <Link
                    to="/profile"
                    className="text-decoration-none text-primary-emphasis ms-4"
                  >
                    <i className="fa-solid fa-user me-2"></i>
                    Edit Profile
                  </Link>
                </li>
                <li className="profile-dropdown-list-item list-unstyled">
                  <a
                    href="#"
                    className="text-decoration-none text-primary-emphasis ms-4"
                  >
                    <i className="fa-solid fa-envelope me-2"></i>
                    Inbox
                  </a>
                </li>
                <li className="profile-dropdown-list-item list-unstyled">
                  <a
                    href="#"
                    className="text-decoration-none text-primary-emphasis ms-4"
                  >
                    <i className="fa-solid fa-sliders me-2"></i>
                    Settings
                  </a>
                </li>
                <li className="profile-dropdown-list-item list-unstyled">
                  <a
                    href="#"
                    className="text-decoration-none text-primary-emphasis ms-4"
                  >
                    <i className="fa-solid fa-circle-question me-2"></i>
                    Help & Support
                  </a>
                </li>
                <hr className="m-0" />
                <li
                  className="profile-dropdown-list-item list-unstyled pe-auto"
                  onClick={handleLogout}
                >
                  <a
                    href="#"
                    className="text-decoration-none text-primary-emphasis ms-4"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                    Log out
                  </a>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="header-right d-flex flex-row me-sm-2 ms-auto">
            <button
              type="button"
              className="btn btn-second fw-medium me-1"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              type="button"
              className="btn btn-first fw-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
