import { useEffect, useState } from 'react';
import axios from 'axios';
import './TopRatedList.css';
import Loader from '../Loader/Loader';

export default function TopRatedList() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
                    params: {
                        language: 'en-US',
                        page: currentPage,
                    },
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzcyYzQ2YThkODMxZTRlNGYzMmE2ZTcxMjg0ZmZmYSIsIm5iZiI6MTczMTM2MDM0My41MTAwODUzLCJzdWIiOiI2NzFkMTM1MGIzZDVjYmI4NDJmNDNlZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jefcR6GFUXzJDWK6go5WpZFSPKyizy-6vr8QxKycG_o',
                    },
                });
                setMovies(prevMovies => [...prevMovies, ...response.data.results]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [currentPage]);

    const handleSeeMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const displayedMovies = movies.slice(0, currentPage * 5);

    const openModal = (movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-left text-white md:text-5xl text-3xl font-bold w-fit p-2 relative mb-6">
                <span className="bg-gradient-to-r from-white via-gray-700 to-black absolute inset-x-0 bottom-0 h-1 rounded"></span>
                Top Rated
            </h1>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                
                {/* Movie cards */}
                {displayedMovies.slice(0, currentPage * 5).map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => openModal(movie)}
                        className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl z-20"
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

                        {/* Overlay Gradient for individual movie cards */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-20" />

                        {/* Movie Info */}
                        <div className="absolute bottom-0 p-4 text-white z-30">
                            <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                            <p className="text-sm text-gray-300 mb-1">Release Date: {movie.release_date}</p>

                            {/* Overview */}
                            <p className="text-xs text-gray-400 line-clamp-3 max-h-16 overflow-hidden">{movie.overview}</p>
                        </div>

                        {/* Hover Overlay Content */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-75 z-30">
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold shadow-lg hover:bg-red-500 transition duration-300"
                            >
                                More Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="text-center py-4">
                        <button
                            onClick={handleSeeMore}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-12 rounded-full animate-pulse">
                            See More
                        </button>

                    </div>
                )
            }

            {
                selectedMovie && (
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
                )
            }
        </div >
    );
}
