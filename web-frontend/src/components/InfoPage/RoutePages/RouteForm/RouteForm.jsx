import React, {useContext, useState} from "react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import InputText from "../../../CustomComponents/InputText/InputText.jsx";
import SaveBtn from "../../../CustomComponents/Button/Button.jsx";
import "./RouteForm.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import Dropdown from "../../../CustomComponents/Dropdown/Dropdown.jsx";
import allStopsList from "../../../../staticData/serverData/allStopsList.json";

export default function RouteForm({submitForm, route}) {
    const {subpage} = useContext(BreadcrumbContext);
    const [stopOptions, setStopOptions] = useState([])
    const [responseError, setResponseError] = useState(null)

    const loadStopsData = () => {
        const dataToOptions = allStopsList.map(item => ({
            value: item.id,
            label: item.stop_name
        }));
        setStopOptions(dataToOptions)
    }

    const routeStopsToOptions = (list) => {
        const listObj = list[0]
        if ('value' in listObj && 'label' in listObj) {
            return list;
        }
        return list.map(item => ({
            value: item.id,
            label: item.stop_name
        }));
    }

    const routeSchema = Yup.object().shape({
        route_number: Yup.number()
            .required("Обязательное поле")
            .positive("Введите положительное число"),
        stops: Yup.array()
            .of(Yup.object().shape({
                value: Yup.string(),
                label: Yup.string(),
            }))
            .required("Обязательное поле")
            .min(2, "Выберите как минимум 2 остановки"),
    });

    return (
        <Formik
            initialValues={{
                route_number: route ? route.route_number : "",
                stops: route ? routeStopsToOptions(route.stops) : "",
            }}
            validationSchema={routeSchema}
            onSubmit={async (values) => {
                const resp = await submitForm(values, route)
                if (resp !== true)
                    setResponseError(resp)
                else
                    setResponseError(null)
            }}
        >
            {({
                  errors, touched, handleChange, values,
                  setFieldValue, setFieldTouched
              }) => {
                return <Form className="form">
                    <div className="formGroup">
                        {responseError && (<span className="dangerText" style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>{responseError}</span>)}
                        <span className="dangerText">
                          {touched.route_number && errors.route_number ? errors.route_number : "*"}
                        </span>
                        <InputText
                            placeholder="Введите номер маршрута"
                            onChange={(e) => {
                                const {value} = e.target
                                setFieldValue("route_number", value)
                            }}
                            onBlur={() => setFieldTouched("route_number", true)}
                            value={values.route_number}
                            name="number"
                            type="number"
                            style={inputStyle}
                        />
                    </div>
                    <div className="formGroup">
                        <span className="dangerText">
                          {touched.stops && errors.stops ? errors.stops : "*"}
                        </span>
                        <Dropdown
                            isSearchable
                            isMulti
                            placeHolder="Выберите остановку"
                            options={stopOptions}
                            onChange={(value) => {
                                setFieldValue("stops", value)
                            }}
                            onBlur={() => setFieldTouched("stops", true)}
                            onFocus={() => {
                                loadStopsData()
                                setFieldTouched("stops", false)
                            }}
                            value={values.stops}
                            name="stops"
                            style={{...inputStyle, ...dropdownStyle}}
                        />
                    </div>
                    <SaveBtn
                        type="submit"
                        name={subpage.name}
                        style={btnStyle}
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
    paddingInlineStart: "10px",
    minHeight: "30px",
    width: "250px"
};
const btnStyle = {
    backgroundColor: "#014E6D",
    color: "#FFF",
    marginTop: "10px",
    height: "40px",
    marginInline: 0,
};
