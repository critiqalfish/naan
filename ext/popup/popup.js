browser.storage.local.get(["urli", "pw"])
.then((storage) => {
    document.getElementById("urli").value = storage.urli;
    document.getElementById("pw").value = storage.pw;
});

document.getElementById("urli").addEventListener("input", () => {
    browser.storage.local.set({"urli": document.getElementById("urli").value});
});

document.getElementById("pw").addEventListener("input", () => {
    browser.storage.local.set({"pw": document.getElementById("pw").value});
});
