import axios from "axios";

const API_URL = "http://127.0.0.1:4010";

export const loginUser = async (values: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, values);
  return response.data;
};
