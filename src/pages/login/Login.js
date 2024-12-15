// Login Component
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../../redux/Actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const validate = () => {
    const errors = [];
    if (!userEmail) {
      errors.push("Email is required");
    }
    if (!password) {
      errors.push("Password is required");
    }
    if (errors.length) {
      Swal.fire("Error", errors.join(", "), "error");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validate()) {
      dispatch(loginRequest(userEmail, password));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }

    if (error) {
      Swal.fire("Error", error, "error");
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", color: "#000", marginBottom: 2 }}
            >
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setPasswordVisible((prev) => !prev)}
                    sx={{ textTransform: "none" }}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </Button>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: 2 }}
            >
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#1976d2" }}>
                Register Here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
