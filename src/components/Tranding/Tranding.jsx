import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Select from 'react-select';
import smallHeader from "../../assets/Netflix_small_header.png"
export default function Trending() {
    const [type, setType] = useState("movie");
    const [items, setItems] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/trending/${type}/day`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzcyYzQ2YThkODMxZTRlNGYzMmE2ZTcxMjg0ZmZmYSIsIm5iZiI6MTczMTM2MDM0My41MTAwODUzLCJzdWIiOiI2NzFkMTM1MGIzZDVjYmI4NDJmNDNlZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jefcR6GFUXzJDWK6go5WpZFSPKyizy-6vr8QxKycG_o'
            }
        };

        axios
            .request(options)
            .then(res => {
                setItems(res.data.results);
                setTimeout(() => {
                    setLoading(false);
                }, 1500)
            })
            .catch(err => {
                console.error(err);
                setTimeout(() => {
                    setLoading(false);
                }, 1500)
            });
    }, [type]);

    const options = [
        { value: 'movie', label: 'Movies' },
        { value: 'tv', label: 'TV Shows' },
        { value: 'person', label: 'Actors' },
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#1f2937',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '6px 12px',
            borderRadius: '0.5rem',
            transition: 'all 0.5s ease',
            '&:hover': { backgroundColor: '#374151' },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#111827',
            borderRadius: '0.5rem',
            marginTop: '4px',
            overflow: 'hidden',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#b91c1c' : '#111827',
            color: state.isSelected ? '#fff' : '#d1d5db',
            padding: '10px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.5s ease',
            '&:hover': {
                backgroundColor: state.isSelected ? '#b91c1c' : '#374151',
                color: '#fff',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#d1d5db',
            fontWeight: 'bold',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#d1d5db',
            '&:hover': { color: '#b91c1c' },
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
    };

    return (<>
        <div>
            <img
                src={smallHeader}
                alt="Netflix header"
                className="w-full h-56 object-cover"
            />
        </div>
        <div className="container mx-auto px-4 py-10 min-h-screen">
            {/* Dropdown Filter */}
            <div className="flex flex-col md:flex-row md:gap-0 gap-4 justify-between items-center mb-6">
                <h1 className="text-left text-white md:text-5xl text-3xl font-bold w-fit p-2 relative">
                    <span className="bg-gradient-to-r from-white via-gray-700 to-black absolute inset-x-0 bottom-0 h-1 rounded"></span>
                    {type === "movie" ? "Tranding Movies" : type === "tv" ? "Tranding TVs" : "Tranding Actors"}
                </h1>
                <div className="ml-4 w-64">
                    <Select
                        value={options.find((option) => option.value === type)}
                        onChange={(selectedOption) => setType(selectedOption.value)}
                        options={options}
                        styles={customStyles}
                        className="text-center z-30"
                        placeholder="Select type..."
                    />
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl"
                        >
                            <p className="absolute top-3 right-3 text-lg text-white bg-black bg-opacity-70 w-10 h-10 flex items-center justify-center ring-2 ring-white rounded-full z-10">
                                {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                            </p>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${type === "person" ? item.profile_path : item.poster_path}`}
                                alt={item.title || item.name}
                                className="w-full h-80 object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-0 p-4 text-white">
                                <h3 className="text-lg font-bold truncate">{item.title || item.name}</h3>
                                <p className="text-sm text-gray-300 mb-1">Release Date: {item.release_date || "N/A"}</p>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-75">
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold shadow-lg hover:bg-red-500 transition duration-300"
                                    onClick={() => setSelectedMovie(item)}
                                >
                                    More Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Selected Movie */}
            {selectedMovie && (
                <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50 p-4 sm:p-6 lg:p-8">
                    <div
                        className="relative bg-black rounded-xl p-6 sm:p-8 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-white ring-4 ring-gray-900 overflow-y-auto max-h-[90vh]"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <button
                            onClick={() => setSelectedMovie(null)}
                            className="absolute top-4 right-4 text-2xl sm:text-3xl transition duration-200 z-40 text-gray-400 hover:text-gray-500"
                        >
                            ✕
                        </button>
                        <div className="relative z-10">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${type === "person" ? selectedMovie.profile_path : selectedMovie.poster_path}`}
                                    alt={selectedMovie.title || selectedMovie.name}
                                    className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-auto rounded-lg shadow-lg mb-4 lg:mb-0"
                                />
                                <div className="lg:ml-8 space-y-3">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{selectedMovie.title || selectedMovie.name}</h2>
                                    <p className="text-xs sm:text-sm text-gray-400">Release Date: {selectedMovie.release_date || "N/A"}</p>
                                    <p className="text-xs sm:text-sm font-semibold bg-red-600 inline-block px-3 py-1 rounded-full shadow mb-4">
                                        {selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : "N/A"} ★
                                    </p>
                                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                        {selectedMovie.overview || "No overview available."}
                                    </p>
                                    {type === "person" ? <a
                                        href={`https://www.themoviedb.org/person/${selectedMovie.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-red-600 rounded-lg font-semibold text-white shadow-lg hover:bg-red-500 transition duration-300"
                                    >
                                        All Details
                                    </a> :
                                        type === "movie" ?
                                            <a
                                                href={`https://www.themoviedb.org/movie/${selectedMovie.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-red-600 rounded-lg font-semibold text-white shadow-lg hover:bg-red-500 transition duration-300"
                                            >
                                                Watch Now
                                            </a> : <a
                                                href={`https://www.themoviedb.org/tv/${selectedMovie.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-red-600 rounded-lg font-semibold text-white shadow-lg hover:bg-red-500 transition duration-300"
                                            >
                                                Watch Now
                                            </a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
    );
}
