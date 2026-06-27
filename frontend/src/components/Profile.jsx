// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../axios/api";
// import {
//   FaUser,
//   FaEnvelope,
//   FaIdBadge,
//   FaGoogle,
//   FaEdit,
//   FaArrowLeft,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaCalendarAlt,
//   FaShieldAlt,
//   FaUserCheck,
//   FaCamera,
// } from "react-icons/fa";

// const Profile = ({ user, setUser }) => {
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     displayName: "",
//     email: "",
//   });
//   const [updateMessage, setUpdateMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/auth/profile");
//         setUser(res.data.user);
//         setEditData({
//           displayName: res.data.user.displayName || "",
//           email: res.data.user.email || "",
//         });
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         navigate("/login");
//       }
//     };
//     if (!user) {
//       fetchProfile();
//     } else {
//       setEditData({
//         displayName: user.displayName || "",
//         email: user.email || "",
//       });
//       setLoading(false);
//     }
//   }, [user, setUser, navigate]);

//   const handleEditChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.put("/auth/profile", editData);
//       setUser(res.data.user);
//       setIsEditing(false);
//       setMessageType("success");
//       setUpdateMessage("Profile updated successfully! 🎉");
//       setTimeout(() => {
//         setUpdateMessage("");
//         setMessageType("");
//       }, 3000);
//     } catch (err) {
//       setMessageType("error");
//       setUpdateMessage(err.response?.data?.message || "Update failed");
//       setTimeout(() => {
//         setUpdateMessage("");
//         setMessageType("");
//       }, 3000);
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return "?";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const getAvatarColor = () => {
//     const colors = [
//       "#667eea",
//       "#764ba2",
//       "#f093fb",
//       "#4facfe",
//       "#43e97b",
//       "#fa709a",
//       "#30cfd0",
//       "#a18cd1",
//     ];
//     const index = user?.displayName?.length % colors.length || 0;
//     return colors[index];
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };

//   if (loading) {
//     return (
//       <div className="container d-flex justify-content-center align-items-center min-vh-100">
//         <div className="text-center">
//           <div
//             className="spinner-border text-primary"
//             role="status"
//             style={{ width: "4rem", height: "4rem" }}
//           >
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3 text-muted" style={{ fontSize: "1.1rem" }}>
//             Loading your profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-8 col-md-10">
//           {/* Back Button */}
//           <Link
//             to="/"
//             className="btn btn-outline-secondary btn-sm mb-4 rounded-pill px-4"
//             style={{ transition: "all 0.3s ease" }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "#f8f9fa";
//               e.currentTarget.style.transform = "translateX(-5px)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "transparent";
//               e.currentTarget.style.transform = "translateX(0)";
//             }}
//           >
//             <FaArrowLeft className="me-2" />
//             Back to Home
//           </Link>

//           {/* Profile Card */}
//           <div
//             className="card shadow-lg border-0 rounded-4 overflow-hidden"
//             style={{ background: "#fff" }}
//           >
//             {/* Cover Image with Gradient */}
//             <div
//               className="position-relative"
//               style={{
//                 height: "180px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 position: "relative",
//               }}
//             >
//               <div
//                 className="position-absolute top-0 start-0 w-100 h-100"
//                 style={{
//                   background:
//                     'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
//                   opacity: 0.5,
//                 }}
//               />
//             </div>

//             {/* Profile Content */}
//             <div
//               className="card-body p-4 p-md-5"
//               style={{ marginTop: "-80px", position: "relative" }}
//             >
//               {/* Avatar Section */}
//               <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
//                 <div
//                   className="flex-shrink-0 position-relative"
//                   onMouseEnter={() => setIsHoveringAvatar(true)}
//                   onMouseLeave={() => setIsHoveringAvatar(false)}
//                 >
//                   {user.avatar ? (
//                     <img
//                       src={user.avatar}
//                       alt={user.displayName}
//                       className="rounded-circle border border-4 border-white shadow"
//                       style={{
//                         width: "140px",
//                         height: "140px",
//                         objectFit: "cover",
//                         transition: "transform 0.3s ease",
//                         transform: isHoveringAvatar
//                           ? "scale(1.05)"
//                           : "scale(1)",
//                       }}
//                     />
//                   ) : (
//                     <div
//                       className="rounded-circle border border-4 border-white shadow d-flex align-items-center justify-content-center position-relative"
//                       style={{
//                         width: "140px",
//                         height: "140px",
//                         fontSize: "3.5rem",
//                         fontWeight: "bold",
//                         color: "white",
//                         background: getAvatarColor(),
//                         transition: "transform 0.3s ease",
//                         transform: isHoveringAvatar
//                           ? "scale(1.05)"
//                           : "scale(1)",
//                       }}
//                     >
//                       {getInitials(user.displayName)}
//                       {isHoveringAvatar && (
//                         <div
//                           className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
//                           style={{
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             background: "rgba(0,0,0,0.4)",
//                             transition: "all 0.3s ease",
//                           }}
//                         >
//                           <FaCamera size={30} color="white" />
//                         </div>
//                       )}
//                     </div>
//                   )}
//                   <div
//                     className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white"
//                     style={{
//                       width: "24px",
//                       height: "24px",
//                       bottom: "8px",
//                       right: "8px",
//                     }}
//                   />
//                 </div>

