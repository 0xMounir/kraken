const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const User = require('../../models/User');

module.exports = {
      /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()){
        interaction.reply({
            content: 'Cette commande ne peut être exécutée que dans un serveur.',
            ephemeral: true,
          });
          return;
        }

        const targetUserId = interaction.options.get('utilisateur')?.value || interaction.member.id;

        await interaction.deferReply();

        const user = await User.findOne({ userId: targetUserId });

        if (!user){
            interaction.editReply(`<@${targetUserId}> n'a pas encore de profil.`);
            return;
        }

        interaction.editReply(
            targetUserId === interaction.member.id
            ? `Ton solde est: **${user.balance}**`
            : `Le solde de <@${targetUserId}> est: **${user.balance}**`
        );
        return;
    },

  name: 'balance',
  description: 'Affiche le solde d\'un membre.',
  options: [
    {
        name: 'utilisateur',
        description: 'l\'utilisateur que tu veux afficher son solde.',
        type: ApplicationCommandOptionType.User,
    }
  ]
};