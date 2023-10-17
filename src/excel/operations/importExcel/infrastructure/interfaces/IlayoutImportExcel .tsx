import { useCallback, useState } from "react";
import {
  ScaleButton,
  ScaleLoadingSpinner,
} from "@telekom/scale-components-react";
import { useDropzone } from "react-dropzone";
import { useFileSubmit } from "../controller/controller";
import Notification from "../../domain/componentsVisual/InotificationVisual";
import "./layoutImportExcel.scss";

const fileTypes = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];

function IlayoutImportExcel() {
  const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null);
  const { isLoading, error, setError, success, setSuccess, sendExcelData } =
    useFileSubmit();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = () => {
            const binaryStr = reader.result;
            setExcelFile(binaryStr);
          };
        });
      } else {
        setError("Por favor, seleccione solo tipos de archivos de Excel.");
        setExcelFile(null);
      }
    },
    [setError]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const files = acceptedFiles.map((file: File) => (
    <li key={file.name}>{file.name}</li>
  ));

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (excelFile !== null) {
      await sendExcelData(excelFile);
    }
  };

  return (
    <>
      <div className="import-excel-containter">
        {error && (
          <Notification
            variant="danger"
            onClose={() => setError(null)}
            text={error}
          />
        )}
        {success && (
          <Notification
            variant="success"
            onClose={() => setSuccess(null)}
            text={success}
          />
        )}
        <form onSubmit={handleOnSubmit}>
          <section {...getRootProps()}>
            <div>
              <label id="file-input" htmlFor="file-input">
                Select file
              </label>
              <input {...getInputProps()} />
              <p>
                Arrastra y suelta archivos aquí o haz clic para seleccionar
                archivos
              </p>
            </div>

            <aside>
              <ul>{files}</ul>
            </aside>
          </section>
          {isLoading && (
            <ScaleLoadingSpinner
              size="small"
              text="Loading ..."
              variant="primary"
            ></ScaleLoadingSpinner>
          )}
          <ScaleButton disabled={!excelFile} type="submit" className="button">
            Guardar
          </ScaleButton>
        </form>
      </div>
    </>
  );
}

export default IlayoutImportExcel;
