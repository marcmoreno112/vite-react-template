import { useCallback, useState } from "react"
import { ScaleButton } from "@telekom/scale-components-react"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import "./layoutImportExcel.scss"
import { useDropzone } from 'react-dropzone'
import { handleFileSubmit } from "../../application/controller/controller"

const fileTypes = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
]

function IlayoutImportExcel() {

  const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
          const binaryStr = reader.result
          setExcelFile(binaryStr)
        }
      })
    } else {
      toast.error('Por favor, seleccione solo tipos de archivos de Excel.')
      setExcelFile(null);
    }


  }, [])

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop })

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} 
    </li>
  ));

  const handleOnSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (excelFile !== null) {
      setLoading(true)
      handleFileSubmit(excelFile);
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleOnSubmit}>
        <section {...getRootProps()} >
          <div>
            <label id="file-input" htmlFor="file-input">Select file</label>
            <input {...getInputProps()} />
            <p>Arrastra y suelta archivos aquí o haz clic para seleccionar archivos</p>
          </div>

          <aside>
            <ul>{files}</ul>
          </aside>
        </section>
        {loading && <div>loading</div>}
        <ScaleButton disabled={!excelFile} variant="primary" type="submit">Guardar</ScaleButton>
      </form> 
    </>
  );
}

export default IlayoutImportExcel


// test