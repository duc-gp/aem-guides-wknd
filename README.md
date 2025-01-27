# Demo proxying clientlibs aka JavaScript changes DIRECTLY in AEM

This demo shows a different way to develop with AEM. Normally, frontend development is done separately using its own tools, and the real testing is done after copying the markup into Sightly (HTL) templates and deploying the clientlib to AEM to verify it works in AEM.

This demo repository allows you to make and test frontend changes directly in AEM without needing to fully deploy the code. For example, when fixing bugs, developers often need to first check if the markup in Sightly (HTL) matches the frontend style guide or local frontend tooling. Differences between the two can cause issues, and even if the markup matches, bugs might only appear in AEM. This setup allows changes to be tested and adjusted directly in AEM.

**This repository is just a copy from: [https://github.com/adobe/aem-guides-wknd](https://github.com/adobe/aem-guides-wknd) with very few changes to demonstrate the clientlib proxying.**

## How to use / test locally

- have your AEM Cloud running (had only been tested with AEM as a Cloud Service SDK)
- in root do: `mvn clean install -PautoInstallSinglePackage` to deploy once into AEM
- visit http://localhost:4502/content/wknd/us/en.html and checkout browser console - "hello world" should be printed
- go into ui.frontend and do `npm i`
- then run `npm run watch`
- revisit: http://localhost:4502/content/wknd/us/en.html but change port so you will visit: http://localhost:8080/content/wknd/us/en.html
- change the file ui.frontend/src/main/webpack/site/main.js by e.g. adjusting the console.log
- if the demo is working you should see the changes in your browser console
- what you have now is:
  - you can change aem content via http://localhost:8080/editor.html/content/wknd/us/en.html
  - and you can also change your javascript where the changes are directly reflected in aem
