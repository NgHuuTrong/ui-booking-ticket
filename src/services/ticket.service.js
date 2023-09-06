export const getAllMatch = async (axios) => {
  const response = await axios
    .get("/users/my-tickets")
    .catch((err) => console.log("err", err));

  // if (response?.data?.status = 'success') {
  //   return response.data.data.data
  // }
  console.log("response", response);
};