//                 {/* User Info */}
//                 <div className="flex-grow-1 text-center text-md-start">
//                   <div>
//                     <small
//                       className="text-muted"
//                       style={{ fontSize: "0.85rem" }}
//                     >
//                       {getGreeting()} 👋
//                     </small>
//                     <h2 className="fw-bold mb-1" style={{ color: "#2d3748" }}>
//                       {user.displayName}
//                     </h2>
//                     <p className="text-muted mb-3 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
//                       <FaEnvelope className="text-primary" />
//                       {user.email}
//                     </p>
//                   </div>
//                   {!isEditing && (
//                     <button
//                       onClick={() => setIsEditing(true)}
//                       className="btn btn-primary rounded-pill px-4 py-2"
//                       style={{
//                         background:
//                           "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                         border: "none",
//                         transition: "all 0.3s ease",
//                         boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = "translateY(-2px)";
//                         e.currentTarget.style.boxShadow =
//                           "0 8px 25px rgba(102, 126, 234, 0.5)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = "translateY(0)";
//                         e.currentTarget.style.boxShadow =
//                           "0 4px 15px rgba(102, 126, 234, 0.4)";
//                       }}
//                     >
//                       <FaEdit className="me-2" />
//                       Edit Profile
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Update Message */}
//               {updateMessage && (
//                 <div
//                   className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"} mt-4 d-flex align-items-center gap-2`}
//                   role="alert"
//                   style={{
//                     borderRadius: "12px",
//                     border: "none",
//                     boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
//                     animation: "slideDown 0.3s ease",
//                   }}
//                 >
//                   {messageType === "success" ? (
//                     <FaCheckCircle size={20} />
//                   ) : (
//                     <FaTimesCircle size={20} />
//                   )}
//                   {updateMessage}
//                 </div>
//               )}

//               {/* Edit Form */}
//               {isEditing && (
//                 <form
//                   onSubmit={handleUpdateProfile}
//                   className="mt-4 pt-4"
//                   style={{ borderTop: "1px solid #e2e8f0" }}
//                 >
//                   <div className="row g-4">
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold text-secondary">
//                         <FaUser className="me-2 text-primary" />
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control form-control-lg rounded-3"
//                         name="displayName"
//                         value={editData.displayName}
//                         onChange={handleEditChange}
//                         required
//                         style={{
//                           borderColor: "#e2e8f0",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.currentTarget.style.borderColor = "#667eea";
//                           e.currentTarget.style.boxShadow =
//                             "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                         }}
//                         onBlur={(e) => {
//                           e.currentTarget.style.borderColor = "#e2e8f0";
//                           e.currentTarget.style.boxShadow = "none";
//                         }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold text-secondary">
//                         <FaEnvelope className="me-2 text-primary" />
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         className="form-control form-control-lg rounded-3"
//                         name="email"
//                         value={editData.email}
//                         onChange={handleEditChange}
//                         required
//                         style={{
//                           borderColor: "#e2e8f0",
//                           transition: "all 0.3s ease",
//                         }}
//                         onFocus={(e) => {
//                           e.currentTarget.style.borderColor = "#667eea";
//                           e.currentTarget.style.boxShadow =
//                             "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                         }}
//                         onBlur={(e) => {
//                           e.currentTarget.style.borderColor = "#e2e8f0";
//                           e.currentTarget.style.boxShadow = "none";
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="mt-4 d-flex gap-3">
//                     <button
//                       type="submit"
//                       className="btn btn-success rounded-pill px-4 py-2"
//                       style={{
//                         fontWeight: "600",
//                         transition: "all 0.3s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = "translateY(-2px)";
//                         e.currentTarget.style.boxShadow =
//                           "0 4px 15px rgba(40, 167, 69, 0.3)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = "translateY(0)";
//                         e.currentTarget.style.boxShadow = "none";
//                       }}
//                     >
//                       <FaCheckCircle className="me-2" />
//                       Save Changes
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary rounded-pill px-4 py-2"
//                       onClick={() => {
//                         setIsEditing(false);
//                         setEditData({
//                           displayName: user.displayName || "",
//                           email: user.email || "",
//                         });
//                       }}
//                       style={{
//                         fontWeight: "600",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <FaTimesCircle className="me-2" />
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               )}

