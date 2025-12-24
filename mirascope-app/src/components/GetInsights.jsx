import axios from "axios";

export async function getInsights(data) {
  const response = await axios.post(
    "http://localhost:5000/api/insights",
    { data }
  );

  return response.data.result;
}
