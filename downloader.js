const nexo = require("nexo-aio-downloader");

exports.config = {
    name: 'downloader',
    author: 'ARIF BABU',
    description: 'Multi platform media downloader',
    method: 'get',
    category: 'downloader',
    link: ['/downloader']
};

const supportedPlatforms = {
    youtube: /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.*/,
    twitter: /https?:\/\/(www\.)?(twitter\.com|x\.com)\/.*/,
    instagram: /https?:\/\/(www\.)?instagram\.com\/.*/,
    facebook: /https?:\/\/(www\.)?facebook\.com\/.*/,
    tiktok: /https?:\/\/(www\.)?(tiktok\.com|vt\.tiktok\.com)\/.*/,
    pinterest: /https?:\/\/(www\.)?pinterest\.(com|in|co\.uk)\/.*/,
    "google-drive": /https?:\/\/(www\.)?drive\.google\.com\/.*/,
    sfile: /https?:\/\/(www\.)?sfile\.mobi\/.*/
};

exports.initialize = async ({ req, res }) => {
    try {
        let url = req.query.url;

        if (!url) {
            return res.status(400).json({
                error: "Use ?url=media_link"
            });
        }

        if (!url.startsWith("http")) {
            url = "https://" + url;
        }

        const platform = Object.keys(supportedPlatforms)
            .find(p => supportedPlatforms[p].test(url));

        if (!platform) {
            return res.status(400).json({
                error: "Unsupported URL"
            });
        }

        let data;
        switch (platform) {
            case "youtube":
                data = await nexo.youtube(url);
                break;
            case "twitter":
                data = await nexo.twitter(url);
                break;
            case "instagram":
                data = await nexo.instagram(url);
                break;
            case "facebook":
                data = await nexo.facebook(url);
                break;
            case "tiktok":
                data = await nexo.tiktok(url);
                break;
            case "pinterest":
                data = await nexo.pinterest(url);
                break;
            case "google-drive":
                data = await nexo.googleDrive(url);
                break;
            case "sfile":
                data = await nexo.sfile(url);
                break;
        }

        res.json({
            author: "ARIF BABU",
            platform,
            result: data
        });

    } catch (err) {
        console.error("Downloader error:", err);
        res.status(500).json({
            error: "Download failed"
        });
    }
};
