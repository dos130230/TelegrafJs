const { bot } = require('../core/bot')
const { keyboard1, backHome } = require('../lib/keyboard.js')
const { startBotUz } = require('../controllers/uzbek')
const { startBotRu } = require('../controllers/russia')
const readJson = require('../lib/readJson.js')
let users = readJson.select('users')
let registerInformation = {}
let backFunction = []

let authStampUz;
let tokenUz;



bot.use((msg, next) => {
    if (authStamp === 1 && token == 'dos' && msg.message.text === '🇺🇿 Uzbek') {
        ++authStamp
        backFunction.push(authStampFunc1)
        return authStampFunc2.uz(msg)
    }
    else if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(authStamp) && msg.message.text == '↩️ Orqaga') {
        if (!backFunction.length) return
        --authStamp
        return backFunction.pop()(msg)
    }
    else if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(authStamp) && msg.message.text == '🏠 Bosh sahifa') {
        if (!backFunction.length) return
        authStamp = 1
        registerInformation = {}
        let oneFunction = backFunction.shift()
        backFunction = []
        return oneFunction(msg)
    }
    else if (token == 'dos' && authStamp == 2 && msg.updateSubTypes[0] == 'contact') {
        registerInformation.contact = msg.message.contact.phone_number
        registerInformation.telegram_id = msg.message.contact.user_id
        ++authStamp
        backFunction.push(authStampFunc2.uz)
        return authStampFunc3.uz(msg)
    }
    else if (token == 'dos' && authStamp == 3) {
        registerInformation.firstname = msg.message.text
        ++authStamp
        backFunction.push(authStampFunc3.uz)
        return authStampFunc4.uz(msg)
    }
    else if (token == 'dos' && authStamp == 4) {
        registerInformation.lastname = msg.message.text
        ++authStamp
        backFunction.push(authStampFunc3.uz)
        return authStampFunc5.uz(msg)
    }
    else if (token == 'dos' && authStamp == 5) {
        registerInformation.birthDate = msg.message.text
        registerInformation.user_id = users.length ? users[users.length - 1].user_id + 1 : 1
        users.push(registerInformation)
        readJson.insert('users', users)
        token = null
        authStamp = null
        return msg.reply("Siz royhatdan mofoqiyatli o'tdingiz\n\nBizda viloyatlar aro Taxi xizmati mavjud\n\nBotni ishga tushurish uchun\n\t👉 /start", {
            reply_markup: {
                remove_keyboard: true
            }
        })
    }
    else {

        return next(msg)
    }
})
