const Command = require('../structures/Command'),
    {MessageEmbed, CommandInteraction, SelectMenuInteraction, Message, MessageActionRow, MessageButton, MessageSelectMenu, ButtonStyle } = require('discord.js');

/**
 * Set the command here, it's what we'll type in the message
 * @type {string}
 */
exports.name = 'hey';


/**
 * Set the description here, this is what will show up when you need help for the command
 * @type {string}
 */
exports.description = 'Hey!';


/**
 * Set the command arguments here, this is what will show up when you type the command
 * @type {Command.commandArgs[]}
 */
exports.args = [
    {
        name: 'questions',
        description: 'Some questions the bot will you ask',
        type: 'string',
        required: false,
        choices: [
            {
                name: 'Question 1',
                value: 'How are you?'
            },
            {
                name: 'Question 2',
                value: 'How ya doin?'
            }
        ]
    }
];

/**
 * Set the usage here, this is what will show up when you type the command
 * This part is executed as slash command
 * @param {CommandInteraction} interaction
 * @param {Command[]} commands
 */
exports.execute = async (interaction, commands) => {
    let question = interaction.options.getString('questions');

    // create 2 interaction rows (button or select menus)
    const interactionComponentRows = [];
    for (let i = 0; i < 2; i++) {
        interactionComponentRows.push(new MessageActionRow());
    }

    // Add 2 button to the message in the first row
    interactionComponentRows[0].addComponents(
        new MessageButton()
            .setCustomId(this.name+'_'+'button-primary')
            .setLabel('Primary button')
            .setStyle(ButtonStyle.Primary)
    );
    interactionComponentRows[0].addComponents(
        new MessageButton()
            .setURL('https://greep.gq')
            .setLabel('Link to a web page')
            .setStyle(ButtonStyle.Link)
    );

    // adds a select menu to the message in the second row
    interactionComponentRows[1].addComponents(
        new MessageSelectMenu()
            .setCustomId(this.name+'_'+'select-category')
            .setPlaceholder('Select here')
            .addOptions([
                {
                    name: 'Category 1',
                    description: 'Description of category 1',
                    value: 'category-1'
                },
                {
                    name: 'Category 2',
                    description: 'Description of category 2',
                    value: 'category-2'
                }
            ])
    );

    interaction.reply({
        content: 'hey! ' + question,
        components: interactionComponentRows
    });
};

/**
 * This method is executed when an a button is clicked in the message
 * @param {ButtonInteraction} interaction
 * @param {string} buttonId
 * @param {string} argument
 * @param {Command[]} commands
 */
exports.executeButton = async (interaction, buttonId, argument, commands) => {
    if (buttonId == 'button-primary') {
        interaction.update('Button primary!');
    }
};

/**
 * This method is executed when an update is made in a selectMenu
 * @param {SelectMenuInteraction} interaction
 * @param {string} categoryId
 * @param {string} argument
 * @param {Command[]} commands
 */
exports.executeSelectMenu = async (interaction, categoryId, argument, commands) => {
    if (categoryId === 'questions') {
        interaction.update('hey! ' + interaction.values[0]);
    }
};

/**
 * This method is executed when a modal dialog is submitted
 * @param {ModalSubmitInteraction} interaction
 * @param {string} modalId
 * @param {string} argument
 * @param {Command[]} commands
 */
exports.executeModal = async (interaction, modalId, argument, commands) => {
    if (modalId === 'modaltest') {
        interaction.update('hey! ' + interaction.values[0]);
    }
};