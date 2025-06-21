import { useEffect, useState } from "react";
import { getMovie } from "../../apis/movies";
import { useParams } from "react-router-dom";
import type { Movie } from "../../types/movie";
import "../../styles/MovieDetailPage.css";

function MovieDetailPage () {
	const { id } = useParams<{id: string}>();
	const [movie, setMovie] = useState<Movie | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);


	useEffect(() => {
		const fetchMovie = async () => {
			if(!id){
				setError('영화 ID가 제공되지 않았습니다.');
				setLoading(false);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const response = await getMovie(id);
				setMovie(response);
			} catch (error) {
				console.error(`영화 ID ${id} 정보 불러오는 중 오류 발생: `, error);
				setError('영화 정보를 불러오는데 실패했습니다.', error.message);
			} finally {
				setLoading(false);
			}
		}
		fetchMovie();
	}, [id]);

	if(loading){
		return <div className="detail-message">영화 정보 불러오는 중...</div>;
	}

	if(error){
		return <div className="detail-message error">오류 발생: {error}</div>;
	}

	if(!movie) {
		return <div className="detail-message no-movie">해당 영화를 찾을 수 없습니다.</div>;
	}


	return (
		<div className="movie-detail-page">
			<h2>{movie.title}</h2>
			<p>소개: {movie.introduction}</p>
			<p>출연 배우: {movie.actors}</p>
			<p>개봉일: {movie.releaseYear}</p>
			<p>장르: {movie.genre}</p>
			<p>레이팅: {movie.rating}</p>
		</div>
	);
}

export default MovieDetailPage;