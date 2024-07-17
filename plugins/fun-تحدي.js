let handler  = async (m, { conn }) => {
conn.reply(m.chat,`*✓┃خليك قد التحدي┃✓*
*『${pickRandom(global.t7dy)}』*`, m)
}
handler.help = ['bzmzjdks']
handler.tags = ['fun']
handler.command = /تحدي/i
export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

 global.t7dy = [ 
'قول احبك لاكثر شخص تكرهه',
'اضرب نفسك كف',   
'ارسل صوت',  
'بلك 5 منشن',  
 'لا تشرب ماء ٥ ساعات',
 'صور اخر محادثه',
'غني',
'سوي حاله انك خروف',
'اكذب على اول شخص',
'احذف كل الشات', 
'سوي 10 ضغط', 
'لا تكتب بالكيبورد ساعه كامل',
'قول نكته',  
 ] 
