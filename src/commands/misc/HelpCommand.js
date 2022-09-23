const { Command } = require('@greencoast/discord.js-extended');
const { MessageEmbed } = require('discord.js');
const { MESSAGE_EMBED } = require('../../common/constants');

class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['h'],
      description: 'Display a help message with all the available commands.',
      emoji: ':question:',
      group: 'misc',
      guildOnly: true
    });
  }

  prepareFields() {
    return this.client.registry.groups.map((group) => {
      const listOfCommands = group.commands.reduce((text, command) => {
        return text.concat(`${command.emoji} **${this.client.prefix}${command.name}** - ${command.description}\n`);
      }, '');

      return { title: group.name, text: listOfCommands };
    });
  }

  run(message) {
    const fields = this.prepareFields();
    const embed = new MessageEmbed()
      .setTitle('Text-to-Speech Help Message')
      .setColor(MESSAGE_EMBED.color)
      .setThumbnail(MESSAGE_EMBED.helpThumbnail);

    for (const key in fields) {
      const field = fields[key];
      embed.addField(field.title, field.text);
    }

    embed.addField('Have you spotted a bug?', `This bot is a customized open source code bot. Please report any bugs immediately [**GitHub Issues Page**](${MESSAGE_EMBED.helpURL}).`);

    return message.channel.send(embed);
  }
}

module.exports = HelpCommand;
