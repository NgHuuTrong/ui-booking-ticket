import camelize from "camelize";
export const getClub = async (axios, clubId) => {
  try {
    const response = await axios.get("/clubs/" + clubId);
    if (response.data.status === "success") {
      return camelize(response?.data?.data?.data);
    } else {
      return response.message;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getClubMatches = async (axios, clubId) => {
  try {
    const response = await axios.get("/clubs/" + clubId + "/matches");
    if (response.data.status === "success") {
      return camelize(response?.data?.data);
    } else {
      return response.message;
    }
  } catch (error) {
    console.log(error);
  }
};
