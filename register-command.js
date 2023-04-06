const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();

const clientId = process.env.BOT_CLIENT_ID;
const guildId = process.env.YOUR_GUILD_ID;

const commands = [
  {
    name: 'movie',
    description: 'Obtener la calificación de una película en TMDB',
    options: [
      {
        name: 'name',
        type: 'STRING',
        description: 'Nombre de la película',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Comando registrado con éxito.');
  } catch (error) {
    console.error('Error al registrar el comando:', error);
  }
})();
