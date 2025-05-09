

const BASE_URL = "http://localhost:5000/api";

// Fetch Scores
export const getScores = async () => {
  try {
    const response = await fetch(`${BASE_URL}/scores`);
    const data = await response.json();
    console.log("Fetched scores:", data);
    return data;
  } catch (err) {
    console.error("Error fetching scores:", err);
    return [];
  }
};

// Save Score
export const saveScore = async (username, score) => {
  try {
    const response = await fetch(`${BASE_URL}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, score }),
    });
    return response.json();
  } catch (err) {
    console.error("Error saving score:", err);
  }
};


// Fetch Highest Score
export const getHighestScore = async () => {
    try {
      const response = await fetch(`${BASE_URL}/scores`);
      const data = await response.json();
      console.log("Fetched highest score:", data);
      return data;
    } catch (err) {
      console.error("Error fetching highest score:", err);
      return null;
    }
  };
  


