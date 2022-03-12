// const {bot} = require('../core/bot')

// function sendLiveLocation (ctx) {
//   let lat =  50.73041206078503
//   let lon = 87.84322191943783
//   ctx.replyWithLocation(lat, lon, { live_period: 60 }).then((message) => {
//     const timer = setInterval(() => {
//       ctx.telegram.editMessageLiveLocation(lat, lon, message.chat.id, message.message_id).catch(() => clearInterval(timer))
//     }, 1000)
//   })
// }

// bot.start(sendLiveLocation)
// bot.launch()

// const { bot } = require('../core/bot')
// const { Composer } = require('telegraf')
// const { keyboard1 } = require('../lib/keyboard')

// const { Markup } = require('telegraf');
// bot.command('location', ctx => {
//   ctx.telegram.sendLocation(ctx.message.chat.id, 15.12666, 58.58521,)
// })

// const Extra = require('telegraf/extra')
// const Markup = require('telegraf/markup')
// const { keyboard1 } = require('../lib/keyboard')

// bot.command('onetime', ({ reply }) =>
//   reply('One time keyboard', Markup
//     .keyboard(['/simple', '/inline', '/pyramid'])
//     .oneTime()
//     .resize()
//     .extra()
//   )
// )

// bot.command('custom', ({ reply }) => {
//   return reply('Custom buttons keyboard', keyboard1)

// })

// bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))
// bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'))

// bot.command('special', (ctx) => {
//   return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
//     return markup.resize()
//       .keyboard([
//         markup.contactRequestButton('Send contact'),
//         markup.locationRequestButton('Send location')
//       ])
//   }))
// })

// bot.command('pyramid', (ctx) => {
//   return ctx.reply('Keyboard wrap', Extra.markup(
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//     })
//   ))
// })

// bot.command('simple', (ctx) => {
//   return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
//     Markup.keyboard(['Coke', 'Pepsi'])
//   ))
// })

// bot.command('inline', (ctx) => {
//   return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
//     m.inlineKeyboard([
//       m.callbackButton('Coke', 'Coke'),
//       m.callbackButton('Pepsi', 'Pepsi')
//     ])))
// })

// bot.command('random', (ctx) => {
//   return ctx.reply('random example',
//     Markup.inlineKeyboard([
//       Markup.callbackButton('Coke', 'Coke'),
//       Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//       Markup.callbackButton('Pepsi', 'Pepsi')
//     ]).extra()
//   )
// })

// bot.command('caption', (ctx) => {
//   return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
//     Extra.load({ caption: 'Caption' })
//       .markdown()
//       .markup((m) =>
//         m.inlineKeyboard([
//           m.callbackButton('Plain', 'plain'),
//           m.callbackButton('Italic', 'italic')
//         ])
//       )
//   )
// })

// bot.hears(/\/wrap (\d+)/, (ctx) => {
//   return ctx.reply('Keyboard wrap', Extra.markup(
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       columns: parseInt(ctx.match[1])
//     })
//   ))
// })

// bot.action('Dr Pepper', (ctx, next) => {
//   return ctx.reply('👍').then(() => next())
// })

// bot.action('plain', async (ctx) => {
//   await ctx.answerCbQuery()
//   await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
//     Markup.callbackButton('Plain', 'plain'),
//     Markup.callbackButton('Italic', 'italic')
//   ]))
// })

// bot.action('italic', async (ctx) => {
//   await ctx.answerCbQuery()
//   await ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
//     Markup.callbackButton('Plain', 'plain'),
//     Markup.callbackButton('* Italic *', 'italic')
//   ])))
// })

// bot.action(/.+/, (ctx) => {
//   return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
// })

// bot.launch()


// ------------------------------------------------------------------------------------------

// const { keyboard2, keyboard3, keyboard1, keyboard4, keyboard5 } = require('../lib/keyboard')
// const { bot } = require('../core/bot')
// const readJson = require('../lib/readJson.js')
// const Extra = require('telegraf/extra')
// const Markup = require('telegraf/markup')

// const cities = readJson.select('cities')
// const districts = readJson.select('districts')
// let information = {}
// let FunctionStemp = []
// let userStep = 1

