import "./Header.css"
import header from "../../assets/header1.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faCirclePlay } from "@fortawesome/free-solid-svg-icons"
export default function Header() {
    return (
        <>
            <div className="min-h-screen text-white flex">
                {/* Main Content */}
                <main className="flex-1">
                    {/* Featured Movie Section */}
                    <section
                        className="relative w-full h-[100vh] bg-cover overflow-hidden shadow-lg bg-left"
                        style={{
                            backgroundImage: `url(${header})`
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                            <h2 className="text-4xl font-[BebasNeue-R]">Money Heist</h2>
                            <p className="text-lg font-[BebasNeue-R]">Season 1 | Action, Drama</p>
                            <div className="mt-4 flex space-x-4">
                                <a
                                    href="https://youtu.be/FkBp9skL58g?si=-F5_JAKtOXBKRjh8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-red-600 hover:bg-red-700 hover:text-black transition-all duration-300 px-6 py-2 rounded-3xl font-[Roboto-B]">
                                    <FontAwesomeIcon icon={faCirclePlay} /> <span>Play</span>
                                </a>
                                <a
                                    href="https://www.netflix.com/eg-en/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-700 hover:bg-gray-800 transition-all duration-300 px-4 py-2 rounded-3xl font-[Roboto-B]">
                                    <FontAwesomeIcon icon={faCircleInfo} />  More info
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}
