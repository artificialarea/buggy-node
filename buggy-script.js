const fs = require('fs');
const path = require('path');

const source = process.argv[2];
const target = process.argv[3];

// read contents of source
const contentsOfSource = fs.readFileSync(source, 'utf-8');

// get lines of source into an array, remove empty lines
const linesInSource = contentsOfSource.split('\n').filter(Boolean);

// make the target dir if it doesn't exist
if (!fs.existsSync(target)) {
  fs.mkdirSync(target);
}

// iterate over the lines
linesInSource.forEach(line => {
  // get the content of the lines, first word is a filename, rest is content
  const [ filename, ...contentArr ] = line.split(' ');

  // convert content array to string, removing commas if applicable
  const contentString = contentArr.join(' ')
  // console.log(contentArr);
  // console.log(contentString);

  // construct the full path for the file to create
  const newFilePath = path.join(__dirname, target, filename);

  // write the file and it's contents
  fs.writeFileSync(
    newFilePath,
    // contentArr,
    contentString,
    { flag: 'w+', encoding: 'utf-8' }
  );
});


/* NOTES TO SELF /////////////////////////////////////

[1] $ node buggy-script.js ./source.txt ./targetdir
generates a series of files in ./targetdir, per source.txt, via terminal

[2] "args": ["./source.txt", "./targetdir"]
added these arguments in launch.json so node debugger works (sans terminal)


*/