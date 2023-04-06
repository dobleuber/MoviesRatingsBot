const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.Guilds, Intents.FLAGS.GuildMessages] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'movie') {
    const movieName = interaction.options.getString('name');
    try {
      const { title, rating } = await getTMDBRating(movieName);

      const reply = `**${title}**
TMDB: ${rating}%`;

      await interaction.reply(reply);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Hubo un error al buscar la calificación de la película. Por favor, inténtalo de nuevo.', ephemeral: true });
    }
  }
});

async function getTMDBRating(movieName) {
  const language = 'es';
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(movieName)}&language=${language}`);
  const data = await response.json();
  if (data.results.length === 0) throw new Error('No se encontró la película');
  const movieId = data.results[0].id;

  const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=${language}`);
  const detailsData = await movieDetails.json();
  return { title: detailsData.title, rating: detailsData.vote_average * 10 };
}

client.login(process.env.DISCORD_TOKEN);
