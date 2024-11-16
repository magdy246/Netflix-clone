import "./Loader.css"
import Nlogo from "../../assets/Netflix-N-logo.png"
export default function Loader() {
    return (
        <>
            <div className="flex items-center justify-center fixed top-0 start-0 end-0 bottom-0 bg-black z-50">
                <div>
                    <div className="text-red-600 text-8xl font-bold animate-pulse">
                        <img className='w-36' src={Nlogo} alt="logo" />
                    </div>
                </div>
            </div>
        </>
    )
}
