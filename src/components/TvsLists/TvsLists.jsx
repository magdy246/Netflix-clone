import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Select from 'react-select';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import smallHeader from "../../assets/Netflix_small_header.png"

export default function TvsLists() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [type, setType] = useState("airing_today");
    const totalPages = type === "airing_today" ? 10 : 100;
    const [selectedMovie, setSelectedMovie] = useState(null);

    const fetchMovies = async (pageNum, type) => {
        setLoading(true);
        setError(null);

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${type}`,
            params: { language: 'en-US', page: pageNum },
            include_adult: 'false',
            include_video: 'false',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzcyYzQ2YThkODMxZTRlNGYzMmE2ZTcxMjg0ZmZmYSIsIm5iZiI6MTczMTM2MDM0My41MTAwODUzLCJzdWIiOiI2NzFkMTM1MGIzZDVjYmI4NDJmNDNlZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jefcR6GFUXzJDWK6go5WpZFSPKyizy-6vr8QxKycG_o',
            },
        };

        try {
            const response = await axios.request(options);
            setMovies(response.data.results);
        } catch (error) {
            setError('Failed to load data. Please try again.');
            console.log(error);
        } finally {
            setTimeout(function () {
                setLoading(false);
            }, 1500);
        }
    };

    useEffect(() => {
        fetchMovies(page, type);
    }, [page, type]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const openModal = (movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    const options = [
        { value: 'top_rated', label: 'Top Rated' },
        { value: 'popular', label: 'Popular' },
        { value: 'airing_today', label: 'Airing Today' },
        { value: 'on_the_air', label: 'On The Air' },
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

    return (
        <>
            <div>
                <img
                    src={smallHeader}
                    alt="Netflix header"
                    className="w-full h-56 object-cover"
                />
            </div>
            <div className="px-5 py-10 max-w-7xl min-h-screen mx-auto">
                <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-6 mb-8">
                    <h1 className="text-left text-white md:text-5xl text-3xl font-bold w-fit p-2 relative">
                        <span className="bg-gradient-to-r from-white via-gray-700 to-black absolute inset-x-0 bottom-0 h-1 rounded"></span>
                        {type == "top_rated" ? "Top Rated" : type == "popular" ? "Popular" : type == "airing_today" ? "Airing Today" : "On The Air"}
                    </h1>
                    <div className="ml-4 w-64">
                        <Select
                            value={options.find((option) => option.value === type)}
                            onChange={(selectedOption) => setType(selectedOption.value)}
                            options={options}
                            styles={customStyles}
                            className="text-center"
                            placeholder="Select type..."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <div className="text-center text-red-500 text-lg">{error}</div>
                    ) : (
                        <>
                            {movies.map((movie) => (
                                <div
                                    key={movie.id}
                                    onClick={() => openModal(movie)}
                                    className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    <p className="absolute top-3 right-3 text-lg text-white bg-black bg-opacity-70 w-10 h-10 flex items-center justify-center ring-2 ring-white rounded-full z-40">
                                        {movie.vote_average.toFixed(1)}
                                    </p>
                                    {/* Poster Image */}
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title || movie.original_name}
                                        className="w-full h-80 object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                    {/* Movie Info */}
                                    <div className="absolute bottom-0 p-4 text-white">
                                        <h3 className="text-lg font-bold truncate">{movie.title || movie.original_name}</h3>
                                        <p className="text-sm text-gray-300 mb-1">Release Date: {movie.release_date || movie.first_air_date}</p>

                                        {/* Overview */}
                                        <p className="text-xs text-gray-400 line-clamp-3 max-h-16 overflow-hidden">{movie.overview}</p>
                                    </div>

                                    {/* Hover Overlay Content */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-75">
                                        <button
                                            className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold shadow-lg hover:bg-red-500 transition duration-300"
                                        >
                                            More Details
                                        </button>
                                    </div>
                                </div>
                            ))
                            }
                        </>
                    )}
                </div>

                {selectedMovie && (
                    <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50 p-4 sm:p-6 lg:p-8">
                        <div
                            className="relative bg-black rounded-xl p-6 sm:p-8 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-white ring-4 overflow-hidden ring-gray-900 overflow-y-auto max-h-[90vh]"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* Dark Overlay Layer */}
                            <div className="absolute inset-0 bg-black opacity-70 rounded-xl md:block hidden" />

                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-clip hover:text-gray-500 text-xl sm:text-2xl transition duration-200 z-40"
                            >
                                ✕
                            </button>

                            {/* Content Layer */}
                            <div className="relative z-10">
                                {/* Movie Poster and Details */}
                                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 sm:space-y-6 lg:space-y-0">

                                    {/* Poster Image */}
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                                        alt={selectedMovie.title}
                                        className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-auto rounded-lg shadow-lg mb-4 lg:mb-0"
                                    />

                                    {/* Details */}
                                    <div className="lg:ml-8 space-y-3">
                                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{selectedMovie.title || selectedMovie.original_name}</h2>
                                        <p className="text-xs sm:text-sm text-gray-400">Release Date: {selectedMovie.release_date || selectedMovie.first_air_date}</p>

                                        {/* Rating */}
                                        <p className="text-xs sm:text-sm font-semibold bg-red-600 inline-block px-3 py-1 rounded-full shadow mb-4">
                                            {selectedMovie.vote_average.toFixed(1)} ★
                                        </p>

                                        {/* Overview */}
                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-h-32 overflow-hidden line-clamp-5">
                                            {selectedMovie.overview}
                                        </p>

                                        {/* IMDb Link */}
                                        <a
                                            href={`https://www.themoviedb.org/tv/${selectedMovie.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-red-600 rounded-lg font-semibold text-white shadow-lg hover:bg-red-500 transition duration-300"
                                        >
                                            Watch Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-center items-center mt-8 space-x-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2 flex items-center rounded-full transition duration-300 ease-in-out 
                    ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-500'}`}
                        aria-label="Previous page"
                    >
                        <span className="material-icons"><FontAwesomeIcon icon={faAnglesLeft} /></span>
                        <span className="ml-2 md:block hidden">Previous</span>
                    </button>

                    {/* First Page Button */}
                    {page > 2 && (
                        <button
                            onClick={() => handlePageChange(1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition duration-300 ease-in-out
                        ${page === 1 ? 'bg-red-700 text-white font-semibold shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            aria-label="Page 1"
                        >
                            1
                        </button>
                    )}

                    {/* Ellipsis if needed */}
                    {page > 3 && <span className="text-gray-500">...</span>}

                    {/* Previous Page Button */}
                    {page > 1 && (
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition duration-300 ease-in-out
                        bg-gray-200 text-gray-700 hover:bg-gray-300`}
                            aria-label={`Page ${page - 1}`}
                        >
                            {page - 1}
                        </button>
                    )}

                    {/* Current Page */}
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-700 text-white font-semibold shadow-md scale-105"
                        aria-current="page"
                        aria-label={`Page ${page}`}
                    >
                        {page}
                    </button>

                    {/* Next Page Button */}
                    {page < totalPages && (
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition duration-300 ease-in-out
                        bg-gray-200 text-gray-700 hover:bg-gray-300`}
                            aria-label={`Page ${page + 1}`}
                        >
                            {page + 1}
                        </button>
                    )}

                    {/* Ellipsis if needed */}
                    {page < totalPages - 2 && <span className="text-gray-500">...</span>}

                    {/* Last Page Button */}
                    {page < totalPages - 1 && (
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition duration-300 ease-in-out
                        ${page === totalPages ? 'bg-red-700 text-white font-semibold shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            aria-label={`Page ${totalPages}`}
                        >
                            {totalPages}
                        </button>
                    )}

                    {/* Next Button */}
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={`px-4 py-2 flex items-center rounded-full transition duration-300 ease-in-out 
                    ${page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-500'}`}
                        aria-label="Next page"
                    >
                        <span className="mr-2 md:block hidden">Next</span>
                        <span className="material-icons"><FontAwesomeIcon icon={faAnglesRight} /></span>
                    </button>
                </div>
            </div>
        </>
    );
}


