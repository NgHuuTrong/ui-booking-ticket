import camelize from "camelize";

export const getAllNews = async (axios) => {
  try {
    const response = await axios.get("/news");

    if (response.data.status === "success") {
      const result = [];
      response?.data?.data?.data.forEach((ele) => {
        result.push(ele);
      });
      return camelize(result);
    }
  } catch (err) {
    throw {
      status: err.status,
      message: err.data.message
    };
  }
};
