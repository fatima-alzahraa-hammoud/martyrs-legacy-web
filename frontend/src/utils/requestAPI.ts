import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

interface RequestApiParams {
    route: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
    body?: any;
}

export const requestApi = async ({ route, method = "GET", body }: RequestApiParams) => {
    try {
        const response = await axios.request({
            url: route,
            method,
            data: body,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });

        return response.data;
    } catch (error : any) {
        if (error && error.response && error.response.data) {
            const errorMessage = error.response.data.error || error.response.data.message || 'An unexpected error occurred';

            console.log(errorMessage);
        } else {
            console.log('An error occurred. Please try again.');
        }

        return {
            devError: error,
            response: error.response?.data,
        };
    }
};