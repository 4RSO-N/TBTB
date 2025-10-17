# Discord Translator Bot - Command Reference

## 🚀 Quick Start

### Basic Setup (One-Way Translation)
```
/config setup from:#english-channel to:#spanish-channel language:Spanish
```
This will translate all messages from `#english-channel` to Spanish in `#spanish-channel`.

### Bidirectional Setup (Two-Way Translation)
```
/config setup-bidirectional channel1:#english channel2:#spanish language1:English language2:Spanish
```
This creates automatic two-way translation between the channels.

---

## 📋 All Commands

### Translation Setup Commands

#### `/config setup`
Set up one-way translation between channels.

**Options:**
- `from` - Channel to read messages from (required)
- `to` - Channel to send translations to (required)
- `language` - Target language (required)
- `from_language` - Source language (optional, auto-detects if not set)

**Example:**
```
/config setup from:#general to:#general-es language:Spanish from_language:English
```

---

#### `/config setup-bidirectional`
Set up two-way translation between channels.

**Options:**
- `channel1` - First channel (required)
- `channel2` - Second channel (required)
- `language1` - Language for channel 1 (required)
- `language2` - Language for channel 2 (required)

**Example:**
```
/config setup-bidirectional channel1:#usa channel2:#mexico language1:English language2:Spanish
```

---

#### `/config remove`
Remove translation setup for a channel.

**Options:**
- `from` - Channel to stop translating from (required)

**Example:**
```
/config remove from:#general
```

---

#### `/config list`
List all configured translation channels for the server.

**Example:**
```
/config list
```

---

### Format & Customization Commands

#### `/config format`
Configure how translations appear.

**Options:**
- `show_original` - Show original text in spoilers (optional, true/false)
- `show_flags` - Show language flag emojis in username (optional, true/false)

**Examples:**
```
/config format show_original:true show_flags:true
/config format show_original:false
/config format  (shows current settings)
```

**Result:**
- With `show_original:true`: Translation text will include original message in spoiler tags
- With `show_flags:true`: Webhook username will include flag emoji (e.g., "🇬🇧 John")

---

### Ignore Settings Commands

#### `/config ignore-user`
Ignore or unignore a user from translation.

**Options:**
- `user` - User to ignore/unignore (required)
- `ignore` - True to ignore, false to unignore (required)

**Examples:**
```
/config ignore-user @BotAccount ignore:true
/config ignore-user @BotAccount ignore:false
```

---

#### `/config ignore-role`
Ignore or unignore a role from translation.

**Options:**
- `role` - Role to ignore/unignore (required)
- `ignore` - True to ignore, false to unignore (required)

**Examples:**
```
/config ignore-role @Moderators ignore:true
/config ignore-role @Moderators ignore:false
```

---

#### `/config ignored-list`
View all ignored users and roles.

**Example:**
```
/config ignored-list
```

---

### Testing & Statistics Commands

#### `/config test`
Test translation without setting up channels.

**Options:**
- `text` - Text to translate (required)
- `language` - Target language (required)

**Example:**
```
/config test text:"Hello, how are you?" language:Spanish
```

**Result:**
```
Test Translation to Spanish:

📝 Original: Hello, how are you?
✨ Translated: Hola, ¿cómo estás?
```

---

#### `/config stats`
View translation statistics for the server.

**Shows:**
- Total translations
- Cache hit rate
- Active translation setups
- Top 5 languages used
- Most active channels

**Example:**
```
/config stats
```

---

### Server Management Commands

#### `/config enable`
Enable the translator bot for the server.

**Example:**
```
/config enable
```

---

#### `/config disable`
Disable the translator bot for the server.

**Example:**
```
/config disable
```

---

#### `/config status`
Show bot configuration status and settings.

**Example:**
```
/config status
```

---

### User Permission Commands

#### `/config superuser`
Add a user as superuser (grants config access without admin permissions).

**Options:**
- `user` - User to add as superuser (required)

**Example:**
```
/config superuser @TrustedUser
```

