const { bot } = require('../core/bot')
const { keyboard1 } = require('../lib/keyboard.js')
const {startBotUz} = require('../controllers/uzbek')
const {startBotRu} = require('../controllers/russia')
let baza = [2125760802, 1892939498]

bot.start((msg, next) => {
    const chat_id = msg.chat.id
    if (!baza.includes(msg.chat.id)) {
        return msg.reply("Siz hali Botdan Royhadan o'tamansiz!")
    } else {
        startBotUz(msg)
        startBotRu(msg)
        return msg.telegram.sendMessage(chat_id, 'Uberuz Telegram botiga xush kelibsiz!\n\nKerakli tilni tanlang! 👇', keyboard1[0])
    }
})

