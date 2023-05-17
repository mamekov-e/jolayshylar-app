import React, {useContext, useEffect, useState} from "react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import InputText from "../../../CustomComponents/InputText/InputText.jsx";
import SaveBtn from "../../../CustomComponents/Button/Button.jsx";
import "./BusForm.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import Dropdown from "../../../CustomComponents/Dropdown/Dropdown.jsx";
import axiosUtil from "../../../../utils/axiosUtil.jsx";
import {BusContext} from "../../../../contexts/useBus.jsx";

export default function BusForm({submitForm, bus}) {
    const {subpage, goToSubpage, allItemsPage} = useContext(BreadcrumbContext);
    const {showMessage, message} = useContext(BusContext);
    const [routeOptions, setRouteOptions] = useState([])
    const api = axiosUtil()

    const loadRoutesData = async () => {
        const allRoutes = await api.get("/transports/get-routes-of-company/")
        if (allRoutes.data.length === 0) {
            return "Добавьте маршруты - нет записей";
        }
        const dataToOptions = allRoutes.data.map(item => ({
            value: item.id,
            label: item.route_number
        }))
        setRouteOptions(dataToOptions)
        return true
    }

    const busRouteToOptions = () => {
        return {value: bus.route.id, label: bus.route.route_number}
    }

    const busSchema = Yup.object().shape({
        transport_number: Yup.string()
            .required("Обязательное поле"),
        total_seats: Yup.number()
            .required("Обязательное поле")
            .positive("Введите положительное число"),
        normal_seats: Yup.number()
            .required("Обязательное поле")
            .positive("Введите положительное число"),
        disabled_seats: Yup.number()
            .required("Обязательное поле")
            .positive("Введите положительное число"),
        route_number: Yup.object().shape({
            value: Yup.string(),
            label: Yup.string()
        }).default(undefined).required("Обязательное поле")
    });

    return (
        <Formik
            initialValues={{
                transport_number: bus ? bus.transport_number : "",
                total_seats: bus ? bus.total_seats : "",
                normal_seats: bus ? bus.normal_seats : "",
                disabled_seats: bus ? bus.disabled_seats : "",
                route_number: bus ? busRouteToOptions() : ""
            }}
            validationSchema={busSchema}
            onSubmit={async (values) => {
                const result = await submitForm(values, bus)
                if (result === true)
                    goToSubpage(allItemsPage)
            }}
        >
            {({
                  errors, touched, handleChange,
                  values, setFieldValue, setFieldTouched
              }) => {
                useEffect(() => {
                    if (values.normal_seats && values.disabled_seats) {
                        const sum = parseInt(values.disabled_seats) + parseInt(values.normal_seats)
                        setFieldValue("total_seats", sum)
                    }
                }, [values.normal_seats, values.disabled_seats])

                return (
                    <Form className="form">
                        <div className="formGroup">
                        <span className="dangerText">
                            {message ? message :
                                touched.transport_number && errors.transport_number ? errors.transport_number : !values.transport_number ? "*" : "Номер автобуса *"
                            }
                        </span>
                            <InputText
                                placeholder="Введите номер автобуса"
                                onChange={handleChange}
                                onBlur={() => setFieldTouched("transport_number", true)}
                                onFocus={() => setFieldTouched("transport_number", false)}
                                value={values.transport_number}
                                name="transport_number"
                                type="text"
                                style={inputStyle}
                            />
                        </div>
                        <div className="formGroup">
                        <span className="dangerText">
                          {"Вместимость *"}
                        </span>
                            <InputText
                                placeholder="0"
                                value={values.total_seats}
                                disabled
                                name="total_seats"
                                type="number"
                                style={disabledInputStyle}
                            />
                        </div>
                        <div className="formGroup">
                        <span className="dangerText">
                          {touched.normal_seats && errors.normal_seats ? errors.normal_seats : !values.normal_seats ? "*" : "Сидячих мест *"}
                        </span>
                            <InputText
                                placeholder="Введите количество сидячих мест"
                                onBlur={() => setFieldTouched("normal_seats", true)}
                                onFocus={() => setFieldTouched("normal_seats", false)}
                                onChange={e => {
                                    setFieldValue("normal_seats", e.target.value)
                                }}
                                value={values.normal_seats}
                                name="normal_seats"
                                type="number"
                                style={inputStyle}
                            />
                        </div>
                        <div className="formGroup">
                        <span className="dangerText">
                          {touched.disabled_seats && errors.disabled_seats ? errors.disabled_seats : !values.disabled_seats ? "*" : "Спец. мест *"}
                        </span>
                            <InputText
                                placeholder="Введите количество спец. мест"
                                onBlur={() => setFieldTouched("disabled_seats", true)}
                                onFocus={() => setFieldTouched("disabled_seats", false)}
                                onChange={e => {
                                    setFieldValue("disabled_seats", e.target.value)
                                }}
                                value={values.disabled_seats}
                                name="disabled_seats"
                                type="number"
                                style={inputStyle}
                            />
                        </div>
                        <div className="formGroup">
                        <span className="dangerText">
                            {touched.route_number && errors.route_number ? errors.route_number : !values.route_number ? "*" : "Номер маршрута *"}
                        </span>
                            <Dropdown
                                isSearchable
                                placeHolder="Выберите номер маршрута"
                                options={routeOptions}
                                value={values.route_number}
                                onChange={(value) => {
                                    setFieldValue("route_number", value)
                                }}
                                onBlur={() => {
                                    setFieldTouched("route_number", true)
                                }}
                                onFocus={async () => {
                                    const loaded = await loadRoutesData()
                                    if (loaded !== true)
                                        showMessage(loaded)
                                    setFieldTouched("route_number", false)
                                }}
                                name={"route_number"}
                                style={{...inputStyle, ...dropdownStyle}}
                            />
                        </div>
                        <SaveBtn
                            type="submit"
                            name={subpage.name}
                            style={btnStyle}
                        />
                    </Form>
                )
            }}
        </Formik>
    );
}

const inputStyle = {
    border: "0.5px solid #014E6D",
    borderRadius: "5px",
};
const disabledInputStyle = {
    border: "0.5px solid rgba(1,78,109,0.59)",
    borderRadius: "5px",
};
const btnStyle = {
    backgroundColor: "#014E6D",
    color: "#FFF",
    marginTop: "10px",
    height: "40px",
    marginInline: 0,
};
const dropdownStyle = {
    paddingInlineStart: "10px",
    minHeight: "30px",
    width: "250px"
};