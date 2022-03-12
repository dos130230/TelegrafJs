
const { bot } = require('../core/bot')
const Uzbek = require('../controllers/uzbek')
const Russia = require('../controllers/russia')
let language;

bot.use((msg, next) => {
    try {

        if (!['text', 'location', 'contact'].includes(msg.updateSubTypes[0])) return
        if (msg?.message?.text === '🇺🇿 Uzbek') {
            language = 'uz'
        }
        if (msg?.message?.text === '🇳🇱 Russian') {
            language = 'ru'

        }
        if (language === 'uz') {

            language = 'uz'
            return Uzbek(msg)
        }
        if (language === 'ru') {
            language = 'ru'
            return Russia(msg)
        }
    } catch (error) {
        console.log(error.message)
    }


})
