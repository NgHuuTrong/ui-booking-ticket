import camelize from "camelize";

export const getAllMatches = async (axios) => {
  try {
    const response = await axios.get("/matches");
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

export const getMatch = async (axios, matchId) => {
  try {
    const response = await axios.get("/matches/" + matchId);
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
