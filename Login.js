import React, { useState } from "react";

function Login({ Login }) {
    const [login, setLogin] = useState({
        user: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Login(login);
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1>Form Login</h1>
            <div>
                <lable className="lable">Tài khoản</lable>
                <input
                    className="todo-input"
                    type="text"
                    placeholder="Tài khoản"
                    onChange={(e) =>
                        setLogin({ ...login, user: e.target.value })
                    }
                />
            </div>
            <div>
                <lable className="lable">Email</lable>
                <input
                    className="todo-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                    }
                />
            </div>
            <div>
                <lable className="lable">Mật khẩu</lable>
                <input
                    className="todo-input"
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                    }
                />
            </div>
            <input type="submit" className="todo-button" value="Login" />
        </form>
    );
}
export default Login;

