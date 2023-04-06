const { SlashCommandBuilder } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('movie')
		.setDescription('Search for a movie and get its TMDB rating.')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('The title of the movie to search for.')
				.setRequired(true)),
	async execute(interaction) {
		const movieTitle = interaction.options.getString('title');
		const tmdbApiKey = process.env.TMDB_API_KEY; // Asegúrate de añadir la clave API de TMDB en tu archivo .env

		const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieTitle)}`;

		try {
			const searchResponse = await fetch(searchUrl);
			const searchData = await searchResponse.json();

			if (searchData.results.length === 0) {
				await interaction.reply('No se encontró ninguna película con ese título.');
				return;
			}

			const movie = searchData.results[0];
			const rating = movie.vote_average * 10;

			await interaction.reply(`***${movie.title}***\nTMDB ${rating}%`);

		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Hubo un error al buscar la película. Por favor, inténtalo de nuevo más tarde.', ephemeral: true });
		}
	},
};
