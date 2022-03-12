
const { bot } = require('../core/bot')
const Uzbek  = require('../controllers/uzbek')
const Russia  = require('../controllers/russia')
let language;

bot.use ( (msg,next) => {
    if(msg.message.text === '🇺🇿 Uzbek'){
        language = 'uz'
    }
    if(msg.message.text === '🇳🇱 Russian'){
        language = 'ru'

    }
    if(language === 'uz'){

        language = 'uz'
        return Uzbek(msg)
    }
    if(language === 'ru'){
        language = 'ru'
        return Russia(msg)
    }
    
})
