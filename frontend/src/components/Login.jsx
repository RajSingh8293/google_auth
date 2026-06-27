// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../axios/api";
// import {
//   FaGoogle,
//   FaEnvelope,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";

// const Login = ({ setUser }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await api.post("/auth/login", formData);
//       setUser(res.data.user);
//       navigate("/profile");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:5000/api/auth/google";
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
//       <div className="row w-100">
//         <div className="col-lg-5 col-md-7 col-11 mx-auto">
//           <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
//             {/* Decorative gradient bar at top */}
//             <div
//               style={{
//                 height: "6px",
//                 background:
//                   "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
//               }}
//             />

//             <div className="card-body p-4 p-md-5">
//               {/* Logo/Brand */}
//               <div className="text-center mb-4">
//                 <div
//                   className="d-inline-block rounded-circle p-3 mb-3"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//                     transition: "transform 0.3s ease",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.transform = "scale(1.05)")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.transform = "scale(1)")
//                   }
//                 >
//                   <svg
//                     width="32"
//                     height="32"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="white"
//                     strokeWidth="2"
//                   >
//                     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//                   </svg>
//                 </div>
//                 <h2 className="fw-bold" style={{ color: "#2d3748" }}>
//                   Welcome Back
//                 </h2>
//                 <p className="text-muted" style={{ fontSize: "0.95rem" }}>
//                   Sign in to continue to your account
//                 </p>
//               </div>

//               {/* Error Alert */}
//               {error && (
//                 <div
//                   className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2"
//                   role="alert"
//                   style={{
//                     borderRadius: "12px",
//                     border: "none",
//                     boxShadow: "0 4px 15px rgba(220, 53, 69, 0.1)",
//                   }}
//                 >
//                   <i className="bi bi-exclamation-triangle-fill"></i>
//                   <span>{error}</span>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setError("")}
//                   ></button>
//                 </div>
//               )}

