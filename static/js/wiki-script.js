let jsonData;
let switch_version = document.getElementById('switch-bedrock-java');

fetch('/static/minecraft-data/blocks.json') // !! update to relevant jsons when theyre added !!
    .then(response => response.json())
    .then(json => {
        jsonData = json;
        console.log(jsonData);
        loadWiki();
    });

function replaceLastIterChar(word, to_be_replaced, replacement){
    let new_word = word.split(""); // splits original string into array of words
    new_word[word.lastIndexOf(to_be_replaced)] = replacement; // replaces last iteration of to_be_replaced with the replacement
    return new_word.join(""); // joins the string back together
};

function loadWiki() {
    const wiki_items_container = document.getElementById('wiki-items-container');

    for (var i = 0; i < jsonData.length; i++) {

        let wiki_item = document.createElement('div');
        let data_p = document.createElement('p');

        wiki_item.classList.add('wiki-item');
        wiki_item.setAttribute("id", i + 1);

        let data = JSON.stringify(jsonData[i]);
        data = data.replace("{", "");
        data = replaceLastIterChar(data, "}", "")
        data = data.replaceAll("{", "{<br>"); // make nested objects look nicer
        data = data.replaceAll("}", "<br>}");
        data = data.replaceAll('"', "");
        data = data.replaceAll(",", "<br>");
        data = data.replaceAll(":", ": ");
        data = data.split("<br>"); // split text into array elements at each <br>

        for (let i = 0; i < data.length; i++) { // for each element in array
            let x =  data[i].charAt(0).toUpperCase(); // turn the first character to uppercase
            data[i] = x + data[i].slice(1); // replace the first char of each element with uppercase char
        };

        data = data.join("<br>"); // join the string back together

        data_p.innerHTML = data;
        data_p.classList.add('wiki-item-data');

        wiki_item.appendChild(data_p);
        wiki_items_container.appendChild(wiki_item);
    };
};

switch_version.onclick = function() {
    if (switch_version.textContent.includes("Bedrock")) {
        console.log("java"); // delete divs and load relevant jsons
        switch_version.textContent = "Switch to Java";
    }
    else {
        console.log("bedrock"); // delete divs and load relevant jsons
        switch_version.textContent = "Switch to Bedrock";
    };
}