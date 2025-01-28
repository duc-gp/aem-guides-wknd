# Demo: Proxying clientlibs aka JavaScript changes DIRECTLY in AEM

This demo shows a different way to develop with AEM. Normally, frontend development is done separately using its own tools, and the real testing is done after copying the markup into Sightly (HTL) templates and deploying the clientlib to AEM to verify it works in AEM.

This demo repository allows you to make and test frontend changes directly in AEM without needing to fully deploy the code. For example, when fixing bugs, developers often need to first check if the markup in Sightly (HTL) matches the frontend style guide or local frontend tooling. Differences between the two can cause issues, and even if the markup matches, bugs might only appear in AEM. This setup allows changes to be tested and adjusted directly in AEM.

**This repository is a copy of: [https://github.com/adobe/aem-guides-wknd](https://github.com/adobe/aem-guides-wknd) with very few changes to demonstrate the clientlib proxying.**

## How to use / test locally

1. Have your AEM Cloud running (tested only with AEM as a Cloud Service SDK).
2. In the root directory, run: `mvn clean install -PautoInstallSinglePackage` to deploy the package into AEM.
3. Visit: `http://localhost:4502/content/wknd/us/en.html` and check the browser console. You should see "hello world" printed.
4. Navigate to the `ui.frontend` directory and run:
   - `npm install`
   - `npm run watch`
5. Visit the proxied version of AEM (same path, different PORT): `http://localhost:8080/content/wknd/us/en.html`. This is where the live JavaScript changes will be reflected.
6. Modify the file `ui.frontend/src/main/webpack/site/main.js` (e.g., adjust the `console.log` statement).
7. If the demo is working, you should see the changes reflected in your browser console.

## Key Notes

- **AEM is proxied**: When visiting `http://localhost:8080/content/wknd/us/en.html`, you are accessing a proxied version of AEM that allows live JavaScript changes to be reflected without a full deployment. This is working because JavaScript is served directly through webpack devServer.
- **No additional libraries are required**: Only thing needed is webpack devServer and the correct proxy configuration.
- **Crucial configuration**: The key to this setup is the webpack devServer proxy configuration, which enables live reloading of JavaScript changes directly in AEM. For more details, see the https://github.com/duc-gp/aem-guides-wknd/blob/main/ui.frontend/webpack.dev.js file in the repository.

- crucial extract from configuration is:
  ```
  proxy: [
   {
     context: "/etc.clientlibs/wknd",
     target: "http://localhost:8080",
     pathRewrite: {
       [`/etc.clientlibs/wknd/clientlibs/clientlib-([a-zA-Z0-9-]+)?(\\.lc-[a-z0-9]+-lc)?(\\.min)?\\.([a-z]+)`]:
         "/clientlib-$1/$1.$4",
     },
     ...bypassAlreadyProxiedRequests,
   },
   {
     context: () => true,
     target: "http://localhost:4502",
     ...bypassAlreadyProxiedRequests,
   },
  ],
  ```
