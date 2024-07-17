
//import db from '../lib/database.js'

const free = 5000
const prem = 20000

let handler = async (m, {conn, isPrems }) => {
  let time = global.db.data.users[m.sender].lastclaim + 86400000
  if (new Date - global.db.data.users[m.sender].lastclaim < 86400000) throw `🎁 *Anda telah mengumpulkan hadiah harian Anda*\n\n🕚 Masuk kembali *${msToTime(time - new Date())}* `
  global.db.data.users[m.sender].exp += isPrems ? prem : free
  m.reply(`
🎁 *هدية يومية*

▢ *Anda telah menerima:*
🆙 *XP* : +${isPrems ? prem : free}`)
  global.db.data.users[m.sender]user.lastweekly = new Date * 1
}
handler.help = ['daily']
handler.tags = ['econ']
handler.command = ['اسبوعي']

export default handler



function clockString(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " Horas " + minutes + " Minutos"
}
