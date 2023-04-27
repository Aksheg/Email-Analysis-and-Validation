/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
import fs from 'fs';
function analyseFiles(inputPaths: string[], outputPath: string) {
  console.log('Complete the implementation in src/analysis.ts');

  const data = fs.readFileSync(inputPaths[0], 'utf-8');

  const emailArray = data.trim().split('\n');

  const emailHeader = emailArray.shift();

  const wellFormedEmail = emailArray.filter((email) => {
    return email.split('@')[1].split('.').length > 1;
  });

  const store: Record<string, number> = {};
  for (const email of wellFormedEmail) {
    const domain = email.split('@')[1];
    if (!store[domain]) {
      store[domain] = 1;
    } else {
      store[domain]++;
    }
  }

  const validDomains = Object.keys(store);

  const totalEmailsParsed = emailArray.length;

  const totalValidEmails = wellFormedEmail.length;

  const resultObject = {
    'valid-domain': validDomains,
    totalEmailsParsed,
    totalValidEmails,
    categories: store,
  };

  const jsonResultObject = JSON.stringify(resultObject);
  fs.writeFile(outputPath, jsonResultObject, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('File stored successfuly');
  });
}
// analyseFiles(['./fixtures/inputs/small-sample.csv'] , 'report-analysis.json')
export default analyseFiles;
