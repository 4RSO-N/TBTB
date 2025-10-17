const axios = require('axios');

class TranslationHandler {
    constructor(configManager) {
        this.configManager = configManager;
        this.translationCache = new Map(); // Translation cache
        this.maxCacheSize = 1000;
        this.messageIdMap = new Map(); // Maps source message ID to translated message ID
        this.translationQueue = []; // Queue for rate limiting
        this.isProcessingQueue = false;
        this.rateLimitPerChannel = new Map(); // Track messages per channel
        this.maxMessagesPerMinute = 20; // Limit per channel
        
        this.stats = {
            totalTranslations: 0,
            cacheHits: 0,
            byLanguage: {},
            byChannel: {}
        };
        
        this.supportedLanguages = {
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
        
        // Clear cache every 24 hours
        setInterval(() => {
            console.log('Clearing translation cache...');
            this.translationCache.clear();
        }, 24 * 60 * 60 * 1000);
        
        // Clear rate limits every minute
        setInterval(() => {
            this.rateLimitPerChannel.clear();
        }, 60 * 1000);
        
        // Start queue processor
        this.startQueueProcessor();
    }
    
    // Start processing the translation queue
    startQueueProcessor() {
        setInterval(async () => {
            if (this.translationQueue.length > 0 && !this.isProcessingQueue) {
                this.isProcessingQueue = true;
                const task = this.translationQueue.shift();
                try {
                    await this.processMessage(task.message, task.channelConfig);
                } catch (error) {
                    console.error('Error processing queued message:', error.message);
                }
                this.isProcessingQueue = false;
            }
        }, 100); // Process every 100ms
    }
    
    // Check if channel has hit rate limit
    isRateLimited(channelId) {
        const count = this.rateLimitPerChannel.get(channelId) || 0;
        return count >= this.maxMessagesPerMinute;
    }
    
    // Increment rate limit counter
    incrementRateLimit(channelId) {
        const count = this.rateLimitPerChannel.get(channelId) || 0;
        this.rateLimitPerChannel.set(channelId, count + 1);
    }
    
    // Generate cache key for translations
    getCacheKey(text, sourceLang, targetLang) {
        return `${sourceLang}:${targetLang}:${text.toLowerCase().trim().substring(0, 200)}`;
    }
    
    // Add to cache with size limit
    addToCache(key, value) {
        if (this.translationCache.size >= this.maxCacheSize) {
            // Remove oldest entry (first entry in Map)
            const firstKey = this.translationCache.keys().next().value;
            this.translationCache.delete(firstKey);
        }
        this.translationCache.set(key, value);
    }
    
    // Get translation statistics
    getStats() {
        return {
            ...this.stats,
            cacheSize: this.translationCache.size,
            queueSize: this.translationQueue.length,
            cacheHitRate: this.stats.totalTranslations > 0 
                ? ((this.stats.cacheHits / this.stats.totalTranslations) * 100).toFixed(2) + '%'
                : '0%'
        };
    }

    async handleMessage(message) {
        // Ignore bot messages
        if (message.author.bot) return;

        // Check if bot is enabled for this guild
        if (!this.configManager.isBotEnabled(message.guild.id)) {
            console.log(`Bot is disabled for guild ${message.guild.name}`);
            return;
        }

        // Check if user is ignored
        if (this.configManager.isUserIgnored(message.guild.id, message.author.id)) {
            console.log(`User ${message.author.tag} is ignored, skipping translation`);
            return;
        }

        // Check if user has ignored role
        if (this.configManager.hasIgnoredRole(message.guild.id, message.member)) {
            console.log(`User ${message.author.tag} has ignored role, skipping translation`);
            return;
        }

        // Get translation channels for this guild
        const translationChannels = this.configManager.getTranslationChannels(message.guild.id);
        
        // Find if this message is from a monitored channel
        const channelConfig = translationChannels.find(
            config => config.sourceChannelId === message.channel.id && config.enabled
        );

        if (!channelConfig) {
            console.log(`No translation config found for channel ${message.channel.name}`);
            return;
        }

        // Check rate limiting
        if (this.isRateLimited(message.channel.id)) {
            console.log(`Channel ${message.channel.name} is rate limited, queueing message`);
            this.translationQueue.push({ message, channelConfig });
            return;
        }

        // Process message immediately
        await this.processMessage(message, channelConfig);
    }

    async processMessage(message, channelConfig) {
        // Increment rate limit counter
        this.incrementRateLimit(message.channel.id);

        // Update stats
        this.stats.byChannel[message.channel.id] = (this.stats.byChannel[message.channel.id] || 0) + 1;

        console.log(`Translating message from ${message.channel.name}: "${message.content}"`);

        try {
            // Handle text translation
            let translatedText = message.content;
            
            if (message.content && message.content.trim().length > 0) {
                const translation = await this.translateText(
                    message.content,
                    channelConfig.sourceLanguage || 'auto',
                    channelConfig.targetLanguage
                );
                
                // If translation failed or returned same text, use original message
                translatedText = (translation && translation.trim().length > 0) 
                    ? translation 
                    : message.content;
            }

            console.log(`Translation successful: "${translatedText}"`);
            
            // Send translated message via webhook with attachments
            await this.sendTranslatedMessage(
                message,
                translatedText,
                channelConfig.targetChannelId,
                channelConfig.targetLanguage,
                channelConfig.sourceLanguage
            );
        } catch (error) {
            console.error('Error handling message translation:', error.message);
        }
    }

    async translateText(text, sourceLanguage, targetLanguage, retryCount = 0) {
        if (!text || text.trim().length === 0) return null;

        // Check cache first
        const cacheKey = this.getCacheKey(text, sourceLanguage, targetLanguage);
        if (this.translationCache.has(cacheKey)) {
            console.log('Cache hit for translation');
            this.stats.cacheHits++;
            this.stats.totalTranslations++;
            return this.translationCache.get(cacheKey);
        }

        const sourceLangName = sourceLanguage === 'auto' 
            ? 'the detected language' 
            : this.getLanguageName(sourceLanguage);
        const targetLangName = this.getLanguageName(targetLanguage);

        try {
            const response = await axios.post('https://api.perplexity.ai/chat/completions', {
                model: 'sonar',
                messages: [
                    {
                        role: 'user',
                        content: `Translate this text from ${sourceLangName} to ${targetLangName}. Return ONLY the translation, nothing else. No explanations, no context, no formatting. Keep all emojis exactly as they are.\n\n${text}`
                    }
                ],
                max_tokens: 500,
                temperature: 0.1,
                return_citations: false,
                return_images: false,
                return_related_questions: false
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            let translatedText = response.data.choices[0].message.content.trim();
            
            // Clean up any extra formatting or explanations
            // If the response contains multiple lines, take only the first meaningful line
            const lines = translatedText.split('\n').filter(line => line.trim().length > 0);
            if (lines.length > 0) {
                // Remove markdown bold (**text**) but keep the text
                translatedText = lines[0].replace(/\*\*/g, '');
            }
            
            // Add to cache
            this.addToCache(cacheKey, translatedText);
            
            // Update stats
            this.stats.totalTranslations++;
            this.stats.byLanguage[targetLanguage] = (this.stats.byLanguage[targetLanguage] || 0) + 1;
            
            return translatedText;
        } catch (error) {
            console.error('Error translating text:', error.response?.data || error.message);
            
            // Retry logic with exponential backoff (up to 3 attempts)
            if (retryCount < 3) {
                const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
                console.log(`Retrying translation in ${delay}ms... (attempt ${retryCount + 1}/3)`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.translateText(text, sourceLanguage, targetLanguage, retryCount + 1);
            }
            
            throw error;
        }
    }

    async sendTranslatedMessage(originalMessage, translatedText, targetChannelId, targetLanguage, sourceLanguage) {
        try {
            const targetChannel = await originalMessage.guild.channels.fetch(targetChannelId);
            if (!targetChannel) {
                console.error(`Target channel ${targetChannelId} not found`);
                return;
            }

            // Check if this is a thread message
            let actualTargetChannel = targetChannel;
            if (originalMessage.channel.isThread()) {
                actualTargetChannel = await this.getOrCreateThread(
                    targetChannel,
                    originalMessage.channel,
                    originalMessage.guild.id
                );
            }

            // Get or create webhook for this channel
            let webhook = await this.getOrCreateWebhook(originalMessage.guild.id, actualTargetChannel.id);
            
            if (!webhook) {
                console.error('Failed to get or create webhook');
                return;
            }

            // Get webhook customization settings
            const showFlags = this.configManager.shouldShowFlags(originalMessage.guild.id);
            const showOriginal = this.configManager.shouldShowOriginal(originalMessage.guild.id);
            
            // Get language flag emoji
            const flagEmoji = this.getLanguageFlag(targetLanguage);
            
            // Prepare username with optional flag
            let username = originalMessage.author.displayName;
            if (showFlags && flagEmoji) {
                username = `${flagEmoji} ${username}`;
            }
            
            // Prepare content with optional original text
            let content = translatedText || '_(No text)_';
            if (showOriginal && originalMessage.content && originalMessage.content !== translatedText) {
                content = `${translatedText}\n||${originalMessage.content}||`;
            }

            // Prepare webhook payload
            const webhookData = {
                content: content,
                username: username,
                avatar_url: originalMessage.author.displayAvatarURL()
            };

            // Handle attachments
            if (originalMessage.attachments.size > 0) {
                const files = Array.from(originalMessage.attachments.values()).map(att => ({
                    attachment: att.url,
                    name: att.name
                }));
                webhookData.files = files;
            }

            // Handle replies
            if (originalMessage.reference && this.messageIdMap.has(originalMessage.reference.messageId)) {
                const translatedReplyId = this.messageIdMap.get(originalMessage.reference.messageId);
                webhookData.thread_id = actualTargetChannel.isThread() ? actualTargetChannel.id : undefined;
                // Note: Discord webhooks don't support reply references, but we can mention it
                const replyMention = `(↩️ replying to message)`;
                webhookData.content = `${replyMention}\n${webhookData.content}`;
            }

            // Send via webhook
            console.log(`Sending webhook to ${actualTargetChannel.name}...`);
            const response = await axios.post(webhook.url + '?wait=true', webhookData);
            const sentMessage = response.data;
            
            // Store message ID mapping for reply chains
            this.messageIdMap.set(originalMessage.id, sentMessage.id);
            
            console.log('Webhook sent successfully!');

            // Copy reactions from original message
            if (originalMessage.reactions.cache.size > 0) {
                try {
                    const translatedMsg = await actualTargetChannel.messages.fetch(sentMessage.id);
                    for (const reaction of originalMessage.reactions.cache.values()) {
                        try {
                            await translatedMsg.react(reaction.emoji);
                        } catch (err) {
                            console.log(`Couldn't copy reaction ${reaction.emoji.name}:`, err.message);
                        }
                    }
                } catch (err) {
                    console.log('Error copying reactions:', err.message);
                }
            }

        } catch (error) {
            console.error('Error sending translated message:', error.message);
            throw error;
        }
    }

    async getOrCreateThread(targetChannel, sourceThread, guildId) {
        try {
            // Check if we have a thread mapping stored
            const threadMap = this.configManager.getThreadMapping(guildId, sourceThread.id);
            
            if (threadMap) {
                try {
                    const thread = await targetChannel.threads.fetch(threadMap.targetThreadId);
                    if (thread) return thread;
                } catch (error) {
                    console.log('Mapped thread no longer exists:', error.message);
                }
            }

            // Create new thread in target channel
            const newThread = await targetChannel.threads.create({
                name: sourceThread.name,
                autoArchiveDuration: sourceThread.autoArchiveDuration,
                reason: 'Auto-created by Translator Bot for thread translation'
            });

            // Store thread mapping
            this.configManager.addThreadMapping(guildId, sourceThread.id, newThread.id);

            return newThread;
        } catch (error) {
            console.error('Error creating thread:', error.message);
            return targetChannel; // Fallback to main channel
        }
    }

    async getOrCreateWebhook(guildId, channelId) {
        try {
            // Check if we have a stored webhook
            let webhookData = this.configManager.getWebhook(guildId, channelId);
            
            if (webhookData) {
                // Verify webhook still exists
                try {
                    await axios.get(webhookData.url);
                    return webhookData;
                } catch (error) {
                    // Webhook doesn't exist anymore, remove from config
                    console.log('Webhook no longer exists, removing from config:', error.message);
                    this.configManager.removeWebhook(guildId, channelId);
                    webhookData = null;
                }
            }

            // Create new webhook if none exists or old one was invalid
            if (!webhookData) {
                console.log(`Creating new webhook for channel ${channelId}...`);
                const guild = await global.client?.guilds.fetch(guildId);
                const channel = await guild?.channels.fetch(channelId);
                
                if (!channel) {
                    throw new Error('Channel not found');
                }

                const webhook = await channel.createWebhook({
                    name: 'Translator Bot',
                    reason: 'Auto-created by Translator Bot for message translation'
                });

                webhookData = {
                    id: webhook.id,
                    token: webhook.token,
                    url: webhook.url,
                    channelId: channelId,
                    createdAt: new Date().toISOString()
                };

                // Store webhook data
                this.configManager.setWebhook(guildId, channelId, webhookData);
                console.log('Webhook created successfully!');
            }

            return webhookData;
        } catch (error) {
            console.error('Error getting or creating webhook:', error.message);
            return null;
        }
    }

    getLanguageName(code) {
        return this.supportedLanguages[code] || code.toUpperCase();
    }

    getSupportedLanguages() {
        return this.supportedLanguages;
    }

    isValidLanguageCode(code) {
        return code in this.supportedLanguages;
    }

    getLanguageFlag(code) {
        const flags = {
            'en': '🇬🇧', 'es': '🇪🇸', 'fr': '🇫🇷', 'de': '🇩🇪',
            'it': '🇮🇹', 'pt': '🇵🇹', 'ru': '🇷🇺', 'ja': '🇯🇵',
            'ko': '🇰🇷', 'zh': '🇨🇳', 'ar': '🇸🇦', 'hi': '🇮🇳',
            'nl': '🇳🇱', 'sv': '🇸🇪', 'no': '🇳🇴', 'da': '🇩🇰',
            'fi': '🇫🇮', 'pl': '🇵🇱', 'tr': '🇹🇷', 'cs': '🇨🇿',
            'sq': '🇦🇱'
        };
        return flags[code] || '';
    }
}

module.exports = TranslationHandler;