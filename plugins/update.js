import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const owner = 'noureddineouafy';
const repo = 'silana-bot';

let handler = async (m, { text, usedPrefix, command }) => {

  if (!text) {
    try {
      const items = ['plugins', 'lib', 'tmp', 'package.json']; // العناصر (مجلدات أو ملفات)

      function generateRandomIP() {
        return Math.floor(Math.random() * 256) + '.' +
          Math.floor(Math.random() * 256) + '.' +
          Math.floor(Math.random() * 256) + '.' +
          Math.floor(Math.random() * 256);
      }

      function fetchAndSave(item) {
        const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${item}`;
        const localPath = path.join(__dirname, '..', item);

        axios.get(githubApiUrl, {
          headers: {
            'X-Forwarded-For': generateRandomIP()
          }
        })
        .then(response => {
          const data = response.data;

          if (Array.isArray(data)) {
            // إذا كان data مصفوفة، فهذا يعني أنه مجلد
            if (!fs.existsSync(localPath)) {
              fs.mkdirSync(localPath, { recursive: true });
              console.log(`Folder created: ${item}`);
            }

            data.forEach(file => {
              if (file.type === 'file' && file.name !== 'update.js') {
                const filePath = path.join(localPath, file.name);

                // تنزيل الملفات فقط إذا لم تكن موجودة
                if (!fs.existsSync(filePath)) {
                  axios.get(file.download_url, { responseType: 'arraybuffer', headers: { 'X-Forwarded-For': generateRandomIP() } })
                  .then(response => {
                    fs.writeFile(filePath, response.data, err => {
                      if (err) throw err;
                      console.log(`File saved: ${file.name}`);
                    });
                  })
                  .catch(err => {
                    console.error(`Error downloading file: ${file.name}`, err);
                  });
                }
              }
            });
          } else if (data.type === 'file') {
            // إذا كان data ملف
            // استبدال الملف إذا كان موجودًا
            axios.get(data.download_url, { responseType: 'arraybuffer', headers: { 'X-Forwarded-For': generateRandomIP() } })
            .then(response => {
              fs.writeFile(localPath, response.data, err => {
                if (err) throw err;
                console.log(`File saved: ${item}`);

                // إذا كان العنصر هو package.json، قم بتشغيل npm install
                if (item === 'package.json') {
                  exec('npm i', (err, stdout, stderr) => {
                    if (err) {
                      console.error(`Error running npm install: ${stderr}`);
                    } else {
                      console.log(`npm install completed: ${stdout}`);
                      m.reply(`*تم تحديث روبوتك* وتم تثبيت الحزم الجديدة بنجاح! 🥳`);
                    }
                  });
                }
              });
            })
            .catch(err => {
              console.error(`Error downloading file: ${item}`, err);
            });
          } else {
            console.log(`The item '${item}' does not exist in the repository or is not of type 'file'.`);
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            console.log(`The item '${item}' does not exist in the repository.`);
          } else {
            console.error(`Error fetching from GitHub API for item ${item}`, err);
            m.reply(`*اعد المحاولة بعد دقيقة* !!`);
          }
        });
      }

      items.forEach(item => {
        fetchAndSave(item);
      });

      m.reply(`*تم تحديث روبوتك*🥳`);
    } catch (error) {
      m.reply('An error occurred while updating. Ensure your bot is in a Git repository.');
    }
  } else {
    try {
      const files = [text];
      function generateRandomIP() {
        return Math.floor(Math.random() * 256) + '.' +
          Math.floor(Math.random() * 256) + '.' +
          Math.floor(Math.random() * 256) + '.' +
          Math.floor(Math.random() * 256);
      }

      function fetchAndSaveFile(filePath) {
        const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
        const localFilePath = path.join(__dirname, '..', filePath);

        axios.get(githubApiUrl, {
          headers: {
            'X-Forwarded-For': generateRandomIP()
          }
        })
        .then(response => {
          const data = response.data;

          if (data.type === 'file' && filePath !== 'plugins/update.js') {
            // استبدال الملف إذا كان موجودًا
            axios.get(data.download_url, { responseType: 'arraybuffer', headers: { 'X-Forwarded-For': generateRandomIP() } })
            .then(response => {
              fs.writeFile(localFilePath, response.data, err => {
                if (err) throw err;
                console.log(`File saved: ${filePath}`);

                // إذا كان الملف هو package.json، قم بتشغيل npm install
                if (filePath === 'package.json') {
                  exec('npm i', (err, stdout, stderr) => {
                    if (err) {
                      console.error(`Error running npm install: ${stderr}`);
                    } else {
                      console.log(`npm install completed: ${stdout}`);
                      m.reply(`*تم تحديث روبوتك* وتم تثبيت الحزم الجديدة بنجاح! 🥳`);
                    }
                  });
                }
              });
            })
            .catch(err => {
              console.error(`Error downloading file: ${filePath}`, err);
            });
          } else {
            console.log(`The file '${filePath}' does not exist or is not of type 'file'.`);
            m.reply(`*الملف ${filePath} غير موجود*!!`);
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            console.log(`The file '${filePath}' does not exist in the repository.`);
            m.reply(`*الملف ${filePath} غير موجود*!!`);
          } else {
            console.error(`Error fetching from GitHub API for file ${filePath}`, err);
            m.reply(`*انتظر دقيقة ثم اعد المحاولة* ❤️`);
          }
        });
      }

      files.forEach(file => {
        fetchAndSaveFile(file);
      });
    } catch (error) {
      m.reply('An error occurred while updating. Ensure your bot is in a Git repository.');
    }
  }
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.owner = true;

export default handler;
