const { bot } = require('../core/bot')
const { keyboard1, backHome } = require('../lib/keyboard.js')
const { startBotUz } = require('../controllers/uzbek')
const { startBotRu } = require('../controllers/russia')
let registerInformation = {}
let backFunction = []
let authStamp;
let token;


// let baza = [1892939498, 2125760802]
let baza = [1892939498]
bot.use((msg, next) => {
    if (msg.message.text === '🇺🇿 Uzbek' && authStamp === 1 && token == 'dos') {
        ++authStamp
        backFunction.push(authStampFunc1)
        return authStampFunc2(msg)
    }
    else if (token == 'dos' && authStamp == 2 && msg.updateSubTypes[0] == 'contact') {
        registerInformation.contact = msg.message.text
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
        registerInformation.username = msg.message.text
        ++authStamp
        backFunction.push(authStampFunc3)
        return authStampFunc5(msg)
    }
    else if (token == 'dos' && authStamp == 5) {
        baza.push(msg.chat.id)
        msg.reply('Assalomu alaykum Uberuz botga xush kelibsiz!',keyboard1[0])
        startBotUz(msg, 1)
        startBotRu(msg, 1)
        token = null
        authStamp = null
        return next()

    }
    else {

        return next(msg)
    }
})


bot.start((msg, next) => {
    console.log('dfghjkl;')
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
        return msg.reply('Assalomu alaykum Uberuz botga xush kelibsiz!',keyboard1[0])
    }
})

let authStampFunc1 = (msg) => {
    return msg.reply("Registratsa uchun tilni tanglang!\n\nIltimos quydagilarni kiriting 👇", keyboard1[0])
}

let authStampFunc2 = (msg) => {
    return msg.reply("Kantakt yuborish tugmasin bosing 👇", {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [[{ text: "📲 Conctact", request_contact: true, },],],
            one_time_keyboard: true,
        },
    })
}




let authStampFunc3 = async (msg) => {
    return await msg.reply('Iltimos ismingizni kiriting!', {
        reply_markup: { remove_keyboard: true }
    })
}

let authStampFunc4 = async (msg) => {
    return msg.reply('Iltimos familyangizni kiriting!')
}

let authStampFunc5 = async (msg) => {
    return msg.reply("Iltimos tug'ulgan yil-sana-kun ni kiriting!\n\n👉 2020-01-31")
}

// const AuthLanguage = (msg) => {
//     if (token == 'dos' && msg.updateSubTypes[0] == 'contact' && authStamp == 2) {
//         registerInformation.contact = msg.message.contact.phone_number
//         ++authStamp
//         backFunction.push(authStampFunc1)
//         return authStampFunc2(msg)
//     }
// }