// bot.on(['text', 'contact', 'location'], msg => {
//     const chat_id = msg.chat.id
//     if (msg.message.text === '🇺🇿 Uzbek' && userStep == 1) {
//         userStep++
//         FunctionStemp.push(stemp1)
//         return stemp2(chat_id, msg)
//     }
//     else if (msg.updateSubTypes[0] == 'contact' && userStep == 2) {
//         userStep++
//         information.contact = msg.message.contact
//         FunctionStemp.push(stemp2)
//         return stemp3(chat_id, msg)
//     }
//     else if (msg.updateSubTypes[0] == 'location' && userStep == 3) {
//         userStep++
//         information.contact = msg.message.location
//         FunctionStemp.push(stemp3)
//         return stemp4(chat_id, msg)
//     }
//     else if (cities.map(el => el.name_uz).includes(msg.message.text) && userStep == 4) {
//         userStep++
//         information.cities = cities.find(el => el.name_uz == msg.message.text)
//         FunctionStemp.push(stemp4)
//         return stemp5(chat_id, msg)
//     }
//     else if (districts.map(el => el.name_uz).includes(msg.message.text) && userStep == 5) {
//         userStep++
//         information.districts = districts.find(el => el.name_uz == msg.message.text)
//         FunctionStemp.push(stemp5)
//         return stemp6(chat_id, msg)
//     }
//     else if (['1️⃣', '2️⃣', '3️⃣', '4️⃣', '🔄 Hamma joyni band qilish'].includes(msg.message.text) && userStep == 6) {
//         userStep++
//         information.count = msg.message.text
//         FunctionStemp.push(stemp6)
//         return stemp7(chat_id, msg)
//     }
//     else if (['Standart', 'Shoshilinch'].includes(msg.message.text) && userStep == 7) {
//         userStep++
//         information.definition = msg.message.text
//         FunctionStemp.push(stemp7)
//         return stemp8(chat_id, msg)
//     }
//     else if (msg.message.text == '🏠 Bosh sahifa') {
//         userStep = 1
//         FunctionStemp = []
//         return stemp1(chat_id, msg)
//     }
//     else if (msg.message.text == '↩️ Orqaga' && [1, 2, 3, 4, 5,6,7,8,9].includes(userStep)) {
//         if (!FunctionStemp.length) return
//         --userStep
//         return FunctionStemp.pop()(chat_id, msg)
//     }
// })


// // bosh sahifa
// const stemp1 = (chat_id, msg) => {
//     return msg.telegram.sendMessage(chat_id, 'Iltimos Tilni Tanlang!', keyboard1)
// }
// // contact kiritish
// const stemp2 = (chat_id, msg) => {
//     return msg.reply('Iltimos Telefon nomerni kiriting!', Extra.markup((markup) => {
//         return markup.resize()
//             .keyboard([[
//                 markup.contactRequestButton('📞 Contact yuborish'),
//                 markup.contactRequestButton("Qo'shimcha Contact")
//             ], ['↩️ Orqaga', '🏠 Bosh sahifa']])
//     }))
// }

// // location kiritish
// const stemp3 = (chat_id, msg) => {
//     return msg.reply('Iltimos Xozir Turgan Joyningizni kiriting!', Extra.markup((markup) => {
//         return markup.resize()
//             .keyboard([[
//                 markup.locationRequestButton('📍 Location yuborish')
//             ], ['↩️ Orqaga', '🏠 Bosh sahifa']])
//     }))
// }


// // Viloyatlarin beardi
// const stemp4 = (chat_id, msg) => {
//     return msg.telegram.sendMessage(chat_id, 'Iltimos Shaxarni Tanlang!', keyboard2)
// }

// // Tumani beradi
// const stemp5 = (chat_id, msg) => {
//     return msg.telegram.sendMessage(chat_id, 'Iltimos Tumani tanlang!', keyboard3(information.cities.id))
// }

// const stemp6 = (chat_id, msg) => {
//     return msg.telegram.sendMessage(chat_id, 'Iltimos Joyni tanlang!', keyboard4)

// }

// const stemp7 = (chat_id, msg) => {
//     return msg.telegram.sendMessage(chat_id, 'Iltimos Tarifni tanlang!', keyboard5)

// }


// const stemp8 = (chat_id, msg) => { 
//     return msg.telegram.sendMessage(chat_id,JSON.stringify(information))
// }