**Note:** Administrators are automatically superusers.

---

#### `/config unsuperuser`
Remove a user from superusers.

**Options:**
- `user` - User to remove from superusers (required)

**Example:**
```
/config unsuperuser @TrustedUser
```

---

#### `/config superusers`
List all superusers in the server.

**Example:**
```
/config superusers
```

---

## 🌍 Supported Languages

| Language | Code | Flag |
|----------|------|------|
| Albanian | `sq` | 🇦🇱 |
| Arabic | `ar` | 🇸🇦 |
| Chinese (Simplified) | `zh` | 🇨🇳 |
| Czech | `cs` | 🇨🇿 |
| Danish | `da` | 🇩🇰 |
| Dutch | `nl` | 🇳🇱 |
| English | `en` | 🇬🇧 |
| Finnish | `fi` | 🇫🇮 |
| French | `fr` | 🇫🇷 |
| German | `de` | 🇩🇪 |
| Hindi | `hi` | 🇮🇳 |
| Italian | `it` | 🇮🇹 |
| Japanese | `ja` | 🇯🇵 |
| Korean | `ko` | 🇰🇷 |
| Norwegian | `no` | 🇳🇴 |
| Polish | `pl` | 🇵🇱 |
| Portuguese | `pt` | 🇵🇹 |
| Russian | `ru` | 🇷🇺 |
| Spanish | `es` | 🇪🇸 |
| Swedish | `sv` | 🇸🇪 |
| Turkish | `tr` | 🇹🇷 |

---

## 💡 Common Use Cases

### Use Case 1: International Community
**Scenario:** You have English and Spanish speaking communities.

**Setup:**
```
/config setup-bidirectional channel1:#english-chat channel2:#spanish-chat language1:English language2:Spanish
/config format show_flags:true
```

---

### Use Case 2: Support Channel
**Scenario:** Customer support in multiple languages, all translating to English.

**Setup:**
```
/config setup from:#support to:#support-en language:English
/config format show_original:true
```

---

### Use Case 3: Ignore Bot Spam
**Scenario:** Other bots are cluttering translations.

**Setup:**
```
/config ignore-user @MusicBot ignore:true
/config ignore-user @GameBot ignore:true
/config ignore-role @Bots ignore:true
```

---

### Use Case 4: Testing Before Deployment
**Scenario:** Test translations before setting up channels.

**Test:**
```
/config test text:"Welcome to our server!" language:French
/config test text:"¡Hola!" language:English
```

---

## ⚠️ Important Notes

1. **Permissions**: Only administrators and manually added superusers can use config commands.

2. **Rate Limits**: Each channel is limited to 20 translations per minute to prevent API overuse.

3. **Cache**: The bot caches up to 1,000 translations for 24 hours to reduce API costs.

4. **Threads**: Thread messages are automatically translated and posted in corresponding threads.

5. **Reactions**: All reactions are automatically copied from source to translated messages.

6. **Attachments**: Images and files are preserved in translated messages.

7. **Replies**: Reply chains are maintained in translations with proper message references.

---

## 🔧 Troubleshooting

### Translations Not Working?
1. Check if bot is enabled: `/config status`
2. Verify channel setup: `/config list`
3. Test translation: `/config test text:"test" language:Spanish`

### Bot Ignoring Messages?
1. Check ignored users: `/config ignored-list`
2. Verify rate limits haven't been hit (wait 1 minute)
3. Check bot permissions in channel

### Format Not Showing?
1. Verify format settings: `/config format`
2. Re-enable settings if needed: `/config format show_flags:true`

---

## 📊 Performance Tips

1. **Enable Flags**: Use `/config format show_flags:true` for visual distinction
2. **Show Original**: Use `/config format show_original:true` for verification
3. **Ignore Bots**: Prevent translation loops with `/config ignore-user`
4. **Monitor Stats**: Check `/config stats` regularly to track usage

---

Need more help? Check `FEATURES.md` for detailed feature documentation!
