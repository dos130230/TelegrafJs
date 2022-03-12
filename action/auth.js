const { bot } = require('../core/bot')
const { keyboard1 } = require('../lib/keyboard.js')
let baza = [2125760802, 1892939498]

bot.start((msg, next) => {
    const chat_id = msg.chat.id
    if (!baza.includes(msg.chat.id)) {
        return msg.reply("Siz hali Botdan Royhadan o'tamansiz!")
    } else {

        return msg.telegram.sendMessage(chat_id, 'Uberuz Telegram botiga xush kelibsiz!\n\nKerakli tilni tanlang! 👇', keyboard1[0])
    }
})

