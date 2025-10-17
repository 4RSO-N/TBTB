const fs = require('fs');
const path = require('path');

class ConfigManager {
    constructor() {
        this.configPath = path.join(__dirname, '../../config.json');
        this.config = this.loadConfig();
    }

    loadConfig() {
        try {
            if (fs.existsSync(this.configPath)) {
                const data = fs.readFileSync(this.configPath, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading config:', error);
        }
        
        // Return default config if file doesn't exist or has errors
        return this.getDefaultConfig();
    }

    getDefaultConfig() {
        return {
            guilds: {},
            version: "1.0.0"
        };
    }

    saveConfig() {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
            return true;
        } catch (error) {
            console.error('Error saving config:', error);
            return false;
        }
    }

    // Guild configuration methods
    getGuildConfig(guildId) {
        if (!this.config.guilds[guildId]) {
            this.config.guilds[guildId] = this.getDefaultGuildConfig();
        }
        return this.config.guilds[guildId];
    }

    getDefaultGuildConfig() {
        return {
            enabled: false,
            superusers: [],
            translationChannels: [],
            defaultTargetLanguage: 'en',
            webhooks: {},
            threadMappings: {},
            ignoredUsers: [],
            ignoredRoles: [],
            customWebhookSettings: {},
            showOriginal: false, // Show original text with translation
            webhookCustomization: {
                showFlags: false,
                customNames: {}
            }
        };
    }

    updateGuildConfig(guildId, updates) {
        const guildConfig = this.getGuildConfig(guildId);
        Object.assign(guildConfig, updates);
        this.config.guilds[guildId] = guildConfig;
        return this.saveConfig();
    }

    // Translation channel management
    addTranslationChannel(guildId, sourceChannelId, targetChannelId, targetLanguage = 'en', sourceLanguage = 'auto') {
        const guildConfig = this.getGuildConfig(guildId);
        
        // Remove existing config for this source channel if it exists
        guildConfig.translationChannels = guildConfig.translationChannels.filter(
            channel => channel.sourceChannelId !== sourceChannelId
        );

        // Add new translation config
        guildConfig.translationChannels.push({
            sourceChannelId,
            sourceLanguage,
            targetChannelId,
            targetLanguage,
            enabled: true,
            createdAt: new Date().toISOString()
        });

        this.config.guilds[guildId] = guildConfig;
        return this.saveConfig();
    }

    removeTranslationChannel(guildId, sourceChannelId) {
        const guildConfig = this.getGuildConfig(guildId);
        guildConfig.translationChannels = guildConfig.translationChannels.filter(
            channel => channel.sourceChannelId !== sourceChannelId
        );
        
        this.config.guilds[guildId] = guildConfig;
        return this.saveConfig();
    }

    getTranslationChannels(guildId) {
        const guildConfig = this.getGuildConfig(guildId);
        return guildConfig.translationChannels || [];
    }

    // Superuser management
    addSuperuser(guildId, userId) {
        const guildConfig = this.getGuildConfig(guildId);
        if (!guildConfig.superusers.includes(userId)) {
            guildConfig.superusers.push(userId);
            this.config.guilds[guildId] = guildConfig;
            return this.saveConfig();
        }
        return true;
    }

    removeSuperuser(guildId, userId) {
        const guildConfig = this.getGuildConfig(guildId);
        guildConfig.superusers = guildConfig.superusers.filter(id => id !== userId);
        this.config.guilds[guildId] = guildConfig;
        return this.saveConfig();
    }

    isSuperuser(guildId, userId) {
        const guildConfig = this.getGuildConfig(guildId);
        return guildConfig.superusers.includes(userId);
    }

    // Webhook management
    setWebhook(guildId, channelId, webhookData) {
        const guildConfig = this.getGuildConfig(guildId);
        if (!guildConfig.webhooks) {
            guildConfig.webhooks = {};
        }
        guildConfig.webhooks[channelId] = webhookData;
        this.config.guilds[guildId] = guildConfig;
        return this.saveConfig();
    }

    getWebhook(guildId, channelId) {
        const guildConfig = this.getGuildConfig(guildId);
        return guildConfig.webhooks?.[channelId] || null;
    }

    removeWebhook(guildId, channelId) {
        const guildConfig = this.getGuildConfig(guildId);
        if (guildConfig.webhooks && guildConfig.webhooks[channelId]) {
            delete guildConfig.webhooks[channelId];
            this.config.guilds[guildId] = guildConfig;
            return this.saveConfig();
        }
        return true;
    }

    // Language settings
    setDefaultLanguage(guildId, language) {
        return this.updateGuildConfig(guildId, { defaultTargetLanguage: language });
    }

    getDefaultLanguage(guildId) {
        const guildConfig = this.getGuildConfig(guildId);
        return guildConfig.defaultTargetLanguage || 'en';
    }

    // Bot enable/disable
    enableBot(guildId) {
        return this.updateGuildConfig(guildId, { enabled: true });
    }

    disableBot(guildId) {
        return this.updateGuildConfig(guildId, { enabled: false });
    }

    isBotEnabled(guildId) {
        const guildConfig = this.getGuildConfig(guildId);
        return guildConfig.enabled || false;
    }

    // Thread mapping methods
    addThreadMapping(guildId, sourceThreadId, targetThreadId) {
        const guildConfig = this.getGuildConfig(guildId);
        if (!guildConfig.threadMappings) {
            guildConfig.threadMappings = {};
        }
        guildConfig.threadMappings[sourceThreadId] = {
            targetThreadId,
            createdAt: Date.now()
        };
        return this.saveConfig();
    }

    getThreadMapping(guildId, sourceThreadId) {
        const guildConfig = this.getGuildConfig(guildId);
        return guildConfig.threadMappings?.[sourceThreadId] || null;
    }

    // Ignored users/roles methods
    addIgnoredUser(guildId, userId) {
        const guildConfig = this.getGuildConfig(guildId);
        if (!guildConfig.ignoredUsers) {
            guildConfig.ignoredUsers = [];
        }
        if (!guildConfig.ignoredUsers.includes(userId)) {
            guildConfig.ignoredUsers.push(userId);
            return this.saveConfig();
        }
        return true;
    }

    removeIgnoredUser(guildId, userId) {
        const guildConfig = this.getGuildConfig(guildId);
        if (guildConfig.ignoredUsers) {
            guildConfig.ignoredUsers = guildConfig.ignoredUsers.filter(id => id !== userId);
            return this.saveConfig();
        }
        return true;
    }

    isUserIgnored(guildId, userId) {
        const guildConfig = this.getGuildConfig(guildId);
        return guildConfig.ignoredUsers?.includes(userId) || false;
    }

    addIgnoredRole(guildId, roleId) {
        const guildConfig = this.getGuildConfig(guildId);
        if (!guildConfig.ignoredRoles) {
            guildConfig.ignoredRoles = [];
        }
        if (!guildConfig.ignoredRoles.includes(roleId)) {
            guildConfig.ignoredRoles.push(roleId);
            return this.saveConfig();
        }
        return true;
    }

    removeIgnoredRole(guildId, roleId) {
        const guildConfig = this.getGuildConfig(guildId);
        if (guildConfig.ignoredRoles) {
            guildConfig.ignoredRoles = guildConfig.ignoredRoles.filter(id => id !== roleId);
            return this.saveConfig();
        }
        return true;
    }

    hasIgnoredRole(guildId, member) {
        const guildConfig = this.getGuildConfig(guildId);
        if (!guildConfig.ignoredRoles || guildConfig.ignoredRoles.length === 0) {
            return false;
        }
        return member.roles.cache.some(role => guildConfig.ignoredRoles.includes(role.id));
    }

    // Translation format settings
    setShowOriginal(guildId, show) {
        const guildConfig = this.getGuildConfig(guildId);
        guildConfig.showOriginal = show;
        return this.saveConfig();
    }

    shouldShowOriginal(guildId) {
        const guildConfig = this.getGuildConfig(guildId);
        return guildConfig.showOriginal || false;
    }

    // Webhook customization
    setShowFlags(guildId, show) {
        const guildConfig = this.getGuildConfig(guildId);
        if (!guildConfig.webhookCustomization) {
            guildConfig.webhookCustomization = { showFlags: false, customNames: {} };
        }
        guildConfig.webhookCustomization.showFlags = show;
        return this.saveConfig();
    }

    shouldShowFlags(guildId) {
        const guildConfig = this.getGuildConfig(guildId);
        return guildConfig.webhookCustomization?.showFlags || false;
    }
}

module.exports = ConfigManager;