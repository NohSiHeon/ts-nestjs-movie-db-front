import axiosInstance from "./axiosInstance"

const signUp = async(email: string, password: string, passwordConfirm: string, name: string) => {
	try {
		const response = await axiosInstance.post('/auth/sign-up', {
			email, password, passwordConfirm, name
		});

		return response.data.data;
	} catch (error) {
		console.error('Error', error.message);
	}
};

const signIn = async(email:string, password:string) => {
	try {
		const response = await axiosInstance.post('/auth/sign-in', {
			email, password
		});

		return response.data.data;
	} catch (error) {
		console.error('Error', error.message);
	}
}

export { signUp, signIn };