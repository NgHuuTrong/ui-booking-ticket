import camelize from "camelize";

export const getMyTicket = async (axios) => {
  try {
    const response = await axios.get("/users/my-tickets");

    if (response.data.status === "success") {
      const result = [[], []];
      response.data.my_tickets.forEach((ele) => {
        if (ele.match.happened === true) result[1].push(ele);
        else result[0].push(ele);
      });
      return camelize(result);
    }
  } catch (err) {
    throw {
      status: err.status,
      message: err.data.message
    };
  }
};

export const getMyTicketById = async (axios, ticketId) => {
  try {
    const response = await axios.get(`/users/my-ticket/${ticketId}`);

    if (response.data.status === "success") {
      return camelize(response.data.ticket);
    }
  } catch (err) {
    throw {
      status: err.status,
      message: err.data.message
    };
  }
};
