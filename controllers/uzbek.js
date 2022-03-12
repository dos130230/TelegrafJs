const { stemp1, stemp2, stemp3, stemp4, stemp5, stemp6, stemp7, stemp8, backHome } = require('../action/stmeps.js')
const { keyboard6 } = require('../lib/keyboard')

const { textMessage } = require('../lib/messages.js')
const readJson = require('../lib/readJson.js')

const { bot } = require('../core/bot')

const districts = readJson.select('districts')
const cities = readJson.select('cities')
let doubleContact = false
let FunctionStemp = []
let information = {}
let userStep = 1

bot.on(['text', 'contact', 'location'], msg => {
    const chat_id = msg.chat.id

    if (msg.message.text === '🇺🇿 Uzbek' && userStep == 1) {
        information.language = 'uz'
        ++userStep
        FunctionStemp.push(stemp1)
        return stemp2(chat_id, msg)
    }
    else if (cities.map(el => el.name_uz).includes(msg.message.text) && userStep == 2) {
        ++userStep
        information.cities = cities.find(el => el.name_uz == msg.message.text)
        FunctionStemp.push(stemp2)
        return stemp3(chat_id, msg, information)
    }
    else if (districts.map(el => el.name_uz).includes(msg.message.text) && userStep == 3) {
        ++userStep
        information.districts = districts.find(el => el.name_uz == msg.message.text)
        FunctionStemp.push(stemp3)
        return stemp4(chat_id, msg)
    }

    else if (msg.updateSubTypes[0] == 'location' && userStep == 4) {
        ++userStep
        information.myCoordinate = msg.message.location
        FunctionStemp.push(stemp4)
        return stemp5(chat_id, msg)
    }

    else if (msg.updateSubTypes[0] == 'contact' && userStep == 5) {
        ++userStep
        information.contact = msg.message.contact.phone_number
        FunctionStemp.push(stemp5)
        return stemp6(chat_id, msg)
    }

    else if (msg.message.text == "📞 Qo'shimcha Contact" && userStep == 5) {
        doubleContact = true
        ++userStep
        FunctionStemp.push(stemp5)
        return msg.telegram.sendMessage(chat_id, "📞 Iltimos boshqa ishlab turgan raqamingizni quyidagi ko'rinishda yozing!\n\nKo'rsatma 👉 +998901234567", backHome[0])
    }

    else if (doubleContact && msg.message.text !== "↩️ Orqaga" && userStep == 6) {
        if (!(/^998(9[012345789]|3[3]|7[1]|8[8])[0-9]{7}$/).test(msg.message.text)) {
            return msg.reply("Iltimos to'g'ri raqam kiriting\n\nYuqoridagi ko'rinishda kiriting 👆")
        }
        userStep
        information.contact = '+' + msg.message.text
        FunctionStemp.push(stemp5)
        doubleContact = false
        return stemp6(chat_id, msg)
    }

    else if (['1️⃣', '2️⃣', '3️⃣', '4️⃣', '🔄 Hamma joyni band qilish'].includes(msg.message.text) && userStep == 6) {
        ++userStep
        information.count = msg.message.text
        FunctionStemp.push(stemp6)
        return stemp7(chat_id, msg)
    }

    else if (msg.message.text == '🏠 Bosh sahifa') {
        userStep = 1
        FunctionStemp = []
        return stemp1(chat_id, msg)
    }

    else if (msg.message.text == '↩️ Orqaga' && [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(userStep)) {
        if (!FunctionStemp.length) return
        --userStep
        doubleContact = false
        return FunctionStemp.pop()(chat_id, msg, information)
    }

})


bot.action('action1', async (msg, next) => {
    await msg.telegram.sendMessage(msg.chat.id, textMessage.definition_result, keyboard6[2])
    await msg.telegram.sendMessage(msg.chat.id, JSON.stringify(information))
    console.log(information)

    next()
})

bot.action('action2', async (msg, next) => {
    await msg.telegram.sendMessage(msg.chat.id, textMessage.definition_result, keyboard6[2])
    next()

})

bot.action('action3', async (msg, next) => {
    await msg.telegram.sendMessage(msg.chat.id, textMessage.definition_driver, keyboard6[3])
    next()
})
