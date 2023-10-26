require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({intents: 1537});
// const sub = require('date-fns/sub');
// const snowflake = require('./node_modules/date-to-discord-snowflake');

const ROLES_LIST = process.env.ROLES_TO_BUBBLE.split(',');
const TARGET_POSITION = Number(process.env.BUBBLE_POSITION);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  message.guild.members.fetch(message.author)
  .then(member => {
    const roleToBubble = member.roles.cache.find(role => {
      return ROLES_LIST.indexOf(role.id) !== -1;
    });
    if (roleToBubble) {
      if (!roleToBubble.hoist) roleToBubble.setHoist(true);
      roleToBubble.setPosition(TARGET_POSITION);
    };
  });
});

client.login(process.env.DISCORD_TOKEN);
