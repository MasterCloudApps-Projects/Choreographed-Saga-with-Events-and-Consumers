import 'cypress-mochawesome-reporter/register';
import addContext from 'mochawesome/addContext';
//import {readFileSync} from "fs";


Cypress.on('test:after:run', async (test, runnable) => {
  addContext({test}, `../../videos/${Cypress.spec.name}.mp4`);
});

/*Cypress.on('after:spec', (spec, results) => {
  spec.tests[0].body = readFileSync(Cypress.spec.absolute).toString();
});
*/
