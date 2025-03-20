import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';

// Function to fetch team ID:
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

// Function to fetch odds using fixtureId:
export const fetchOddsByFixtureId = async (fixtureId) => {
  try {
    const response = await axios.get(`${BASE_URL}/odds`, {
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
      params: {
        fixture: fixtureId, // Use fixtureId to fetch odds
      },
    });

    if (response.data.response.length > 0) {
      // Extract and return odds data
      return response.data.response[0].bookmakers.map((bookmaker) => ({
        bookmaker: bookmaker.name,
        odds: bookmaker.bets[0]?.values || [], // Odds values for the first bet type
      }));
    } else {
      return "No odds available";
    }
  } catch (error) {
    console.error(`Error fetching odds for fixtureId ${fixtureId}:`, error);
    throw error;
  }
};

// Function to fetch next 3 fixtures by team name:
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

    // Return fixtures with fixtureId and other relevant data
    return response.data.response.map((fixture) => ({
      fixtureId: fixture.fixture.id,
      homeTeam: fixture.teams.home.name,
      awayTeam: fixture.teams.away.name,
      date: fixture.fixture.date,
      referee: fixture.fixture.referee,
      stadium: fixture.fixture.venue.name,
    }));
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
};
