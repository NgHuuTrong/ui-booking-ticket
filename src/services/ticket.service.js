import camelize from "camelize";

export const getMyTicket = async (axios) => {
  const response = await axios.get("/users/my-tickets");

  if (response.data.status === "success") {
    const result = [[], []];
    response.data.my_tickets.forEach((ele) => {
      if ((ele.match.happened = true)) result[1].push(ele);
      else result[0].push(ele);
    });
    return camelize(result);
  } else {
    return response.message;
  }
};
