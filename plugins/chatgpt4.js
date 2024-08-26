import { G4F } from 'g4f';

const handler = async (m, { text }) => {
  if (!text) {
    return m.reply("يرجى إدخال الاستعلام!");
  }

  let g4f = new G4F();

  try {
    const message = [
      {
        role: "system",
        content: "You are a good component",
      },
      {
        role: "assistant",
        content: "Hello, how can I help you?",
      },
      {
        role: "user",
        content: text,
      },
    ];

    let result = await g4f.chatCompletion(message);
    m.reply(result);
  } catch (e) {
    console.log(e);
    m.reply("حدث خطأ.");
  }
};

handler.command = handler.help = ["chatgpt4"];
handler.tags = ["ai"];

export default handler;
