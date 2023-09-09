import camelize from "camelize";

export const getStadium = async (axios, stadiumId) => {
  try {
    const response = await axios.get("/stadia/" + stadiumId);

    if (response.data.status === "success") {
      return response?.data?.data?.data;
    } else {
      return response.message;
    }
  } catch (error) {
    console.log(error);
  }
};
