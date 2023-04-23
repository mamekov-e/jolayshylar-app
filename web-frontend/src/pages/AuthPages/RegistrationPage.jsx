import React from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./FormStyle.css";

function RegistrationPage(props) {
  const { touched, errors } = props;

  return (
    <main>
      <dir className="content">
        <div className="wrapper">
          <h2>Форма заявки</h2>
          <Form className="formContainer">
            <div className="formGroup">
              <span className="dangerText">
                {touched.city && errors.city ? errors.city : "*"}
              </span>
              <Field
                type="text"
                name="city"
                className={"inputText"}
                placeholder="Укажите город"
              />
            </div>
            <div className="formGroup">
              <span className="dangerText">
                {touched.companyName && errors.companyName
                  ? errors.companyName
                  : "*"}
              </span>
              <Field
                type="text"
                name="companyName"
                className={"inputText"}
                placeholder="Введите название вашей компании"
              />
            </div>
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
                {touched.contacts && errors.contacts ? errors.contacts : "*"}
              </span>
              <Field
                type="text"
                name="contacts"
                className={"inputText"}
                placeholder="Введите контакты для связи"
              />
            </div>
            <button type="submit" className="submitBtn">
              Отправить
            </button>
          </Form>
          <div className="redirectTo">
            <h4>Уже сотрудничаете с нами?</h4>
            <Link to="/partners/login">
              <p className="redirectText">Войдите в систему</p>
            </Link>
          </div>
        </div>
      </dir>
    </main>
  );
}

const RegistrationFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      city: props.city || "",
      companyName: props.companyName || "",
      email: props.email || "",
      contacts: props.contacts || "",
    };
  },
  validationSchema: Yup.object().shape({
    city: Yup.string().required("Обязательное поле"),
    companyName: Yup.string().required("Обязательное поле"),
    email: Yup.string().email("Почта не валидна").required("Обязательное поле"),
    contacts: Yup.string().required("Обязательное поле"),
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
})(RegistrationPage);

export default RegistrationFormik;
