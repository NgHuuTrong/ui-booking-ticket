import camelize from "camelize";

export const getUser = async (axios) => {
    try {
        const response = await axios.get('/users/me');

        if (response.data.status === "success") {
            return camelize(response?.data?.data?.data);
        } else {
            return response.message;
        }
    } catch (error) {
        console.log(error);
    }
}