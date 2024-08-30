import { tmpdir } from 'os';
import { join } from 'path';
import fs from 'fs';

const handler = async (m, { args, text, usedPrefix, command, conn }) => {
  // معلومات حول الاستخدام
  const info = `${usedPrefix + command} <Old name> | <New name>
*📌_ • مثال:_*
➞ ${usedPrefix + command} inv | rpg-inv
*_🗒️ • ملاحظة:_*
لا تستخدم امتداد .js في نهاية الجملة وتأكد من أن الكلمة لا تحتوي على مسافات "rpg-inv"`;

  if (!args[0]) throw info;
  if (args[1] !== "|") throw `• *📌_ • مثال:_*:
➞ \n ${usedPrefix + command} apk | apkdl`;
  if (!args[2]) throw `• مثال:
➞ ${usedPrefix + command} inv | rpg-inv`;

  const from = args[0];
  const to = args[2];
  const ar = Object.keys(plugins);
  const ar1 = ar.map(v => v.replace('.js', ''));

  if (!ar1.includes(from)) {
    return m.reply(`*🗃️ لم يتم العثور على الملف!*\n==================================\n\n${ar1.map(v => ' ' + v).join`\n`}`);
  }

  // إعادة تسمية الملف
  await fs.renameSync(`./plugins/${from}.js`, `./plugins/${to}.js`);
  conn.reply(m.chat, `تم بنجاح تغيير "plugins/${from}.js" إلى "plugins/${to}.js"`, m);
};

handler.help = ['renameplugin']
handler.tags = ['owner']
handler.command = /^(renameplugin)$/i;
handler.owner = true;

export default handler;
