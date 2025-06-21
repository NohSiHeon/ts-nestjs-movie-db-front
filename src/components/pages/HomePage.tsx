import React, { useEffect, useState } from "react";
import { getMovies } from "../../apis/movies";
import type { Movie } from "../../types/movie";

function HomePage(){
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setLoading(true);
				setError(null);

				const moviesData = await getMovies({
					cursor: null,
					page: 1,
					limit: 5,
					sort: 'desc'
				});

				if(moviesData){
					setMovies(moviesData);
				} else {
					setError('영화 정보를 불러오는데 실패했습니다.');
				}
			} catch (error) {
				console.error('HomePage에서 발생한 예상치 못한 에러: ', error);
				setError('영화 정보를 불러오는데 예상치 못한 오류가 발생했습니다.');
			} finally {
				setLoading(false);
			}
		}

		fetchMovies();
	}, []);

	if(loading){
		return (
			<div>로딩 중...</div>
		);
	}

	if(error){
		return (
			<div>오류 발생</div>
		);
	}

	return (
		<div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', minHeight: '300px' }}>
      <h2>여기는 홈페이지 메인 콘텐츠 영역입니다.</h2>
      <p>라우팅이 정상적으로 작동하는 것을 확인합니다.</p>
			{movies.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {movies.map((movie) => (
            <li key={movie.id} style={{ margin: '15px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white' }}>
              <h3>{movie.title}</h3>
              <p>영화소개: {movie.introduction}</p>
              <p>개봉년도: {movie.releaseYear}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>영화 정보가 없습니다.</p>
      )}
    </div>
	)
}

export default HomePage;