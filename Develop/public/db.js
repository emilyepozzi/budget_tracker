let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore("pending", {autoIncrement: true });
};

request.onsuccess = function (event) {
    db = event.target.result;

    if (navigator.online) {
        checkDatabase();
    }
};

request.onerror = function (event) {
    console.log("Oh no!" + event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.createObjectStore("pending");

    store.add(record);
}

window.addEventListener("online", checkDatabase)