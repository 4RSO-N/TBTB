# Developer Setup Guide

## Getting Your Discord User ID

### Method 1: Discord Settings (Easiest)
1. Open Discord
2. Go to **User Settings** (gear icon)
3. Go to **Advanced**
4. Enable **Developer Mode**
5. Close settings
6. Right-click your username anywhere (chat, member list, etc.)
7. Click **Copy User ID**

### Method 2: Using the Bot
1. In any channel where the bot is, type:
   ```
   /config status
   ```
2. Your User ID will be visible in the interaction

---

## Setting Up Developer Privileges

### Step 1: Add Your User ID to .env
Open your `.env` file and add this line:

```env
DEVELOPER_ID=your_discord_user_id_here
```

Example:
```env
DISCORD_TOKEN=your_discord_bot_token_here
PERPLEXITY_API_KEY=your_perplexity_api_key_here
DEVELOPER_ID=123456789012345678
```

### Step 2: Restart the Bot
Stop the bot and restart it:
```bash
# Stop (if running)
Ctrl+C

# Start
npm start
```

---

## Developer Privileges

Once configured, you get:

✅ **All Permissions** - Bypass admin/superuser checks on all commands
✅ **Global Access** - Work on any server without needing server-specific permissions
✅ **Developer Badge** - Special indicator on `/config status`
✅ **Priority** - Highest permission level (above admins and superusers)

---

## Testing Your Setup

1. Run `/config status` - You should see "👑 You are the bot developer" at the bottom
2. Try any command - All should work regardless of server permissions
3. Check the bot logs for any errors

---

## Security Notes

⚠️ **IMPORTANT:**
- Never commit your `.env` file to Git (it's in `.gitignore`)
- Keep your User ID private
- Only set ONE developer (your main Discord account)
- Developer privileges work across ALL servers

---

## Troubleshooting

### Developer badge not showing?
- Make sure you copied your User ID correctly (no spaces)
- Restart the bot after adding DEVELOPER_ID
- Check that `.env` file is in the root directory

### Commands still require admin?
- Verify DEVELOPER_ID is set in `.env`
- Make sure the bot restarted successfully
- Check for typos in your User ID

### How to remove developer privileges?
- Remove or comment out the DEVELOPER_ID line in `.env`
- Restart the bot

---

## Current Developer Features

The developer status gives you:
- Permission to use all `/config` commands on any server
- Special "👑 You are the bot developer" footer on status command
- Bypass all admin and superuser permission checks
- Access even on servers where bot is disabled

---

**Your User ID should be an 18-digit number like:** `123456789012345678`
