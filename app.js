
const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 

  client.user.setActivity(`Sentinel | >help`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.indexOf(process.env.PREFIX) !== 0) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "ping") {
    const m = await message.channel.send("Fetching Details...");
    m.edit(`:ping_pong: Your ping is **${m.createdTimestamp - message.createdTimestamp}ms**.`);
  }

  if(command === "help") {
    message.channel.send({embed: {
    color: 3447003,
    title: "Sentinel | Help",
    description: ":blue_book: _A list of commands within this bot!_",
    fields: [{
        name: ">help",
        value: "Lists all the commands"
      },
      {
        name: ">server",
        value: "List the server that Sentinel is currently playing"
      },
      {
        name: ">ping",
        value: "Tell you what your ping is towards this discord server"
      },
      {
        name: ">apply",
        value: "Shows whether if Sentinel are recruiting or not, with other information"
      },
      {
        name: ">list",
        value: "Lists all the players in Sentinel"
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "Made by StrenghtyPvP | 2018"
    }
  }
});
  }

  if(command === "list") {
    message.channel.send({embed: {
    color: 3447003,
    title: "Sentinel | Faction List",
    description: ":scroll: A list of people in Sentinel!",
    fields: [{
        name: "StrenghtyPvP",
        value: "Leader & EU"
      },
      {
        name: "supermanraa",
        value: "Leader & EU"
      },
      {
        name: "FlawlessCombos",
        value: "Co-Leader & EU"
      },
      {
        name: "SleepingGas",
        value: "Co-Leader & EU"
      },
	  {
        name: "Kaassoufle",
        value: "Co-Leader & EU"
      },
      {
        name: "rinus99",
        value: "Moderator & EU"
      },
      {
        name: "xCheatinq",
        value: "Moderator & EU"
      },
      {
        name: "Equirroh",
        value: "Moderator & EU"
      },
	  {
        name: "_ItzKanekiteng",
        value: "Member & EU"
      },
      {
        name: "TelluricFrost",
        value: "Member & NA"
      },
      {
        name: "NeedVoid",
        value: "Member & EST"
      },
      {
        name: "PunJa",
        value: "Moderator & EU"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Made by StrenghtyPvP | 2018"
    }
  }
});
  }
  
  if(command === "apply") {
    message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Checking Database...",
    description: ":heavy_check_mark: **Sentinel** is currently recruiting!",
    fields: [{
        name: "More information at",
        value: "#recruitment-info"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Made by StrenghtyPvP | 2018"
    }
  }
});
  }

	if (command === "purge") {
    if(!message.member.roles.some(r=>["ðŸ”± Co-Developer ðŸ”±", "â™› Leader", "â™• Co-Leader", "â™œ Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply("That doesn't seem like a valid number");
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply("You need to input a number between 1 and 99");
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send("There is an error trying to purge messages in this channel!");
		});
	}
});
 

client.login(process.env.BOT_TOKEN);
