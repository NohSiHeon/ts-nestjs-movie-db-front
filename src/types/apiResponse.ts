export interface ApiResponse<T> {
	status?: number;
	statusCode?: number;
	message: string;
	data: T
}