//               {/* Account Details */}
//               <div
//                 className="mt-4 pt-4"
//                 style={{ borderTop: "1px solid #e2e8f0" }}
//               >
//                 <h5 className="fw-bold mb-4" style={{ color: "#2d3748" }}>
//                   <FaShieldAlt className="me-2 text-primary" />
//                   Account Details
//                 </h5>
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <div
//                       className="p-3 rounded-3"
//                       style={{
//                         background:
//                           "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
//                         transition: "all 0.3s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = "translateY(-3px)";
//                         e.currentTarget.style.boxShadow =
//                           "0 4px 15px rgba(0,0,0,0.05)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = "translateY(0)";
//                         e.currentTarget.style.boxShadow = "none";
//                       }}
//                     >
//                       <small className="text-muted d-block mb-1">
//                         <FaIdBadge className="me-1" />
//                         User ID
//                       </small>
//                       <span
//                         className="fw-semibold font-monospace"
//                         style={{ fontSize: "0.9rem" }}
//                       >
//                         {user._id}
//                       </span>
//                     </div>
//                   </div>

//                   {user.googleId && (
//                     <div className="col-md-6">
//                       <div
//                         className="p-3 rounded-3"
//                         style={{
//                           background:
//                             "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
//                           transition: "all 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = "translateY(-3px)";
//                           e.currentTarget.style.boxShadow =
//                             "0 4px 15px rgba(0,0,0,0.05)";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = "translateY(0)";
//                           e.currentTarget.style.boxShadow = "none";
//                         }}
//                       >
//                         <small className="text-muted d-block mb-1">
//                           <FaGoogle className="me-1 text-danger" />
//                           Google Account
//                         </small>
//                         <span className="fw-semibold text-success">
//                           <FaCheckCircle className="me-1" />
//                           Connected
//                         </span>
//                       </div>
//                     </div>
//                   )}

//                   <div className="col-md-6">
//                     <div
//                       className="p-3 rounded-3"
//                       style={{
//                         background:
//                           "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
//                         transition: "all 0.3s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = "translateY(-3px)";
//                         e.currentTarget.style.boxShadow =
//                           "0 4px 15px rgba(0,0,0,0.05)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = "translateY(0)";
//                         e.currentTarget.style.boxShadow = "none";
//                       }}
//                     >
//                       <small className="text-muted d-block mb-1">
//                         <FaUserCheck className="me-1" />
//                         Account Type
//                       </small>
//                       <span className="fw-semibold">
//                         {user.googleId ? "Google OAuth" : "Email & Password"}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div
//                       className="p-3 rounded-3"
//                       style={{
//                         background:
//                           "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
//                         transition: "all 0.3s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = "translateY(-3px)";
//                         e.currentTarget.style.boxShadow =
//                           "0 4px 15px rgba(0,0,0,0.05)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = "translateY(0)";
//                         e.currentTarget.style.boxShadow = "none";
//                       }}
//                     >
//                       <small className="text-muted d-block mb-1">
//                         <FaCalendarAlt className="me-1" />
//                         Member Since
//                       </small>
//                       <span className="fw-semibold">
//                         {new Date(
//                           user.createdAt || Date.now(),
//                         ).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div
//                 className="mt-4 pt-4 d-flex flex-wrap gap-3"
//                 style={{ borderTop: "1px solid #e2e8f0" }}
//               >
//                 <button
//                   onClick={() => navigate("/")}
//                   className="btn btn-outline-primary rounded-pill px-4 py-2"
//                   style={{
//                     transition: "all 0.3s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 15px rgba(102, 126, 234, 0.2)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow = "none";
//                   }}
//                 >
//                   <FaArrowLeft className="me-2" />
//                   Go to Dashboard
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import api from "../axios/api";
import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaGoogle,
  FaArrowLeft,
  FaCalendarAlt,
  FaShieldAlt,
  FaUserCheck,
} from "react-icons/fa";

