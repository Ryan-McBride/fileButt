const fs = require('fs');
const inquirer = require('inquirer');
const colors = require('colors/safe');

const addLeadingZero = (val) => (String(val).length < 2 ? `0${val}` : val);

inquirer
  .prompt([
    {
      type: 'input',
      name: 'directory',
      message: 'Enter directory absolute path',
    },
    {
      type: 'input',
      name: 'season',
      message: 'Enter Season Number',
    },
  ])
  .then((resp) => {
    const files = fs.readdirSync(resp.directory);
    files.forEach((file, index) => {
      const extension = file.replace(/^.*\./g, '');
      const oldAbsolute = `${resp.directory}\\${file}`;
      const newFileName = `s${addLeadingZero(resp.season)}e${addLeadingZero(index + 1)}.${extension}`;
      const newAbsolute = `${resp.directory}\\${newFileName}`;
      try {
        fs.renameSync(oldAbsolute, newAbsolute);
      } catch (err) {
        console.log(colors.red(`${newFileName} <- ${file}`));
        console.log(err);
      }
      console.log(colors.green(`${newFileName} <- ${file}`));
    });
  })
  .catch((error) => {
    console.error(error);
  });
