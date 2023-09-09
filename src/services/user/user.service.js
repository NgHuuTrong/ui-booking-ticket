import camelize from "camelize";

export const getUser = async (axios) => {
  try {
    const response = await axios.get("/users/me");

    if (!response.error && response?.data.status === "success") {
      return camelize(response?.data?.data?.data);
    }
  } catch (err) {
    throw err.data.message;
  }
};
