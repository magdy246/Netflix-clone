import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { faAnglesLeft, faAnglesRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PlayingNowList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const totalPages = 299;
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchMovies = async (pageNum) => {
        setLoading(true);
        setError(null);

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/now_playing',
            params: { language: 'en-US', page: pageNum },
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
        fetchMovies(page);
    }, [page]);

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

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="px-5 py-10 max-w-7xl min-h-screen mx-auto">
                <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:gap-0 gap-6 mb-8">
                    <h1 className="text-left text-white md:text-5xl text-3xl font-bold w-fit p-2 relative">
                        <span className="bg-gradient-to-r from-white via-gray-700 to-black absolute inset-x-0 bottom-0 h-1 rounded"></span>
                        All Movies
                    </h1>

                    {/* Search Input */}
                    <div className="relative w-full max-w-md">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-red-500"
                        />
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-4 py-3 w-full rounded-full bg-gray-800 text-white focus:outline-none transition-all duration-300 shadow-red-600 group shadow-inner"
                            style={{
                                border: '2px solid transparent',
                                backgroundImage: 'linear-gradient(to right, #000, red), linear-gradient(to right, #1a202c, #1a202c)',
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'padding-box, border-box',
                            }}
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
                            {filteredMovies.map((movie) => (
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
                                        alt={movie.title}
                                        className="w-full h-80 object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                    {/* Movie Info */}
                                    <div className="absolute bottom-0 p-4 text-white">
                                        <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                                        <p className="text-sm text-gray-300 mb-1">Release Date: {movie.release_date}</p>

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
                                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{selectedMovie.title}</h2>
                                        <p className="text-xs sm:text-sm text-gray-400">Release Date: {selectedMovie.release_date}</p>

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
                                            href={`https://www.themoviedb.org/movie/${selectedMovie.id}`}
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
