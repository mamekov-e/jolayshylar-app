import React, {useContext, useState} from "react";
import {Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import "./FormStyle.css";
import {AuthContext} from "../../contexts/useAuth.jsx";

export default function RegistrationPage() {
  const {registerUser} = useContext(AuthContext)
  const [fetchResponse, setFetchResponse] = useState(null)

  const registrationSchema = Yup.object().shape({
    city: Yup.string().required("Обязательное поле"),
    companyName: Yup.string().required("Обязательное поле"),
    email: Yup.string().email("Почта не валидна").required("Обязательное поле"),
    contacts: Yup.string().required("Обязательное поле"),
  })

  return (
      <main>
        <div className="content">
          <div className="wrapper">
            <h2>Форма заявки</h2>
            {fetchResponse && (<span className="dangerText" style={{display: "flex", justifyContent: "center"}}>{fetchResponse}</span>)}
            <Formik
                initialValues={{
                  city: "",
                  companyName: "",
                  email: "",
                  contacts: "",
                }}
                validationSchema={registrationSchema}
                onSubmit={async (values) => {
                  const registerResponse = await registerUser(values)
                  if (registerResponse)
                    setFetchResponse(registerResponse)
                  else
                    setFetchResponse(null)
                }}
            >
              {({errors, touched, handleChange, values}) => (
                  <Form className="formContainer">
                    <div className="formGroup">
                      <span className="dangerText">
                        {touched.city && errors.city ? errors.city : !values.city ? "*" : "Город *"}
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
                        {touched.companyName && errors.companyName ? errors.companyName : !values.companyName ? "*" : "Название компании *"}</span>
                      <Field
                          type="text"
                          name="companyName"
                          className={"inputText"}
                          placeholder="Введите название вашей компании"
                      />
                    </div>
                    <div className="formGroup">
                      <span className="dangerText">
                        {touched.email && errors.email ? errors.email : !values.email ? "*" : "Почта *"}</span>
                      <Field
                          type="text"
                          name="email"
                          className={"inputText"}
                          placeholder="Введите почту"
                      />
                    </div>
                    <div className="formGroup">
                      <span className="dangerText">
                        {touched.contacts && errors.contacts ? errors.contacts : !values.contacts ? "*" : "Контакты *"}
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
              )}
            </Formik>
            <div className="redirectTo">
              <h4>Уже сотрудничаете с нами?</h4>
              <Link to="/partners/login">
                <p className="redirectText">Войдите в систему</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
  );
}
