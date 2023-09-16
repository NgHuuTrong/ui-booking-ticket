import camelize from "camelize";
export const getClub = async (axios, clubId) => {
  try {
    const response = await axios.get("/clubs/" + clubId);
    if (response.data.status === "success") {
      return camelize(response?.data?.data?.data);
    }
  } catch (error) {
    throw {
      status: error.status,
      message: error.data.message,
    };
  }
};

export const getClubMatches = async (axios, clubId) => {
  try {
    const response = await axios.get("/clubs/" + clubId + "/matches");
    if (response.data.status === "success") {
      return camelize(response?.data?.data);
    }
  } catch (error) {
    throw {
      status: error.status,
      message: error.data.message,
    };
  }
};
