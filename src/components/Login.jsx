import {React} from "react";

const loginInputs = [
    {
        label: "User Name",
        type: "text",
        show: true,
        validated: "",
        id: "a"
    }, {
        label: "Password",
        type: "password",
        show: true,
        validated: "",
        id: "b"
    }
];

const signupInputs = [
    {
        label: "User Name",
        type: "text",
        show: false,
        validated: "",
        id: "c"
    }, {
        label: "Email",
        type: "email",
        show: false,
        validated: "",
        id: "d"
    }, {
        label: "Password",
        type: "password",
        show: false,
        validated: "",
        id: "e"
    }, {
        label: "Re-Enter Password",
        type: "password",
        show: false,
        validated: "",
        id: "f"
    }
];



const LoginWrapper = React.createClass({

    getInitialState() {
        return {
            signUp: false,
            signupInputs: signupInputs,
            loginInputs: loginInputs
        };
    },

    inUpClick() {
        this.setState({ signUp: !this.state.signUp });
        this.animateFields("signupInputs");
        setTimeout(() => { this.animateFields("loginInputs"); }, 100);
    },

    animateFields(formName) {
        let start, length, newForm;

        if (formName === "loginInputs") {
            newForm = this.state.loginInputs.slice();
        } else if (formName === "signupInputs") {
            newForm = this.state.signupInputs.slice();
        }

        start = 0;
        length = newForm.length;

        console.log(newForm);

        let stagger = (i) => {
            if (i < length) {
                setTimeout(() => {
                    newForm[i].show = !newForm[i].show
                    this.setState({ [formName]: newForm });
                    stagger(i + 1);
                }, 70);
            }
        };
        stagger(start);
    },

    submitForm(e) {
        e.preventDefault();
    },

    validateField(event, id) {
        let newState, fieldInState;
        const value = event.target.value;

        const getField = (field) => (
            field.id === id
        );

        const validate = (v) => (
            v.length > 0
        );

        if (this.state.signUp === true) {
            newState = this.state.signupInputs.slice();
            fieldInState = newState.find(getField);

            fieldInState.validated = validate(value) ? true : false;
            this.setState({ signupInputs: newState });
        }
        else {
            newState = this.state.loginInputs.slice();
            fieldInState = newState.find(getField);

            fieldInState.validated = validate(value) ? true : false;
            this.setState({ loginInputs: newState });
        }
    },

    render() {

        return (
            <div>
                <Login
                    signUp={this.state.signUp}
                    inputs={this.state.loginInputs}
                    inUpClick={this.inUpClick}
                    submitForm={this.submitForm}
                    validateField={this.validateField}

                />
                <SignUp
                    signUp={this.state.signUp}
                    inputs={this.state.signupInputs}
                    inUpClick={this.inUpClick}
                    submitForm={this.submitForm}
                    validateField={this.validateField}
                />
            </div>
        );
    }
});

const Login = ({
    inputs,
    signUp,
    inUpClick,
    submitForm,
    validateField
}) => (
    <div className={signUp ? "login login-closed" : "login"} >
        <h1>Log In</h1>
        <hr />
        <Form
            inputs={inputs}
            submitForm={submitForm}
            validateField={validateField}
        />
        <SignupLink inUpClick={inUpClick} />
    </div>
);

const SignUp = ({
    inputs,
    signUp,
    inUpClick,
    submitForm,
    validateField
}) => (
    <div
        className={signUp
            ? "sign-up"
            : "sign-up sign-up-closed"}
    >
        <h1>Sign Up</h1>
        <hr />
        <Form
            inputs={inputs}
            submitForm={submitForm}
            validateField={validateField}
        />
        <LoginLink inUpClick={inUpClick} />
    </div>
);

const Form = ({
    inputs,
    submitForm,
    validateField
}) => {
    const inputsMapped = inputs.map((i) => (
        <Input
            label={i.label}
            type={i.type}
            show={i.show}
            validated={i.validated}
            id={i.id}
            validateField={validateField}
        />
    ));

    return (
        <form onSubmit={submitForm}>
            {inputsMapped}
            <Submit />
        </form>
    );
};

const Submit = () => (
    <div>
        <hr />
        <button
            className="submit-button"
            type="submit"
        > Submit
        </button>
    </div>
);

const Input = ({
    label,
    type,
    show,
    validated,
    id,
    validateField
}) => (
    <div className={show ? "field field-in" : "field"}>
        <label className="label">{label}
            <i
                className={validated
                    ? "fa fa-check animate-check"
                    : ""}
                aria-hidden="true"
            ></i>
        </label>
        <br />
        <input
            className="input"
            type={type}
            onBlur={() => { validateField(event, id); }}
        />
    </div>
);

const SignupLink = ({ inUpClick }) => (
    <div className="signup-link">
        <p className="in-out">
            Don't have an account? {" "}
            <a href="#" onClick={inUpClick}>Sign Up Here</a>
        </p>
    </div>
);

const LoginLink = ({ inUpClick }) => (
    <div className="signup-link">
        <p className="in-out">
            Already have an account? {" "}
            <a href="#" onClick={inUpClick}>Log In Here</a>
        </p>
    </div>
);


export default LoginWrapper;