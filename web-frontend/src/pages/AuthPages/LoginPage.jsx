import React, {useContext} from "react";
import {Field, Form, withFormik} from "formik";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import "./FormStyle.css";
import {AuthContext} from "../../contexts/useAuth.jsx";

function LoginPage(props) {
    const {loginUser} = useContext(AuthContext)
    const {touched, errors} = props;

    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser({email, password})
    }

    return (
        <main>
            <div className="content">
                <div className="wrapper">
                    <h2>Вход в систему</h2>

                    <Form className="formContainer" onSubmit={handleSubmit}>
                        <div className="formGroup">
                          <span className="dangerText">
                            {touched.email && errors.email ? errors.email : "*"}
                          </span>
                            <Field
                                type="text"
                                name="email"
                                className={"inputText"}
                                placeholder="Введите почту"
                            />
                        </div>
                        <div className="formGroup">
                          <span className="dangerText">
                            {touched.password && errors.password ? errors.password : "*"}
                          </span>
                            <Field
                                type="password"
                                name="password"
                                className={"inputText"}
                                placeholder="Введите пароль"
                            />
                        </div>
                        <button type="submit" className="submitBtn">
                            Войти
                        </button>
                    </Form>
                    <div className="redirectTo">
                        <h4>Хотите пользоваться нашей системой?</h4>
                        <Link to="/partners/register">
                            <p className="redirectText">Отправьте заявку</p>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

const LoginFormik = withFormik({
    mapPropsToValues: (props) => {
        return {
            email: props.email || "",
            password: props.password || "",
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email("Почта не валидна").required("Обязательное поле"),
        password: Yup.string().required("Обязательное поле"),
    })
})(LoginPage);

export default LoginFormik;
