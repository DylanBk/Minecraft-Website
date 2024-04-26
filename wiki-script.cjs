// import minecraft-data API
const minecraftData = require('minecraft-data');

// Accessing information about blocks
const version = '1.16.5';
const mcData = minecraftData(version);

console.log(version);
console.log(mcData);



document.addEventListener("DOMContentLoaded", () => {
    createWikiItems();

    function createWikiItems() {
        const wiki_items_container = document.getElementById('wiki-items-container');

        for (let i = 0; i < 30; i++) {
            let wiki_item = document.createElement('div');
            wiki_item.classList.add('wiki-item');
            wiki_item.setAttribute("id", i + 1);
            wiki_items_container.appendChild(wiki_item);
            console.log("wiki items checkpoint");
        };
    };
});

document.addEventListener('DOMContentLoaded', () => {
    fillVersionMenu();

    function fillVersionMenu() {
        const menu = document.getElementById('minecraft-version-menu');
        const versionsArr = minecraftData.versionsByMinecraftVersion;

        for (let i = 0; i < 30; i++) {
            let menu_item = document.createElement('option');
            menu_item.setAttribute('id', i + 1);
            menu_item.textContent = i;
            menu.appendChild(menu_item);

        };
    };
});