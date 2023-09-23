const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
require("dotenv").config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`😄 ${c.user.username} est en ligne !`);

    client.user.setActivity({
        name: '0xMounir',
        type: ActivityType.Watching,
    });
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "hello") {
        interaction.reply('World !');
    }

    if (interaction.commandName === "ping") {
        interaction.reply('Pong !');
    }
    if (interaction.commandName === "add") {
        const num1 = interaction.options.get('premier-nombre').value;
        const num2 = interaction.options.get('deuxieme-nombre').value;
        let avatar = interaction.user.displayAvatarURL({ size: 1024, dynamic: true });

        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Addition')
        .setDescription('Calculs')
        .setThumbnail(avatar)
        .addFields(
            { name: 'TOTAL:', value: `${num1 + num2}` },
        )
        interaction.reply({ embeds: [embed] });
    }
});
// client.on('messageCreate', (message) => {
//     if(message.author.bot){
//         return;
//     }

//     if(message.content === "!test"){
//         message.reply("Welcome !");
//     }
// });


client.login(process.env.TOKEN);