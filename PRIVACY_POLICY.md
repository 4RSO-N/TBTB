# Privacy Policy - TBTB (The Best Translator Bot)

**Last Updated: October 17, 2025**

## 1. Introduction

This Privacy Policy explains how TBTB (The Best Translator Bot) ("we", "us", "the Bot") collects, uses, stores, and protects information when you use our Discord bot translation services. We are committed to protecting your privacy and being transparent about our data practices.

By using TBTB, you consent to the data practices described in this policy.

## 2. Information We Collect

### 2.1 Message Content
- **What**: Text content of messages in channels where the Bot is configured
- **Why**: To provide translation services
- **How Long**: Temporarily processed, cached for up to 24 hours, then automatically deleted
- **Storage**: In-memory cache only, not permanently stored

### 2.2 Message Metadata
- **Message IDs**: Used to link translations and preserve reply chains
- **Channel IDs**: Identify source and destination channels for translation
- **User IDs**: Track ignored users and identify message authors
- **Timestamps**: Used for cache expiration and statistics
- **Attachment URLs**: Preserved to include files/images in translations
- **Storage**: Temporarily stored, cleared periodically

### 2.3 Server Configuration Data
- **Guild (Server) ID**: Identifies your Discord server
- **Translation Channel Pairs**: Which channels translate to which languages
- **Ignored Users/Roles**: List of user IDs and role IDs to exclude from translation
- **Format Settings**: Display preferences (show original, show flags)
- **Superuser List**: Non-admin users granted configuration access
- **Storage**: Stored in `config.json` file on the Bot's server

### 2.4 Usage Statistics
- **Translation Counts**: Number of translations performed
- **Language Pairs**: Which language combinations are used most
- **Channel Activity**: Which channels have the most translations
- **Cache Performance**: Cache hit/miss rates
- **Storage**: Aggregated statistics stored in memory, reset on restart

### 2.5 Log Data
- **Bot Events**: Start/stop, errors, warnings
- **Command Usage**: Which commands are executed (but not command content)
- **API Interactions**: Requests to Perplexity AI (status, errors)
- **Storage**: Stored in log files for up to 3 rotation cycles (approximately 15MB total)

## 3. What We Do NOT Collect

