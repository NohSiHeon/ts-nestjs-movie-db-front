import type { ApiResponse } from "../types/apiResponse";
import type { Movie } from "../types/movie";
import axiosInstance from "./axiosInstance"

const getMovies = async(options?: {cursor: number | null, page: number, limit: number, sort: string}):Promise<Movie[] | undefined> => {
	const { cursor, page, limit, sort} = options || {};

	
	try {
		const response = await axiosInstance.get<ApiResponse<Movie[]>>('/movies', {
			params: { cursor: cursor, page: page, limit: limit, sort: sort}
		});

		return response.data.data;
	} catch (err) {
		console.error('Error', err.message);
	}
};

const getMovie = async(movieId: string) => {
	try {
		const response = await axiosInstance.get<ApiResponse<Movie>>(`/movies/${movieId}`);

		return response.data.data;
	} catch (error) {
		console.error('Error', error.message);
	}
};

export { getMovies, getMovie };