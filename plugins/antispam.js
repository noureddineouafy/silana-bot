export async function before(m) {
  this.spam = this.spam || {};
  const chat = global.db.data.chats[m.chat];

  if (chat.antiSpam && !m.isBaileys) {
  const sender = m.sender;
    const user = global.db.data.users[sender];
  const spamLimit = 3; // Batas pesan yang sama dari pengirim sebelum dianggap spam
  const spamTimeLimit = 3000; // Batas waktu cooldown dalam milidetik (dalam hal ini 3000ms = 3 detik)

  this.spam[sender] = this.spam[sender] || { count: 0, lastTime: 0 };
  const { count, lastTime } = this.spam[sender];

  const now = Date.now();
  if (now - lastTime <= spamTimeLimit) {
    if (count >= spamLimit) {
      const cooldownTime = (spamTimeLimit - (now - lastTime)) / 1000;
      const waitMessage = `⏳ *متصباميش اصاحبي *\nانتظر بضع ثوان   ${cooldownTime.toFixed(1)} ثانية`;
      await this.reply(m.chat, waitMessage, m, { mentions: [sender] });
      return false;
    } else {
      this.spam[sender].count++;
    }
  } else {
    this.spam[sender].count = 1;
    this.spam[sender].lastTime = now;
  }

  if (count >= spamLimit) {
  const warn = (user.warn || 0) + 1;
    if (warn < 10) {
        user.warn = warn;
        const remainingWarn = 10 - warn;
        const warnMessage = `❌ *من فضلك صديقي ❀ ممنوع سبام !*\nتحذير هذه هي الفرص التي تبقت لك و اذا استمررت في السبام سوف يتم حظرك من البوت: ${remainingWarn} فرصة`;
    await this.reply(m.chat, warnMessage, m, { mentions: [sender] });
      } else if (warn === 10) {
        //user.banned = true;
        user.warn = 0;
        const banMessage = "⛔️ * لقد تم حظرك بسبب البريد العشوائي! لقد قلنا لك ممنوع السبام لماذا لا تصبر اوا شفتي ها نتا دبا مبلوكي😌*";
        await this.reply(m.chat, banMessage, m, { mentions: [sender] });
      await this.updateBlockStatus(m.sender, "block");
      }
    this.spam[sender] = this.spam[sender] || { count: 0, lastTime: 0 };
    return false;
  }
  }
  return true;
}
