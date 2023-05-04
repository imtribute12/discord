// Require the necessary discord.js classes
require("dotenv").config();
const token = process.env.DISCORD_TOKEN;

const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageReaction,
} = require("discord.js");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

//if anybody wriites anything in the chat it will reply with the same message
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.author.id === "195239730428903426") {
    message.reply("SİSKO SUS");
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.author.id === "168290436971102208") {
    message.reply("LUTFU SUPER BİRİ");
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.author.id === "407221696865763330") {
    message.reply("KONUS KRALICE KONUS");
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.author.id === "262989865447063574") {
    message.reply("aglama");
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.author.id === "211481492772093952") {
    message.reply("ADAMIN MISIN MÜBAREK");
  }
});

//?
client.on(Events.VoiceStateUpdate, (oldState, newState) => {
  console.log(oldState);
  console.log(newState);
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
