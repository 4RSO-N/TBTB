# TBTB Deployment Guide - Railway.app

## 🚂 Why Railway?
- ✅ $5 free credit monthly (enough for small bots)
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable management
- ✅ Built-in logging and monitoring
- ✅ Zero configuration needed
- ✅ Automatic restarts on crashes

---

## 📋 Prerequisites

- [x] GitHub repository (TBTB) - ✅ Already done!
- [x] Railway.app account (free)
- [x] Discord bot token
- [x] Perplexity API key

---

## 🚀 Step-by-Step Deployment

### Step 1: Sign Up for Railway

1. Go to https://railway.app
2. Click "Login" and sign up with GitHub
3. Authorize Railway to access your repositories

### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your **TBTB** repository
4. Railway will automatically detect it's a Node.js project

### Step 3: Add Environment Variables

1. Click on your deployed service
2. Go to "Variables" tab
3. Add these variables:
   ```
   DISCORD_TOKEN=your_discord_bot_token_here
   PERPLEXITY_API_KEY=your_perplexity_api_key_here
   ```
4. Click "Add Variable" for each one

### Step 4: Configure Start Command (if needed)

Railway should auto-detect `npm start` from package.json, but if it doesn't:

1. Go to "Settings" tab
2. Scroll to "Deploy"
3. Set "Start Command" to: `npm start`

### Step 5: Deploy!

1. Railway will automatically deploy your bot
2. Check the "Deployments" tab for build logs
3. Once deployed, your bot will be online 24/7!

---

## 🔧 Railway Configuration File (Optional)

Create a `railway.json` file in your project root for custom configuration:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 📊 Monitoring Your Bot

### View Logs
1. Go to your Railway project
2. Click on your service
3. Go to "Deployments" tab
4. Click on latest deployment
5. View real-time logs

### Check Resource Usage
1. Go to "Metrics" tab
2. View CPU, Memory, and Network usage
3. Monitor costs (should be ~$3-4/month for typical usage)

---

## 💰 Cost Estimation

**Free Tier:**
- $5 free credit per month
- Typical bot usage: ~$2-4/month
- First month is usually FREE!

**What uses credits:**
- CPU time
- Memory usage
- Network bandwidth (outbound)

**Your bot's estimated usage:**
- Small server (100-1000 users): ~$2/month
- Medium server (1000-10000 users): ~$4-6/month
- Large server (10000+ users): ~$8-12/month

---

## 🔄 Automatic Deployments

Railway automatically redeploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push

# Railway automatically detects the push and redeploys!
```

---

## 🐛 Troubleshooting

### Bot Not Starting?
1. Check environment variables are set correctly
2. View deployment logs for errors
3. Ensure Discord token is valid

### Bot Keeps Crashing?
1. Check logs for error messages
2. Verify Perplexity API key is valid
3. Check if you have enough credits

### High Costs?
1. Check if bot is in too many servers
2. Review rate limiting settings
3. Monitor translation volume in logs

---

## 🎯 Alternative: DigitalOcean Droplet

If you prefer more control and flat pricing:

### Setup Steps:
1. Create $6/month Basic Droplet (Ubuntu)
2. SSH into server
3. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Install PM2 (process manager):
   ```bash
   sudo npm install -g pm2
   ```
5. Clone your repository:
   ```bash
   git clone https://github.com/4RSO-N/TBTB.git
   cd TBTB
   npm install
   ```
6. Create .env file:
   ```bash
   nano .env
   # Add your DISCORD_TOKEN and PERPLEXITY_API_KEY
   ```
7. Start bot with PM2:
   ```bash
   pm2 start src/bot.js --name tbtb
   pm2 save
   pm2 startup
   ```

### Benefits:
- ✅ Flat $6/month cost
- ✅ Full control over server
- ✅ Can host multiple bots
- ✅ More resources

---

## 🎯 Alternative: Google Cloud Run (Free Tier)

For always-free deployment:

### Requirements:
1. Dockerize your application (create Dockerfile)
2. Push to Google Container Registry
3. Deploy to Cloud Run

**Note:** Cloud Run is designed for web services, not 24/7 bots. Better suited for webhook-based bots.

---

## 🔒 Security Best Practices

1. **Never commit .env file** - Already in .gitignore ✅
2. **Use environment variables** - Set in Railway dashboard ✅
3. **Rotate tokens regularly** - Change bot token every 3-6 months
4. **Monitor logs** - Check for unauthorized access attempts
5. **Limit bot permissions** - Only give necessary Discord permissions

---

## 📈 Scaling Tips

As your bot grows:

1. **Upgrade Railway plan** - More credits for higher usage
2. **Optimize caching** - Already implemented (24hr cache) ✅
3. **Monitor API usage** - Check Perplexity API costs
4. **Use multiple instances** - For very large bots (100k+ users)

---

## ✅ Recommended Setup: Railway

**Best for most users:**
1. Free/cheap to start ($5 credit monthly)
2. Zero configuration
3. Automatic deployments
4. Easy environment variable management
5. Good monitoring and logs

**Setup Time:** 5-10 minutes
**Monthly Cost:** $0-3 (within free tier for most small/medium bots)

---

## 🆘 Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- TBTB Support: Open issue on GitHub

---

## 📝 Deployment Checklist

Before deploying:
- [ ] Push latest code to GitHub
- [ ] Verify .gitignore excludes .env
- [ ] Have Discord bot token ready
- [ ] Have Perplexity API key ready
- [ ] Bot tested locally and working

After deploying:
- [ ] Bot shows as online in Discord
- [ ] Environment variables set correctly
- [ ] Logs show no errors
- [ ] Test a translation command
- [ ] Monitor costs for first week

---

**Your bot will be online 24/7 with automatic restarts and updates! 🎉**
