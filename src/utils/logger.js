const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logDir = path.join(__dirname, '../../logs');
        this.logFile = path.join(this.logDir, 'bot.log');
        this.maxLogSize = 5 * 1024 * 1024; // 5MB
        this.maxLogFiles = 3;
        
        // Create logs directory if it doesn't exist
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
        
        // Check and rotate log file if needed
        this.rotateIfNeeded();
    }
    
    rotateIfNeeded() {
        if (fs.existsSync(this.logFile)) {
            const stats = fs.statSync(this.logFile);
            if (stats.size >= this.maxLogSize) {
                this.rotateLog();
            }
        }
    }
    
    rotateLog() {
        // Delete oldest log if we have too many
        const oldestLog = path.join(this.logDir, `bot.log.${this.maxLogFiles}`);
        if (fs.existsSync(oldestLog)) {
            fs.unlinkSync(oldestLog);
        }
        
        // Rotate existing logs
        for (let i = this.maxLogFiles - 1; i >= 1; i--) {
            const oldPath = path.join(this.logDir, `bot.log.${i}`);
            const newPath = path.join(this.logDir, `bot.log.${i + 1}`);
            if (fs.existsSync(oldPath)) {
                fs.renameSync(oldPath, newPath);
            }
        }
        
        // Rotate current log
        fs.renameSync(this.logFile, path.join(this.logDir, 'bot.log.1'));
    }
    
    formatMessage(level, message, data = null) {
        const timestamp = new Date().toISOString();
        let logMessage = `[${timestamp}] [${level}] ${message}`;
        
        if (data) {
            if (data instanceof Error) {
                logMessage += `\n  Error: ${data.message}\n  Stack: ${data.stack}`;
            } else if (typeof data === 'object') {
                logMessage += `\n  Data: ${JSON.stringify(data, null, 2)}`;
            } else {
                logMessage += `\n  Data: ${data}`;
            }
        }
        
        return logMessage;
    }
    
    writeToFile(message) {
        try {
            fs.appendFileSync(this.logFile, message + '\n');
        } catch (error) {
            console.error('Failed to write to log file:', error);
        }
    }
    
    info(message, data = null) {
        const formatted = this.formatMessage('INFO', message, data);
        console.log(`\x1b[36m${formatted}\x1b[0m`); // Cyan
        this.writeToFile(formatted);
    }
    
    warn(message, data = null) {
        const formatted = this.formatMessage('WARN', message, data);
        console.warn(`\x1b[33m${formatted}\x1b[0m`); // Yellow
        this.writeToFile(formatted);
    }
    
    error(message, data = null) {
        const formatted = this.formatMessage('ERROR', message, data);
        console.error(`\x1b[31m${formatted}\x1b[0m`); // Red
        this.writeToFile(formatted);
    }
    
    success(message, data = null) {
        const formatted = this.formatMessage('SUCCESS', message, data);
        console.log(`\x1b[32m${formatted}\x1b[0m`); // Green
        this.writeToFile(formatted);
    }
    
    debug(message, data = null) {
        if (process.env.DEBUG === 'true') {
            const formatted = this.formatMessage('DEBUG', message, data);
            console.log(`\x1b[90m${formatted}\x1b[0m`); // Gray
            this.writeToFile(formatted);
        }
    }
}

// Create singleton instance
const logger = new Logger();

module.exports = logger;
