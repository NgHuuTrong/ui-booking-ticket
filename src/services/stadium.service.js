import camelize from "camelize";

export const getStadium = async (axios, stadiumId) => {
  try {
    const response = await axios.get("/stadia/" + stadiumId);

    if (response.data.status === "success") {
      return camelize(response?.data?.data?.data);
    }
  } catch (err) {
    throw err.data.message;
  }
};
