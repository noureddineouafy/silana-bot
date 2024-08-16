let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text }) => {
  let [_, code] = text.match(linkRegex) || [];
  if (!code) throw "*مثال*\n*.join (رابط المجموعة)*";
  try {
    const res = await conn.groupAcceptInvite(code);
  } catch (e) {
    throw `Error`;
  } finally {
    m.reply(
      `تم الانضمام بنجاح لـــ  : *[ ${(await conn.groupGetInviteInfo(code)).id} ]*`,
    );
  }
};
handler.help = ["join"];
handler.tags = ["owner"];
handler.command = ["join"];
handler.owner = true;
export default handler ;
