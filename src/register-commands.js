const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require("dotenv").config();


const commands = [
    {
        name: 'hello',
        description: 'Replies with World !'
    },
    {
        name: 'ping',
        description: 'Pong !'
    },
    {
        name: 'add',
        description: 'Aditionne deux nombres !',
        options: [
            {
                name: 'premier-nombre',
                description: 'le premier nombre',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: 'deuxieme-nombre',
                description: 'le deuxième nombre',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Slash commands en cours de chargement...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body : commands }
        )

        console.log('Slash commands chargé avec succès !');
    } catch (error) {
        console.log(`Y a une erreur: ${error}`);
    }
})();