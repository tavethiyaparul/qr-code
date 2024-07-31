import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { makeApiCall } from '../api/MakeApiCall'

const AddUpload = ({ modalClose, referenceCall }) => {
    const [openModal, setOpenModal] = useState(true)
    const [name, setName] = useState()
    const [file, setFile] = useState()
    const [loader, setLoader] = useState(false)
    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files

        setFile(acceptedFiles[0])
        console.log(acceptedFiles)
    }, [])

    console.log('accepted', file)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleSave = async (e) => {
        if (!name) return toast.error('plz Enter Name')
        setLoader(true)
        console.log('save')
        e.preventDefault()
        const formData = new FormData()
        formData.append('fileName', file)
        formData.append('name', name)

        await makeApiCall('post', '/file', formData, 'formdata')
            .then((res) => {
                console.log('add company', res?.data)

                if (res?.response?.data?.status === 0) {
                    return toast.error(`${res?.response?.data?.message}`)
                }
                if (res.data.status === 1) {
                    setLoader(false)
                    referenceCall(res?.data)
                    setFile('')
                    setName('')
                    toast.success('Save Successfully..')
                    modalClose()
                }
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    return (
        <>
            {openModal && (
                <>
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
                            <div
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                aria-hidden="true"
                            ></div>
                            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-screen-md p-6">
                                <div className="flex justify-between items-center pb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Upload File</h3>
                                    <button
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                                        aria-label="Close"
                                        onClick={modalClose}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    {/* Modal content */}
                                    <form onSubmit={handleSave} className="p-4 md:p-5">
                                        <div className="grid gap-2 mb-4 grid-cols-2 ">
                                            <div class="col-span-2">
                                                <label for="name" class="common-label">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    class="common-input"
                                                    placeholder="File Name"
                                                    required=""
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div class="col-span-2 p-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ">
                                                <div {...getRootProps()} className="dropzone">
                                                    <input {...getInputProps()} />
                                                    {isDragActive ? (
                                                        <p>Drop the files here ...</p>
                                                    ) : (
                                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                                    )}
                                                    {file && <p className="bg-gray-300">Uploaded file: {file.name}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="common-btn">
                                            {loader && (
                                                <svg
                                                    aria-hidden="true"
                                                    role="status"
                                                    class="inline w-4 h-4 me-3 text-white animate-spin"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="#E5E7EB"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            )}
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default AddUpload