const Profile = ({ user, setUser }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    if (!user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user, setUser, navigate]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = () => {
    const colors = [
      "#667eea",
      "#764ba2",
      "#f093fb",
      "#4facfe",
      "#43e97b",
      "#fa709a",
      "#30cfd0",
      "#a18cd1",
    ];
    const index = user?.displayName?.length % colors.length || 0;
    return colors[index];
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getMemberStatus = () => {
    if (!user?.createdAt) return "New Member";
    const days = Math.floor(
      (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24),
    );
    if (days < 7) return "New Member";
    if (days < 30) return "Active Member";
    if (days < 365) return "Loyal Member";
    return "Veteran Member";
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner
            animation="border"
            variant="primary"
            role="status"
            style={{ width: "4rem", height: "4rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted" style={{ fontSize: "1.1rem" }}>
            Loading your profile...
          </p>
        </div>
      </Container>
    );
  }

  if (!user) return null;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          {/* Back Button */}
          <Button
            as={Link}
            to="/"
            variant="outline-secondary"
            size="sm"
            className="mb-4 rounded-pill px-4"
            style={{
              transition: "all 0.3s ease",
              borderColor: "#e2e8f0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f8f9fa";
              e.currentTarget.style.transform = "translateX(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <FaArrowLeft className="me-2" />
            Back to Home
          </Button>

          {/* Profile Card */}
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            {/* Cover Image with Gradient */}
            <div
              className="position-relative"
              style={{
                height: "180px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Profile Content */}
            <Card.Body
              className="p-4 p-md-5"
              style={{ marginTop: "-80px", position: "relative" }}
            >
              {/* Avatar Section */}
              <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
                <div className="flex-shrink-0 position-relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.displayName}
                      className="rounded-circle border border-4 border-white shadow"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle border border-4 border-white shadow d-flex align-items-center justify-content-center"
                      style={{
                        width: "140px",
                        height: "140px",
                        fontSize: "3.5rem",
                        fontWeight: "bold",
                        color: "white",
                        background: getAvatarColor(),
                      }}
                    >
                      {getInitials(user.displayName)}
                    </div>
                  )}
                  <div
                    className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white"
                    style={{
                      width: "24px",
                      height: "24px",
                      bottom: "8px",
                      right: "8px",
                    }}
                  />
                </div>

                {/* User Info */}
                <div className="flex-grow-1 text-center text-md-start">
                  <div>
                    <small
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {getGreeting()} 👋
                    </small>
                    <h2 className="fw-bold mb-1" style={{ color: "#2d3748" }}>
                      {user.displayName}
                    </h2>
                    <p className="text-muted mb-2 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                      <FaEnvelope className="text-primary" />
                      {user.email}
                    </p>
                    <Badge
                      bg="primary"
                      className="rounded-pill px-3 py-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {getMemberStatus()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div
                className="mt-5 pt-4"
                style={{ borderTop: "1px solid #e2e8f0" }}
              >
                <h5 className="fw-bold mb-4" style={{ color: "#2d3748" }}>
                  <FaShieldAlt className="me-2 text-primary" />
                  Account Details
                </h5>
                <Row className="g-3">
                  <Col md={6}>
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 15px rgba(0,0,0,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <small className="text-muted d-block mb-1">
                        <FaIdBadge className="me-1 text-primary" />
                        User ID
                      </small>
                      <span
                        className="fw-semibold font-monospace"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {user._id}
                      </span>
                    </div>
                  </Col>

                  {user.googleId && (
                    <Col md={6}>
                      <div
                        className="p-3 rounded-3 h-100"
                        style={{
                          background:
                            "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-3px)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 15px rgba(0,0,0,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <small className="text-muted d-block mb-1">
                          <FaGoogle className="me-1 text-danger" />
                          Google Account
                        </small>
                        <span className="fw-semibold text-success">
                          <i className="bi bi-check-circle-fill me-1"></i>
                          Connected
                        </span>
                      </div>
                    </Col>
                  )}

                  <Col md={6}>
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 15px rgba(0,0,0,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <small className="text-muted d-block mb-1">
                        <FaUserCheck className="me-1 text-success" />
                        Account Type
                      </small>
                      <span className="fw-semibold">
                        {user.googleId ? "Google OAuth" : "Email & Password"}
                      </span>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{
                        background:
                          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 15px rgba(0,0,0,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <small className="text-muted d-block mb-1">
                        <FaCalendarAlt className="me-1 text-warning" />
                        Member Since
                      </small>
                      <span className="fw-semibold">
                        {new Date(
                          user.createdAt || Date.now(),
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Stats Section */}
              <div
                className="mt-4 pt-4"
                style={{ borderTop: "1px solid #e2e8f0" }}
              >
                <Row className="g-3">
                  <Col xs={4}>
                    <div
                      className="text-center p-3 rounded-3"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        1
                      </div>
                      <small style={{ color: "rgba(255,255,255,0.8)" }}>
                        Projects
                      </small>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div
                      className="text-center p-3 rounded-3"
                      style={{
                        background:
                          "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        0
                      </div>
                      <small style={{ color: "rgba(255,255,255,0.8)" }}>
                        Following
                      </small>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div
                      className="text-center p-3 rounded-3"
                      style={{
                        background:
                          "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        0
                      </div>
                      <small style={{ color: "rgba(255,255,255,0.8)" }}>
                        Followers
                      </small>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Action Buttons */}
              <div
                className="mt-4 pt-4 d-flex flex-wrap gap-3"
                style={{ borderTop: "1px solid #e2e8f0" }}
              >
                <Button
                  onClick={() => navigate("/")}
                  className="rounded-pill px-4 py-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(102, 126, 234, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(102, 126, 234, 0.4)";
                  }}
                >
                  <FaArrowLeft className="me-2" />
                  Go to Dashboard
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
