import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'

const QRCodeModal = ({ modalClose, passUrl }) => {
    const [isOpen, setIsOpenModal] = useState(true)

    const [qr, setQr] = useState()
    const generateQR = (url) => {
        console.log('generateQR', url)
        QRCode.toDataURL(url)
            .then((url) => {
                setQr(url)
                console.log('qr', url)
            })
            .catch((err) => {
                console.error(err)
            })
    }
    useEffect(() => {
        generateQR(passUrl)
    }, [passUrl])

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                        ></div>
                        <div className="relative bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-screen-md p-6">
                            <div className="flex justify-between items-center pb-2">
                                <h3 className="text-xl font-semibold text-gray-900">QR Code</h3>
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
                            {qr && (
                                <div className="text-center">
                                    <img src={qr} alt="QR Code" className="w-80 h-80 inline" />
                                    <a className="common-btn" href={passUrl} download>
                                        Download
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default QRCodeModal
