import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../authentication/login.css";
import axios from "axios";
import { useState } from "react";
import { useToast } from '@chakra-ui/react';

const EntryPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const loginusername = useRef();
    const loginpassword = useRef();
    const signupusername = useRef();
    const signupemail = useRef();
    const signuppassword = useRef();
    const toast = useToast();

    const navigate = useNavigate();

    const changeView = (fuck) => {
        setShowLogin(fuck);
    };

    const login = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8080/notes/v1/user/login", {
                username: loginusername.current.value,
                password: loginpassword.current.value,
            })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("jwtToken", response.data.access_token);
                navigate("/");
                toast({
                    title: 'Login Successful.',
                    description: response.data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                console.error(error);
                localStorage.removeItem("jwtToken");
            });
    };

    const register = (e) => {
        e.preventDefault();
        const user = {
            username: signupusername.current.value,
            email: signupemail.current.value,
            password: signuppassword.current.value,
        };

        axios
            .post("http://localhost:8080/notes/v1/user/register", user)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("jwtToken", response.data.access_token);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                localStorage.removeItem("jwtToken");
            });
    };

    const Login = () => {
        return (
            <form>
                <h2>Welcome Back!</h2>
                <fieldset>
                    <legend>Log In</legend>
                    <ul>
                        <li>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                ref={loginusername}
                                required
                            />
                        </li>
                        <li>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                ref={loginpassword}
                                required
                            />
                        </li>
                    </ul>
                </fieldset>
                <button onClick={(e) => login(e)}>Login</button>
                <button type="button" onClick={() => changeView(false)}>
                    Create an Account
                </button>
            </form>
        );
    };

    const SignUp = () => {
        return (
            <form>
                <h2>Sign Up!</h2>
                <fieldset>
                    <legend>Create Account</legend>
                    <ul>
                        <li>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                ref={signupusername}
                                required
                            />
                        </li>
                        <li>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                ref={signupemail}
                                required
                            />
                        </li>
                        <li>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                ref={signuppassword}
                                required
                            />
                        </li>
                    </ul>
                </fieldset>
                <button onClick={(e) => register(e)}>Submit</button>
                <button type="button" onClick={() => changeView(true)}>
                    Have an Account?
                </button>
            </form>
        );
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            axios
                .get("http://localhost:8080/notes/v1/notes/get-all-notes", {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                })
                .then((response) => {
                    navigate("/");
                })
                .catch((error) => {
                    // console.error(error);
                    localStorage.removeItem("jwtToken");
                    // navigate("/auth");
                });
        }
    }, [navigate]);

    return (
        <section id="entry-page">{showLogin ? <Login /> : <SignUp />}</section>
    );
};

export default EntryPage;
