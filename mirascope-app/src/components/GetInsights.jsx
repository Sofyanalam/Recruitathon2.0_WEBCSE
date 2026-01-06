export async function getInsights(topThemes) {
  try {
    const response = await fetch("http://localhost:3000/insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topThemes })
    });
    const data = await response.json();
    return data.result; 
    
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}