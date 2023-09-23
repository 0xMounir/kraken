require("dotenv").config();
const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });
        console.log("Connecté à la DB.");
        
        eventHandler(client);
    } catch (error) {
        console.log(`Erreur: ${error}`);
    }
})();

client.login(process.env.TOKEN);