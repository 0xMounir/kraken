const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  /**
   * Callback de la commande !balance
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: 'Cette commande ne peut être exécutée que dans un serveur.',
        ephemeral: true,
      });
      return;
    }

    const targetUserId = interaction.options.get('utilisateur')?.value || interaction.member.id;
    await interaction.deferReply();
    const user = await User.findOne({ userId: targetUserId });

    if (!user) {
      interaction.editReply(`<@${targetUserId}> n'a pas encore de profil.`);
      return;
    }

    interaction.editReply(
      targetUserId === interaction.member.id
        ? `Ton solde est : **${user.coins}**`
        : `Le solde de <@${targetUserId}> est : **${user.coins}**`
    );
    return;
  },

  name: 'coins',
  description: 'Affiche les coins d\'un membre.',
  options: [
    {
      name: 'utilisateur',
      description: 'L\'utilisateur dont vous voulez afficher les coins.',
      type: ApplicationCommandOptionType.User,
    },
  ],
};
