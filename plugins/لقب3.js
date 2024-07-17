let handler = async function (m, { conn, args }) {
  let groupInfo = await conn.groupMetadata(m.chat);

  if (!groupInfo) {
    return m.reply('تعذر الحصول على معلومات المجموعة.');
  }

  let groupMembers = groupInfo.participants;
  let registeredUsers = Object.values(global.db.data.users)
    .filter(user => user.registered && user.name.match(/[\u0600-\u06FF]/))
    .map(user => user.name)
    .sort((a, b) => a.localeCompare(b, 'ar'))

  if (registeredUsers.length === 0) {
    return m.reply('لم يتم تسجيل اي لقب بعد');
  }

  let namesList = '*❃ ──────⊰ ❀ ⊱────── ❃*\n                    *الألقاب المأخوذة* ';
  let currentLetter = '';

  for (let name of registeredUsers) {
    let firstLetter = name.charAt(0);
    if (firstLetter !== currentLetter) {
      namesList += `\n*❃ ──────⊰ ${firstLetter} ⊱────── ❃*\n\n`;
      currentLetter = firstLetter;
    }
    namesList += `◍ *${name}* \n`;
  }

  let registeredCount = registeredUsers.length;
  let totalMembers = groupMembers.length;

  namesList += `\n*❃ ──────⊰ ❀ ⊱────── ❃*\n`;
  namesList += (registeredCount === totalMembers) ? '◍ *تم تسجيل جميع الأعضاء*\n' : `عدد المسجلين: *${registeredCount} / ${totalMembers}*\n`;
  namesList += '*❃ ──────⊰ ❀ ⊱────── ❃*'; // Added line


  conn.reply(m.chat, namesList.trim(), m);
}

handler.help = ['قائمة'];
handler.tags = ['قائمة', 'أسماء', 'عربية'];
handler.command = ['القاب', 'الألقاب', 'الالقاب'];
handler.group = true;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;

export default handler;
