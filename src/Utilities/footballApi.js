import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';

// Function to fetch team ID
const fetchTeamId = async (teamName) => {
  try {
    const response = await axios.get(`${BASE_URL}/teams`, {
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
      params: { name: teamName },
    });

    if (response.data.response.length > 0) {
      return response.data.response[0].team.id; // Return the team ID
    } else {
      throw new Error('Team not found');
    }
  } catch (error) {
    console.error('Error fetching team ID:', error);
    throw error;
  }
};

// Function to fetch next fixtures
export const fetchNextFixtures = async (teamName) => {
  try {
    const teamId = await fetchTeamId(teamName); // Fetch team ID first

    const response = await axios.get(`${BASE_URL}/fixtures`, {
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
      params: {
        team: teamId, // Use team ID instead of name
        next: 3, // Fetch the next 3 fixtures
      },
    });

    return response.data.response;
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
};
