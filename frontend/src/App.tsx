import { useEffect, useState } from 'react'
import './App.css'
import { useGetFiles } from './hooks/useGetFiles'
import { File } from './components/File/File'
import { Header } from './components/header/Header'
import { LockClosedIcon, XCircleIcon } from '@heroicons/react/16/solid'
import { encode } from 'js-base64'

function App() {
  const {files, getFiles} = useGetFiles()
  const [uploadOpen, setUploadOpen] = useState(false)
  const [modalClass, setModalClass] = useState("absolute bg-slate-500 bg-opacity-50 w-full h-full justify-center items-center hidden")

  const [title, setTitle] = useState("")
  const [fileData, setFileData] = useState("")

  const [fileType, setFileType] = useState("")

  useEffect(() => {
    if (!uploadOpen) {
      const newModalClass = modalClass.replace("flex", "hidden")
      setModalClass(newModalClass)
      return;
    }

    const newModalClass = modalClass.replace("hidden", "flex")
    setModalClass(newModalClass)
  }, [uploadOpen])

  const handleSubmit = () => {
    const api = "http://localhost:4000/api/files"
    const payload = {
      title: title,
      data: fileData,
      type: fileType
    }

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(() => {
      getFiles()
      setUploadOpen(false)
      setTitle("")
      setFileData("")
    })
  }

  return <>
  <div className="flex items-center bg-slate-400 flex-1 flex-col gap-4">
    <Header setUploadOpen={setUploadOpen} />
    <div className={"grid grid-cols-2 md:grid-cols-4 p-4 gap-4 w-full"}>
      {files.map((file) => (
        <File key={file.uuid} title={file.title} uuid={file.uuid} />
      ))}
    </div>
    <div className={modalClass}>
      <dialog open={uploadOpen} className="pt-8 rounded-md border-r-4 border-slate-200 shadow-xl">
        <button className="absolute top-4 right-4" onClick={() => setUploadOpen(false)}>
          <XCircleIcon width={24} />
        </button>
        <form className="flex flex-col gap-2 p-4" onSubmit={(e) => {
          e.preventDefault()
        }}>
          <div className="grid items-center">
            <label htmlFor="titleInput" className="font-semibold">Title*</label>
            <input type="text" id="titleInput" value={title} className="bg-slate-200 p-2 rounded-md" onChange={e => {
              setTitle(e.target.value)
            }} />
          </div>
          <div className="grid items-center">
            <label htmlFor="fileInput" className="font-semibold">File*</label>
            <input type="file" id="fileInput" className="bg-slate-200 p-2 rounded-md" onChange={async (e) => {
              const file = e.target.files![0]
              const binaryData = await file.text()
              const base64Data = encode(binaryData)

              setFileData(base64Data)
              setFileType(file.type)
            }} />
          </div>
          <button onClick={handleSubmit} className="bg-black text-slate-200 px-4 py-2 rounded-md text-sm">Upload</button>
        </form>
      </dialog>
      </div>
  </div>
  </>
}

export default App