//               {/* Login Form */}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="email"
//                     className="form-label fw-semibold"
//                     style={{ color: "#4a5568" }}
//                   >
//                     <FaEnvelope className="me-2 text-primary" />
//                     Email Address
//                   </label>
//                   <div className="input-group">
//                     <span
//                       className="input-group-text bg-light border-end-0"
//                       style={{ borderRadius: "12px 0 0 12px" }}
//                     >
//                       <FaEnvelope className="text-primary" />
//                     </span>
//                     <input
//                       type="email"
//                       className="form-control form-control-lg border-start-0"
//                       id="email"
//                       name="email"
//                       placeholder="name@example.com"
//                       onChange={handleChange}
//                       required
//                       autoFocus
//                       style={{
//                         borderRadius: "0 12px 12px 0",
//                         borderColor: "#e2e8f0",
//                         transition: "all 0.3s ease",
//                       }}
//                       onFocus={(e) => {
//                         e.currentTarget.style.borderColor = "#667eea";
//                         e.currentTarget.style.boxShadow =
//                           "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                       }}
//                       onBlur={(e) => {
//                         e.currentTarget.style.borderColor = "#e2e8f0";
//                         e.currentTarget.style.boxShadow = "none";
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label
//                     htmlFor="password"
//                     className="form-label fw-semibold"
//                     style={{ color: "#4a5568" }}
//                   >
//                     <FaLock className="me-2 text-primary" />
//                     Password
//                   </label>
//                   <div className="input-group">
//                     <span
//                       className="input-group-text bg-light border-end-0"
//                       style={{ borderRadius: "12px 0 0 12px" }}
//                     >
//                       <FaLock className="text-primary" />
//                     </span>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className="form-control form-control-lg border-start-0"
//                       id="password"
//                       name="password"
//                       placeholder="Enter your password"
//                       onChange={handleChange}
//                       required
//                       style={{
//                         borderRadius: "0 12px 12px 0",
//                         borderColor: "#e2e8f0",
//                         transition: "all 0.3s ease",
//                       }}
//                       onFocus={(e) => {
//                         e.currentTarget.style.borderColor = "#667eea";
//                         e.currentTarget.style.boxShadow =
//                           "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                       }}
//                       onBlur={(e) => {
//                         e.currentTarget.style.borderColor = "#e2e8f0";
//                         e.currentTarget.style.boxShadow = "none";
//                       }}
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary border-start-0"
//                       onClick={() => setShowPassword(!showPassword)}
//                       style={{
//                         borderRadius: "0 12px 12px 0",
//                         borderColor: "#e2e8f0",
//                         background: "white",
//                       }}
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <div className="form-check">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       id="rememberMe"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                       style={{
//                         cursor: "pointer",
//                         borderColor: "#667eea",
//                       }}
//                     />
//                     <label
//                       className="form-check-label text-muted"
//                       htmlFor="rememberMe"
//                       style={{ fontSize: "0.9rem" }}
//                     >
//                       Remember me
//                     </label>
//                   </div>
//                   <Link
//                     to="/forgot-password"
//                     className="text-decoration-none"
//                     style={{
//                       color: "#667eea",
//                       fontSize: "0.9rem",
//                       fontWeight: "500",
//                       transition: "color 0.3s ease",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.color = "#764ba2")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.color = "#667eea")
//                     }
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn btn-primary btn-lg w-100 py-3 fw-semibold rounded-pill"
//                   disabled={loading}
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     border: "none",
//                     transition: "all 0.3s ease",
//                     boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!loading) {
//                       e.currentTarget.style.transform = "translateY(-2px)";
//                       e.currentTarget.style.boxShadow =
//                         "0 8px 25px rgba(102, 126, 234, 0.5)";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 15px rgba(102, 126, 234, 0.4)";
//                   }}
//                 >
//                   {loading ? (
//                     <>
//                       <span
//                         className="spinner-border spinner-border-sm me-2"
//                         role="status"
//                         aria-hidden="true"
//                       ></span>
//                       Signing in...
//                     </>
//                   ) : (
//                     "Sign In"
//                   )}
//                 </button>
//               </form>

//               {/* Divider */}
//               <div className="position-relative my-4">
//                 <hr style={{ borderColor: "#e2e8f0" }} />
//                 <span
//                   className="position-absolute top-50 start-50 translate-middle px-3"
//                   style={{
//                     background: "white",
//                     color: "#a0aec0",
//                     fontSize: "0.8rem",
//                     fontWeight: "600",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                   }}
//                 >
//                   or continue with
//                 </span>
//               </div>

//               {/* Google Login */}
//               <button
//                 onClick={handleGoogleLogin}
//                 className="btn btn-outline-secondary btn-lg w-100 py-3 fw-semibold rounded-pill"
//                 style={{
//                   transition: "all 0.3s ease",
//                   borderColor: "#e2e8f0",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "#f8f9fa";
//                   e.currentTarget.style.borderColor = "#667eea";
//                   e.currentTarget.style.color = "#333333";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.boxShadow =
//                     "0 4px 15px rgba(0,0,0,0.05)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "transparent";
//                   e.currentTarget.style.borderColor = "#e2e8f0";
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow = "none";
//                 }}
//               >
//                 <FaGoogle className="me-2" style={{ color: "#ea4335" }} />
//                 Continue with Google
//               </button>

//               {/* Sign Up Link */}
//               <p className="text-center mt-4 mb-0">
//                 <span className="text-muted">Don't have an account?</span>{" "}
//                 <Link
//                   to="/signup"
//                   className="fw-semibold text-decoration-none"
//                   style={{
//                     color: "#667eea",
//                     transition: "color 0.3s ease",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.color = "#764ba2")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.color = "#667eea")
//                   }
//                 >
//                   Sign Up
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import api from "../axios/api";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      setUser(res.data.user);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 py-5"
      style={{ background: "#f8f9fa" }}
    >
      <Row className="w-100">
        <Col lg={5} md={7} xs={11} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            {/* Decorative gradient bar at top */}
            <div
              style={{
                height: "6px",
                background:
                  "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              }}
            />

            <Card.Body className="p-4 p-md-5">
              {/* Logo/Brand */}
              <div className="text-center mb-4">
                <div
                  className="d-inline-block rounded-circle p-3 mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                    transition: "transform 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h2 className="fw-bold" style={{ color: "#2d3748" }}>
                  Welcome Back
                </h2>
                <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                  Sign in to continue to your account
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setError("")}
                  className="d-flex align-items-center gap-2"
                  style={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 15px rgba(220, 53, 69, 0.1)",
                  }}
                >
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{error}</span>
                </Alert>
              )}

              {/* Login Form */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label
                    className="fw-semibold"
                    style={{ color: "#4a5568" }}
                  >
                    <FaEnvelope className="me-2 text-primary" />
                    Email Address
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      className="bg-light border-end-0"
                      style={{ borderRadius: "12px 0 0 12px" }}
                    >
                      <FaEnvelope className="text-primary" />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      size="lg"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      required
                      autoFocus
                      className="border-start-0"
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#667eea";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(102, 126, 234, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label
                    className="fw-semibold"
                    style={{ color: "#4a5568" }}
                  >
                    <FaLock className="me-2 text-primary" />
                    Password
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      className="bg-light border-end-0"
                      style={{ borderRadius: "12px 0 0 12px" }}
                    >
                      <FaLock className="text-primary" />
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      required
                      className="border-start-0"
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#667eea";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(102, 126, 234, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <Button
                      variant="outline-secondary"
                      className="border-start-0"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#e2e8f0",
                        background: "white",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    label="Remember me"
                    className="text-muted"
                    style={{ fontSize: "0.9rem" }}
                    custom
                  />
                  <Link
                    to="/forgot-password"
                    className="text-decoration-none"
                    style={{
                      color: "#667eea",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#764ba2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#667eea")
                    }
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-100 py-3 fw-semibold rounded-pill"
                  disabled={loading}
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(102, 126, 234, 0.4)";
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>

              {/* Divider */}
              <div className="position-relative my-4">
                <hr style={{ borderColor: "#e2e8f0" }} />
                <span
                  className="position-absolute top-50 start-50 translate-middle px-3"
                  style={{
                    background: "white",
                    color: "#a0aec0",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  or continue with
                </span>
              </div>

              {/* Google Login */}
              <Button
                variant="outline-secondary"
                size="lg"
                className="w-100 py-3 fw-semibold rounded-pill"
                onClick={handleGoogleLogin}
                style={{
                  transition: "all 0.3s ease",
                  borderColor: "#e2e8f0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8f9fa";
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.color = "#333333";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <FaGoogle className="me-2" style={{ color: "#ea4335" }} />
                Continue with Google
              </Button>

              {/* Sign Up Link */}
              <p className="text-center mt-4 mb-0">
                <span className="text-muted">Don't have an account?</span>{" "}
                <Link
                  to="/signup"
                  className="fw-semibold text-decoration-none"
                  style={{
                    color: "#667eea",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#764ba2")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#667eea")
                  }
                >
                  Sign Up
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
