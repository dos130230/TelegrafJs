const { bot } = require('../core/bot')
const { keyboard1, } = require('../lib/keyboard.js')
const { startBotUz } = require('../controllers/uzbek')
const { startBotRu } = require('../controllers/russia')
let registerInformation = {}
let backFunction = []
let authStamp;
let token;


// let baza = [1892939498, 2125760802]
let baza = [1892939498]

bot.on(['text', 'contact'], (msg, next) => {
    if (token == 'dos' && msg.updateSubTypes[0] == 'contact' && authStamp == 1) {
        registerInformation.contact = msg.message.contact.phone_number
        ++authStamp
        backFunction.push(authStampFunc1)
        return authStampFunc2(msg)
    }
    else if (token == 'dos' && authStamp == 2) {
        registerInformation.contact = msg.message.text
        ++authStamp
        backFunction.push(authStampFunc2)

        return authStampFunc3(msg)
    }
    else if (token == 'dos' && authStamp == 3) {
        backFunction.push(authStampFunc3)

        registerInformation.contact = msg.message.text
        ++authStamp
        return authStampFunc4(msg)
    }
    else {
        return next(msg)
    }
})

bot.start((msg, next) => {
    const chat_id = msg.chat.id
    if (!baza.includes(msg.chat.id)) {
        startBotUz(msg, 0)
        startBotRu(msg, 0)
        token = 'dos'
        authStamp = 1
        return authStampFunc1(msg)
    } else {
        startBotUz(msg, 1)
        startBotRu(msg, 1)
    }
})


let authStampFunc1 = (msg) => {

    return msg.reply("Siz hali Uberuz botdan ro'yxatdan o'tmaganisiz\n\nIltimos oldin royxatdan o'ting!\n\nIltimos raqamingizni kiriting 👇", {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [[{ text: "📲 Conctact", request_contact: true, },],],
            one_time_keyboard: true,
        },
    })
}

let authStampFunc2 = async (msg) => {
    return await msg.reply('Iltimos ismingizni kiriting!', {
        reply_markup: { remove_keyboard: true }
    })
}

let authStampFunc3 = async (msg) => {
    return msg.reply('Iltimos familyangizni kiriting!')
}

let authStampFunc4 = async (msg) => {
    return msg.reply("Iltimos tug'ulgan yil-sana-kun ni kiriting!\n\n👉 2020-01-31")
} 