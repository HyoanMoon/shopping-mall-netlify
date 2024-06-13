import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import "../style/login.style.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    return () => {
      dispatch(userActions.clearError());
    };
  }, [dispatch]);


  const loginWithEmail = (event) => {
    event.preventDefault();
    //이메일,패스워드를 가지고 백엔드로 보내기
    dispatch(userActions.loginWithEmail({ email, password }));

  };

  const handleGoogleLogin = async (googleData) => {
    // 구글로 로그인 하기
    console.log("hehe", googleData)
    dispatch(userActions.loginWithGoogle(googleData.credential))
  };


  // user가 있으면 메인 페이지로 이동 - 이미 로그인한 유저는 로그인 페이지에 못 들어오게 막기 위함
  // if (user) {
  //   navigate("/");
  // }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);


  return (
    <>
      <Container className="login-area">
        {error && (
          <div className="error-message">
            <Alert variant="danger" className="error-message">{error}
            </Alert>
          </div>
        )}
        <Form className="login-form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="display-space-between login-button-area">
            <Button variant="danger" type="submit">
              Sign in
            </Button>
            <div>
              Don't have an account? <Link to="/register">Create an account</Link>{" "}
            </div>
          </div>

          <div className="text-align-center mt-2">
            <p>Sign in with Google</p>
            <div className="display-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              {/*
              1. 구글 로그인 버튼 가져오기
              2. Oauth 로그인을 위해서 google api 사이트에 가입 하고 클라이언트 키, 시크릿 키 받아오기
              3. 로그인
              4. 백엔드에서 로그인 하기
                 토큰값을 읽어와서 =>  유저 정보 빼내고 email 같은
                 a) 이미 로그인을 한 적이 있는 유저 ->  로그인 시키고 토큰 값 주기
                 b) 처음 로그인 시도 하는 유저면 유저 정보 먼저 생성->  토큰 값 주기
              
        
               */}


            </div>

          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
