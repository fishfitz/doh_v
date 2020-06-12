const path = require('path');
const colors = require('colors');
const prompts = require('prompts');
const puppeteer = require('puppeteer');

const tops = [
  'http://www.root-top.com/topsite/virtu4ldreaiviz/in.php?IDmark=5301',
  'http://www.root-top.com/topsite/gilgamesh/in.php?IDmark=8077',
  'http://www.root-top.com/topsite/virtu4lgames/in.php?IDmark=5842',
  // 'http://www.root-top.com/topsite/obsession27/in.php?IDmark=25262',
];

let name;
let executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
let voteCount = 0;

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const vote = async (page, top) => {
  await page.goto(top);
  await page.goto(top);
  await page.$eval('input[name=votant]', e => e.value = name);
  await page.click('input[type=image]');
};

const voteForAll = async () => {
  const browser = await puppeteer.launch({ executablePath });
  const page = await browser.newPage();
  console.log('(◉ ω ◉)'.red, '🗩 ', `Il est ${new Date().toLocaleTimeString()} ! C'est l'heure de voter. `);
  for (const top of tops) {
    let topName = top.split('/')[4];
    try {
      await vote(page, top);
      voteCount++;
      console.log('(•̀ᴗ•́)'.red, '🗩 ', `Le vote pour ${topName} a réussi. `);
    }
    catch(e) {
      console.log('(′︿‵｡)'.red, '🗩 ', `Le vote pour ${topName} a échoué. Peut-être tu avais déjà voté ? `);
    }
  }
  try { await browser.close(); } catch(e) {}
  console.log('(︶^︶)'.red, '🗩 ', `On en est à ${voteCount} vote${voteCount > 1 ? 's' : ''} ! `);

  let delay =  1000 * 60 * 60 * 2 + 1000 * 60 + random(0, 1000 * 30);
  setTimeout(voteForAll, delay);

  console.log('(｡◕‿◕｡)'.red, '🗩 ', `Prochain vote à ${new Date(Date.now() + delay).toLocaleTimeString()}. `);
};

const browserIsOK = async () => {
  try {
    const browser = await puppeteer.launch({ executablePath });
    try { await browser.close(); } catch(e) {}
    return true;
  }
  catch (e) {
    return false;
  }
};

(async () => {
  console.log('(◍•ᴗ•◍)'.red, '🗩 ', 'Psst ! Eh ! Toi ! Oui toi ! ');
  console.log('(◍ ⌣̎ ◍)'.red, '🗩 ', 'Tu cherches des pièces pour ton prochain costume ? Ou des trucs plus... rares ? ');
  console.log('( ͡° ͜ʖ ͡°)'.red, '🗩 ', 'Eheh, j\'en étais sûr. J\'ai juste besoin de ton nom. ');
  name = (await prompts({
    type: 'text',
    name: 'name',
    initial: 'Oscar Oskar',
    message: 'Ton nom :',
  })).name.replace(/[^a-zA-Z ]/g, "");

  if (name === 'Oscar Oskar') console.log('(･ิω･ิ)'.red, '🗩 ', 'C\'est pour moi alors. ');
  else console.log('(˘⌣˘)ʃ'.red, '🗩 ', `OK ! Les votes seront enregistrés pour ${name} ! `);

  while (!(await browserIsOK())) {
    console.log('(⇀‸↼‶)'.red, '🗩 ', 'J\'ai pas réussi à ouvrir ton navigateur... Où il est ? ');
    executablePath = (await prompts({
      type: 'text',
      name: 'name',
      initial: executablePath,
      message: 'Chemin vers chrome ou chromium :',
    })).name;
  }

  voteForAll();
})();