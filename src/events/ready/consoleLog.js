const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log(`😄 ${client.user.username} est en ligne !`);

    client.user.setActivity({
        name: 'dev: 0xMounir',
        type: ActivityType.Watching,
    });
};