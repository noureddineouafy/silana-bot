import fetch from "node-fetch";

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`أدخل نصاً أو قم بالرد على رسالة تحتوي على النص الذي تريد معالجته.\nمثال الاستخدام:\n*${usedPrefix}${command} مرحبا، كيف حالك؟*`);
  
  m.react(wait);

  try {
    let res;
    if (command === "aigroq") {
      res = await groq(text);
    } else if (command === "fgemini") {
      res = await gemini(text);
    }
    m.reply(res);
  } catch (e) {
    m.react('error');
  }
};

handler.help = ["fgemini"];
handler.tags = ["ai"];
handler.command = /^(fgemini)$/i;

export default handler;

async function groq(q) {
  try {
    const { data } = await (await fetch("https://api-zenn.vercel.app/api/ai/groq?q=" + q))?.json();
    return data;
  } catch (error) {
    throw new Error("خطأ:", error.message);
  }
}

async function gemini(q) {
  try {
    const res = await fetch("https://functio.vercel.app/api/ai/gemini/generate", {
      method: "POST",
      body: JSON.stringify({ req: q })
    });
    const payload = (await res.json())?.desc;
    return payload;
  } catch (error) {
    throw new Error("خطأ:", error.message);
  }
}
