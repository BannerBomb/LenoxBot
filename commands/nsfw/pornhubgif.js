const LenoxCommand = require('../LenoxCommand.js');
const Discord = require('discord.js');

module.exports = class pornhubgifCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'pornhubgif',
			group: 'nsfw',
			memberName: 'pornhubgif',
			description: 'Searches for Pornhub gifs',
			format: 'pornhubgif {query}',
			aliases: [],
			examples: ['pornhubgif ass', 'pornhubgif tits'],
			clientpermissions: ['SEND_MESSAGES'],
			userpermissions: [],
			shortDescription: 'GIFS',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);
		const args = msg.content.split(' ').slice(1);

		if (!msg.channel.nsfw) return msg.channel.send(lang.pornhubgif_nsfw);
		if (!args.slice().length === 0) return msg.channel.send(lang.pornhubgif_type);
		if (args.slice() > 1) return msg.channel.send(lang.pornhubgif_error);
		const Pornsearch = require('pornsearch');

		try {
		/* eslint no-undef: 0 */
			const Searcher = await Pornsearch.search(args.slice().join(' ')).gifs();

			const result = Math.floor(Math.random() * Searcher.length);
			const url = Searcher[result - 1].url;

			const embed = new Discord.MessageEmbed()
				.setImage(url)
				.setColor('#ff0000')
				.setURL(url)
				.setAuthor(url);

			return msg.channel.send({
				embed: embed
			});
		} catch (error) {
			return msg.reply(lang.pornhubgif_couldfindnothing);
		}
	}
};
