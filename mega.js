const mega = require("megajs");
const fs = require("fs");

const auth = {
  email: "sethustatus416@gmail.com",
  password: "CHALAH@1229@",
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
};

// ✅ Upload
const upload = (data, name) => {
  return new Promise((resolve, reject) => {
    const storage = new mega.Storage(auth);

    storage.on("ready", () => {
      console.log("Storage is ready. Proceeding with upload.");

      const uploadStream = storage.upload({ name, allowUploadBuffering: true });

      uploadStream.on("complete", (file) => {
        file.link((err, url) => {
          if (err) {
            reject(err);
          } else {
            storage.close();
            resolve(url);
          }
        });
      });

      uploadStream.on("error", (err) => {
        storage.close();
        reject(err);
      });

      data.pipe(uploadStream);
    });

    storage.on("error", (err) => reject(err));
  });
};

// ✅ Download
const download = (sessionId, outputPath) => {
  return new Promise((resolve, reject) => {
    const file = mega.File.fromURL(`https://mega.nz/file/${sessionId}`, { auth });

    file.loadAttributes((err) => {
      if (err) return reject(err);

      const writeStream = fs.createWriteStream(outputPath);
      file.download().pipe(writeStream);

      writeStream.on("finish", () => resolve(true));
      writeStream.on("error", reject);
    });
  });
};

module.exports = { upload, download };
