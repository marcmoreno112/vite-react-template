import * as XLSX from "xlsx";
import { toast } from 'react-toastify'
import { validateExcelData } from "../../domain/validators/validator";
import { sendExcelDataToDB } from "../../infrastructure/serviceBds/serviceBds";

const readExcelData = (excelFile: string | ArrayBuffer) => {
    const workbook = XLSX.read(excelFile, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return data;
};

export const handleFileSubmit = (excelFile: string | ArrayBuffer | null) => {

    if (excelFile !== null) {
        const decodedExcelData = readExcelData(excelFile)
        const isExcelDataValid = validateExcelData(decodedExcelData)
        isExcelDataValid.then((res) => {
            const { isValid, validatedData, errorMsg } = res
            if (isValid) {
                const sendDataToDB = sendExcelDataToDB(validatedData)
                sendDataToDB.then(res => {
                    if (res.status == 200) {
                        toast.success("data sent");
                    } else {
                        toast.error("Error sending data to the server");
                    }
                })
            } else {
                toast.error(errorMsg)
            }
        })
    }
}
