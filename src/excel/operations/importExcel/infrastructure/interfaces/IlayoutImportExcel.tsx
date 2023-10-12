import { useState } from "react";
import { ScaleButton } from "@telekom/scale-components-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handleFileSubmit from "../../domain/controller/controller";
import { TFileChangeEvent } from "../../domain/models/ImodelsIndex";
import "./layoutImportExcel.scss";

function IlayoutImportExcel() {
  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: TFileChangeEvent) => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          if (
            result !== null &&
            (typeof result === "string" || result instanceof ArrayBuffer)
          ) {
            setExcelFile(result);
          }
        };
      } else {
        toast.error("Por favor, seleccione solo tipos de archivos de Excel.");
        setExcelFile(null);
      }
    }
  };

  const handleOnSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (excelFile !== null) {
      setLoading(true);
      handleFileSubmit(excelFile);
      setLoading(false);
    }
  };

  return (
    <div className="import-excel-screen">
      <ToastContainer />
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="file-input">input</label>
          <input
            id="file-input"
            type="file"
            required
            onChange={handleFileChange}
          />
        </div>
        {loading && <div>loading</div>}
        <ScaleButton disabled={!excelFile} variant="primary" type="submit">
          Guardar
        </ScaleButton>
      </form>

      {false && (
        <scale-notification-toast variant="warning" opened>
          <p slot="header">Informational toast headline</p>
        </scale-notification-toast>
      )}
    </div>
  );
}

export default IlayoutImportExcel;

{
  /* <div>
        {excelData &&  (
          <div>
            <table>

              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((individualExcelData, index) => (
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key) => (
                      <td key={key}>{individualExcelData[key]} </td>
                    
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div> */
}
