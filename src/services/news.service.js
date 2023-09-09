import camelize from "camelize";

export const getAllNews = async (axios) => {
    try {
        const response = await axios.get('/news');

        if (!response.error && response.data.status === "success") {
            const result = [];
            response?.data?.data?.data.forEach((ele) => {
                result.push(ele);
            });
            return camelize(result);
        } else {
            throw response;
        }
    } catch (error) {
        throw error.message;
    }
}