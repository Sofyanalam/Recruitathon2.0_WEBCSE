import axios from "axios";

export async function getInsights(feedback) {
  const response = await axios.post(
    "http://localhost:5000/api/insights",
    { feedback }
  );

  return response.data.result;
}