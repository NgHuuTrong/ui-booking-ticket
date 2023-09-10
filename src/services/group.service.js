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
