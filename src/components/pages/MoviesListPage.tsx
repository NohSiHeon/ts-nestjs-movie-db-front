import React, { useCallback, useEffect, useState } from "react";
import { getMovies } from "../../apis/movies";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { Movie } from "../../types/movie";
import '../../styles/MoviesListPage.css';

function MoviesListPage() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await getMovies();

				setMovies(response);
				// setMovies([]);
			} catch (err) {
				console.error('영화 목록을 불러오는 중 오류 발생', err)
			} finally {
				setLoading(false);
			}
		}

		fetchMovies();
	},[]);

	if(loading){
		return <div className="movies-list-message"> 영화 정보 불러오는 중...</div>;
	}

	if(error){
		return <div className="movies-list-message error">오류 발생: {error}</div>;
	}

	if(movies.length === 0){
		return <div className="movies-list-message no-movies">영화가 없습니다.</div>;
	}

	return (
		<div className="movies-list-page">
		<h2>영화 목록</h2>
				<ul className="movies-list">
					{movies.map((movie) => (
						<li key={movie.id} className="movie-item">
							<h3>{movie.title}</h3>
							<p>영화 소개: {movie.introduction}</p>
							<p>출연 배우{movie.actors}</p>
							<Link to={`/movies/${movie.id}`}>자세히 보기</Link>
						</li>
					))}
				</ul>
		</div>
	);


}

export default MoviesListPage;