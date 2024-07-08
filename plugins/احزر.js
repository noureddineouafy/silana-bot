let handler = async (m, { conn}) => {
let user = global.db.data.users[m.sender]
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let username = conn.getName(who)
let bv = `./anime/${pickRandom([ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96","97", "98", "99", "100"])}.jpg`
let av = `./src/mp3/${pickRandom([""])}.mp3`
  let text = `*أحـــزر الــشـخــصيـه !*`


conn.sendFile(m.chat, bv, text, '*أحـــزر الــشـخــصيـه !*', null, m, true, { type: 'pictureMessage', ptt: true })
conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true })
}

handler.customPrefix = /^(احزر)$/i
handler.command = new RegExp

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
