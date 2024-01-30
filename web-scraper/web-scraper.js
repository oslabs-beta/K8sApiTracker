import puppeteer from "puppeteer";

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({headless: "new"});
  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://github.com/kubernetes/api/blob/master/admission/v1/types.go", {
    waitUntil: "domcontentloaded",
  });

  const array = await page.evaluate(() => {
    let arr = [];
    //const folders = document.querySelectorAll(".Link--primary");
    const folders = document.querySelectorAll('[aria-label="file content"]')
    //const folders = document.querySelectorAll(".PRIVATE_TreeView-item-container");
    
    // folders.forEach(folder => {
    //     // Extract properties like 'textContent', 'href', etc.
    //     let folderDetails = {
    //       text: folder.textContent, // Text inside the node
    //       href: folder.getAttribute('href') // 'href' attribute of the node
    //       // You can add more properties as needed
    //     };
    //     arr.push(folderDetails);
    //   });
    return folders;
  })
  console.log(array)
//   array.forEach((element, index, array)=>{
//     console.log(element)
//   })

  // close the browser
  await browser.close();
};

// Start the scraping
getQuotes();



    // Iterate through each folder:
        // Iterate through each subfolder:
        // For each api type, check if it's deprecated or not in the types.go file. If its deprecated:
            // Create a new object
            // Add all the properties
                // Group
                // Version
                // Kind
                // Description
                // Introduced
                // Deprecated
                // Removed
                // Replacement
            // Add the object to the array
    // Convert the array to json
    // Return the array  