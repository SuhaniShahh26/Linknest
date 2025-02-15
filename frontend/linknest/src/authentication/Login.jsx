import React from "react";

const Login = () => {
    const googleLogin = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={googleLogin}>Sign in with Google</button>
        </div>
    );
};

export default Login;
