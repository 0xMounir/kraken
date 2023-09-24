const { Client, Interaction } = require('discord.js');
const User = require('../../models/User');

const dailyAmount = 1000;

module.exports = {
  name: 'daily',
  description: 'Reçois une récompense.',
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: 'Cette commande ne peut être exécutée que dans un serveur.',
        ephemeral: true,
      });
    }

    try {
      await interaction.deferReply();

      const query = {
        userId: interaction.member.id,
      };

      let user = await User.findOne(query) || new User(query);
      let streak = user.daily ? user.daily.streak : 0;

      const lastUpdated = user.daily ? new Date(user.daily.timestamp) : new Date(0);
      const difference = (new Date() - lastUpdated) / (1000 * 60 * 60);

      if (difference < 24) {
        const nextUsage = new Date(lastUpdated);
        nextUsage.setHours(nextUsage.getHours() + 24);
        return interaction.editReply(`Tu peux utiliser la commande dans: \`${getRemainingTime(nextUsage)}\``);
      }

      if (difference < 48) streak += 1;
      else streak = 0;

      user.coins = (user.coins || 0) + dailyAmount;
      user.daily = {
        streak: streak,
        timestamp: new Date(),
      };

      await user.save();

      interaction.editReply(`Vous avez reçu ${dailyAmount} ! Votre nouveau solde est de ${user.coins}`);
    } catch (error) {
      console.log(`Erreur avec /daily: ${error}`);
    }
  },
};

function getRemainingTime(timeUntil) {
  const seconds = Math.abs((timeUntil - new Date()) / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${days > 0 ? `${days} jours, ` : ''}${hours > 0 ? `${hours} heures, ` : ''}${minutes > 0 ? `${minutes} minutes` : ''}`;
}
