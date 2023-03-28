import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "../../../../../custom/InputText/InputText.jsx";
import SaveBtn from "../../../../../custom/Button/Button.jsx";
import "./RouteForm.css";
import {RouteContext} from "../../../../../../contexts/useRoute.jsx";

export default function RouteForm({ submitForm, route }) {
  const { subpage } = useContext(RouteContext);

  const busSchema = Yup.object().shape({
    number: Yup.string().required("Обязательное поле"),
    capacity: Yup.number()
      .required("Обязательное поле")
      .positive("Введите положительное число"),
    seatNumber: Yup.number()
      .required("Обязательное поле")
      .positive("Введите положительное число"),
  });

  return (
    <Formik
      initialValues={{
        number: route ? route.number : "",
        capacity: route ? route.capacity : "",
        seatNumber: route ? route.seatNumber : "",
      }}
      validationSchema={busSchema}
      onSubmit={(values) => submitForm(values, route)}
    >
      {({ isValid, errors, touched, handleChange, values }) => (
        <Form className="form">
          <div className="formGroup">
            <span className="dangerText">
              {touched.number && errors.number ? errors.number : "*"}
            </span>
            <InputText
              placeholder="Введите номер автобуса"
              onChange={handleChange}
              value={values.number}
              name="number"
              type="text"
              style={inputStyle}
            />
          </div>
          <div className="formGroup">
            <span className="dangerText">
              {touched.capacity && errors.capacity ? errors.capacity : "*"}
            </span>
            <InputText
              placeholder="Введите вместимость автобуса"
              onChange={handleChange}
              value={values.capacity}
              name="capacity"
              type="number"
              style={inputStyle}
            />
          </div>
          <div className="formGroup">
            <span className="dangerText">
              {touched.seatNumber && errors.seatNumber
                ? errors.seatNumber
                : "*"}
            </span>
            <InputText
              placeholder="Введите количество сидячих мест"
              onChange={handleChange}
              value={values.seatNumber}
              name="seatNumber"
              type="number"
              style={inputStyle}
            />
          </div>
          <SaveBtn
            type="submit"
            name={subpage.name}
            style={btnStyle}
            disabled={!isValid}
          />
        </Form>
      )}
    </Formik>
  );
}

const inputStyle = {
  border: "0.5px solid #014E6D",
  borderRadius: "5px",
};
const btnStyle = {
  backgroundColor: "#014E6D",
  color: "#FFF",
  marginTop: "10px",
  height: "40px",
  marginInline: 0,
};
