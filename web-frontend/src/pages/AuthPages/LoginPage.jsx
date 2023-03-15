import React from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./FormStyle.css";

function LoginPage(props) {
  const { touched, errors } = props;

  return (
    <main>
      <div className="content">
        <div className="wrapper">
          <h2>Вход в систему</h2>
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
          <div className="redirectTo">
            <h4>Хотите пользоваться нашей системой?</h4>
            <Link to="/register">
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
  }),
  handleSubmit: (values) => {
    const REST_API_URL = "YOUR_REST_API_URL";
    fetch(REST_API_URL, {
      method: "post",
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // HANDLE ERROR
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        // HANDLE RESPONSE DATA
        console.log(data);
      })
      .catch((error) => {
        // HANDLE ERROR
        console.log(error);
      });
  },
})(LoginPage);

export default LoginFormik;
