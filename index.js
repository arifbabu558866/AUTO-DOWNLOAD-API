const express = require("express");
const downloader = require("./downloader");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        status: "Server Running",
        author: "ARIF BABU"
    });
});

app.get("/downloader", downloader.initialize);

app.listen(PORT, () => {
    console.log("Arif babu Server started on port ❤️‍🔥" + PORT);
});
