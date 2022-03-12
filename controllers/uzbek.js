
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

bot.action('action1_uz', async (msg, next) => {
    await msg.telegram.sendMessage(msg.chat.id, textMessage.definition_result, keyboard6[0][2])
    await msg.telegram.sendMessage(msg.chat.id, JSON.stringify(information))

    next()
})

bot.action('action2_uz', async (msg, next) => {
    await msg.telegram.sendMessage(msg.chat.id, textMessage.definition_result, keyboard6[0][2])
    await msg.telegram.sendMessage(msg.chat.id, JSON.stringify(information))
    next()


})

bot.action('action3_uz', async (msg, next) => {
    await msg.telegram.sendMessage(msg.chat.id, textMessage.definition_driver, keyboard5[0])
    next()
})

let Uzbek = (msg) => {
    try {
        const chat_id = msg.chat.id
        if (msg.message.text === '🇺🇿 Uzbek' && userStep == 1) {
            information.language = 'uz'
            ++userStep
            console.log(msg.message.text)
            FunctionStemp.push(stemp1.uz)
            return stemp2.uz(chat_id, msg)
        }
        else if (cities.map(el => el.name_uz).includes(msg.message.text) && userStep == 2) {
            ++userStep
            information.cities = cities.find(el => el.name_uz == msg.message.text)
            FunctionStemp.push(stemp2.uz)
            return stemp3.uz(chat_id, msg, information)
        }
        else if (districts.map(el => el.name_uz).includes(msg.message.text) && userStep == 3) {
            ++userStep
            information.districts = districts.find(el => el.name_uz == msg.message.text)
            FunctionStemp.push(stemp3.uz)
            return stemp4.uz(chat_id, msg)
        }

        else if (msg.updateSubTypes[0] == 'location' && userStep == 4) {
            ++userStep
            information.myCoordinate = msg.message.location
            FunctionStemp.push(stemp4.uz)
            return stemp5.uz(chat_id, msg)
        }

        else if (msg.updateSubTypes[0] == 'contact' && userStep == 5) {
            ++userStep
            information.contact = msg.message.contact.phone_number
            FunctionStemp.push(stemp5.uz)
            return stemp6.uz(chat_id, msg)
        }

        else if (msg.message.text == "📞 Qo'shimcha Contact" && userStep == 5) {
            doubleContact = true
            ++userStep
            FunctionStemp.push(stemp5.uz)
            return msg.telegram.sendMessage(chat_id, "📞 Iltimos boshqa ishlab turgan raqamingizni quyidagi ko'rinishda yozing!\n\nKo'rsatma 👉 +998901234567", backHome[0])
        }

        else if (doubleContact && msg.message.text !== "↩️ Orqaga" && userStep == 6) {
            if (!(/^998(9[012345789]|3[3]|7[1]|8[8])[0-9]{7}$/).test(msg.message.text)) {
                return msg.reply("Iltimos to'g'ri raqam kiriting\n\nYuqoridagi ko'rinishda kiriting 👆")
            }
            userStep
            information.contact = '+' + msg.message.text
            FunctionStemp.push(stemp5.uz)
            doubleContact = false
            return stemp6.uz(chat_id, msg)
        }

        else if (['1️⃣', '2️⃣', '3️⃣', '4️⃣', '🔄 Hamma joyni band qilish'].includes(msg.message.text) && userStep == 6) {
            ++userStep
            information.count = msg.message.text
            FunctionStemp.push(stemp6.uz)
            return stemp7.uz(chat_id, msg)
        }

        else if (msg.message.text == '🏠 Bosh sahifa') {
            userStep = 1
            FunctionStemp = []
            return stemp1.uz(chat_id, msg)
        }

        else if (msg.message.text == '↩️ Orqaga' && [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(userStep)) {
            if (!FunctionStemp.length) return
            --userStep
            doubleContact = false
            console.log(FunctionStemp[FunctionStemp.length - 1])
            return FunctionStemp.pop()(chat_id, msg, information)
        }
    } catch (error) {
        console.log(error.message)
    }

}

module.exports = Uzbek
