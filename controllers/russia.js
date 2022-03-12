const { stemp1, stemp2, stemp3, stemp4, stemp5, stemp6, stemp7, stemp8, backHome } = require('../action/stmeps.js')
const { keyboard6, keyboard5 } = require('../lib/keyboard')

const { textMessage } = require('../lib/messages.js')
const readJson = require('../lib/readJson.js')

const { bot } = require('../core/bot')

const districts = readJson.select('districts')
const cities = readJson.select('cities')
let doubleContact = false
let FunctionStemp = []
let information = {}
let userStep = 1

function startBotRu(msg) {
    information = {}
    doubleContact = false
    userStep = 1
    return FunctionStemp = []
}





bot.action('action1_ru', async (msg, next) => {
    await msg.telegram.sendMessage(msg.chat.id, textMessage.definition_result, keyboard6[1][2])
    await msg.telegram.sendMessage(msg.chat.id, JSON.stringify(information))
    console.log(information)

    next()
})

bot.action('action2_ru', async (msg, next) => {
    await msg.telegram.sendMessage(msg.chat.id, textMessage.definition_result, keyboard6[1][2])
    next()

})

bot.action('action3_ru', async (msg, next) => {
    await msg.telegram.sendMessage(msg.chat.id, textMessage.definition_driver, keyboard5[1])
    next()
})


let Russia = (msg) => {
    try {
        const chat_id = msg.chat.id
        // console.log(msg.message.text)
        if (msg.message.text === '🇳🇱 Russian' && userStep == 1) {
            information.language = 'ru'
            ++userStep
            FunctionStemp.push(stemp1.ru)
            return stemp2.ru(chat_id, msg)
        } else if (msg.message.text == '🏠 Главная') {
            userStep = 1
            doubleContact = false
            FunctionStemp = []
            return stemp1.ru(chat_id, msg)
        }
        else if (msg.message.text == '↩️ Назад' && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(userStep)) {
            if (!FunctionStemp.length) return
            --userStep
            doubleContact = false
            return FunctionStemp.pop()(chat_id, msg, information)
        }

        else if (cities.map(el => el.name_ru).includes(msg.message.text) && userStep == 2) {
            ++userStep
            information.cities = cities.find(el => el.name_ru == msg.message.text)
            FunctionStemp.push(stemp2.ru)
            return stemp3.ru(chat_id, msg, information)
        }
        else if (districts.map(el => el.name_ru).includes(msg.message.text) && userStep == 3) {
            ++userStep
            information.districts = districts.find(el => el.name_ru == msg.message.text)
            FunctionStemp.push(stemp3.ru)
            return stemp4.ru(chat_id, msg)
        }

        else if (msg.updateSubTypes[0] == 'location' && userStep == 4) {
            ++userStep
            information.myCoordinate = msg.message.location
            FunctionStemp.push(stemp4.ru)
            return stemp5.ru(chat_id, msg)
        }

        else if (msg.updateSubTypes[0] == 'contact' && userStep == 5) {
            ++userStep
            information.contact = msg.message.contact.phone_number
            FunctionStemp.push(stemp5.ru)
            return stemp6.ru(chat_id, msg)
        }

        else if (msg.message.text == "📞 Дополнительный контакт" && userStep == 5) {
            doubleContact = true
            ++userStep
            FunctionStemp.push(stemp5.ru)
            return msg.telegram.sendMessage(chat_id, "📞 Пожалуйста, напишите свой другой актуальный номер в форму ниже!\n\nИнструкции 👉 +998901234567", backHome[0])
        }

        else if (doubleContact && msg.message.text !== "↩️ Назад" && userStep == 6) {
            if (!(/^998(9[012345789]|3[3]|7[1]|8[8])[0-9]{7}$/).test(msg.message.text)) {
                return msg.reply("Пожалуйста, введите правильный номер \n\nВведите в представлении выше 👆")
            }
            userStep
            information.contact = '+' + msg.message.text
            FunctionStemp.push(stemp5.ru)
            doubleContact = false
            return stemp6.ru(chat_id, msg)
        }

        else if (['1️⃣', '2️⃣', '3️⃣', '4️⃣', '🔄 Занят везде'].includes(msg.message.text) && userStep == 6) {
            ++userStep
            information.count = msg.message.text
            FunctionStemp.push(stemp6.ru)
            return stemp7.ru(chat_id, msg)
        }

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    Russia,
    startBotRu
}

