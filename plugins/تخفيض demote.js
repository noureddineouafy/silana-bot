const handler = async (m, {conn, usedPrefix, text}) => {
  if (isNaN(text) && !text.match(/@/g)) {

  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  if (!text && !m.quoted) return conn.reply(m.chat, `*[❗] استخدام صحيح*\n\n*┯┷*\n*┠≽ ${usedPrefix}الامر الموضح @منشن*\n*┠≽ ${usedPrefix}تخفيض الادمن -> قم بالرد على الرسالة*\n*┷┯*`, m);
  if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `*[ ⚠️ ] الرقم الذي أدخلته غير صحيح، يرجى إدخال رقم صحيح*`, m);

  try {
    if (text) {
      var user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net';
    }
  } catch (e) {
  } finally {
    conn.groupParticipantsUpdate(m.chat, [user], 'demote');
    conn.reply(m.chat, `*[ ✅ ] تم تنزيله من الاشراف ،نشكر جهوده ونتمنى له التوفيق في المستقبل*`, m);
  }
};
handler.help = ['*2011xxx*', '*@usuario*', '*responder chat*'].map((v) => 'demote ' + v);
handler.tags = ['group'];
handler.command = /^(demote|إزالة المشرف|ازالة المشرف|خفض|تخفيض)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;
export default handler;
