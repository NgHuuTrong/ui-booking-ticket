export const getAllMatches = async (axios) => {
  try {
    const response = await axios.get("/matches");
    if (response.data.status === "success") {
      return response?.data?.data?.data;
    } else {
      return response.message;
    }
  } catch (error) {
    console.log(error);
  }
};
