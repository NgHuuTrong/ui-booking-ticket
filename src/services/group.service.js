import camelize from "camelize";

export const getAllGroup = async (axios) => {
  try {
    const response = await axios.get("/groups");

    if (response.data.status === "success") {
      return camelize(response.data.data.data);
    }
  } catch (err) {
    throw err.data.message;
  }
};

export const getGroup = async (axios, groupId) => {
  try {
    const response = await axios.get(`/groups/${groupId}`);

    if (response.data.status === "success") {
      return camelize(response.data.data.data);
    }
  } catch (err) {
    throw err.data.message;
  }
};

export const getGroupAndMatches = async (axios, groupId) => {
  try {
    const response = await axios.get(`/groups/${groupId}/matches`);

    if (response.data.status === "success") {
      return camelize(response.data.data.matches);
    }
  } catch (err) {
    throw err.data.message;
  }
};
