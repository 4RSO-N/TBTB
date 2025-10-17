const ConfigManager = require('./configManager');

class PermissionHelper {
    constructor() {
        this.configManager = new ConfigManager();
    }

    /**
     * Check if a user has permission to use configuration commands
     * @param {object} member - Discord member object
     * @param {string} guildId - Guild ID
     * @returns {boolean}
     */
    hasConfigPermission(member, guildId) {
        // Check if user has Administrator permissions
        if (member.permissions.has('Administrator')) {
            return true;
        }

        // Check if user is a superuser
        return this.configManager.isSuperuser(guildId, member.id);
    }

    /**
     * Check if a user can manage superusers (only administrators)
     * @param {object} member - Discord member object
     * @returns {boolean}
     */
    canManageSuperusers(member) {
        return member.permissions.has('Administrator');
    }

    /**
     * Get a formatted list of all guild configurations
     * @returns {object}
     */
    getAllGuildConfigs() {
        return this.configManager.config.guilds;
    }

    /**
     * Get bot statistics across all guilds
     * @returns {object}
     */
    getBotStats() {
        const guilds = this.configManager.config.guilds;
        const stats = {
            totalGuilds: Object.keys(guilds).length,
            enabledGuilds: 0,
            totalTranslationChannels: 0,
            totalSuperusers: 0,
            languageUsage: {}
        };

        for (const guildId in guilds) {
            const guildConfig = guilds[guildId];
            
            if (guildConfig.enabled) {
                stats.enabledGuilds++;
            }

            stats.totalTranslationChannels += (guildConfig.translationChannels || []).length;
            stats.totalSuperusers += (guildConfig.superusers || []).length;

            // Count language usage
            for (const channel of (guildConfig.translationChannels || [])) {
                const lang = channel.targetLanguage;
                stats.languageUsage[lang] = (stats.languageUsage[lang] || 0) + 1;
            }
        }

        return stats;
    }

    /**
     * Cleanup invalid configurations (channels that no longer exist)
     * @param {object} client - Discord client
     * @returns {Promise<object>}
     */
    async cleanupInvalidConfigs(client) {
        const guilds = this.configManager.config.guilds;
        const cleanup = {
            removedChannels: 0,
            removedWebhooks: 0,
            errors: []
        };

        for (const guildId in guilds) {
            try {
                const guild = await client.guilds.fetch(guildId);
                const guildConfig = guilds[guildId];
                
                // Check translation channels
                const validChannels = [];
                for (const channelConfig of (guildConfig.translationChannels || [])) {
                    try {
                        await guild.channels.fetch(channelConfig.sourceChannelId);
                        await guild.channels.fetch(channelConfig.targetChannelId);
                        validChannels.push(channelConfig);
                    } catch (error) {
                        cleanup.removedChannels++;
                        console.log(`Removed invalid channel config: ${channelConfig.sourceChannelId} -> ${channelConfig.targetChannelId}`, error.message);
                    }
                }
                guildConfig.translationChannels = validChannels;

                // Check webhooks
                const validWebhooks = {};
                for (const channelId in (guildConfig.webhooks || {})) {
                    try {
                        await guild.channels.fetch(channelId);
                        validWebhooks[channelId] = guildConfig.webhooks[channelId];
                    } catch (error) {
                        cleanup.removedWebhooks++;
                        console.log(`Removed invalid webhook for channel: ${channelId}`, error.message);
                    }
                }
                guildConfig.webhooks = validWebhooks;

            } catch (error) {
                cleanup.errors.push({
                    guildId,
                    error: error.message
                });
            }
        }

        // Save cleaned configuration
        this.configManager.saveConfig();
        return cleanup;
    }

    /**
     * Export configuration for backup
     * @returns {string}
     */
    exportConfig() {
        return JSON.stringify(this.configManager.config, null, 2);
    }

    /**
     * Import configuration from backup
     * @param {string} configData - JSON string of configuration
     * @returns {boolean}
     */
    importConfig(configData) {
        try {
            const config = JSON.parse(configData);
            this.configManager.config = config;
            return this.configManager.saveConfig();
        } catch (error) {
            console.error('Error importing config:', error);
            return false;
        }
    }
}

module.exports = PermissionHelper;