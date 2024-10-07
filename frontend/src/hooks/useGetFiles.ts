import { useEffect, useState } from "react"

export const useGetFiles = () => {
    const [files, setFiles] = useState<{title: string, uuid: string}[]>([])

    const getFiles = async () => {
        const response = await fetch('http://localhost:4000/api/files')

        const data = await response.json()

        setFiles(data)
    }

    useEffect(() => {
        getFiles()
    }, [])

    return {files, getFiles}
}