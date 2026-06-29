import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar as BSNavbar,
  Nav,
  Container,
  Button,
  Dropdown,
  Badge,
} from "react-bootstrap";

import api from "../axios/api";
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaChevronDown,
  FaCog,
  FaUserCircle,
  FaBell,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const getUserName = () => {
    if (!user) return "";
    return user.displayName || user.name || user.email || "User";
  };

  const getUserInitials = () => {
    const name = getUserName();
    if (name === "User" || !name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = () => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
    ];
    const index = getUserName().length % colors.length;
    return colors[index];
  };

  return (
    <BSNavbar
      expand="lg"
      className="shadow-lg"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "0.6rem 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container>
        {/* Brand/Logo */}
        <BSNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center"
          style={{
            color: "white",
            fontSize: "1.6rem",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{
              width: "42px",
              height: "42px",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.3)",
              transition: "all 0.3s ease",
            }}
          >
            <FiLayers size={24} color="white" strokeWidth="2.5" />
          </div>
          <span style={{ letterSpacing: "0.5px" }}>
            Auth<span style={{ fontWeight: "300", opacity: 0.9 }}>App</span>
          </span>
        </BSNavbar.Brand>

        {/* Mobile Toggle */}
        <BSNavbar.Toggle
          aria-controls="navbarNav"
          className="border-0"
          style={{
            border: "2px solid rgba(255,255,255,0.3)",
            padding: "0.4rem 0.6rem",
            borderRadius: "8px",
          }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </BSNavbar.Toggle>

        {/* Navbar Links */}
        <BSNavbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-lg-center gap-1 gap-lg-2">
            {/* Home Link */}
            <Nav.Link
              as={Link}
              to="/"
              className="d-flex align-items-center gap-2 px-3 rounded-pill"
              style={{
                color: "rgba(255,255,255,0.85)",
                transition: "all 0.3s ease",
                fontSize: "0.95rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              }}
            >
              <FaHome />
              <span>Home</span>
            </Nav.Link>

            {user ? (
              <>
                {/* Profile Link */}
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="d-flex align-items-center gap-2 px-3 rounded-pill"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    transition: "all 0.3s ease",
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  }}
                >
                  <FaUser />
                  <span>Profile</span>
                </Nav.Link>

                {/* Notification Bell */}
                <div className="d-none d-md-block">
                  <Button
                    variant="link"
                    className="position-relative"
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      transition: "all 0.3s ease",
                      padding: "0.4rem 0.6rem",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <FaBell size={18} />
                    <Badge
                      pill
                      bg="danger"
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{
                        fontSize: "0.6rem",
                        padding: "0.2rem 0.4rem",
                        border: "2px solid #764ba2",
                      }}
                    >
                      3
                    </Badge>
                  </Button>
                </div>

                {/* User Dropdown */}
                <Dropdown
                  show={dropdownOpen}
                  onToggle={() => setDropdownOpen(!dropdownOpen)}
                  align="end"
                >
                  <Dropdown.Toggle
                    as="div"
                    className="d-flex align-items-center gap-2 rounded-pill px-3 py-1"
                    style={{
                      background: dropdownOpen
                        ? "rgba(255,255,255,0.25)"
                        : "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      transition: "all 0.3s ease",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!dropdownOpen) {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.2)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!dropdownOpen) {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.12)";
                      }
                    }}
                  >
                    {/* Avatar */}
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "34px",
                        height: "34px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: "white",
                        background: getAvatarColor(),
                        border: "2px solid rgba(255,255,255,0.4)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      {getUserInitials()}
                    </div>
                    <span
                      className="d-none d-md-inline"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {getUserName()}
                    </span>
                    <FaChevronDown
                      style={{
                        fontSize: "0.65rem",
                        transition: "transform 0.3s ease",
                        transform: dropdownOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                        opacity: 0.7,
                      }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{
                      background: "white",
                      borderRadius: "14px",
                      boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
                      border: "none",
                      minWidth: "240px",
                      padding: "0.6rem",
                      marginTop: "0.6rem",
                      animation: "slideDown 0.25s ease",
                    }}
                  >
                    {/* User Info Header */}
                    <div
                      className="px-3 py-2 border-bottom"
                      style={{ borderColor: "#f0f0f0" }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "44px",
                            height: "44px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "white",
                            background: getAvatarColor(),
                            flexShrink: 0,
                          }}
                        >
                          {getUserInitials()}
                        </div>
                        <div>
                          <div
                            className="fw-bold"
                            style={{ color: "#2d3748", fontSize: "0.95rem" }}
                          >
                            {getUserName()}
                          </div>
                          <small
                            className="text-muted"
                            style={{ fontSize: "0.8rem" }}
                          >
                            {user.email}
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Items */}
                    <Dropdown.Item
                      as={Link}
                      to="/profile"
                      className="d-flex align-items-center gap-3 px-3 py-2 rounded"
                      style={{
                        borderRadius: "10px",
                        transition: "all 0.2s ease",
                        fontSize: "0.9rem",
                        color: "#4a5568",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f7fafc";
                        e.currentTarget.style.color = "#667eea";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#4a5568";
                      }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaUserCircle
                        style={{ color: "#667eea", fontSize: "1.1rem" }}
                      />
                      <span>My Profile</span>
                    </Dropdown.Item>

                    <Dropdown.Item
                      as={Link}
                      to="/settings"
                      className="d-flex align-items-center gap-3 px-3 py-2 rounded"
                      style={{
                        borderRadius: "10px",
                        transition: "all 0.2s ease",
                        fontSize: "0.9rem",
                        color: "#4a5568",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f7fafc";
                        e.currentTarget.style.color = "#667eea";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#4a5568";
                      }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaCog style={{ color: "#764ba2", fontSize: "1.1rem" }} />
                      <span>Settings</span>
                    </Dropdown.Item>

                    <Dropdown.Divider
                      className="my-1"
                      style={{ borderColor: "#f0f0f0" }}
                    />

                    <Dropdown.Item
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="d-flex align-items-center gap-3 px-3 py-2 rounded text-danger"
                      style={{
                        borderRadius: "10px",
                        transition: "all 0.2s ease",
                        fontSize: "0.9rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#fff5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <FaSignOutAlt style={{ fontSize: "1.1rem" }} />
                      <span>Logout</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                {/* Login Link */}
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="d-flex align-items-center gap-2 px-3 rounded-pill"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    transition: "all 0.3s ease",
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  }}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Nav.Link>

                {/* Signup Button */}
                <Button
                  as={Link}
                  to="/signup"
                  className="px-4 py-2 rounded-pill d-flex align-items-center gap-2"
                  style={{
                    background: "white",
                    color: "#667eea",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 30px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0,0,0,0.12)";
                  }}
                >
                  <FaUserPlus />
                  <span>Sign Up</span>
                </Button>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>

      {/* CSS Animation */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .dropdown-menu.show {
          animation: slideDown 0.25s ease;
        }
      `}</style>
    </BSNavbar>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Navbar as BSNavbar,
//   Nav,
//   Container,
//   Button,
//   Dropdown,
//   Badge,
// } from "react-bootstrap";
// import api from "../axios/api";
// import {
//   FaUser,
//   FaSignOutAlt,
//   FaSignInAlt,
//   FaUserPlus,
//   FaHome,
//   FaChevronDown,
//   FaCog,
//   FaUserCircle,
//   FaBell,
// } from "react-icons/fa";

// const Navbar = ({ user, setUser }) => {
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await api.post("/auth/logout");
//       setUser(null);
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getUserName = () => {
//     if (!user) return "";
//     return user.displayName || user.name || user.email || "User";
//   };

//   const getUserInitials = () => {
//     const name = getUserName();
//     if (name === "User" || !name) return "?";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const getAvatarColor = () => {
//     const colors = [
//       "#FF6B6B",
//       "#4ECDC4",
//       "#45B7D1",
//       "#96CEB4",
//       "#FFEAA7",
//       "#DDA0DD",
//       "#98D8C8",
//       "#F7DC6F",
//       "#BB8FCE",
//       "#85C1E9",
//     ];
//     const index = getUserName().length % colors.length;
//     return colors[index];
//   };

//   return (
//     <BSNavbar
//       expand="lg"
//       className="shadow-lg"
//       style={{
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         padding: "0.6rem 0",
//         position: "sticky",
//         top: 0,
//         zIndex: 1000,
//         borderBottom: "1px solid rgba(255,255,255,0.1)",
//       }}
//     >
//       <Container>
//         {/* Brand/Logo */}
//         <BSNavbar.Brand
//           as={Link}
//           to="/"
//           className="fw-bold d-flex align-items-center"
//           style={{
//             color: "white",
//             fontSize: "1.6rem",
//             textShadow: "0 2px 4px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease",
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.transform = "scale(1.02)")
//           }
//           onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//         >
//           <div
//             className="rounded-circle d-flex align-items-center justify-content-center me-2"
//             style={{
//               width: "42px",
//               height: "42px",
//               background: "rgba(255,255,255,0.2)",
//               backdropFilter: "blur(10px)",
//               border: "2px solid rgba(255,255,255,0.3)",
//               transition: "all 0.3s ease",
//             }}
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="white"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//             </svg>
//           </div>
//           <span style={{ letterSpacing: "0.5px" }}>
//             Auth<span style={{ fontWeight: "300", opacity: 0.9 }}>App</span>
//           </span>
//         </BSNavbar.Brand>

//         {/* Mobile Toggle */}
//         <BSNavbar.Toggle
//           aria-controls="navbarNav"
//           className="border-0"
//           style={{
//             border: "2px solid rgba(255,255,255,0.3)",
//             padding: "0.4rem 0.6rem",
//             borderRadius: "8px",
//           }}
//         >
//           <span
//             className="navbar-toggler-icon"
//             style={{ filter: "brightness(0) invert(1)" }}
//           />
//         </BSNavbar.Toggle>

//         {/* Navbar Links */}
//         <BSNavbar.Collapse id="navbarNav">
//           <Nav className="ms-auto align-items-lg-center gap-1 gap-lg-2">
//             {/* Home Link */}
//             <Nav.Link
//               as={Link}
//               to="/"
//               className="d-flex align-items-center gap-2 px-3 rounded-pill"
//               style={{
//                 color: "rgba(255,255,255,0.85)",
//                 transition: "all 0.3s ease",
//                 fontSize: "0.95rem",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "rgba(255,255,255,0.15)";
//                 e.currentTarget.style.color = "white";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "transparent";
//                 e.currentTarget.style.color = "rgba(255,255,255,0.85)";
//               }}
//             >
//               <FaHome />
//               <span>Home</span>
//             </Nav.Link>

//             {user ? (
//               <>
//                 {/* Profile Link */}
//                 <Nav.Link
//                   as={Link}
//                   to="/profile"
//                   className="d-flex align-items-center gap-2 px-3 rounded-pill"
//                   style={{
//                     color: "rgba(255,255,255,0.85)",
//                     transition: "all 0.3s ease",
//                     fontSize: "0.95rem",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "rgba(255,255,255,0.15)";
//                     e.currentTarget.style.color = "white";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "transparent";
//                     e.currentTarget.style.color = "rgba(255,255,255,0.85)";
//                   }}
//                 >
//                   <FaUser />
//                   <span>Profile</span>
//                 </Nav.Link>

//                 {/* Notification Bell */}
//                 <div className="d-none d-md-block">
//                   <Button
//                     variant="link"
//                     className="position-relative"
//                     style={{
//                       color: "rgba(255,255,255,0.8)",
//                       transition: "all 0.3s ease",
//                       padding: "0.4rem 0.6rem",
//                       textDecoration: "none",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.color = "white";
//                       e.currentTarget.style.transform = "scale(1.1)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.color = "rgba(255,255,255,0.8)";
//                       e.currentTarget.style.transform = "scale(1)";
//                     }}
//                   >
//                     <FaBell size={18} />
//                     <Badge
//                       pill
//                       bg="danger"
//                       className="position-absolute top-0 start-100 translate-middle"
//                       style={{
//                         fontSize: "0.6rem",
//                         padding: "0.2rem 0.4rem",
//                         border: "2px solid #764ba2",
//                       }}
//                     >
//                       3
//                     </Badge>
//                   </Button>
//                 </div>

//                 {/* User Dropdown */}
//                 <Dropdown
//                   show={dropdownOpen}
//                   onToggle={() => setDropdownOpen(!dropdownOpen)}
//                   align="end"
//                 >
//                   <Dropdown.Toggle
//                     as="div"
//                     className="d-flex align-items-center gap-2 rounded-pill px-3 py-1"
//                     style={{
//                       background: dropdownOpen
//                         ? "rgba(255,255,255,0.25)"
//                         : "rgba(255,255,255,0.12)",
//                       backdropFilter: "blur(10px)",
//                       border: "1px solid rgba(255,255,255,0.2)",
//                       transition: "all 0.3s ease",
//                       color: "white",
//                       cursor: "pointer",
//                     }}
//                     onMouseEnter={(e) => {
//                       if (!dropdownOpen) {
//                         e.currentTarget.style.background =
//                           "rgba(255,255,255,0.2)";
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       if (!dropdownOpen) {
//                         e.currentTarget.style.background =
//                           "rgba(255,255,255,0.12)";
//                       }
//                     }}
//                   >
//                     {/* Avatar */}
//                     <div
//                       className="rounded-circle d-flex align-items-center justify-content-center"
//                       style={{
//                         width: "34px",
//                         height: "34px",
//                         fontSize: "13px",
//                         fontWeight: "bold",
//                         color: "white",
//                         background: getAvatarColor(),
//                         border: "2px solid rgba(255,255,255,0.4)",
//                         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                       }}
//                     >
//                       {getUserInitials()}
//                     </div>
//                     <span
//                       className="d-none d-md-inline"
//                       style={{ fontSize: "0.9rem" }}
//                     >
//                       {getUserName()}
//                     </span>
//                     <FaChevronDown
//                       style={{
//                         fontSize: "0.65rem",
//                         transition: "transform 0.3s ease",
//                         transform: dropdownOpen
//                           ? "rotate(180deg)"
//                           : "rotate(0)",
//                         opacity: 0.7,
//                       }}
//                     />
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu
//                     style={{
//                       background: "white",
//                       borderRadius: "14px",
//                       boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
//                       border: "none",
//                       minWidth: "240px",
//                       padding: "0.6rem",
//                       marginTop: "0.6rem",
//                       animation: "slideDown 0.25s ease",
//                     }}
//                   >
//                     {/* User Info Header */}
//                     <div
//                       className="px-3 py-2 border-bottom"
//                       style={{ borderColor: "#f0f0f0" }}
//                     >
//                       <div className="d-flex align-items-center gap-3">
//                         <div
//                           className="rounded-circle d-flex align-items-center justify-content-center"
//                           style={{
//                             width: "44px",
//                             height: "44px",
//                             fontSize: "16px",
//                             fontWeight: "bold",
//                             color: "white",
//                             background: getAvatarColor(),
//                             flexShrink: 0,
//                           }}
//                         >
//                           {getUserInitials()}
//                         </div>
//                         <div>
//                           <div
//                             className="fw-bold"
//                             style={{ color: "#2d3748", fontSize: "0.95rem" }}
//                           >
//                             {getUserName()}
//                           </div>
//                           <small
//                             className="text-muted"
//                             style={{ fontSize: "0.8rem" }}
//                           >
//                             {user.email}
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Dropdown Items */}
//                     <Dropdown.Item
//                       as={Link}
//                       to="/profile"
//                       className="d-flex align-items-center gap-3 px-3 py-2 rounded"
//                       style={{
//                         borderRadius: "10px",
//                         transition: "all 0.2s ease",
//                         fontSize: "0.9rem",
//                         color: "#4a5568",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = "#f7fafc";
//                         e.currentTarget.style.color = "#667eea";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "transparent";
//                         e.currentTarget.style.color = "#4a5568";
//                       }}
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       <FaUserCircle
//                         style={{ color: "#667eea", fontSize: "1.1rem" }}
//                       />
//                       <span>My Profile</span>
//                     </Dropdown.Item>

//                     <Dropdown.Item
//                       as={Link}
//                       to="/settings"
//                       className="d-flex align-items-center gap-3 px-3 py-2 rounded"
//                       style={{
//                         borderRadius: "10px",
//                         transition: "all 0.2s ease",
//                         fontSize: "0.9rem",
//                         color: "#4a5568",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = "#f7fafc";
//                         e.currentTarget.style.color = "#667eea";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "transparent";
//                         e.currentTarget.style.color = "#4a5568";
//                       }}
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       <FaCog style={{ color: "#764ba2", fontSize: "1.1rem" }} />
//                       <span>Settings</span>
//                     </Dropdown.Item>

//                     <Dropdown.Divider
//                       className="my-1"
//                       style={{ borderColor: "#f0f0f0" }}
//                     />

//                     <Dropdown.Item
//                       onClick={() => {
//                         setDropdownOpen(false);
//                         handleLogout();
//                       }}
//                       className="d-flex align-items-center gap-3 px-3 py-2 rounded text-danger"
//                       style={{
//                         borderRadius: "10px",
//                         transition: "all 0.2s ease",
//                         fontSize: "0.9rem",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = "#fff5f5";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "transparent";
//                       }}
//                     >
//                       <FaSignOutAlt style={{ fontSize: "1.1rem" }} />
//                       <span>Logout</span>
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </>
//             ) : (
//               <>
//                 {/* Login Link */}
//                 <Nav.Link
//                   as={Link}
//                   to="/login"
//                   className="d-flex align-items-center gap-2 px-3 rounded-pill"
//                   style={{
//                     color: "rgba(255,255,255,0.85)",
//                     transition: "all 0.3s ease",
//                     fontSize: "0.95rem",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "rgba(255,255,255,0.15)";
//                     e.currentTarget.style.color = "white";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "transparent";
//                     e.currentTarget.style.color = "rgba(255,255,255,0.85)";
//                   }}
//                 >
//                   <FaSignInAlt />
//                   <span>Login</span>
//                 </Nav.Link>

//                 {/* Signup Button */}
//                 <Button
//                   as={Link}
//                   to="/signup"
//                   className="px-4 py-2 rounded-pill d-flex align-items-center gap-2"
//                   style={{
//                     background: "white",
//                     color: "#667eea",
//                     fontWeight: "600",
//                     transition: "all 0.3s ease",
//                     boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
//                     border: "none",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                     e.currentTarget.style.boxShadow =
//                       "0 8px 30px rgba(0,0,0,0.2)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 15px rgba(0,0,0,0.12)";
//                   }}
//                 >
//                   <FaUserPlus />
//                   <span>Sign Up</span>
//                 </Button>
//               </>
//             )}
//           </Nav>
//         </BSNavbar.Collapse>
//       </Container>

//       {/* CSS Animation */}
//       <style>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//         .dropdown-menu.show {
//           animation: slideDown 0.25s ease;
//         }
//       `}</style>
//     </BSNavbar>
//   );
// };

// export default Navbar;
