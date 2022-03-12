const { keyboard2, keyboard3, keyboard1, keyboard4, keyboard5, keyboard6, backHome } = require('../lib/keyboard')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const {textMessage} = require('../lib/messages.js')

// bosh sahifa
const stemp1 = (chat_id, msg) => {
    return msg.telegram.sendMessage(chat_id, 'Uberuz Telegram botiga xush kelibsiz!\n\nKerakli tilni tanlang! 👇', keyboard1[0])
}

// Viloyatlarin beardi
const stemp2 = (chat_id, msg) => {
    return msg.telegram.sendMessage(chat_id, 'Siz qaysi viloyatda turibsiz?\n\nViloyatlardan birini tanlang 👇!', keyboard2[0])
}

// Tumani beradi
const stemp3 = (chat_id, msg,information) => {
    console.log(information)
    return msg.telegram.sendMessage(chat_id, 'Siz qaysi tumanda turibsiz?\n\nTumanlardan birini tanlang 👇', keyboard3(information?.cities?.id,'name_uz'))
}

// location kiritish
const stemp4 = (chat_id, msg) => {
    return msg.reply("Shafyor sizbilan bog'lanishi uchun telefon raqam kiriting!\n\nTugmadalardan birini tanlang 👇", Extra.markup((markup) => {
        return markup.resize()
            .keyboard([[
                markup.locationRequestButton('📍 Location yuborish')
            ], ['↩️ Orqaga', '🏠 Bosh sahifa']])
    }))
}

// contact kiritish
const stemp5 = (chat_id, msg) => {
    return msg.reply("📞 Telefon raqam yuborish tugmasini bosing yoki boshqa ishlab turgan raqamingizni quyidagi ko'rinishda yozing!\n\nKo'rsatma 👉 +998901234567", Extra.markup((markup) => {
        return markup.resize()
            .keyboard([[
                markup.contactRequestButton('📞 Contact yuborish'),
                "📞 Qo'shimcha Contact"
            ], ['↩️ Orqaga', '🏠 Bosh sahifa']])
    }))
}

const stemp6 = (chat_id, msg) => {
    return msg.telegram.sendMessage(chat_id, 'Nechi kishi ketasiz?\n\n(Maksimal 4 ta tanlash mumkin)', keyboard4[0])
}

const stemp7 = async (chat_id, msg) => {
    await msg.telegram.sendMessage(chat_id, textMessage.definition_fast, keyboard6[0][0])
    await msg.telegram.sendMessage(chat_id, textMessage.definition_standart, keyboard6[0][1])
    await msg.telegram.sendMessage(chat_id, "Bizda bor bor bo'lgan tariflar\n\nYuqoridagi tugmalarni tanlang 👆", keyboard5[0])
    return
}

const stemp8 = (chat_id, msg,information) => {
    return msg.telegram.sendMessage(chat_id, JSON.stringify(information))
}


module.exports = {
    stemp1,
    stemp2,
    stemp3,
    stemp4,
    stemp5,
    stemp6,
    stemp7,
    stemp8,
    backHome
}