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
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Signup = ({ setUser }) => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");

    // Check password strength
    if (e.target.name === "password") {
      const password = e.target.value;
      if (password.length === 0) {
        setPasswordStrength("");
      } else if (password.length < 6) {
        setPasswordStrength("weak");
      } else if (password.length < 10) {
        setPasswordStrength("medium");
      } else {
        setPasswordStrength("strong");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError("Please agree to the Terms and Conditions");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", formData);
      setUser(res.data.user);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "#f56565";
      case "medium":
        return "#ed8936";
      case "strong":
        return "#48bb78";
      default:
        return "#e2e8f0";
    }
  };

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case "weak":
        return "Weak";
      case "medium":
        return "Medium";
      case "strong":
        return "Strong";
      default:
        return "";
    }
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
                  "linear-gradient(90deg, #48bb78 0%, #38a169 50%, #2f855a 100%)",
              }}
            />

            <Card.Body className="p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="d-inline-block rounded-circle p-3 mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                    boxShadow: "0 8px 25px rgba(72, 187, 120, 0.4)",
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
                  <FaUserPlus size={28} color="white" />
                </div>
                <h2 className="fw-bold" style={{ color: "#2d3748" }}>
                  Create Account
                </h2>
                <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                  Join us and get started today
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

              {/* Signup Form */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label
                    className="fw-semibold"
                    style={{ color: "#4a5568" }}
                  >
                    <FaUser className="me-2 text-success" />
                    Full Name
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      className="bg-light border-end-0"
                      style={{ borderRadius: "12px 0 0 12px" }}
                    >
                      <FaUser className="text-success" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      size="lg"
                      id="displayName"
                      name="displayName"
                      placeholder="John Doe"
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
                        e.currentTarget.style.borderColor = "#48bb78";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(72, 187, 120, 0.1)";
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
                    <FaEnvelope className="me-2 text-success" />
                    Email Address
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      className="bg-light border-end-0"
                      style={{ borderRadius: "12px 0 0 12px" }}
                    >
                      <FaEnvelope className="text-success" />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      size="lg"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      required
                      className="border-start-0"
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#48bb78";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(72, 187, 120, 0.1)";
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
                    <FaLock className="me-2 text-success" />
                    Password
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      className="bg-light border-end-0"
                      style={{ borderRadius: "12px 0 0 12px" }}
                    >
                      <FaLock className="text-success" />
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      id="password"
                      name="password"
                      placeholder="Create a strong password"
                      onChange={handleChange}
                      required
                      minLength="6"
                      className="border-start-0"
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#48bb78";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(72, 187, 120, 0.1)";
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

                  {/* Password Strength Indicator */}
                  {passwordStrength && (
                    <div className="mt-2">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            height: "4px",
                            flex: 1,
                            background: "#e2e8f0",
                            borderRadius: "2px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width:
                                passwordStrength === "weak"
                                  ? "33%"
                                  : passwordStrength === "medium"
                                    ? "66%"
                                    : "100%",
                              background: getPasswordStrengthColor(),
                              transition: "all 0.3s ease",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            color: getPasswordStrengthColor(),
                            minWidth: "50px",
                          }}
                        >
                          {getPasswordStrengthLabel()}
                        </span>
                      </div>
                      <Form.Text className="text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        Must be at least 6 characters
                      </Form.Text>
                    </div>
                  )}
                </Form.Group>

                {/* Terms and Conditions */}
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    label={
                      <>
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-decoration-none"
                          style={{ color: "#48bb78" }}
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-decoration-none"
                          style={{ color: "#48bb78" }}
                        >
                          Privacy Policy
                        </Link>
                      </>
                    }
                    className="text-muted"
                    style={{ fontSize: "0.9rem" }}
                    custom
                  />
                </Form.Group>

                <Button
                  type="submit"
                  size="lg"
                  className="w-100 py-3 fw-semibold rounded-pill"
                  disabled={loading}
                  style={{
                    background:
                      "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                    border: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(72, 187, 120, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(72, 187, 120, 0.4)";
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
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

              {/* Google Signup */}
              <Button
                variant="outline-secondary"
                size="lg"
                className="w-100 py-3 fw-semibold rounded-pill"
                onClick={handleGoogleSignup}
                style={{
                  transition: "all 0.3s ease",
                  borderColor: "#e2e8f0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8f9fa";
                  e.currentTarget.style.borderColor = "#48bb78";
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
                Sign up with Google
              </Button>

              {/* Login Link */}
              <p className="text-center mt-4 mb-0">
                <span className="text-muted">Already have an account?</span>{" "}
                <Link
                  to="/login"
                  className="fw-semibold text-decoration-none"
                  style={{
                    color: "#48bb78",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#38a169")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#48bb78")
                  }
                >
                  Sign In
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
