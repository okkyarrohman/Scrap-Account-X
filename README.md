# Twitter Scraper Script

This script uses Playwright to scrape Twitter (X) for user data (usernames) based on a search query. The data is collected by scrolling through the search results and extracting usernames that match the search criteria. The script ensures that the usernames are unique and saves them to a CSV file.

## Technologies Used

### 1. **Playwright**
   - **Version**: v1.x.x
   - **Description**: Playwright is an open-source automation library for browser testing and web scraping. It allows interaction with modern web pages via browser automation (e.g., Chromium, Firefox, and WebKit). This script uses Playwright to launch a Chromium browser and navigate through Twitter's search results.
   - **Usage**: Playwright is used to automate the process of opening the Twitter search page, scrolling through the results, extracting usernames, and saving them.

### 2. **Chromium**
   - **Description**: Chromium is the open-source web browser on which Google Chrome is based. This script uses Chromium to perform web scraping operations in a browser environment.
   - **Usage**: The script launches Chromium in persistent context mode using a local Chrome profile to simulate a user session, ensuring that the script behaves as though it is interacting with the site in a real browser session.

### 3. **Node.js**
   - **Version**: v14.x.x or higher
   - **Description**: Node.js is a JavaScript runtime used to execute the script. It allows us to run JavaScript outside the browser, enabling server-side operations like file saving, managing async operations, etc.
   - **Usage**: Node.js is used for running the script, handling asynchronous operations, and performing file operations to save the scraped data.

### 4. **File System (fs module)**
   - **Description**: The `fs` module in Node.js provides file system-related functionality.
   - **Usage**: The script uses the `fs` module to write the scraped usernames to a CSV file. The unique usernames are saved in `usernames.csv`.

## Job Description

The purpose of this script is to scrape Twitter (X) user data (specifically usernames) based on a search query. The script performs the following tasks:

### 1. **Setup and Browser Launch**
   - The script launches a Chromium browser using Playwright with a persistent context that uses an existing Google Chrome profile for session management.
   - The browser is launched in non-headless mode (with UI) to visually observe the process during execution.

### 2. **Scraping Data**
   - The script navigates to the Twitter search page with a specified search query (`"tugas sekolah kuliah"`).
   - It waits for the page to load and starts scraping the usernames of users who appear in the search results.
   - It continuously scrolls down the page and scrapes the usernames until it either reaches a target number (2000 unique usernames) or no more usernames can be found.
   
### 3. **Data Filtering**
   - The script filters out any elements that do not contain an "@" symbol (ensuring only valid usernames are collected).
   - The usernames are stored in a `Set` data structure to ensure that all usernames are unique.

### 4. **Stopping Condition**
   - The script stops scraping once 2000 usernames are collected or if there are no more usernames to scrape (i.e., if the relevant elements are no longer available on the page).

### 5. **Saving Data**
   - After scraping, the unique usernames are saved to a CSV file (`usernames.csv`). Each username is placed on a new line and properly escaped if necessary.

### 6. **Browser Cleanup**
   - Once the scraping is complete, the browser is closed, and the script finishes execution.

## How to Run the Script

1. **Install Playwright**
   To install Playwright, run the following command:
   ```bash
   npm install playwright
