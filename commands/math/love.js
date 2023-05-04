//make a love meter command that will reply with a random number between 0-100 and a message according to the number with module.commander

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("love")
    .setDescription(
      "Replies with a random number between 0-100 and a message according to the number."
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to calculate the love for.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user2")
        .setDescription("The second user to calculate the love for.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const user2 = interaction.options.getUser("user2");
    //random number between 0-100
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const love = randomInt(0, 100);
    const heart = "❤️";

    //if 10 = 1 heart, 20 = 2 hearts, 30 = 3 hearts, 40 = 4 hearts, 50 = 5 hearts, 60 = 6 hearts, 70 = 7 hearts, 80 = 8 hearts, 90 = 9 hearts, 100 = 10 hearts
    //make grey hearts in 10 - love and red hearts in love
    const embed = {
      color: 0x0099ff,
      image: {
        url: "https://gmag.com.tr/wp-content/uploads/2020/12/16636E9E-40C9-47D1-A6F1-34656445F195.jpeg",
      },

      title: `Love meter for ${user.username} and ${user2.username}`,
      description: `${heart.repeat(love / 10)}${"🤍".repeat(10 - love / 10)}`,

      fields: [
        {
          name: "Love percentage",
          value: `${love}%`,
          inline: true,
        },
      ],
    };
    await interaction.reply({ embeds: [embed] });
  },
};
