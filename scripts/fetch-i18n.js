import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const localesDirPath = path.join(__dirname, '../src/public/static/locales');

/* eslint-disable no-restricted-syntax */
const NS_PREFIX = `landing.mirror.`;

function prepareData(obj) {
  const filteredObj = {};
  for (const key in obj) {
    if (key.startsWith(NS_PREFIX)) {
      const formattedKey = key.replace(NS_PREFIX, '');
      filteredObj[formattedKey] = obj[key];
    }
  }
  return filteredObj;
}

async function writeDataToFile(lang, content) {
  const langFileName = path.join(localesDirPath, `${lang}.json`);

  try {
    await fs.writeFile(langFileName, JSON.stringify(content));
    // console.log(`The data was successfully written to the file ${langFileName}.`);
  } catch (err) {
    console.error(`Error while writing data to file ${langFileName}:`, err);
  }
}

(async () => {
  const langF = await fetch(`https://api.dilan-mirror.com/application/translations?limit=100000`);
  const langRes = await langF.json();

  const { data } = langRes;

  for (const lang in data) {
    if (data.hasOwnProperty(lang)) {
      try {
        await fs.access(path.join(localesDirPath, `${lang}.json`), fs.constants.F_OK);
      } catch (err) {
        if (err.code === 'ENOENT') {
          // console.log(`The file for the language ${lang} does not exist. Create a new one.`);
          await writeDataToFile(lang, prepareData(data[lang]));
          continue;
        }
        // console.error(`Error while checking file existence for language ${lang}:`, err);
        continue;
      }
      await writeDataToFile(lang, prepareData(data[lang]));
    }
  }
})();
