import type { ApiResponse } from "../types/apiResponse";
import type { Movie } from "../types/movie";
import axiosInstance from "./axiosInstance"

const getMovies = async():Promise<Movie[] | undefined> => {
	try {
		const response = await axiosInstance.get<ApiResponse<Movie[]>>('/movies');

		return response.data.data;
	} catch (error) {
		console.error('Error', error.message);
	}
};

export { getMovies };