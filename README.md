# Movie Ratings Bot for Discord

Movie Ratings Bot is a simple Discord bot that allows users to search for a movie by its title and fetches its rating from The Movie Database (TMDB). The bot is designed to search for movies in Spanish and provide the best match even if the movie title is not exact.

## Prerequisites

Before you begin, ensure you have the following installed:

* Node.js
* npm (included with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your_username/movie-ratings-bot.git
cd movie-ratings-bot
```

2. Install the dependencies:
```bash
npm install
```

3. Create a .env file in the project root directory with the following contents:
```bash
Copy code
DISCORD_TOKEN=your_discord_token
TMDB_API_KEY=your_tmdb_api_key
```
  Replace your_discord_token with your Discord bot token and your_tmdb_api_key with your TMDB API key.

4. Register the /movie command on your Discord server by replacing YOUR_CLIENT_ID and YOUR_GUILD_ID in the register-command.js file and then running:
```bash
node register-command.js
```

5. Start the bot:
```bash
node index.js
```

The bot should now be running and responding to the /movie command in your Discord server.

## Usage
To use the bot, simply type /movie followed by the movie title in a text channel on your Discord server. The bot will search for the movie and return its rating from TMDB.

Example:

```bash
/movie Matrix
```
The bot will reply with the rating:

```makefile
Copy code
**Matrix**
TMDB: 87%
```
## License

This project is licensed under the MIT License. See the LICENSE file for details.
