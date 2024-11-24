import { exec as execAsync } from "child_process";
import { promisify } from "util";

const exec = promisify(execAsync).bind(null);

const handler = async (m, { conn }) => {
  let output;
  try {
    output = await exec("cd && du -h --max-depth=1");
  } catch (error) {
    output = error;
  } finally {
    const { stdout, stderr } = output;
    if (stdout.trim()) m.reply("```" + stdout + "```");
    if (stderr.trim()) m.reply("```" + stderr + "```");
  }
};

handler.help = ["disk"];
handler.tags = ["owner"];
handler.command = ["disk"];

export default handler;
