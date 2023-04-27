/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
import fs from 'fs';
import { validate } from 'email-domain-validator';
function validateEmailAddresses(inputPath: string[], outputFile: string) {
  console.log('Complete the implementation in src/validation.ts');

  const data = fs.readFileSync(inputPath[0], 'utf-8');

  const emailArray = data.trim().split('\n');

  const emailHeader = emailArray.shift();

  const wellFormedEmail = emailArray.filter((email) => {
    return email.split('@')[1].split('.').length > 1;
  });

  const isValidDomain = async () => {
    interface validDomain {
      isValidDomain: boolean;
      erorrMessage: [];
      invalidEmailList: [];
    }

    const validDomainEmailArray = [];
    for (const email of wellFormedEmail) {
      const check: validDomain = (await validate(email)) as validDomain;

      if (check.isValidDomain === true) {
        validDomainEmailArray.push(email);
      }
    }
    return validDomainEmailArray;
  };

  const resultArray = isValidDomain();

  resultArray.then((res) => {
    const csvFile = [emailHeader, ...res].join('\n');
    fs.writeFile(outputFile, csvFile, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('File saved successfuly');
    });
  });
}
// validateEmailAddresses(['./fixtures/inputs/small-sample.csv'] , 'report-validation.csv')
export default validateEmailAddresses;
