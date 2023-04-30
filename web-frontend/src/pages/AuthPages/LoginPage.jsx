import React, {useContext, useState} from "react";
import {Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import "./FormStyle.css";
import {AuthContext} from "../../contexts/useAuth.jsx";

export default function LoginPage() {
    const {loginUser} = useContext(AuthContext)
    const [fetchResponse, setFetchResponse] = useState(null)

    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Почта не валидна").required("Обязательное поле"),
        password: Yup.string().required("Обязательное поле"),
    })

    return (
        <main>
            <div className="content">
                <div className="wrapper">
                    <h2>Вход в систему</h2>
                    {fetchResponse && (<span className="dangerText" style={{display: "flex", justifyContent: "center"}}>{fetchResponse}</span>)}
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={loginSchema}
                        onSubmit={async (values) => {
                            const loginResponse = await loginUser(values)
                            if (loginResponse)
                                setFetchResponse(loginResponse)
                            else
                                setFetchResponse(null)
                        }}
                    >
                        {({errors, touched, handleChange, values}) => (
                            <Form className="formContainer">
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
                        )}
                    </Formik>
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
