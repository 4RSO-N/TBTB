const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configure the translator bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('setup')
                .setDescription('Set up translation between channels')
                .addChannelOption(option =>
                    option
                        .setName('from')
                        .setDescription('Channel to read messages from')
                        .setRequired(true)
                )
                .addChannelOption(option =>
                    option
                        .setName('to')
                        .setDescription('Channel to send translations to')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('language')
                        .setDescription('Translate TO this language')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Albanian', value: 'sq' },
                            { name: 'Arabic', value: 'ar' },
                            { name: 'Chinese (Simplified)', value: 'zh' },
                            { name: 'Czech', value: 'cs' },
                            { name: 'Danish', value: 'da' },
                            { name: 'Dutch', value: 'nl' },
                            { name: 'English', value: 'en' },
                            { name: 'Finnish', value: 'fi' },
                            { name: 'French', value: 'fr' },
                            { name: 'German', value: 'de' },
                            { name: 'Hindi', value: 'hi' },
                            { name: 'Italian', value: 'it' },
                            { name: 'Japanese', value: 'ja' },
                            { name: 'Korean', value: 'ko' },
                            { name: 'Norwegian', value: 'no' },
                            { name: 'Polish', value: 'pl' },
                            { name: 'Portuguese', value: 'pt' },
                            { name: 'Russian', value: 'ru' },
                            { name: 'Spanish', value: 'es' },
                            { name: 'Swedish', value: 'sv' },
                            { name: 'Turkish', value: 'tr' }
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('from_language')
                        .setDescription('Source language (optional - auto-detects if not set)')
                        .setRequired(false)
                        .addChoices(
                            { name: 'Auto-detect', value: 'auto' },
                            { name: 'Albanian', value: 'sq' },
                            { name: 'Arabic', value: 'ar' },
                            { name: 'Chinese (Simplified)', value: 'zh' },
                            { name: 'Czech', value: 'cs' },
                            { name: 'Danish', value: 'da' },
                            { name: 'Dutch', value: 'nl' },
                            { name: 'English', value: 'en' },
                            { name: 'Finnish', value: 'fi' },
                            { name: 'French', value: 'fr' },
                            { name: 'German', value: 'de' },
                            { name: 'Hindi', value: 'hi' },
                            { name: 'Italian', value: 'it' },
                            { name: 'Japanese', value: 'ja' },
                            { name: 'Korean', value: 'ko' },
                            { name: 'Norwegian', value: 'no' },
                            { name: 'Polish', value: 'pl' },
                            { name: 'Portuguese', value: 'pt' },
                            { name: 'Russian', value: 'ru' },
                            { name: 'Spanish', value: 'es' },
                            { name: 'Swedish', value: 'sv' },
                            { name: 'Turkish', value: 'tr' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setup-bidirectional')
                .setDescription('Set up two-way translation between channels')
                .addChannelOption(option =>
                    option
                        .setName('channel1')
                        .setDescription('First channel')
                        .setRequired(true)
                )
                .addChannelOption(option =>
                    option
                        .setName('channel2')
                        .setDescription('Second channel')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('language1')
                        .setDescription('Language for channel 1')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Albanian', value: 'sq' },
                            { name: 'Arabic', value: 'ar' },
                            { name: 'Chinese (Simplified)', value: 'zh' },
                            { name: 'Czech', value: 'cs' },
                            { name: 'Danish', value: 'da' },
                            { name: 'Dutch', value: 'nl' },
                            { name: 'English', value: 'en' },
                            { name: 'Finnish', value: 'fi' },
                            { name: 'French', value: 'fr' },
                            { name: 'German', value: 'de' },
                            { name: 'Hindi', value: 'hi' },
                            { name: 'Italian', value: 'it' },
                            { name: 'Japanese', value: 'ja' },
                            { name: 'Korean', value: 'ko' },
                            { name: 'Norwegian', value: 'no' },
                            { name: 'Polish', value: 'pl' },
                            { name: 'Portuguese', value: 'pt' },
                            { name: 'Russian', value: 'ru' },
                            { name: 'Spanish', value: 'es' },
                            { name: 'Swedish', value: 'sv' },
                            { name: 'Turkish', value: 'tr' }
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('language2')
                        .setDescription('Language for channel 2')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Albanian', value: 'sq' },
                            { name: 'Arabic', value: 'ar' },
                            { name: 'Chinese (Simplified)', value: 'zh' },
                            { name: 'Czech', value: 'cs' },
                            { name: 'Danish', value: 'da' },
                            { name: 'Dutch', value: 'nl' },
                            { name: 'English', value: 'en' },
                            { name: 'Finnish', value: 'fi' },
                            { name: 'French', value: 'fr' },
                            { name: 'German', value: 'de' },
                            { name: 'Hindi', value: 'hi' },
                            { name: 'Italian', value: 'it' },
                            { name: 'Japanese', value: 'ja' },
                            { name: 'Korean', value: 'ko' },
                            { name: 'Norwegian', value: 'no' },
                            { name: 'Polish', value: 'pl' },
                            { name: 'Portuguese', value: 'pt' },
                            { name: 'Russian', value: 'ru' },
                            { name: 'Spanish', value: 'es' },
                            { name: 'Swedish', value: 'sv' },
                            { name: 'Turkish', value: 'tr' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove translation setup for a channel')
                .addChannelOption(option =>
                    option
                        .setName('from')
                        .setDescription('Stop translating from this channel')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List all configured translation channels')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('superuser')
                .setDescription('Add a user as superuser (Admins are automatically superusers)')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('User to add as superuser')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unsuperuser')
                .setDescription('Remove a user from superusers')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('User to remove from superusers')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('superusers')
                .setDescription('List all superusers')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('enable')
                .setDescription('Enable the translator bot for this server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('disable')
                .setDescription('Disable the translator bot for this server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Show bot configuration status')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('test')
                .setDescription('Test translation without setting up channels')
                .addStringOption(option =>
                    option
                        .setName('text')
                        .setDescription('Text to translate')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('language')
                        .setDescription('Target language')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Albanian', value: 'sq' },
                            { name: 'Arabic', value: 'ar' },
                            { name: 'Chinese (Simplified)', value: 'zh' },
                            { name: 'Czech', value: 'cs' },
                            { name: 'Danish', value: 'da' },
                            { name: 'Dutch', value: 'nl' },
                            { name: 'English', value: 'en' },
                            { name: 'Finnish', value: 'fi' },
                            { name: 'French', value: 'fr' },
                            { name: 'German', value: 'de' },
                            { name: 'Hindi', value: 'hi' },
                            { name: 'Italian', value: 'it' },
                            { name: 'Japanese', value: 'ja' },
                            { name: 'Korean', value: 'ko' },
                            { name: 'Norwegian', value: 'no' },
                            { name: 'Polish', value: 'pl' },
                            { name: 'Portuguese', value: 'pt' },
                            { name: 'Russian', value: 'ru' },
                            { name: 'Spanish', value: 'es' },
                            { name: 'Swedish', value: 'sv' },
                            { name: 'Turkish', value: 'tr' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stats')
                .setDescription('Show translation statistics')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ignore-user')
                .setDescription('Ignore or unignore a user from translation')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('User to ignore/unignore')
                        .setRequired(true)
                )
                .addBooleanOption(option =>
                    option
                        .setName('ignore')
                        .setDescription('True to ignore, false to unignore')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ignore-role')
                .setDescription('Ignore or unignore a role from translation')
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('Role to ignore/unignore')
                        .setRequired(true)
                )
                .addBooleanOption(option =>
                    option
                        .setName('ignore')
                        .setDescription('True to ignore, false to unignore')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('format')
                .setDescription('Configure translation format options')
                .addBooleanOption(option =>
                    option
                        .setName('show_original')
                        .setDescription('Show original text in spoilers')
                        .setRequired(false)
                )
                .addBooleanOption(option =>
                    option
                        .setName('show_flags')
                        .setDescription('Show language flag emojis in username')
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ignored-list')
                .setDescription('List all ignored users and roles')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Show help for all configuration commands (ephemeral)')
        ),

    async execute(interaction, configManager, translationHandler) {
        // Allow /config help for any user
        const requested = interaction.options.getSubcommand();
        if (requested !== 'help') {
            // Check permissions
            if (!this.hasPermission(interaction, configManager)) {
                return interaction.reply({
                    content: '❌ You need Administrator permissions to use this command. Administrators can optionally grant access to specific users via `/config superuser`.',
                    ephemeral: true
                });
            }
        }

        const subcommand = interaction.options.getSubcommand();

        // Defer reply for commands that might take longer (like list, superusers, test, and stats)
        if (['list', 'superusers', 'test', 'stats', 'setup-bidirectional', 'ignored-list'].includes(subcommand)) {
            await interaction.deferReply({ ephemeral: true });
        }

        try {
            switch (subcommand) {
                case 'setup':
                    await this.handleSetup(interaction, configManager);
                    break;
                case 'setup-bidirectional':
                    await this.handleBidirectionalSetup(interaction, configManager);
                    break;
                case 'remove':
                    await this.handleRemove(interaction, configManager);
                    break;
                case 'list':
                    await this.handleList(interaction, configManager);
                    break;
                case 'superuser':
                    await this.handleAddSuperuser(interaction, configManager);
                    break;
                case 'unsuperuser':
                    await this.handleRemoveSuperuser(interaction, configManager);
                    break;
                case 'superusers':
                    await this.handleListSuperusers(interaction, configManager);
                    break;
                case 'test':
                    await this.handleTest(interaction, translationHandler);
                    break;
                case 'stats':
                    await this.handleStats(interaction, translationHandler, configManager);
                    break;
                case 'ignore-user':
                    await this.handleIgnoreUser(interaction, configManager);
                    break;
                case 'ignore-role':
                    await this.handleIgnoreRole(interaction, configManager);
                    break;
                case 'format':
                    await this.handleFormat(interaction, configManager);
                    break;
                case 'ignored-list':
                    await this.handleIgnoredList(interaction, configManager);
                    break;
                case 'help':
                    await this.handleHelp(interaction);
                    break;
                case 'enable':
                    await this.handleEnable(interaction, configManager);
                    break;
                case 'disable':
                    await this.handleDisable(interaction, configManager);
                    break;
                case 'status':
                    await this.handleStatus(interaction, configManager);
                    break;
                default:
                    await interaction.reply({
                        content: '❌ Unknown subcommand.',
                        ephemeral: true
                    });
            }
        } catch (error) {
            console.error('Error executing config command:', error);
            await interaction.reply({
                content: '❌ An error occurred while executing the command.',
                ephemeral: true
            });
        }
    },

    hasPermission(interaction, configManager) {
        // Developer always has permission (highest priority)
        const developerId = process.env.DEVELOPER_ID;
        if (developerId && interaction.user.id === developerId) {
            return true;
        }

        // Administrators always have permission (automatically superusers)
        if (interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return true;
        }

        // Check if user is manually added as a superuser (for non-admin users)
        return configManager.isSuperuser(interaction.guild.id, interaction.user.id);
    },

    isDeveloper(userId) {
        const developerId = process.env.DEVELOPER_ID;
        return developerId && userId === developerId;
    },

    async handleSetup(interaction, configManager) {
        const sourceChannel = interaction.options.getChannel('from');
        const sourceLanguage = interaction.options.getString('from_language') || 'auto';
        const targetChannel = interaction.options.getChannel('to');
        const targetLanguage = interaction.options.getString('language');

        // Validate channels
        if (sourceChannel.id === targetChannel.id) {
            return interaction.reply({
                content: '❌ FROM and TO channels cannot be the same.',
                ephemeral: true
            });
        }

        if (!sourceChannel.isTextBased() || !targetChannel.isTextBased()) {
            return interaction.reply({
                content: '❌ Both channels must be text channels.',
                ephemeral: true
            });
        }

        // Validate languages
        if (sourceLanguage !== 'auto' && sourceLanguage === targetLanguage) {
            return interaction.reply({
                content: '❌ Source and target languages cannot be the same.',
                ephemeral: true
            });
        }

        // Add translation channel
        const success = configManager.addTranslationChannel(
            interaction.guild.id,
            sourceChannel.id,
            targetChannel.id,
            targetLanguage,
            sourceLanguage
        );

        if (success) {
            const sourceInfo = sourceLanguage === 'auto' 
                ? 'Auto-detect' 
                : this.getLanguageName(sourceLanguage);
            
            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('✅ Translation Setup Complete')
                .setDescription(`Messages from ${sourceChannel} will be translated and sent to ${targetChannel}`)
                .addFields(
                    { name: 'Source Channel', value: sourceChannel.toString(), inline: true },
                    { name: 'Source Language', value: sourceInfo, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'Target Channel', value: targetChannel.toString(), inline: true },
                    { name: 'Target Language', value: this.getLanguageName(targetLanguage), inline: true },
                    { name: '\u200B', value: '\u200B', inline: true }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({
                content: '❌ Failed to save configuration.',
                ephemeral: true
            });
        }
    },

    async handleRemove(interaction, configManager) {
        const sourceChannel = interaction.options.getChannel('from');

        const success = configManager.removeTranslationChannel(
            interaction.guild.id,
            sourceChannel.id
        );

        if (success) {
            await interaction.reply({
                content: `✅ Stopped translating from ${sourceChannel}`,
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: '❌ Failed to remove configuration.',
                ephemeral: true
            });
        }
    },

    async handleList(interaction, configManager) {
        const translationChannels = configManager.getTranslationChannels(interaction.guild.id);

        const replyMethod = interaction.deferred ? 'editReply' : 'reply';

        if (translationChannels.length === 0) {
            return interaction[replyMethod]({
                content: '📋 No translation channels configured.',
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('📋 Translation Channels')
            .setDescription('Currently configured translation setups:')
            .setTimestamp();

        for (const config of translationChannels) {
            try {
                const sourceChannel = await interaction.guild.channels.fetch(config.sourceChannelId);
                const targetChannel = await interaction.guild.channels.fetch(config.targetChannelId);
                
                const sourceLang = config.sourceLanguage === 'auto' || !config.sourceLanguage
                    ? 'Auto-detect'
                    : this.getLanguageName(config.sourceLanguage);
                
                embed.addFields({
                    name: `${sourceChannel?.name || 'Unknown'} → ${targetChannel?.name || 'Unknown'}`,
                    value: `From: **${sourceLang}**\nTo: **${this.getLanguageName(config.targetLanguage)}**\nStatus: ${config.enabled ? '✅ Enabled' : '❌ Disabled'}`,
                    inline: true
                });
            } catch (error) {
                console.log('Error fetching channel:', error.message);
                embed.addFields({
                    name: 'Invalid Configuration',
                    value: `Source: ${config.sourceChannelId}\nTarget: ${config.targetChannelId}\nLanguage: ${config.targetLanguage}`,
                    inline: true
                });
            }
        }

        await interaction[replyMethod]({ embeds: [embed], ephemeral: true });
    },

    async handleAddSuperuser(interaction, configManager) {
        const user = interaction.options.getUser('user');

        // Only administrators can manage superusers
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: '❌ Only administrators can manage superusers.',
                ephemeral: true
            });
        }

        // Check if user is already an admin
        const member = await interaction.guild.members.fetch(user.id);
        if (member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: `ℹ️ ${user.tag} is already an Administrator and has automatic superuser access.`,
                ephemeral: true
            });
        }
        
        configManager.addSuperuser(interaction.guild.id, user.id);
        await interaction.reply({
            content: `✅ Added ${user.tag} as a superuser. They can now configure the bot without Administrator permissions.`,
            ephemeral: true
        });
    },

    async handleRemoveSuperuser(interaction, configManager) {
        const user = interaction.options.getUser('user');

        // Only administrators can manage superusers
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: '❌ Only administrators can manage superusers.',
                ephemeral: true
            });
        }
        
        configManager.removeSuperuser(interaction.guild.id, user.id);
        await interaction.reply({
            content: `✅ Removed ${user.tag} from superusers.`,
            ephemeral: true
        });
    },

    async handleListSuperusers(interaction, configManager) {
        const replyMethod = interaction.deferred ? 'editReply' : 'reply';

        // Only administrators can manage superusers
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction[replyMethod]({
                content: '❌ Only administrators can manage superusers.',
                ephemeral: true
            });
        }

        const guildConfig = configManager.getGuildConfig(interaction.guild.id);
        const superusers = guildConfig.superusers || [];
        
        if (superusers.length === 0) {
            return interaction[replyMethod]({
                content: '📋 No superusers configured.',
                ephemeral: true
            });
        }

        const userList = [];
        for (const userId of superusers) {
            try {
                const user = await interaction.client.users.fetch(userId);
                userList.push(user.tag);
            } catch (error) {
                console.log('Error fetching user:', error.message);
                userList.push(`Unknown User (${userId})`);
            }
        }

        await interaction[replyMethod]({
            content: `📋 **Superusers:**\n${userList.join('\n')}`,
            ephemeral: true
        });
    },

    async handleEnable(interaction, configManager) {
        configManager.enableBot(interaction.guild.id);
        await interaction.reply({
            content: '✅ Translator bot enabled for this server.',
            ephemeral: true
        });
    },

    async handleDisable(interaction, configManager) {
        configManager.disableBot(interaction.guild.id);
        await interaction.reply({
            content: '❌ Translator bot disabled for this server.',
            ephemeral: true
        });
    },

    async handleStatus(interaction, configManager) {
        const guildConfig = configManager.getGuildConfig(interaction.guild.id);
        const translationChannels = configManager.getTranslationChannels(interaction.guild.id);

        const embed = new EmbedBuilder()
            .setColor(guildConfig.enabled ? 0x00FF00 : 0xFF0000)
            .setTitle('🤖 Bot Status')
            .addFields(
                { name: 'Status', value: guildConfig.enabled ? '✅ Enabled' : '❌ Disabled', inline: true },
                { name: 'Translation Channels', value: translationChannels.length.toString(), inline: true },
                { name: 'Superusers', value: (guildConfig.superusers || []).length.toString(), inline: true },
                { name: 'Default Language', value: this.getLanguageName(guildConfig.defaultTargetLanguage), inline: true }
            )
            .setTimestamp();

        // Add developer badge if user is the developer
        if (this.isDeveloper(interaction.user.id)) {
            embed.setFooter({ text: '👑 You are the bot developer' });
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },

    async handleHelp(interaction) {
        const helpText = `**TBTB Configuration Commands**\n\n` +
            `• /config setup from:#channel to:#channel language:<lang> [from_language:<lang>] - Set up one-way translation\n` +
            `• /config setup-bidirectional channel1:#channel channel2:#channel language1:<lang> language2:<lang> - Two-way translation\n` +
            `• /config remove from:#channel - Remove a translation setup\n` +
            `• /config list - List configured translation channels\n` +
            `• /config test text:<text> language:<lang> - Test translation\n` +
            `• /config stats - View translation statistics\n` +
            `• /config format [show_original:true/false] [show_flags:true/false] - Configure display options\n` +
            `• /config ignore-user @user ignore:true/false - Ignore/unignore a user\n` +
            `• /config ignore-role @role ignore:true/false - Ignore/unignore a role\n` +
            `• /config ignored-list - Show ignored users and roles\n` +
            `• /config superuser @user - Add a superuser (admins auto-allowed)\n` +
            `• /config unsuperuser @user - Remove a superuser\n` +
            `• /config superusers - List superusers\n` +
            `• /config enable /config disable - Enable or disable the bot for this server\n` +
            `• /config help - Show this help message (ephemeral)\n\n` +
            `Tip: Only administrators or superusers can run most commands. Use /config help anytime.`;

        // Reply ephemerally so only the invoking user sees it
        await interaction.reply({ content: helpText, ephemeral: true });
    },

    getLanguageName(code) {
        const languages = {
            'en': 'English',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'ja': 'Japanese',
            'ko': 'Korean',
            'zh': 'Chinese (Simplified)',
            'ar': 'Arabic',
            'hi': 'Hindi',
            'nl': 'Dutch',
            'sv': 'Swedish',
            'no': 'Norwegian',
            'da': 'Danish',
            'fi': 'Finnish',
            'pl': 'Polish',
            'tr': 'Turkish',
            'cs': 'Czech',
            'sq': 'Albanian'
        };
        return languages[code] || code.toUpperCase();
    },

    async handleTest(interaction, translationHandler) {
        const text = interaction.options.getString('text');
        const targetLanguage = interaction.options.getString('language');
        const replyMethod = interaction.deferred ? 'editReply' : 'reply';

        try {
            const translatedText = await translationHandler.translateText(
                text,
                'auto',
                targetLanguage
            );

            const languageName = this.getLanguageName(targetLanguage);
            
            await interaction[replyMethod]({
                content: `**Test Translation to ${languageName}:**\n\n` +
                        `📝 Original: \`${text}\`\n` +
                        `✨ Translated: \`${translatedText}\``,
                ephemeral: true
            });
        } catch (error) {
            await interaction[replyMethod]({
                content: `❌ Translation failed: ${error.message}`,
                ephemeral: true
            });
        }
    },

    async handleStats(interaction, translationHandler, configManager) {
        const replyMethod = interaction.deferred ? 'editReply' : 'reply';
        const stats = translationHandler.getStats();
        const guildId = interaction.guild.id;
        const translationChannels = configManager.getTranslationChannels(guildId);

        // Format language stats
        const languageStats = Object.entries(stats.byLanguage)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([code, count]) => `  • ${this.getLanguageName(code)}: ${count}`)
            .join('\n') || '  None yet';

        // Format channel stats
        const channelStats = Object.entries(stats.byChannel)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([channelId, count]) => `  • <#${channelId}>: ${count}`)
            .join('\n') || '  None yet';

        const statsMessage = `📊 **Translation Statistics**\n\n` +
            `**Overall:**\n` +
            `  • Total Translations: ${stats.totalTranslations}\n` +
            `  • Cache Hit Rate: ${stats.cacheHitRate}\n` +
            `  • Active Setups: ${translationChannels.length}\n\n` +
            `**Top Languages:**\n${languageStats}\n\n` +
            `**Most Active Channels:**\n${channelStats}`;

        await interaction[replyMethod]({
            content: statsMessage,
            ephemeral: true
        });
    },

    async handleBidirectionalSetup(interaction, configManager) {
        const channel1 = interaction.options.getChannel('channel1');
        const channel2 = interaction.options.getChannel('channel2');
        const language1 = interaction.options.getString('language1');
        const language2 = interaction.options.getString('language2');
        const replyMethod = interaction.deferred ? 'editReply' : 'reply';

        // Validate channels
        if (!channel1.isTextBased() || !channel2.isTextBased()) {
            return interaction[replyMethod]({
                content: '❌ Both channels must be text channels.',
                ephemeral: true
            });
        }

        if (channel1.id === channel2.id) {
            return interaction[replyMethod]({
                content: '❌ Please select two different channels.',
                ephemeral: true
            });
        }

        if (language1 === language2) {
            return interaction[replyMethod]({
                content: '❌ Languages must be different for bidirectional translation.',
                ephemeral: true
            });
        }

        // Set up both directions
        const success1 = configManager.addTranslationChannel(
            interaction.guild.id,
            channel1.id,
            channel2.id,
            language2, // Messages from channel1 go to channel2 in language2
            language1  // Source language is language1
        );

        const success2 = configManager.addTranslationChannel(
            interaction.guild.id,
            channel2.id,
            channel1.id,
            language1, // Messages from channel2 go to channel1 in language1
            language2  // Source language is language2
        );

        if (success1 && success2) {
            const lang1Name = this.getLanguageName(language1);
            const lang2Name = this.getLanguageName(language2);
            
            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('✅ Bidirectional Translation Setup Complete')
                .setDescription(`Two-way translation established between channels`)
                .addFields(
                    { name: `${channel1.name} → ${channel2.name}`, value: `${lang1Name} → ${lang2Name}`, inline: false },
                    { name: `${channel2.name} → ${channel1.name}`, value: `${lang2Name} → ${lang1Name}`, inline: false }
                )
                .setTimestamp();

            await interaction[replyMethod]({ embeds: [embed] });
        } else {
            await interaction[replyMethod]({
                content: '❌ Failed to set up bidirectional translation.',
                ephemeral: true
            });
        }
    },

    async handleIgnoreUser(interaction, configManager) {
        const user = interaction.options.getUser('user');
        const shouldIgnore = interaction.options.getBoolean('ignore');
        const guildId = interaction.guild.id;

        if (shouldIgnore) {
            configManager.addIgnoredUser(guildId, user.id);
            await interaction.reply({
                content: `✅ User ${user.tag} will now be ignored by the translator.`,
                ephemeral: true
            });
        } else {
            configManager.removeIgnoredUser(guildId, user.id);
            await interaction.reply({
                content: `✅ User ${user.tag} will no longer be ignored.`,
                ephemeral: true
            });
        }
    },

    async handleIgnoreRole(interaction, configManager) {
        const role = interaction.options.getRole('role');
        const shouldIgnore = interaction.options.getBoolean('ignore');
        const guildId = interaction.guild.id;

        if (shouldIgnore) {
            configManager.addIgnoredRole(guildId, role.id);
            await interaction.reply({
                content: `✅ Role ${role.name} will now be ignored by the translator.`,
                ephemeral: true
            });
        } else {
            configManager.removeIgnoredRole(guildId, role.id);
            await interaction.reply({
                content: `✅ Role ${role.name} will no longer be ignored.`,
                ephemeral: true
            });
        }
    },

    async handleFormat(interaction, configManager) {
        const showOriginal = interaction.options.getBoolean('show_original');
        const showFlags = interaction.options.getBoolean('show_flags');
        const guildId = interaction.guild.id;

        // If no options provided, show current settings
        if (showOriginal === null && showFlags === null) {
            const currentShowOriginal = configManager.shouldShowOriginal(guildId);
            const currentShowFlags = configManager.shouldShowFlags(guildId);
            
            await interaction.reply({
                content: `**Current Format Settings:**\n` +
                        `📝 Show Original: ${currentShowOriginal ? '✅ Enabled' : '❌ Disabled'}\n` +
                        `🚩 Show Flags: ${currentShowFlags ? '✅ Enabled' : '❌ Disabled'}\n\n` +
                        `Use the options to change these settings.`,
                ephemeral: true
            });
            return;
        }

        let updates = [];
        
        if (showOriginal !== null) {
            configManager.setShowOriginal(guildId, showOriginal);
            updates.push(`📝 Show Original: ${showOriginal ? '✅ Enabled' : '❌ Disabled'}`);
        }
        
        if (showFlags !== null) {
            configManager.setShowFlags(guildId, showFlags);
            updates.push(`🚩 Show Flags: ${showFlags ? '✅ Enabled' : '❌ Disabled'}`);
        }

        await interaction.reply({
            content: `✅ **Format Settings Updated:**\n${updates.join('\n')}`,
            ephemeral: true
        });
    },

    async handleIgnoredList(interaction, configManager) {
        const replyMethod = interaction.deferred ? 'editReply' : 'reply';
        const guildId = interaction.guild.id;
        const config = configManager.getGuildConfig(guildId);

        const ignoredUsers = config.ignoredUsers || [];
        const ignoredRoles = config.ignoredRoles || [];

        if (ignoredUsers.length === 0 && ignoredRoles.length === 0) {
            await interaction[replyMethod]({
                content: '✅ No users or roles are currently being ignored.',
                ephemeral: true
            });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(0xFFAA00)
            .setTitle('🚫 Ignored Users & Roles')
            .setTimestamp();

        if (ignoredUsers.length > 0) {
            const userList = ignoredUsers
                .map(userId => `  • <@${userId}>`)
                .join('\n');
            embed.addFields({ name: 'Ignored Users', value: userList, inline: false });
        }

        if (ignoredRoles.length > 0) {
            const roleList = ignoredRoles
                .map(roleId => `  • <@&${roleId}>`)
                .join('\n');
            embed.addFields({ name: 'Ignored Roles', value: roleList, inline: false });
        }

        await interaction[replyMethod]({ embeds: [embed] });
    }
};