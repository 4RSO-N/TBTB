require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const ConfigManager = require('./utils/configManager');
const TranslationHandler = require('./utils/translationHandler');

// Validate environment variables
function validateEnvironment() {
    const required = ['DISCORD_TOKEN', 'PERPLEXITY_API_KEY'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:');
        missing.forEach(key => console.error(`  - ${key}`));
        console.error('\nPlease add these to your .env file');
        process.exit(1);
    }
    
    // Validate token format
    if (process.env.DISCORD_TOKEN && !process.env.DISCORD_TOKEN.includes('.')) {
        console.error('❌ Invalid DISCORD_TOKEN format');
        process.exit(1);
    }
    
    console.log('✅ Environment variables validated');
}

validateEnvironment();

class TranslatorBot {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildMessageReactions
            ]
        });

        this.commands = new Collection();
        this.configManager = new ConfigManager();
        this.translationHandler = new TranslationHandler(this.configManager);
        
        // Make client globally available for webhook creation
        global.client = this.client;
        
        this.loadCommands();
        this.setupEventListeners();
    }

    loadCommands() {
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
                console.log(`Loaded command: ${command.data.name}`);
            } else {
                console.log(`Warning: Command at ${filePath} is missing required "data" or "execute" property.`);
            }
        }
    }

    setupEventListeners() {
        this.client.once('ready', () => {
            console.log(`✅ ${this.client.user.tag} is online and ready!`);
            this.registerSlashCommands();
        });

        this.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const command = this.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction, this.configManager, this.translationHandler);
            } catch (error) {
                console.error('Error executing command:', error);
                
                const errorMessage = 'There was an error while executing this command!';
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: errorMessage, ephemeral: true });
                } else {
                    await interaction.reply({ content: errorMessage, ephemeral: true });
                }
            }
        });

        this.client.on('messageCreate', async (message) => {
            // Handle message translation
            await this.translationHandler.handleMessage(message);
        });

        this.client.on('error', console.error);
    }

    async registerSlashCommands() {
        const commands = [];
        for (const command of this.commands.values()) {
            commands.push(command.data.toJSON());
        }

        const rest = new REST().setToken(process.env.DISCORD_TOKEN);

        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // Register commands globally
            const data = await rest.put(
                Routes.applicationCommands(this.client.user.id),
                { body: commands }
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error('Error registering slash commands:', error);
        }
    }

    async start() {
        try {
            await this.client.login(process.env.DISCORD_TOKEN);
        } catch (error) {
            console.error('Failed to start bot:', error);
            process.exit(1);
        }
    }
}

// Start the bot
const bot = new TranslatorBot();
bot.start();

module.exports = TranslatorBot;