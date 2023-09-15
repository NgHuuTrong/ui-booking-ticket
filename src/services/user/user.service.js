import camelize from "camelize";

export const getUser = async (axios) => {
  try {
    const response = await axios.get("/users/me");

    if (response?.data.status === "success") {
      return camelize(response?.data?.data?.data);
    }
  } catch (err) {
    throw {
      status: err.status,
      message: err.data.message,
    };
  }
};

export const signUp = async (axios, payload) => {
  try {
    const response = await axios.post("/users/signup", {
      ...payload,
      password_confirm: payload.passwordConfirm,
    });

    if (response?.data.status === "success") {
      return camelize(response?.data);
    }
  } catch (err) {
    throw {
      status: err.status,
      message: err.data.message,
    };
  }
};

export const signIn = async (axios, payload) => {
  try {
    const response = await axios.post("/users/login", payload);

    if (response?.data.status === "success") {
      return camelize(response?.data);
    }
  } catch (err) {
    throw {
      status: err.status,
      message: err.data.message,
    };
  }
};

export const updatePassword = async (axios, payload) => {
  try {
    const response = await axios.patch("/users/updateMyPassword", payload);

    if (response?.data.status === "success") {
      return camelize(response?.data);
    }
  } catch (err) {
    throw {
      status: err.status,
      message: err.data.message,
    };
  }
};

export const updateUser = async (axios, payload) => {
  try {
    await axios.patch("/users/updateMe", payload);
  } catch (err) {
    throw {
      status: err.status,
      message: err.data.message,
    };
  }
};

export const forgotPassword = async (axios, payload) => {
  try {
    const response = await axios.post("/users/forgotPassword", payload);

    if (response?.data.status === "success") {
      return camelize(response?.data);
    }
  } catch (err) {
    throw err.data.message;
  }
};

export const resetPassword = async (axios, payload) => {
  try {
    const response = await axios.patch("/users/resetPassword", {
      ...payload,
      token: payload.resetToken,
    });

    if (response?.data.status === "success") {
      return camelize(response?.data);
    }
  } catch (err) {
    throw err.data.message;
  }
};
