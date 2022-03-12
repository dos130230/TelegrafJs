const { keyboard } = require('telegraf/markup')
const { Keyboard, Key } = require('telegram-keyboard')
const readJson = require('./readJson.js')

let cities = (readJson.select('cities'))
let districts = (readJson.select('districts'))


const keyboard1 = [
    Keyboard.make(['🇺🇿 Uzbek', '🇳🇱 Russian', '🇺🇸 English', '📨 Info'], { columns: 3, }).reply()

]


const keyboard2 = [
    Keyboard.make([...cities.map(el => el.name_uz), '↩️ Orqaga', '🏠 Bosh sahifa'], { columns: 2 }).reply()

]

const keyboard3 = (id, type) => {
    let array = districts.reduce((arr, el) => {
        if (el.cityId == id) {
            arr.push(el[type])
            return arr
        } else return arr
    }, [])
    return Keyboard.make([...array, '↩️ Orqaga', '🏠 Bosh sahifa'],
        {
            columns: 2,
        }).reply()

}

const keyboard4 = [
    Keyboard.make([['1️⃣', '2️⃣', '3️⃣', '4️⃣'], ['🔄 Hamma joyni band qilish'], ['↩️ Orqaga', '🏠 Bosh sahifa']], { columns: 4, }).reply()

]


const keyboard5 = [
    Keyboard.make(['↩️ Orqaga', '🏠 Bosh sahifa', '❌ Bekor qilish'], { columns: 2, }).reply()

]

const backHome = [
    Keyboard.make(['↩️ Orqaga', '🏠 Bosh sahifa'], { columns: 2, }).reply()

]

const keyboard6 = [
    [
        Keyboard.make([Key.callback('Shoshilinch', 'action1')]).inline(),
        Keyboard.make([Key.callback('Standart', 'action2')]).inline(),
        Keyboard.make([Key.callback('📝 Xaydovchi haqida', 'action3')]).inline()
    ],
    [
        Keyboard.make([Key.callback('Shoshilinch', 'action1')]).inline(),
        Keyboard.make([Key.callback('Standart', 'action2')]).inline(),
        Keyboard.make([Key.callback('📝 Xaydovchi haqida', 'action3')]).inline()
    ]
]

module.exports = {
    backHome,
    keyboard1,
    keyboard2,
    keyboard3,
    keyboard4,
    keyboard5,
    keyboard6
}
