import React from "react"

const RemovePopUp = ({closepopup}) => {
    const handleButtonClick = () =>{
        
        closepopup();
    }
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center bg-white aspect-[4/3] h-1/4 rounded-full">
                <p className="mt-20 text-3xl font-bold my-auto text-green-500">Berhasil Dihapus</p>
                <button className="my-4 bg-white border-2 border-green-500 p-2 rounded-full" onClick={handleButtonClick}>Close</button>
            </div>
        </div>
    )
}

export default RemovePopUp