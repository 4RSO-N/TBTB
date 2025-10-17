# TBTB - The Best Translator Bot 🌍# Discord Translator Bot



A powerful Discord bot that provides real-time automatic translation between channels using Perplexity AI. Supports 21 languages with smart caching, attachment/thread/reaction preservation, bidirectional translation, ignore lists, and comprehensive statistics.A powerful Discord bot that automatically translates messages between channels using Perplexity AI. Configure translation settings directly within Discord using slash commands.



![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)## Features

![Features](https://img.shields.io/badge/features-15%2F17-blue)

![Languages](https://img.shields.io/badge/languages-21-orange)- 🔄 **Automatic Translation**: Monitor messages in one channel and translate them to another

- 🌍 **20+ Languages**: Support for major world languages including English, Spanish, French, German, Japanese, Korean, Chinese, Arabic, and more

---- 🔧 **Discord Configuration**: Set up everything using Discord slash commands - no external configuration needed

- 🪝 **Webhook Integration**: Translated messages appear as webhooks preserving the original user's avatar and name

## ✨ Key Features- 👑 **Permission System**: Role-based permissions with superuser management

- ⚙️ **Flexible Setup**: Enable/disable the bot per server, configure multiple translation channels

- 🔄 **Bidirectional Translation** - Two-way automatic translation between channels

- 🌐 **21 Languages** - English, Spanish, French, German, Japanese, Chinese, Arabic, and more## Setup Instructions

- 💾 **Smart Caching** - 20-40% API cost reduction through intelligent caching

- 🔁 **Retry Logic** - Automatic retry with exponential backoff for reliability### 1. Prerequisites

- 📎 **Context Preservation** - Attachments, reactions, threads, and reply chains maintained

- ⚡ **Rate Limiting** - Built-in protection (20 msg/min per channel)- Node.js (v16 or higher)

- 🚫 **Ignore Lists** - Exclude specific users, roles, or bots- A Discord bot token

- 🎨 **Customizable Format** - Optional language flags and original text display- Perplexity AI API key

- 📊 **Statistics** - Monitor usage, cache performance, and popular languages

- 🔐 **Permission System** - Admin and superuser management### 2. Installation



---1. Clone or download this project

2. Install dependencies:

## 🚀 Quick Start   ```powershell

   npm install

### Prerequisites   ```

- Node.js 16+ installed

- Discord Bot Token3. Create a `.env` file based on `.env.example`:

- Perplexity API Key   ```powershell

   cp .env.example .env

### Installation   ```



1. **Clone the repository:**4. Edit the `.env` file with your credentials:

   ```bash   ```

   git clone https://github.com/4RSO-N/TBTB.git   DISCORD_TOKEN=your_discord_bot_token_here

   cd TBTB   PERPLEXITY_API_KEY=your_perplexity_api_key_here

   ```   ```



2. **Install dependencies:**### 3. Discord Bot Setup

   ```bash

   npm install1. Go to [Discord Developer Portal](https://discord.com/developers/applications)

   ```2. Create a new application and bot

3. Copy the bot token to your `.env` file

3. **Configure environment variables:**4. In the OAuth2 section, select:

   Create a `.env` file in the root directory:   - Scopes: `bot`, `applications.commands`

   ```env   - Bot Permissions: `Send Messages`, `Manage Webhooks`, `Read Message History`, `Use Slash Commands`

   DISCORD_TOKEN=your_discord_bot_token_here5. Invite the bot to your server using the generated URL

   PERPLEXITY_API_KEY=your_perplexity_api_key_here

   ```### 4. Running the Bot



4. **Start the bot:**```powershell

   ```bashnpm start

   npm start```

   ```

For development with auto-restart:

---```powershell

npm run dev

## 📋 Basic Usage```



### Test Translation## Usage

```

/config test text:"Hello world" language:Spanish### Initial Setup

```

**Note:** If you have Administrator permissions in Discord, you're automatically a superuser and can configure the bot!

### One-Way Translation Setup

```1. **Enable the bot** for your server:

/config setup from:#english to:#spanish language:Spanish   ```

```   /config enable

   ```

### Two-Way Translation Setup

```2. **Set up translation** from one channel to another:

/config setup-bidirectional channel1:#usa channel2:#mexico language1:English language2:Spanish   ```

```   /config setup source_channel:#general target_channel:#spanish language:Spanish

   ```

### Customize Appearance

```3. **(Optional) Grant access to non-admin users:**

/config format show_flags:true show_original:true   ```

```   /config superuser action:add user:@someone

   ```

### Ignore Users/Roles

```### Configuration Commands

/config ignore-user @BotAccount ignore:true

/config ignore-role @Moderators ignore:trueAll configuration is done through the `/config` command:

```

- `/config setup` - Set up translation between two channels

### View Statistics- `/config remove` - Remove translation setup for a channel

```- `/config list` - List all configured translation channels

/config stats- `/config superuser` - Manage superusers (add/remove/list)

```- `/config enable` - Enable the bot for this server

- `/config disable` - Disable the bot for this server

---- `/config status` - Show current bot configuration



## 🌍 Supported Languages (21)### Permissions



| Language | Code | Flag | Language | Code | Flag |- **Administrators**: Automatically have full superuser access - can use all configuration commands and manage superusers

|----------|------|------|----------|------|------|- **Superusers**: Non-admin users granted access by administrators - can use all configuration commands except superuser management

| Albanian | `sq` | 🇦🇱 | Italian | `it` | 🇮🇹 |- **Regular Users**: Cannot access configuration commands

| Arabic | `ar` | 🇸🇦 | Japanese | `ja` | 🇯🇵 |

| Chinese | `zh` | 🇨🇳 | Korean | `ko` | 🇰🇷 |### Supported Languages

| Czech | `cs` | 🇨🇿 | Norwegian | `no` | 🇳🇴 |

| Danish | `da` | 🇩🇰 | Polish | `pl` | 🇵🇱 |The bot supports translation to the following languages:

| Dutch | `nl` | 🇳🇱 | Portuguese | `pt` | 🇵🇹 |

| English | `en` | 🇬🇧 | Russian | `ru` | 🇷🇺 |- English (en)

| Finnish | `fi` | 🇫🇮 | Spanish | `es` | 🇪🇸 |- Spanish (es)

| French | `fr` | 🇫🇷 | Swedish | `sv` | 🇸🇪 |- French (fr)

| German | `de` | 🇩🇪 | Turkish | `tr` | 🇹🇷 |- German (de)

| Hindi | `hi` | 🇮🇳 | | | |- Italian (it)

- Portuguese (pt)

---- Russian (ru)

- Japanese (ja)

## 📚 Documentation- Korean (ko)

- Chinese Simplified (zh)

- **[FEATURES.md](./FEATURES.md)** - Detailed feature documentation with examples- Arabic (ar)

- **[COMMAND_REFERENCE.md](./COMMAND_REFERENCE.md)** - Complete command reference guide- Hindi (hi)

- **[TERMS_OF_SERVICE.md](./TERMS_OF_SERVICE.md)** - Terms of service- Dutch (nl)

- **[PRIVACY_POLICY.md](./PRIVACY_POLICY.md)** - Privacy policy- Swedish (sv)

- **[LEGAL.md](./LEGAL.md)** - Legal quick reference- Norwegian (no)

- Danish (da)

---- Finnish (fi)

- Polish (pl)

## 🎯 Use Cases- Turkish (tr)

- Czech (cs)

- **International Communities** - Bridge language gaps in global Discord servers

- **Customer Support** - Provide multilingual support channels## How It Works

- **Language Learning** - See messages in both original and translated forms

- **Gaming Communities** - Connect players from different regions1. **Message Monitoring**: The bot monitors configured source channels for new messages

- **Business Teams** - Collaborate across international offices2. **Translation**: When a message is posted, it's sent to Perplexity AI for translation

3. **Webhook Delivery**: The translated message is posted to the target channel via webhook

---4. **Formatting**: The translated message preserves the original user's avatar and name, with language indication



## 🛠️ Technical Stack## Configuration Storage



- **Discord.js** - Discord bot frameworkAll configuration is stored locally in a `config.json` file. This includes:

- **Perplexity AI API** - High-quality translation engine- Translation channel setups

- **Node.js** - Runtime environment- Superuser lists

- **In-memory caching** - Fast, efficient translation caching- Bot enable/disable status per server

- **File-based logging** - Comprehensive logging with rotation- Webhook information



---## Troubleshooting



## 📊 Performance Metrics### Bot not responding to slash commands

1. Make sure the bot has been invited with the `applications.commands` scope

- **Cache Hit Rate**: 20-40% for common phrases2. Check that slash commands are registered (should happen automatically on startup)

- **Rate Limit**: 20 messages/minute per channel

- **Cache Size**: 1,000 translations max### Translations not appearing

- **Cache Duration**: 24 hours1. Verify the bot is enabled: `/config status`

- **Retry Attempts**: 3 with exponential backoff2. Check that the translation channel is configured: `/config list`

- **Log Rotation**: 5MB per file, 3 files retained3. Ensure the bot has permissions in both source and target channels

4. Verify your Perplexity AI API key is valid

---

### Webhook errors

## 🔧 Configuration1. Make sure the bot has `Manage Webhooks` permission in the target channel

2. The bot will automatically create webhooks as needed

### Available Commands

## API Keys

**Setup & Management:**

- `/config setup` - One-way translationYou'll need a Perplexity AI API key. Get one from:

- `/config setup-bidirectional` - Two-way translation- [Perplexity AI](https://docs.perplexity.ai/docs/getting-started)

- `/config remove` - Remove setup

- `/config list` - List all setups## Contributing

- `/config enable/disable` - Enable/disable bot

- `/config status` - Show configurationFeel free to submit issues, feature requests, or pull requests to improve the bot!



**Customization:**## License

- `/config format` - Configure display options

- `/config ignore-user` - Ignore specific usersMIT License - see LICENSE file for details.
- `/config ignore-role` - Ignore specific roles
- `/config ignored-list` - View ignore lists

**Testing & Stats:**
- `/config test` - Test translations
- `/config stats` - View usage statistics

**Permissions:**
- `/config superuser` - Add superuser
- `/config unsuperuser` - Remove superuser
- `/config superusers` - List superusers

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -am 'Add feature'`
6. Push: `git push origin feature-name`
7. Create a Pull Request

---

## 📝 License

This project is private. All rights reserved.

---

## 📞 Support

- **Discord**: The best translator#4007
- **Issues**: Open an issue on GitHub
- **Documentation**: Check COMMAND_REFERENCE.md

---

## ⚠️ Important Notes

1. **API Keys**: Never commit `.env` file or expose your API keys
2. **Rate Limits**: Respect Discord and Perplexity API rate limits
3. **Permissions**: Bot requires appropriate channel permissions
4. **Privacy**: Review PRIVACY_POLICY.md for data handling details
5. **Terms**: Review TERMS_OF_SERVICE.md before deployment

---

## 🎉 Features Implemented

**Completed (15/17):**
✅ Translation caching  
✅ Attachment support  
✅ Reaction copying  
✅ Thread support  
✅ Reply chain preservation  
✅ Bidirectional setup  
✅ Test command  
✅ Statistics  
✅ Ignore users/roles  
✅ Error retry logic  
✅ Rate limiting  
✅ Logging system  
✅ Format customization  
✅ Environment validation  
✅ Albanian language support  

**Not Implemented (2):**
- Smart Message Filtering (excluded by design)
- Dynamic Token Limits (excluded by design)

**Future Additions:**
- Translation quality feedback system (👍/👎 reactions)

---

## 🔒 Security

- Environment variables for sensitive data
- No permanent message storage
- Automatic cache expiration
- Rate limiting protection
- Permission-based command access

---

## 📈 Roadmap

- [ ] Translation quality feedback
- [ ] Web dashboard for configuration
- [ ] Multi-server statistics
- [ ] Custom language detection
- [ ] Translation history export

---

**Made with ❤️ for the Discord community**

**Status:** Production Ready | **Version:** 1.0.0 | **Last Updated:** October 17, 2025
