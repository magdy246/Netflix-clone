import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PopularList.css";

export default function PopularList() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            const options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/popular',
                params: { language: 'en-US', page: '1' },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzcyYzQ2YThkODMxZTRlNGYzMmE2ZTcxMjg0ZmZmYSIsIm5iZiI6MTczMTM2MDM0My41MTAwODUzLCJzdWIiOiI2NzFkMTM1MGIzZDVjYmI4NDJmNDNlZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jefcR6GFUXzJDWK6go5WpZFSPKyizy-6vr8QxKycG_o'
                }
            };

            try {
                const response = await axios.request(options);
                setMovies(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTopRatedMovies();
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 7,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 15000,
        arrows: false,
        adaptiveHeight: true,
        focusOnSelect: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const openModal = (movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (<>
        <div className="top-rated-list px-10">
            <h1 className="text-left text-white md:text-5xl text-3xl font-bold w-fit p-2 relative mb-6">
                <span className="bg-gradient-to-r from-white via-gray-700 to-black absolute inset-x-0 bottom-0 h-1 rounded"></span>
                Popular
            </h1>
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <div
                            onClick={() => openModal(movie)}
                            className="relative bg-gray-900 shadow-lg"
                        >

                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-70 object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 p-5" />
                            <div className="absolute bottom-0 p-4 text-white">
                                <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                                <p className="text-sm text-gray-300 mb-1">Release Date: {movie.release_date}</p>

                                <p className="text-xs text-gray-400 line-clamp-3 max-h-16 overflow-hidden">{movie.overview}</p>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-75">
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold shadow-lg hover:bg-red-500 transition duration-300"
                                >
                                    More Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
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
        </div>
    </>
    );
}    
