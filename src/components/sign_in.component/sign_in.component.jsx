import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  googleProvider,
} from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { GoogleButton, SignInContainer, SignInForm } from "./sign_in.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selectors";

const SignIn = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/dashboard");
  }, [currentUser, navigate]);

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