We do NOT collect or store:
- ❌ Passwords or authentication tokens (except the Bot's own token)
- ❌ Private/Direct messages (Bot only works in configured channels)
- ❌ Payment information
- ❌ Email addresses or contact information
- ❌ IP addresses or device information
- ❌ Browsing history or activity outside Discord
- ❌ Personal demographic information
- ❌ Message content permanently (only temporarily for translation)

## 4. How We Use Your Information

### 4.1 Primary Use: Translation Services
- Translate message content between configured channels
- Preserve message context (attachments, replies, threads, reactions)
- Maintain conversation flow and coherence

### 4.2 Performance Optimization
- Cache frequently translated phrases to reduce API costs
- Monitor translation performance and response times
- Optimize rate limiting to prevent service disruptions

### 4.3 Service Improvement
- Analyze usage statistics to understand popular features
- Identify and fix bugs or errors
- Plan new features based on usage patterns

### 4.4 Security and Compliance
- Detect and prevent abuse or malicious usage
- Enforce rate limits and terms of service
- Respond to legal requests if required

## 5. Data Sharing and Third Parties

### 5.1 Perplexity AI
- **What**: Message text content only (not metadata)
- **Why**: To perform AI-powered translations
- **Their Policy**: Subject to Perplexity AI's Privacy Policy
- **Data Retention**: Governed by Perplexity AI's policies

### 5.2 Discord
- **What**: Bot interactions and webhook messages
- **Why**: To operate within Discord's platform
- **Their Policy**: Subject to Discord's Privacy Policy
- **Data Access**: Discord has access to all bot activity per their platform policies

### 5.3 We Do NOT:
- ❌ Sell your data to third parties
- ❌ Share data with advertisers
- ❌ Provide data to marketing companies
- ❌ Use data for purposes unrelated to the Bot's functionality
- ❌ Share data with other users (except translated content as intended)

## 6. Data Retention

| Data Type | Retention Period | Reason |
|-----------|-----------------|--------|
| Message Content | Up to 24 hours (cache only) | Performance optimization |
| Message IDs | Until server restart or removal | Reply chain preservation |
| Configuration Data | Until manually deleted | Maintain settings |
| Usage Statistics | Until server restart | In-memory tracking |
| Log Files | ~15MB / 3 rotations | Debugging and monitoring |
| Thread Mappings | Until server restart or removal | Thread translation |

### Automatic Deletion
- Translation cache automatically clears every 24 hours
- In-memory data lost on Bot restart
- Old log files automatically deleted when rotation limit reached

## 7. Data Security

### 7.1 Security Measures
- ✅ Bot token securely stored in environment variables
- ✅ API keys encrypted and not committed to version control
- ✅ In-memory data processing (not written to disk except config/logs)
- ✅ Regular security updates and dependency patches
- ✅ Rate limiting to prevent abuse
- ✅ Permission checks to prevent unauthorized access

### 7.2 Limitations
While we implement security best practices, no system is 100% secure. We cannot guarantee absolute security of data transmitted through the Bot.

## 8. Your Rights and Choices

### 8.1 Access
- View configured translation channels: `/config list`
- View ignored users/roles: `/config ignored-list`
- View statistics: `/config stats`
- View format settings: `/config format`

### 8.2 Control
- Remove translation setups: `/config remove`
- Ignore specific users: `/config ignore-user`
- Ignore specific roles: `/config ignore-role`
- Disable the Bot: `/config disable`
- Remove the Bot entirely: Kick from server

### 8.3 Data Deletion
To request data deletion:
1. Remove the Bot from your server (deletes configuration)
2. Cached data automatically expires within 24 hours
3. Contact us for permanent removal of any remaining data

### 8.4 Opt-Out
- Remove Bot from server: Complete opt-out
- Ignore your account: `/config ignore-user @you ignore:true`
- Don't send messages in configured channels: Personal opt-out

## 9. Children's Privacy

- The Bot does not knowingly collect data from children under 13
- Users must comply with Discord's age requirements (13+ or higher in some jurisdictions)
- Parents/guardians should monitor children's Discord usage
- Contact us immediately if you believe a child's data was improperly collected

## 10. International Data Transfers

- The Bot may be hosted in various geographic locations
- Data may be transferred across international borders
- By using the Bot, you consent to international data transfers
- We comply with applicable data protection laws (GDPR, CCPA, etc. where applicable)

## 11. Cookies and Tracking

- ❌ The Bot does NOT use cookies
- ❌ The Bot does NOT use tracking pixels
- ❌ The Bot does NOT track users across platforms
- ✅ Only Discord-native message and command interactions

## 12. Changes to Privacy Policy

We may update this Privacy Policy from time to time:
- Changes will be posted with a new "Last Updated" date
- Material changes will be announced in the Bot's support channels
- Continued use after changes constitutes acceptance
- Review this policy periodically for updates

## 13. Data Breach Notification

In the unlikely event of a data breach:
- We will investigate and assess the impact
- Affected users will be notified as required by law
- We will take steps to mitigate damage and prevent future breaches
- Law enforcement will be contacted if necessary

## 14. Your Consent

By using TBTB, you consent to:
- Collection of data as described in this policy
- Processing of messages for translation purposes
- Temporary caching of translations
- Sharing message content with Perplexity AI for translation
- Storage of configuration data

## 15. Legal Basis for Processing (GDPR)

For users in the EU/EEA, our legal basis for processing is:
- **Consent**: You voluntarily use the Bot knowing it processes messages
- **Legitimate Interest**: Providing translation services you requested
- **Contract Performance**: Fulfilling the service you engaged with

## 16. Your GDPR Rights (EU/EEA Users)

If you're in the EU/EEA, you have the right to:
- **Access**: Request copies of your data
- **Rectification**: Correct inaccurate data
- **Erasure**: Request deletion ("right to be forgotten")
- **Restriction**: Limit processing of your data
- **Portability**: Receive your data in a portable format
- **Object**: Object to processing of your data
- **Withdraw Consent**: Stop using the Bot at any time

## 17. CCPA Rights (California Users)

If you're a California resident, you have the right to:
- Know what personal information is collected
- Know if personal information is sold (we don't sell data)
- Delete personal information
- Opt-out of sale (not applicable as we don't sell)
- Non-discrimination for exercising rights

## 18. Contact Information

For privacy concerns, data requests, or questions:

- **Discord**: The best translator#4007
- **Support**: Open an issue in the Bot's GitHub repository
- **Email**: [Your contact email if available]
- **Data Request**: Contact via Discord with your Guild ID and User ID

**Response Time**: We aim to respond within 30 days.

## 19. Third-Party Links

The Bot may interact with third-party services (Discord, Perplexity AI). We are not responsible for their privacy practices. Review their policies:
- Discord Privacy Policy: https://discord.com/privacy
- Perplexity AI Privacy Policy: https://perplexity.ai/privacy

## 20. Transparency Commitment

We are committed to transparency:
- ✅ This policy clearly explains our practices
- ✅ We don't collect unnecessary data
- ✅ We don't sell or misuse your data
- ✅ We provide tools to control your data
- ✅ We're responsive to privacy concerns

---

## Summary (TL;DR)

**What we collect**: Message text (temporarily), channel/user IDs, configuration settings, usage stats

**Why**: To translate messages between channels as you've configured

**How long**: Messages cached up to 24 hours, configuration stored until deleted

**Sharing**: Message text sent to Perplexity AI for translation only

**Your control**: Remove Bot anytime, ignore users/roles, disable features

**Security**: Industry-standard practices, but no system is perfect

**Your rights**: Access, control, and delete your data anytime

---

**By using TBTB, you acknowledge that you have read and understood this Privacy Policy.**

**Last Updated: October 17, 2025**
**Effective Date: October 17, 2025**
