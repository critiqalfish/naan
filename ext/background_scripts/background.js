browser.contextMenus.create({
    id: "naan-menu-item",
    title: "naan",
    contexts: ["image", "video"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "naan-menu-item") {
        console.log(info.srcUrl);
        browser.storage.local.get(["urli", "pw"])
        .then((storage) => {
            fetch(storage.urli, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"urli": info.srcUrl, "pw": storage.pw})
            })
            .then(response => {
                response.json().then(respjson => {
                    console.log("naan code: ", response.status);
                    console.log("naan resp: ", respjson);
                    browser.notifications.create({
                        type: "basic",
                        iconUrl: browser.extension.getURL("icons/icon@2x.png"),
                        title: "naan",
                        message: response.status + " - " + respjson
                    });
                });
            })
            .catch((error) => {
                console.error("naan error: ", error);
            });
        });
    }
});
