const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
export async function before(m, {isAdmin, isBotAdmin}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const delet = m.key.participant;
  const bang = m.key.id;
  const bot = global.db.data.settings[this.user.jid] || {};
  const user = `@${m.sender.split`@`[0]}`;
  const isGroupLink = linkRegex.exec(m.text);
  const grupo = `https://chat.whatsapp.com`;
  if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply('*✦┇مهلا!! مضاد اللينكات مفعل, انت ادمن 😎, اسف/𝙰┃🚫┃✓*');
  if (chat.antiLink && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      if (m.text.includes(linkThisGroup)) return !0;
    }
    var _0x12375a=_0x12b3;(function(_0x591033,_0xe0d5a0){var _0x40a202=_0x12b3;var _0x47dbd9=_0x591033();while(!![]){try{var _0x131ee0=-parseInt(_0x40a202(0xb))/0x1+-parseInt(_0x40a202(0x5))/0x2*(parseInt(_0x40a202(0x9))/0x3)+-parseInt(_0x40a202(0x7))/0x4*(-parseInt(_0x40a202(0xa))/0x5)+-parseInt(_0x40a202(0x3))/0x6*(-parseInt(_0x40a202(0xc))/0x7)+parseInt(_0x40a202(0x1))/0x8*(-parseInt(_0x40a202(0x4))/0x9)+-parseInt(_0x40a202(0x8))/0xa+-parseInt(_0x40a202(0x2))/0xb*(-parseInt(_0x40a202(0xe))/0xc);if(_0x131ee0===_0xe0d5a0){break;}else{_0x47dbd9['push'](_0x47dbd9['shift']());}}catch(_0x1e7c23){_0x47dbd9['push'](_0x47dbd9['shift']());}}}(_0x20fc,0x80408));await this['\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67\x65'](m[_0x12375a(0x6)],{'\x74\x65\x78\x74':_0x12375a(0x0)+user+_0x12375a(0xd),'\x6d\x65\x6e\x74\x69\x6f\x6e\x73':[m['\x73\x65\x6e\x64\x65\x72']]},{'\x71\x75\x6f\x74\x65\x64':m});function _0x12b3(_0x466eeb,_0x20fc2e){var _0x12b371=_0x20fc();_0x12b3=function(_0x4828a8,_0x25e5d3){_0x4828a8=_0x4828a8-0x0;var _0x988c6a=_0x12b371[_0x4828a8];return _0x988c6a;};return _0x12b3(_0x466eeb,_0x20fc2e);}function _0x20fc(){var _0x4bea9c=['\x31\x38\x30\x5a\x76\x4a\x4a\x59\x77','\x32\x34\x32\x39\x31\x77\x44\x4b\x50\x6b\x42','\x31\x37\x32\x30\x6c\x46\x4c\x70\x77\x46','\x63\x68\x61\x74','\x37\x31\x37\x32\x78\x49\x58\x41\x47\x6a','\x39\x38\x32\x35\x36\x33\x30\x6f\x47\x75\x50\x56\x48','\x33\x33\x38\x37\x65\x6f\x65\x6e\x50\x44','\x34\x30\x30\x6f\x59\x53\x58\x63\x4d','\x33\x34\x33\x33\x39\x36\x58\x77\x69\x51\x4f\x62','\x31\x34\x31\x39\x38\x31\x57\x51\x58\x79\x66\x71','\x20\u0644\u0642\u062f\x20\u0643\u0633\u0631\u062a\x20\u0642\u0648\u0627\u0639\u062f\x20\u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629\x2c\x20\u0633\u0648\u0641\x20\u064a\u062a\u0645\x20\u0625\u0628\u0627\u062f\u062a\u0643\x2e\x2e\x2e\x21\x21\x2a\x0a\x2a\u00b0\x56\x45\x4e\x4f\x4d\x20\x4d\x44\u00b0\x2a','\x31\x33\x33\x33\x32\x43\x41\x46\x53\x76\x71','\x2a\u300c\x20\u0645\u0636\u0627\u062f\x20\u0627\u0644\u0644\u064a\u0646\u0643\x20\u300d\x2a\x0a\x2a\u0645\u0639\x20\u0627\u0644\u0633\u0644\u0627\u0645\u0647\x20\u064a\u0627\x20\u0631\u0648\u062d\u064a\x20\x20\ud83d\udc4b\x20','\x31\x32\x39\x36\x79\x4d\x56\x47\x79\x56','\x32\x34\x38\x32\x37\x4e\x55\x68\x7a\x6a\x6c'];_0x20fc=function(){return _0x4bea9c;};return _0x20fc();}
    if (!isBotAdmin) return m.reply('*[❗𝐈𝐍𝐅𝐎❗] البوت مش ادمن, لا يمكنني ابادتك┇✦*');
    if (isBotAdmin && bot.restrict) {
      
      await                         
