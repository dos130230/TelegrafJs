const { bot } = require('../core/bot')
const { keyboard1, backHome } = require('../lib/keyboard.js')
const { startBotUz } = require('../controllers/uzbek')
const { startBotRu } = require('../controllers/russia')
const readJson = require('../lib/readJson.js')
let users = readJson.select('users')
let registerInformation = {}
let backFunction = []
let authStamp;
let token;


bot.use((msg, next) => {
    if (authStamp === 1 && token == 'dos' && msg.message.text === '🇺🇿 Uzbek') {
        ++authStamp
        backFunction.push(authStampFunc1)
        return authStampFunc2(msg)
    }
    else if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(authStamp) && msg.message.text == '↩️ Orqaga') {
        if (!backFunction.length) return
        --authStamp
        return backFunction.pop()(msg)
    }
    else if ( [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(authStamp) && msg.message.text == '🏠 Bosh sahifa') {
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
        backFunction.push(authStampFunc2)
        return authStampFunc3(msg)
    }
    else if (token == 'dos' && authStamp == 3) {
        registerInformation.firstname = msg.message.text
        ++authStamp
        backFunction.push(authStampFunc3)
        return authStampFunc4(msg)
    }
    else if (token == 'dos' && authStamp == 4) {
        registerInformation.lastname = msg.message.text
        ++authStamp
        backFunction.push(authStampFunc3)
        return authStampFunc5(msg)
    }
    else if (token == 'dos' && authStamp == 5) {
        registerInformation.birthDate = msg.message.text
        registerInformation.user_id = users.length ? users[users.length - 1].user_id + 1 : 1
        users.push(registerInformation)
        readJson.insert('users', users)
        token = null
        authStamp = null
        return msg.reply("Siz royhatdan mofoqiyatli o'tdingiz\n\nBizda viloyatlar aro Taxi xizmati mavjud\n\nBotni ishga tushurish uchun\n\t👉 /start",{
            reply_markup :{
                remove_keyboard : true
            }
        })
    }
    else {

        return next(msg)
    }
})


bot.start((msg, next) => {
    const chat_id = msg.chat.id
    let found = users.find(user => user.telegram_id == chat_id)
    if (!found) {
        startBotUz(msg, 0)
        startBotRu(msg, 0)
        token = 'dos'
        authStamp = 1
        return authStampFunc1(msg)
    } else {
        startBotUz(msg, 1)
        startBotRu(msg, 1)
        return msg.reply('Assalomu alaykum Uberuz botga xush kelibsiz!', keyboard1[0])
    }
})


let authStampFunc1 = (msg) => {
    return msg.reply("Registratsa uchun tilni tanglang!\n\nIltimos quydagilarni kiriting 👇", keyboard1[0])
}

let authStampFunc2 = (msg) => {
    return msg.reply("Kantakt yuborish tugmasin bosing 👇", {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [[{ text: "📲 Conctact", request_contact: true, },], ['↩️ Orqaga', '🏠 Bosh sahifa']],
            one_time_keyboard: true,
        },
    })
}


let authStampFunc3 = async (msg) => {
    return await msg.reply('Iltimos ismingizni kiriting!', backHome[0])
}

let authStampFunc4 = async (msg) => {
    return msg.reply('Iltimos familyangizni kiriting!', backHome[0])
}

let authStampFunc5 = async (msg) => {
    return msg.reply("Iltimos tug'ulgan yil-sana-kun ni kiriting!\n\n👉 2020-01-31", backHome[0])
}

