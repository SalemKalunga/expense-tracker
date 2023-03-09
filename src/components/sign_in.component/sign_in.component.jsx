import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  googleProvider,
} from "../../utils/firebase";
import { useContext } from "react";
import { UserContext } from "../../contexts/user_context.component";
import { useNavigate } from "react-router-dom";
import { GoogleButton, SignInContainer, SignInForm } from "./sign_in.styles";
const SignIn = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    currentUser && navigate("/dashboard");
  }, [currentUser, navigate]);
  console.log(currentUser);
  const GoogleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await createUserDocumentFromAuth(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignInContainer>
      <SignInForm>
        <h1>Sign in bro</h1>
        <GoogleButton type="button" onClick={GoogleSignIn}>
          Sign in with google
        </GoogleButton>
      </SignInForm>
    </SignInContainer>
  );
};

export default SignIn;
