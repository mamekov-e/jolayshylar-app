import React, {useContext, useState} from "react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import SaveBtn from "../../../CustomComponents/Button/Button.jsx";
import "./SearchReportForm.css";
import Dropdown from "../../../CustomComponents/Dropdown/Dropdown.jsx";
import axiosUtil from "../../../../utils/axiosUtil.jsx";
import {ReportContext} from "../../../../contexts/useReport.jsx";
import {DateRangePicker} from '@adobe/react-spectrum';
import {parseDate, today, getLocalTimeZone} from '@internationalized/date';
import {getCurrentDateIn_YYYY_MM_DD_format, parseDateRangePickerValue} from "../../../../utils/dateUtil.jsx";

export default function SearchReportForm() {
    const {searchReportsByTransportId, showMessage} = useContext(ReportContext);
    const [transportOptions, setTransportOptions] = useState([])
    const api = axiosUtil()

    const loadTransportsData = async () => {
        const response = await api.get("/transports/get-transports-of-company/")
        if (response.data.length === 0) {
            showMessage("Добавьте транспорты - нет записей");
        }
        const dataToOptions = response.data.map(item => ({
            value: item.id,
            label: item.transport_number
        }))
        setTransportOptions(dataToOptions)
        return true
    }

    const searchReportSchema = Yup.object().shape({
        date: Yup.object().shape({
            start: Yup.string(),
            end: Yup.string(),
        }),
        transport_number: Yup.object().shape({
            value: Yup.string(),
            label: Yup.string()
        }).default(undefined).required("Обязательное поле")
    });
    return (
        <Formik
            initialValues={{
                date: {
                    start: parseDate(getCurrentDateIn_YYYY_MM_DD_format()),
                    end: parseDate(getCurrentDateIn_YYYY_MM_DD_format())
                },
                transport_number: ""
            }}
            validationSchema={searchReportSchema}
            onSubmit={async (values) => {
                const dateReformatted = {
                    start: parseDateRangePickerValue(values.date.start),
                    end: parseDateRangePickerValue(values.date.end)
                }
                await searchReportsByTransportId({transport_number: values.transport_number, date: dateReformatted})
            }}
        >
            {({
                  errors, touched, handleChange,
                  values, setFieldValue, setFieldTouched
              }) => (
                <Form className="searchForm">
                    <div className="searchFormGroup">
                        <DateRangePicker
                            label={"Дата *"}
                            maxValue={today(getLocalTimeZone())}
                            value={values.date}
                            granularity="day"
                            onChange={value => {
                                setFieldValue("date", value)
                            }}
                        />
                    </div>
                    <div className="searchFormGroup">
                        <span className="dangerText" style={{color: '#222222', display: 'flex', justifyContent: 'flex-start'}}>
                            {touched.transport_number && errors.transport_number ? errors.transport_number : "Номер транспорта *"}
                        </span>
                        <Dropdown
                            isSearchable
                            placeHolder="Выберите номер транспорта"
                            options={transportOptions}
                            value={values.route_number}
                            onChange={(value) => {
                                setFieldValue("transport_number", value)
                            }}
                            onBlur={() => {
                                setFieldTouched("transport_number", true)
                            }}
                            onFocus={async () => {
                                const loaded = await loadTransportsData()
                                if (loaded !== true)
                                    showMessage(loaded)
                                setFieldTouched("transport_number", false)
                            }}
                            name={"transport_number"}
                            style={{...inputStyle, ...dropdownStyle}}
                        />
                    </div>
                    <SaveBtn
                        type="submit"
                        name={"Поиск"}
                        style={btnStyle}
                    />
                </Form>
            )}
        </Formik>
    );
}

const inputStyle = {
    border: "0.5px solid #929292",
    borderRadius: "5px",
    color: "#222222"
};
const btnStyle = {
    backgroundColor: "#014E6D",
    color: "#FFF",
    height: "32px",
    maxWidth: "300px",
    marginInline: 0,
};
const dropdownStyle = {
    paddingInlineStart: "10px",
    minHeight: "22px",
    width: "250px"
};