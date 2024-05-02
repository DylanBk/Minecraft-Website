let jsonData;
let switch_version_btn = document.getElementById('switch-bedrock-java');

const states = ["type", "num_values", "values"];
const new_states = ["Type", "Num_values", "Values"];


fetch('/minecraft-data/blocks.json')
    .then(response => response.json())
    .then(json => {
        jsonData = json; 
        loadWiki();
    });

function replaceLastIterChar(word, to_be_replaced, replacement){
    let new_word = word.split(""); // splits original string into array of words
    new_word[word.lastIndexOf(to_be_replaced)] = replacement; // replaces last iteration of to_be_replaced with the replacement
    return new_word.join(""); // joins the string back together
};

function loadWiki() { // !! PASS IN MC VERSION !!
    const wiki_items_container = document.getElementById('wiki-items-container');

    for (var i = 0; i < jsonData.length; i++) {

        let wiki_item = document.createElement('div');
        let data_p = document.createElement('p');

        wiki_item.classList.add('wiki-item');
        wiki_item.setAttribute("id", i + 1);

        let data = JSON.stringify(jsonData[i]);
        data = data.replace("{", "");
        data = replaceLastIterChar(data, "}", "")
        data = data.replaceAll("{Name", "{<br>&nbsp;&nbsp;&nbsp;Name")
        data = data.replaceAll("{", "{<br>");
        data = data.replaceAll("}", "<br>}");
        data = data.replaceAll("[", "[&nbsp;");
        data = data.replaceAll("]", "&nbsp;]")
        data = data.replaceAll('"', "");
        data = data.replaceAll(",", "<br>");
        data = data.replaceAll(":", ": ");
        for (let j = 778; j < 805; j++) {
            data = data.replaceAll(`${j}:`, `&nbsp;&nbsp;&nbsp;${j}:`);
        };

        data = data.replaceAll("{<br>name", "{ <br> &nbsp;&nbsp;&nbsp;Name");

        for (let j = 0; j < states.length; j++) {
            console.log(states[j]);
            console.log(new_states[j]);
            data = data.replaceAll(`${states[j]}`, `&nbsp;&nbsp;&nbsp;${new_states[j]}`);
            console.log("states check")
        }

        // States: [{
        //     Name: level
        //     Type: int
        //     Num_values: 16
        //     Values: [0
        //     1
        //     2
        //     3
        //     4
        //     5
        //     6
        //     7
        //     8
        //     9
        //     10
        //     11
        //     12
        //     13
        //     14
        //     15]
        //     }]















        data = data.split("<br>"); // split text into array elements at each <br>

        for (let i = 0; i < data.length; i++) { // for each element in array
            let x =  data[i].charAt(0).toUpperCase(); // turn the first character to uppercase
            data[i] = x + data[i].slice(1); // replace the first char of each element with uppercase char
        };

        data = data.join("<br>"); // join the string back together

        data_p.innerHTML = data; // pass data into p tag
        data_p.classList.add('wiki-item-data'); // apply class

        wiki_item.appendChild(data_p); // add p tag to wiki-item div
        wiki_items_container.appendChild(wiki_item); // add wiki-item div to container div
    };
};

switch_version_btn.onclick = function() {
    if (switch_version_btn.textContent.includes("Bedrock")) {
        switch_version_btn.textContent = "Switch to Java";
        // load bedrock stuff
    }
    else {
        switch_version_btn.textContent = "Switch to Bedrock";
        // load java stuff
    };
};