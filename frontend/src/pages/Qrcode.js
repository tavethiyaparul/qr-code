import React, { useEffect, useState } from 'react'

import AddUpload from '../component/AddUpload'
import { getDateTime, makeApiCall } from '../api/MakeApiCall'
import QRCodeModal from '../component/QRCodeModal'
import ConfirmationModal from '../component/ConfirmationModal'
import { toast } from 'react-toastify'

const Qrcode = () => {
    const [url, setUrl] = useState('')
    const [qr, setQr] = useState([])
    const [openModel, setOpenModel] = useState(false)
    const [refresh, setRefresh] = useState(null)
    const [copied, setCopied] = useState(false)
    const [openScanModel, setOpenScanModel] = useState(false)
    const [passUrl, setPassUrl] = useState()

    let pathUrl = 'https://groworbit.in/qr/uploads/'

    //delete model
    const [modalStates, setModalStates] = useState({ rowVal: '', deleteConfirm: false })

    const getQr = async () => {
        await makeApiCall('get', '/file', null, 'raw')
            .then((res) => {
                console.log('qr Code', res?.data?.result)
                setQr(res?.data?.result)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    const deleteFile = async () => {
        await makeApiCall('delete', `/file/${modalStates?.rowVal}`, null, 'raw')
            .then((res) => {
                console.log('qr Code', res?.data?.result)
                if (res?.data?.status == 1) toast.success('Delete Successfully')
                setModalStates({ rowVal: '', deleteConfirm: false })
                setRefresh(res?.data)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    const handleCloseModal = () => {
        setModalStates({ rowVal: '', deleteConfirm: false })
    }
    const copyToClipboard = (textToCopy) => {
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                }, 1500) // Reset copied state after 1.5 seconds
            })
            .catch((err) => {
                console.error('Failed to copy: ', err)
            })
    }

    useEffect(() => {
        getQr()
    }, [refresh])

    return (
        <div className="mt-10 w-full max-w-[620px] mx-auto p-3">
            <div className="relative w-full">
                <div className="flex justify-between w-full">
                    <h1 className="font-bold text-green-800 text-xl uppercase">My Apk Store</h1>
                    <button type="submit" class="common-btn" onClick={() => setOpenModel(true)}>
                        Upload
                    </button>
                </div>
                {qr &&
                    qr?.map((e, i) => {
                        return (
                            <>
                                <div
                                    class="flex justify-between items-center bg-white rounded-lg overflow-hidden shadow-xl  p-6 mb-5 "
                                    key={i}
                                >
                                    <div>
                                        <div class="flex items-center space-x-4">
                                            <div>
                                                <p class="font-bold">{e.name}</p>
                                                <p class="text-sm text-gray-500">
                                                    {' '}
                                                    <span className="font-semibold">Date: </span>
                                                    {getDateTime(e.createdAt)}
                                                </p>
                                                <p class="text-sm text-gray-500">
                                                    <span className="font-semibold">FileName: </span> {e.url}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-4">
                                        <button
                                            title="Show QR Code"
                                            onClick={() => {
                                                setOpenScanModel(true)
                                                setPassUrl(`${pathUrl}${e.url}`)
                                            }}
                                        >
                                            <svg
                                                class="h-6 w-6"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M21 7.505a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V4.5A1.5 1.5 0 0 1 16.5 3h3A1.5 1.5 0 0 1 21 4.5v3.005zM9 7.5V4.504a1.5 1.5 0 0 0-1.498-1.5l-3-.003A1.5 1.5 0 0 0 3 4.5V7.5A1.5 1.5 0 0 0 4.5 9h3A1.5 1.5 0 0 0 9 7.5zM5 7V5.001l2 .002V7H5zm-.502 8.004 3-.003A1.5 1.5 0 0 1 9 16.5V19.5A1.5 1.5 0 0 1 7.5 21h-3A1.5 1.5 0 0 1 3 19.5v-2.996a1.5 1.5 0 0 1 1.498-1.5zM7 19H5v-1.997l2-.002V19zM19 5v2.005h-2V5h2zm0 11a1 1 0 1 1 2 0v3.5a1.5 1.5 0 0 1-1.498 1.5l-3.5.005a1 1 0 1 1-.003-2L19 19V16zM11 4v7H4a1 1 0 1 0 0 2h8a1 1 0 0 0 1-1V4a1 1 0 1 0-2 0zm2 16a1 1 0 1 1-2 0v-4a1 1 0 1 1 2 0v4zm3-3a1 1 0 0 0 1-1v-3h3a1 1 0 1 0 0-2h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1z"
                                                    fill="#000000"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            title={copied ? 'Copied!' : 'Copy Text'}
                                            type="button"
                                            onClick={() => copyToClipboard(`${pathUrl + e.url}`)}
                                        >
                                            <svg
                                                class="h-6 w-6 text-blue-500"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                {' '}
                                                <path stroke="none" d="M0 0h24v24H0z" />{' '}
                                                <rect x="8" y="8" width="12" height="12" rx="2" />{' '}
                                                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                                            </svg>
                                            {/* <p> {copied ? 'Copied!' : 'Copy Text'}</p> */}
                                        </button>

                                        <button
                                            title="Delete"
                                            onClick={() =>
                                                setModalStates({ ...modalStates, rowVal: e?._id, deleteConfirm: true })
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                class="w-6 h-6  text-red-500"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                {openModel && (
                    <AddUpload
                        modalClose={() => {
                            setOpenModel(false)
                        }}
                        referenceCall={(e) => {
                            setRefresh(e)
                        }}
                    />
                )}

                {openScanModel && (
                    <QRCodeModal
                        modalClose={() => {
                            setOpenScanModel(false)
                        }}
                        passUrl={passUrl}
                    />
                )}

                {modalStates.deleteConfirm && (
                    <ConfirmationModal isOpen={setModalStates} onClose={handleCloseModal} onConfirm={deleteFile} />
                )}
            </div>
        </div>
    )
}

export default Qrcode
