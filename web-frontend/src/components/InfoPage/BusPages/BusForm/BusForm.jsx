import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { BusContext } from "../../../../contexts/useBus";
import InputText from "../../../custom/InputText/InputText";
import SaveBtn from "../../../custom/Button/Button";
import "./BusForm.css";

export default function () {
  const { busItems, addBus, goToSubpage, subpage } = useContext(BusContext);

  const busSchema = Yup.object().shape({
    number: Yup.string().required("Обязательное поле"),
    capacity: Yup.number()
      .required("Обязательное поле")
      .positive("Введите положительное число"),
    seatNumber: Yup.number()
      .required("Обязательное поле")
      .positive("Введите положительное число"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Values: " + values);
    const id = busItems.length > 0 ? busItems[busItems.length - 1].id + 1 : 0;
    const newBus = { id, ...values, selected: false };
    addBus(newBus);
    resetForm();
    goToSubpage("all");
  };

  return (
    <Formik
      initialValues={{
        number: "",
        capacity: "",
        seatNumber: "",
      }}
      validationSchema={busSchema}
      onSubmit={handleSubmit}
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
              value={values.name}
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
              value={values.name}
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
              value={values.name}
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
};
