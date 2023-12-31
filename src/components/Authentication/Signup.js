import React, {useState, useContext} from "react";
import { Box, Button, TextField } from "@material-ui/core";
import CryptoContext from "../../store/crypto-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = useContext(CryptoContext);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword( auth, email, password );
      

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      
      //console.log(result, "userInfo on sign up");
      props.handleClose();

    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#16f5f1" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;