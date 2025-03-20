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

/**
 * Fetches all prediction types from API-Football.
 * @returns {Promise<Array>} An array of prediction types.
 */
export const fetchPredictionTypes = async () => {
  try {
    const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/odds`, {
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
      params: {
        fixture: 1125976, // Use a placeholder fixture ID since types are the same for all games
      },
    });

    const bets = response.data.response[0]?.bookmakers[0]?.bets || [];
    return bets.map((bet) => ({
      value: bet.name,
      label: bet.name,
      values: bet.values, // Store the values for each type
    }));
  } catch (error) {
    console.error('Error fetching prediction types:', error);
    throw new Error('Failed to fetch prediction types.');
  }
};

/**
 * Fetches prediction values for a given prediction type.
 * @param {Object} predictionType The selected prediction type.
 * @returns {Array} An array of prediction values.
 */
export const fetchPredictionValues = (predictionType) => {
  if (!predictionType?.values) {
    return [];
  }

  return predictionType.values.map((value) => ({
    value: value.value,
    label: `${value.value} (${value.odd})`, // Include odds in the label
  }));
};


export const fetchFixtureStatistics = async (fixtureId, homeTeamId, awayTeamId, leagueId, season) => {
  try {
      const [headToHeadResponse, homeTeamStatsResponse, awayTeamStatsResponse, standingsResponse, injuriesResponse] = await Promise.all([
          fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=${homeTeamId}-${awayTeamId}`, {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                  'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
              },
          }),
          fetch(`https://api-football-v1.p.rapidapi.com/v3/teams/statistics?team=${homeTeamId}&league=${leagueId}&season=${season}`, {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                  'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
              },
          }),
          fetch(`https://api-football-v1.p.rapidapi.com/v3/teams/statistics?team=${awayTeamId}&league=${leagueId}&season=${season}`, {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                  'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
              },
          }),
          fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?league=${leagueId}&season=${season}`, {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                  'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
              },
          }),
          fetch(`https://api-football-v1.p.rapidapi.com/v3/injuries?team=${homeTeamId}&season=${season}`, {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                  'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
              },
          }),
      ]);

      const headToHead = await headToHeadResponse.json();
      const homeTeamStats = await homeTeamStatsResponse.json();
      const awayTeamStats = await awayTeamStatsResponse.json();
      const standings = await standingsResponse.json();
      const injuries = await injuriesResponse.json();

      return {
          headToHead: headToHead.response || [],
          homeTeamStats: homeTeamStats.response || {},
          awayTeamStats: awayTeamStats.response || {},
          standings: standings.response || [],
          injuries: injuries.response || [],
      };
  } catch (error) {
      console.error('Error fetching fixture statistics:', error);
      throw error;
  }
};
