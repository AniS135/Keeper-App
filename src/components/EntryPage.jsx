import React, { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../authentication/login.css";
import axios from 'axios';



class EntryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username : "",
                password : "",
                email : ""
            },
            currentView: "logIn",
        };
    }

    changeView = (view) => {
        this.setState({
            currentView: view,
        });
    };

    onChangeHandler = (event) => {

        const { name, value } = event.target;

        this.setState((prevState) => {
            return {
                ...prevState,
                user: {
                    ...this.state.user,
                    [name]: value
                }
            }
        });
    }

    register = (e) => {

        e.preventDefault();

        axios.post("http://localhost:8080/notes/v1/user/register", this.state.user)
        .then(response => {
            console.log(response.data);
            localStorage.setItem('jwtToken', response.data.access_token);
            this.redirector();
        }).catch(error => {
            console.error(error);
            localStorage.removeItem('jwtToken');
        });

    }

    login = (e) => {

        e.preventDefault();

        axios.post("http://localhost:8080/notes/v1/user/login", {
            username : this.state.user.username,
            password : this.state.user.password
        })
        .then(response => {
            console.log(response.data);
            localStorage.setItem('jwtToken', response.data.access_token);
            this.redirector();
        }).catch(error => {
            console.error(error);
            localStorage.removeItem('jwtToken');
        });

    }

    redirector = () => {
        this.props.history.push("/");
    }

    currentView = () => {
        switch (this.state.currentView) {
            case "signUp":
                return (
                    <form>
                        <h2>Sign Up!</h2>
                        <fieldset>
                            <legend>Create Account</legend>
                            <ul>
                                <li>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" name="username" id="username" value={this.state.user.username} onChange={(e) => {
                                        this.onChangeHandler(e)
                                    }} required />
                                </li>
                                <li>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name="email" id="email" value={this.state.user.email} onChange={(e) => {
                                        this.onChangeHandler(e)
                                    }} required />
                                </li>
                                <li>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={this.state.user.password}
                                        onChange={(e) => {
                                            this.onChangeHandler(e)
                                        }}
                                        required
                                    />
                                </li>
                            </ul>
                        </fieldset>
                        <button onClick={(e) => this.register(e)}>Submit</button>
                        <button
                            type="button"
                            onClick={() => this.changeView("logIn")}
                        >
                            Have an Account?
                        </button>
                    </form>
                );
            case "logIn":
                return (
                    <form>
                        <h2>Welcome Back!</h2>
                        <fieldset>
                            <legend>Log In</legend>
                            <ul>
                                <li>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" name="username" id="username" value={this.state.user.username} onChange={(e) => {
                                        this.onChangeHandler(e)
                                    }} required />
                                </li>
                                <li>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={this.state.user.password}
                                        onChange={(e) => {
                                            this.onChangeHandler(e)
                                        }}
                                        required
                                    />
                                </li>
                            </ul>
                        </fieldset>
                        <button onClick={(e) => this.login(e)}>Login</button>
                        <button
                            type="button"
                            onClick={() => this.changeView("signUp")}
                        >
                            Create an Account
                        </button>
                    </form>
                );
            default:
                break;
        }
    };

    render() {
        return <section id="entry-page">{this.currentView()}</section>;
    }
}

export default function (props) {
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            axios.get("http://localhost:8080/notes/v1/notes/get-all-notes", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }).then(response => {
                navigate("/");
            }).catch(error => {
                // console.error(error);
                localStorage.removeItem("jwtToken");
                // navigate("/auth");
            });
        }
    }, [navigate]);

    return <EntryPage {...props} />;
}

// export default withRouter(EntryPage);
