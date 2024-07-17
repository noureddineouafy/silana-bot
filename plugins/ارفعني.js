// بيرفع المطور ادمن 🤣

const handler = async (_0x1730a3, {
  conn: _0x22de6a,
  isAdmin: _0x51b82d
}) => {
  if (_0x1730a3.fromMe) {
    return;
  }
  if (_0x51b82d) {
    throw "*[❗] انت ادمن اصلا يا مطوري ❤️*\n@201028085788";
  }
  try {
    await _0x22de6a.groupParticipantsUpdate(_0x1730a3.chat, [_0x1730a3.sender], "promote");
  } catch {
    await _0x1730a3.reply("*[❗] ايف مش قادر*");
  }
};
handler.command = /^ارفعني|adm$/i;
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;