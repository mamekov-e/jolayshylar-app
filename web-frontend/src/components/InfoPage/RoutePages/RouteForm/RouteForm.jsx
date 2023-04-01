import React, {useContext} from "react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import InputText from "../../../CustomComponents/InputText/InputText.jsx";
import SaveBtn from "../../../CustomComponents/Button/Button.jsx";
import "./RouteForm.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import Dropdown from "../../../CustomComponents/Dropdown/Dropdown.jsx";

export default function RouteForm({submitForm, route}) {
    const {subpage, context} = useContext(BreadcrumbContext);
    const {allBusesList, allStopsList} = context;

    const routeSchema = Yup.object().shape({
        routeNumber: Yup.string().required("Обязательное поле"),
        stops: Yup.array()
            .of(Yup.object().shape({
                value: Yup.string(),
                label: Yup.string(),
            }))
            .required("Обязательное поле")
            .min(2, "Выберите как минимум 2 остановки"),
        busNumber: Yup.string()
            .required("Обязательное поле")
    });

    return (
        <Formik
            initialValues={{
                routeNumber: route ? route.routeNumber : "",
                stops: route ? route.stops : "",
                busNumber: route ? route.busNumber : "",
            }}
            validationSchema={routeSchema}
            onSubmit={(values) => submitForm(values, route)}
        >
            {({
                  isValid, errors, touched, handleChange, values,
                  setFieldValue
              }) => {

                return <Form className="form">
                    <div className="formGroup">
                        <span className="dangerText">
                          {touched.routeNumber || errors.routeNumber ? errors.routeNumber : "*"}
                        </span>
                        <InputText
                            placeholder="Введите номер маршрута"
                            onChange={(e) => {
                                const {value} = e.target
                                console.log("StopError", errors)
                                setFieldValue("routeNumber", value)
                            }}
                            value={values.routeNumber}
                            name="number"
                            type="text"
                            style={inputStyle}
                        />
                    </div>
                    <div className="formGroup">
                        <span className="dangerText">
                          {touched.stops || errors.stops ? errors.stops : "*"}
                        </span>
                        <Dropdown
                            isSearchable
                            isMulti
                            placeHolder="Выберите остановку"
                            options={allStopsList}
                            onChange={(value) => {
                                setFieldValue("stops", value)
                            }}
                            value={values.stops}
                            name="stops"
                            style={inputStyle}
                        />
                    </div>
                    <div className="formGroup">
                        <span className="dangerText">
                          {touched.busNumber || errors.busNumber ? errors.busNumber : "*"}
                        </span>
                        <Dropdown
                            isSearchable
                            placeHolder="Выберите номер автобуса"
                            options={allBusesList}
                            value={values.busNumber ? {
                                value: values.busNumber,
                                label: values.busNumber
                            } : values.busNumber}
                            onChange={(value) => {
                                setFieldValue("busNumber", value.label)
                            }}
                            name={"busNumber"}
                            style={dropdownStyle}
                        />
                    </div>
                    <SaveBtn
                        type="submit"
                        name={subpage.name}
                        style={btnStyle}
                        disabled={!isValid}
                    />
                </Form>
            }
            }
        </Formik>
    );
}

const inputStyle = {
    border: "0.5px solid #014E6D",
    borderRadius: "5px",
};
const dropdownStyle = {
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
