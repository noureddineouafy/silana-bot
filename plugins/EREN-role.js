let axios = require('axios')

let handler = async (m, { conn }) => {
    if (!m.text.includes('صباحاا الخير')) return // يتأكد من وجود كلمة "صباح الخير" في الرسالة

    // يقوم بالرد برسالة "صباح النور!"
    await conn.reply(m.chat, 'صباح النور!', m)

    // يقوم بجلب صورة صباحية
    let res = await axios.get('https://source.unsplash.com/featured/?morning', { responseType: 'arraybuffer' })
    if (!res.data) throw 'Failed to fetch data'

    // يقوم بإرسال الصورة كجواب
    await conn.sendFile(m.chat, res.data, 'morning.jpg', 'صباحاا الخير 🍁', m, false, { quoted: m })
}

handler.customPrefix = /^(صباح الخير)$/i // يحدد الكود كيفية استجابة الروبوت على الرسائل التي تحتوي على "صباح الخير"
module.exports = handler
