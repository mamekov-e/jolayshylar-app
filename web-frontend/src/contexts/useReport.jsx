import React, {useState} from "react";
import axiosUtil from "../utils/axiosUtil.jsx";

const ReportContext = React.createContext();

function ReportContextProvider({children}) {
    const [reportItems, setReportItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const api = axiosUtil()

    async function searchReportsByTransportId(values) {
        try {
            setIsLoading(true)
            const params = new URLSearchParams({
                transport_id: values.transport_number.value,
                start_date: values.date.start,
                end_date: values.date.end
            })
            const response = await api.get("/reports/get-reports-of-transport/?" + params.toString(),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
            if (response.status === 200) {
                setReportItems(response.data)
                if (!response.data.length)
                    showMessage("Нет отчетов по этой дате")
                setIsLoading(false)
            }
        } catch (err) {
            showMessage(err)
        }
    }

    async function getTransportRecordsByDate(report) {
        try {
            setIsLoading(true)
            const params = new URLSearchParams({
                transport_id: report.transport.id,
                date: report.date,
            })
            const response = await api.get("/reports/get-report-of-transport-by-date/?" + params.toString(),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
            if (response.status === 200) {
                setReportItems(response.data)
                if (!response.data.length)
                    showMessage("Нет отчетов по этой дате")
                setIsLoading(false)
            }
        } catch (err) {
            showMessage(err)
        }
    }

    const showMessage = (message) => {
        setMessage(message);

        setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    return (
        <ReportContext.Provider
            value={{
                reportItems,
                isLoading,
                searchReportsByTransportId,
                getTransportRecordsByDate,
                message,
                showMessage
            }}
        >
            {children}
        </ReportContext.Provider>
    );
}

export {ReportContextProvider, ReportContext};
