import camelize from "camelize";

export const getStadium = async (axios, stadiumId) => {
  try {
    const response = await axios.get("/stadia/" + stadiumId);

    if (response.data.status === "success") {
      return camelize(response?.data?.data?.data);
    }
  } catch (err) {
    throw {
      status: err.status,
      message: err.data.message
    };
  }
};
