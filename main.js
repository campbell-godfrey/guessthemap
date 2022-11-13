/*
INFO
date, difficulty, and mapper show up on images 4, 5, & 6 respectively (will do above)
gb link after it is solved, map name redundant?

json structure
[keys: [all map names], 
maps:{map_name:{info:{date, difficulty, gamebanana, map_name, mapper}, image_paths: [1,..,6]}]
*/

// complete ms string from new date of what is "the first day".
const epoch = 1667926800000;
const autoCompleteConfig = {
        placeHolder: "Search for a Map",
        data: {
            src: ["Error loading Maps for Search"]
        },
        resultItem: {
            highlight: true,
            selected: "wrap-text",
            element: (item, data) => {
                item.setAttribute("title", data.value);
            },
        }, events: {
            input: {
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    autoCompleteJS.input.value = selection;
                    checkInputValid(autoCompleteJS.input.value);
                },
                keydown: handle_keydown,
                focus() {
                    const inputValue = autoCompleteJS.input.value;
        
                    if (inputValue.length) autoCompleteJS.start();
                },
            }
        }, resultsList: {
            element: (list, data) => {
                if (!data.results.length) {
                    // Create "No Results" message list element
                    const message = document.createElement("p");
                    message.setAttribute("class", "no_result");
                    message.setAttribute("class", "wrap-text");
                    message.setAttribute("style", "margin-bottom:0px");
                    // Add message text content
                    message.innerHTML = `Found no results for "${data.query}"`;
                    // Add message list element to the list
                    list.appendChild(message);
                } else {
                    // Show result amount
                    
                    const message = document.createElement("p");
                    message.setAttribute("style", "font-size:small; margin-bottom:0px");
                    // Add message text content
                    message.innerHTML = `Found <span class="text-warning">${data.results.length}</span> result${data.results.length > 1 ? "s" : ""} for "${data.query}"`;
                    // Add message list element to the list
                    list.appendChild(message);
    
                    list.prepend(message);
                }
            },
            maxResults: undefined,
            noResults: true,
        },
        query: (input) => {
            checkInputValid(input);
            // if query changes go back to the top.
            autoCompleteJS.goTo(0);
            return input;
        },
};


// order, encrypted using Aurora patented B. Encryption (c)
const order = [`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႜჾფჽუ႔ჶჶჿ჻ჰჽუႡႤႿႿႜ`,`ႂჷჰჳჴႆჾს჻ჳ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჾ჻ჰსჸტ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႔ჵჵჴუჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႕ჾსჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪუ`,`႓ჴტჾ჻ჰუჴႃჾღჴს`,`႓ჴ჻ფტჸჾჽჰ჻႒ჰჽჾჿშ`,`ႀფჸჲჺჸჴႜჾფჽუჰჸჽႡ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႑ჾფჽჲჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႜჴჲჷჰჽჸჩჴჳ႗ჾსჸჩჾჽ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႟ჰტუჴ჻႟სჾჱ჻ჴჼႂჾ჻ქჸჽჶ`,`ႅჰჽჸ჻჻ჰ႒ჾსჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႃჷჴ႕ჰჳჴ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႕ჾსტჰჺჴჽჲჸუშუღჾ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႁჴტჴჲსჰუჸჾჽ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼႁჸჲჺჰჽჳႜჾსუშ`,`ႠႤႼႂჴჲჾჽჳ႙ჰჸ჻ႃჸჼჴ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႂჸ჻ჴჽუႆჰჽჳჴსჸჽჶტ`,`႐ჽჾჼჰ჻შჲჷჰჿუჴსႿ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႉჸჿჿჸჽႶჸჽტჿჰჲჴ`,`ႃჷჴ႙ჴ჻჻ჸჴტႶ႖ჴ჻ჰუჸჽჾფტႂჰჽჲუფჰსშ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼ႑ჰჲჺღჰსჳტ႑ჰ჻჻ჲჸ჻ჸუშ`,`ႄ჻უსჰ႗ჴჰქჴჽ`,`႕ჴსსჴუၱ〻ㆱტႜჸჲსჾႜჾფჽუჰჸჽ`,`႑ჰ჻჻ტႜჸჽჴტღჷჴსჴუჷჴშჼჸჽჴ႑ჰ჻჻Ⴜႂჷჰჿჴჳ႖ჴჼტუჾჽჴტ`,`Ⴄჱႎ႖ჰსჱჰჶჴႎႅჴსტჸჾჽ`,`ႂჸ჻ქჴსႁჸჳჶჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႅჾჸჳ`,`ႃჷჴ႑ჰჲჺსჾჾჼტ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼႂ႟႐ႁႚ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႑ႁ႔႐ႚႃ႗ႁ႞ႄ႖႗`,`ႁჰჳჸჰჽუႂჰჽჲუფჼ`,`႔ჰსუჷჴჽ႓სჴჰჼ`,`႐სჲჷჰჸჲႃჴსსჰჲჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႟ფსჿ჻ჴ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼჰჵსჴჽႩ႓`,`ႃსჰჽრფჸ჻ႂჿჰჲჴ႖ჰსჳჴჽ`,`ႁ႐ႁ႔ႁ႐႒႒႞႞ႝႁ႞႐႓`,`ႀფჸჲჺჸჴႜჾფჽუჰჸჽ`,`ႉჴსჴყႶტႉႼႂჸჳჴტ`,`႒႞ႁႝႂ႗ႄ႒ႚ႔ႁ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႂუსჰჽჶჴႂ჻ჴჴჿღჰ჻ჺ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼჿ჻ტფ჻უსჰ`,`ႆჸჽუსშ႒჻ჸჵჵტ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႂჷჰჳჴ჻ჸჶჷუ`,`႟ჴუჰ჻ტჾჵჰႛჸ჻჻შ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႒ჾ჻ჳ႕ჴჴუ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႃჷჴႂჰფჲჴႂჸჳჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႆსჰჿჿჸჽႶ႙ჴ჻჻ჸჴტႂუჰუჸჾჽ`,`ႜ႘ႝ႓႒ႁ႐႒ႚႜჰჿ႟ჰჲჺ`,`ႆჰუჴსჱჴჰსႜჾფჽუჰჸჽ`,`ႃჷჴႚჰშჾჽჰსჰ႒ჾ჻჻ჴჲუჸჾჽ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႓ფჽჶჴჾჽჾჵႃჾსუფსჴჳႂჾფ჻ტ`,`႕჻ჾჰუჸჴსႃჸჼჴ`,`ႜჾფჽუႚჸჼჸუჰჽშႂჰჶჰ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႞ჽჲჴჸჽჰ႑჻ფჴႜჾჾჽ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼႃჴჼჿჾსჰ჻ႃჾჸ჻ჴუ`,`႑ჰ჻჻ტႃჾფსჽჴშႛჾჱჱშႼჰჽჳႅჾჸჳ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼ႞჻ჳ႗ჾსჸჩჾჽ`,`ႂფჽტჴუႁჸტჴ`,`႒ჴ჻ჴტუჴႩႃჷჴႛჰტუႜჰჳჴ჻ჸჽჴ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼჸჵ჻ფფჵ჻ფ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႃჷჴႂუჰსუტჸჳჴ`,`႒ფსტჴჳႜჸჽჴტ`,`႞჻ჳჴჽႃჾღჴსႁფჸჽტ႓Ⴜႂჸჳჴ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႖ჾჳტჾჵუჷჴ႐სუჸჵჸჲჸჰ჻`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼჳჾუჷჴჼჰსჸჾ`,`႒სშტუჰ჻ჸჩჴჳ`,`ႜჰჳჴ჻ჸჽჴ႖ჾჴტუჾႂჿჰჲჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႗ჰფჽუჴჳ႗ჰ჻჻ტჾჵ႐჻უჴტႼ႒ჴ჻ჸ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႛჰტუႝჸჶჷუ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႕სჾჩჴჽ႒ჸუჰჳჴ჻`,`ႃჴჼჿ჻ჴჾჵႃჾჼჾსსჾღ`,`႕Ⴝ႘ႽႂႽ႗ႽႷ႕ჸტჷ႘ჽႂჿჰჲჴ႗ჾღႮႮႸ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႆჸჽჳჲჷჸ჻჻`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႜჰჷჾჶჰჽშႜჾჽჰტუჴსშ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႙ჰჽჺ႕ჰჲჸ჻ჸუშ`,`႐ჽშუჷჸჽჶჸტ႟ჾტტჸჱ჻ჴ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႐႑჻ჾჲჺჴჳ႞ჵჵ႟ჰუჷ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼႜჴუჰ჻ႜჰჩჴ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႃჴჴჽშႃჴჼჿჴსჰუჴႃჴჼჿ჻ჴႃსჸჰ჻ტႩႃჴჼჿჾსჰსშႃჸუ჻ჴ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼჰ჻ჸჲჴჼჰჳჴჶჼႩႷ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႓სჸჵუჲჾსჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႞ჲუჾჱჴს`,`ႄჽჳჴსჶსჾფჽჳႄჽჳჴსჶსჾფჽჳ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႒ჾუუჾჽ႒ჰჽჳშ႒ჾსჴ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႉჸჿႜჾქჴს႐ტჲჴჽუ`,`ႅჰ჻Ⴖტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႃჷჴ႓ჴჲ჻ჸჽჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႞჻ჳ႞ჽჴტႶႜჰფტჾ჻ჴფჼ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼ႕ჾსჴႷ႐ჵფტჸჾჽჼჰჿჱჴუღჴჴჽ႕ჾსტჰჺჴჽ႒ჸუშჰჽჳ႒ჾსჴႸ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜჾჾჽტჾჽჶ`,`ႃჷჴ႒ჴ჻ჴტუჴ႟ჰსჰჱ჻ჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႟ფტჷ႑჻ჾჲჺტ႒჻ჸჵჵტ`,`ႆჸჽუჴს႒ჾ჻჻ჰჱ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႑ჸტტშႂჰჽჲუფჰსშ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႝჴფუსჰ჻ႁჸჳჶჴ`,`႞ჺႝჰჽჾႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႁჰჲჲჾჾჽ႔ყჿსჴტტ`,`ႂფჼჼჸუ႑ჰ჻჻ტტჸჳჴ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼႄ႟႔ႝ႓`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪღღჾჰჷႰ`,`႘ႝ႕႘ႝ႘ႃ႔႗ႈ႟႔ႁ႟႘ႂႂ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႞჻ჳႂჸუჴ႗ჴჲჺႼႂჸჳჴ႒ჰტტჴუუჴႁჸჵუ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႃჸჼჴႁჸჵუႃსჰჸ჻`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼႚჸჽჴუჸჲ႓ჾჼჰჸჽ`,`႕ჰსჴღჴ჻჻႟჻ფტ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႞ქჴსჶსჾღჽ႓ფჽჶჴჾჽ`,`႔ჼჴსჰ჻ჳႜჴჶჰ჻ჸუჷ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႛჾჽჴტჾჼჴႜჰჽტჸჾჽ`,`ႃჴჲჷ႒ჾჼჿჴჽჳჸფჼႩ႑ჾფჽჲჴ႗ჴ჻ჿჴს႖შჼ`,`႘ჽუჾუჷჴႆჴ჻჻`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႗ჾღუჾ႓ჾ႒ჴ჻ჴტუჴႃჴჲჷ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႓ფჱჱ჻ჴႃჾღჴს`,`ႂფჽტჴუႜჾფჽუჰჸჽ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼუჷჴჿჰუჷუჾჿჴსჵჴჲუჸჾჽ`,`႟ჴსჼჰჵსჾტუ႓ჴჽ`,`ႃჷჴჵჸსტუჿჰუჷ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႂფჱჲჾჽტჲჸჾფტჽჴტტ`,`႐ჱჰჽჳჾჽჴჳ႒ჸუშ`,`႕჻ჰჸს႐ჶჰჸჽტუ႔ქჸჳჴჽჲჴ`,`႑჻ფჴ႒ჰტუ჻ჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႗ჾღႃჾ႟჻ჰშ႒ჴ჻ჴტუჴ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႃჷჴႜჸჳჽჸჶჷუႛჸჱსჰსშ`,`ႃჷჴჾႂფჼჼჸუ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼႅჴსჳჰჽუႃსჰჸ჻`,`႓႔ႛႃ႐ႂ႒႔ႝ႔႞ႝ႔`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႃჷჴ႐ჱშტტ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼჿ჻ტტჿჴჴჳუჴჲჷ`,`ႛჴქჸჰუჷჰჽႶტႁჴჷჴჰსტჰ჻`,`ႃჷჴႡႿႡႿႃჾჺშჾ႓სჸჵუ႘ჽჲჸჳჴჽუ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼჸჼჱჰჳჰუჽჰჼჴტ`,`ტჴყშტფჼჼჸუ`,`ႂშ჻ქჰჽ႖სჾქჴႼჱსჸჽჶჸუჱჰჲჺჽჾღშჰ჻჻`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႅჴ჻ქჴუ`,`႖ჴუუჸჽჶ႞ქჴს႘უღჸუჷႜჰჳჳშႃჷჾსტჾჽ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜ႐ႁႂ႕႖ႂႽ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႖ჴჼტუჾჽჴ႒ჰქჴსჽტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჸჱ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႗ჰსჳ႒ჾსჴ`,`ႜჰჶჼჰ႔ყჿჴსუ`,`ႃჷჴႂჴჲსჴუჾჵ႒ჴ჻ჴტუჴႜჾფჽუჰჸჽ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႗ჾტუჸ჻ჴႃსჰჸ჻`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႐ჱჰჽჳჾჽჴჳ႐რფჴჳფჲუ`,`႐ქჸჰჽ႐ტჲჴჽტჸჾჽ`,`႖სჰქჸუშႃჴტუ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႃჷჴႂჴჲსჴუ႒჻ჸჵჵტჸჳჴ႕჻ჾსჴტუ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႜჸჳღჰშႃსჰჸ჻`,`႘ჽუჴსტუჴ჻჻ჰსႂფჱჼჰსჸჽჴ`,`ႛჴქჸჰუჷჰჽႶტႄ჻უსჰტႺ`,`ႚჰჸჩჾჰჳქჴჽუფსჴტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჿჰჲჴ႟ჴჰჺ`,`႓ჸჼჴჽტჸჾჽჾჵ႒ჷჰჾტ`,`ႇჾ჻ჸႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜჰღჰ჻ჺჸჽუჷჴჿဒဵსჺ`,`ႂფჼჼჸუ႔ჽჲჾსჴ`,`႒ჾტჼჸჲႁჴჰ჻ჼ`,`ႃჴჲჷშႃჴჼჿ჻ჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ჽფჱჸ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼႃჷჴ႑ჰ჻჻ტტჸჳჴ`,`჻ჾღრფჰ჻ჸუშ჻ჰქჰჼჰჿႽჱჸჽ`,`ჱ჻ფჴჷჰჸსჰჽჳჿსჾჽჾფჽტ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႑ჾფჽჲჸჽჶ႓ჾჲჺ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႙ფჸჲჴ႑ჾყ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜჾჾჽႃსჰჸ჻`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂ႟ႁ႘ႝႃ`,`ႚჰჸჩჾႂფჼჼჸუ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼ႟႞ႅႩႈჾფ႓ჸჳႄ჻უსჰ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪუჷჴჾღჴ჻჻`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႃჸჼჴ჻ჴტტ႒სჴტუ`,`ႅჰ჻ჴჽუჸჽჴႶტ႓ჰშ႒ჾჽუჴტუႡႿႡႠ`,`ႃჾსჽჰჳჾႅჰ჻჻ჴშ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼჱ჻ჴჰჺტუჰსჵჰ჻჻`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႂჴქჴსჴჳႂღჰჿ႒ჸუშ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼႂჿჾჾჿშႃჷჸჲჺჴუ`,`ႂშ჻ქჰჽ႖სჾქჴႼႜჰჳჴ჻ჸჽჴჶჾჴტჾფუუჾჶჴუჷჴსჳჰტჷჱჰჲჺ`,`ႆჸჽჶჴჳႂუჰუჸჾჽ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႐რფჰუჸჲႜჴუსჾჿჾ჻ჸტ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႁფჱშ႒჻ჸჵჵტ`,`႒ჾტჼჸჲႂჰჽჳტ`,`ႃჷჴ႕჻ჸჿ႕჻ჾჿჿჴსႨႿႿႿ`,`ႂფჽტჴუႂჺშღჰშ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼႜ႘ႝႄႂ`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼ႞ჽშყႃჾღჴსႁჴჼჽჰჽუტ`,`ႁფჸჽჾჵჰႁჰჲჲჾჾჽ`,`ႂჼჰ჻჻ტჰჽჲუფჰსშႩႃჷჸსჳ`,`ႄ჻უსჰႂჺჾჾ჻`,`ႜჾჽჸჺჰႶტ႓Ⴜႂჸჳჴტ႟ჰჲჺ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႐სჲუჸჲ႞ფუჿჾტუ`,`႞ჽჴႃჷჾფტჰჽჳႜჴუჴსტ`,`႐ტუსჰ჻ႃჾღჴს`,`ႁჴუსჾႁჷშუჷჼႁფჸჽტ`,`႖სჰქჸუშ႒ჾჼჿ჻ჴყ`,`ႂჷჸჽჸჽჶႛჰჽჳ`,`႒ჾჼჿ჻ჴყႠႨႨႦ`,`ႜფტჸჲႆჾს჻ჳ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼჸჵჾსჶჾს`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჷჸჼჼჴს`,`႕ჰსჴღჴ჻჻႓ႼႂჸჳჴႼ႕ჸჽჰ჻႖ჾჾჳჱშჴ`,`ႆჰუჴსႂჿჰჲჴ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼქჾ჻ჰსჸტ`,`ႂშ჻ქჰჽ႖სჾქჴႼႛფჲჸჳ႒჻ჸჵჵტჸჳჴႃჾჾ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼႄჽჳဒးტჾსჳსჴჴჽჲჷჴქဒ္უსဒးჳჴჲჾფ჻ჴფსტ`,`ႄ჻უსჰႂფჼჼჸუႝჴღႅჴსტჸჾჽ`,`ႂშ჻ქჰჽ႖სჾქჴႼႂღჸუჲჷ჻ჰჽჳႡ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼႃჷჴ႓ჴჿუჷტ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼႜჾუჸჾჽ႖სჾუუჾ`,`႕ჾსჶჾუუჴჽႁჷშუჷჼ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႂჿჸჺჴ႟ჸუ`,`ႃჷჴ႕ფჽჴსჰ჻`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႁჰჸჽჱჾღႁჾჰჳ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႛჸ჻჻შႶტႛჰჺჴ`,`႒႔ႛ႔ႂႃ႔ႡႰႰႰႰႰႰႰ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႃჷჴ႒ჾჼჿ჻ჴყ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႛჰქჰჵსჾტუ႒ჰქჴსჽ`,`႖ჾჾტჴႢႿႿႿჼ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႕ჰს႖ჾჽჴ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႒ჸუშႛჸჼჸუტ`,`ႃსჸჰჽჶ჻ჴႶტ႗ჾჼჴ`,`႞ტჷჸსჾႶტ႕ფჽႁჸჳჴ`,`႒ჾჽრფჴსჾსႶტ႟ჴჰჺ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ჱშტტ`,`႟ჸჲჾႼႧႁჴჼჰჺჴ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႐ტჷჴჽ႒ჸუშ`,`ႂშ჻ქჰჽ႖სჾქჴႼ႘ჽჴ჻ფჲუჰჱ჻ჴႜჾჳჰ჻ჸუშჾჵუჷჴႂფჼჿ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႁფჿუფსჴ`,`ႃჴჼჿჾსჰ჻ႂჷსჸჽჴ`,`႒ჰჱჾჱႶტႷ჻ჰუჴႸ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႕სჸჳჶჴ႟ჰ჻ჰჲჴ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႟ფჵჵჸჽႶႁჾჲჺ`,`ႂჾფჿჴსႜჰჳჴ჻ჸჽჴ႒჻ჸჼჱტႂჾფჿႜჾფჽუჰჸჽႥႣ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႁჰჸჽჱჾღႃჴჼჿ჻ჴ`,`ႛჴქჸჰუჷჰჽႶტ႒ჷჰუჴჰფ`,`႐჻჻ჶჰჼჴჿ჻ჰშჽჾჳჴჲჾ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႒ფჿჸჳႶტ႖ჰსჳჴჽ`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼ႐სჾფჽჳუჷჴႆჾს჻ჳ`,`ႂჷსჾფჳჴჳႃჷჾფჶჷუტ`,`ႜჰჳჳშႶტ႗ჰჽჶჾქჴს`,`ჲჰჽჲჴ჻ჲფ჻უფსჴ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႆჷშჳჾუჷჴშჲჰ჻჻ჸუჾქჴჽღჷჴჽშჾფჾჵჸჽუჷჴჲჾ჻ჳჵჾჾჳჾფუჷჾუჴჰუუჷჴჵჾჾჳ`,`ႜჰჳჴ჻ჸჽჴႩ႘ჽუჾუჷჴႃჴჼჿ჻ჴ`,`ႃჷჴ႗ჰჲჺ჻ჰჽჳტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂშჼჿჷჾჽშ`,`႖჻შჿჷ႓Ⴜႂჸჳჴ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႉჸჿუჸჴჳ႟ფჵჵჴსტ`,`უჷჴႠჷჾფსჰ჻ჾჽჴჲჾჽუჴტუႾჲჾ჻჻ჰჱ`,`႒ჴ჻ჴტუჸჰ჻႒ჰჱჸჽჴუ`,`႟ჰჸჽუႁჴქჴსტჴ`,`႐ჼჱჴსႃჴსჼჸჽფტ`,`ႂუსჰღჱჴსსშ႗ფჽუჴს`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႓ჴტჴსუ႓ჴჿუჷტ`,`႟ჾ჻შჶჾჽ႓სჴჰჼტ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႃჷჴႂჴჲსჴუ႒჻ჸჵჵტჸჳჴႜჰჽტჸჾჽ`,`ႛჰჽჸႶტ႒ჰქჴ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႛფჽჰს႖სჰქჸუჰუჸჾჽ`,`ႂუჰუჸჲႂჷჸჵუ`,`႐႒ჷსჸტუჼჰტႝჸჶჷუ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪჳსჴჼ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႟ფსჶჰუჾსშჾჵუჷჴႉჸჿტ`,`ႆჾს჻ჳႶტ႗ჰსჳჴტუ႖ჰჼჴႼ႒ჴ჻ჴტუჴႁჴჼჰჺჴ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႖ჰსჳჴჽჾჵ႓სჴჰჼტ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႃჰსჳჸჶსჰჳჴႃჴჼჿ჻ჴႃჾჾ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼ႓ჰტჷ჻ჴტტ႟სჸჳჴ`,`ჸჰჼჳჰჳჱჾჳႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴉ႖ჾ჻ჳჴჽႃჾღჴსႁფჸჽტ`,`ႃჷჴႃსჸჰ჻ჾჵ႔ჿჸჳჾყ`,`ႂშ჻ქჰჽ႖სჾქჴႼჽჴღტჿჸსუჴჵ჻ჰქჾსႩჿფსჿ჻ჴ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႕ჰსჴღჴ჻჻႕ჸსჴ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႑ჴ჻ჾღႉჴსჾ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႠႿႿსჸჳჶტ`,`႒ჷჸ჻჻შႻႆჸჽჳშႁფჸჽტ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼუჷჴჲჴ჻ჴტუჴჼჰჿჿჴსტუსფჶჶ჻ჴ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႅჰჿჾსღჰქჴႝჸჶჷუჼჰსჴ`,`ႂჷჸჽჸჽჶႂჷჾჾუჸჽჶႂუჰს`,`႒ჰს჻ჾტႶტ႑ჳჰშႂჿჴჲჸჰ჻Ⴉუჷჴღჸჽუჴსჲჾ჻჻ჰჱჿსჾჱ჻ჴჼ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႃჷჴႛჾჽჶႆჰშ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႄჽტჰქჴჳ႒ჷჰჽჶჴტ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႝჾტუჰ჻ჶჸჰ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼჷჸ჻ჴჽჽშჶჾ჻ჳ`,`႒სშტუჰ჻႒ჾსჴ`,`ႂშ჻ქჰჽ႖სჾქჴႼႛჴქჴ჻ტ`,`ႀფჸჽჽჸჶჰჽႶტႝჾუჴჿჰჳ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႃჴჼჿ჻ჴჾჵუჷჴ႕ჸტჷ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼႂჷჸჵუჸჽჶႃჴჼჿ჻ჴ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႗ჴ჻჻ღჸჽჳ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼ႐ႅ႔ႁႃ`,`႕ჾსტჰჺჴჽ႒ჸუშ႔ႼႂჸჳჴႷႺႺႸ`,`႒სშტუჰ჻ႅჾჸჳ`,`უჾფჷჾჴႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႄჿუფსჽჴჳ႓ჾღჽუჾღჽ`,`ႃჴჼჿ჻ჴჾჵႃჴჰსტ`,`ႆჰტუჴჳႜჴჰჳჾღ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႔ჼჴსჰ჻ჳႂჺჸჴტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂფჱჹჴჲუჸჾჽ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜშტჴ჻ჵ`,`ႛჴქჸჰუჷჰჽႶტႁჴჷჴჰსტჰ჻Ⴚ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႒ჴ჻ჴტუჸჰ჻ႜჴჳ჻ჴშ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႗ჴ჻჻ႷჸტჷႸ`,`႕ჰჳჴჳ႒ჴ჻ჴტუჸჰ჻ႁჴჼჰჸჽტ`,`႑ჰჽჰჽჰႡႢႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႟჻ჰუჵჾსჼჸჽჱႰ`,`ႂფჼჼჸუ႖ჰსჳჴჽ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႒ჴ჻ჴტუჴႶႧႨ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႕჻ჾჾჳჴჳ႒ჸუშ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼჳჴႡ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႓ჰსჺ႐ტჲჴჽუ`,`ႁჰჸჽშ႕ჰსჰღჰშ႓ჸტჰსსჰშ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႖჻ჰჲჸჰ჻႒჻ჸჼჱ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႂფჱ჻ჸჼჸჽჰ჻႖ჰსჳჴჽ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႕ჾსჴტუჾჵႜშუჷჾტ`,`႓ჾჽჺჴსႠႨႶტႷ჻ჰუჴႸ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴉႂჾ჻ჰსჸტႡထာ`,`ႛჴქჸჰუჷჰჽႶტႄ჻უსჰტ`,`ტუფჿჸჳჶჾსჶჴ`,`ႁჰჸჽშႃჾჳჰშ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႂჴსჴჽჸუშ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼ႟႞ႅႩႈჾფ႓ჸჳჽႶუႄ჻უსჰ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႗ჾღუჾႜჰჺჴჰ႖ჾჾჳ႒ჴ჻ჴტუჴႜჰჿ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႁჾტჴ႓ფტუ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ჳსჰჽჾტ`,`ႂშ჻ქჰჽ႖სჾქჴႼ႔უჷჴსჴჰ჻႗ჾ჻჻ჾღტ`,`႖ჸსჳჴსტႜჰჿ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼღჴუუშღჴუღჰუჴსჵჰ჻჻`,`ႂშ჻ქჰჽ႖სჾქჴႼ႐ჽშუჷჸჽჶ႘ტ႟ჾტტჸჱ჻ჴ႒ჷსჸტუჼჰტ႔ჳჸუჸჾჽ`,`႕სჾჩჴჽ႗ჴჸჶჷუტ`,`ႜჾფჽუ႔ქჴსჴტუ`,`႐ჽჾუჷჴს႕ჰსჴღჴ჻჻ႜჰჿ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႛჾქჴႂუჾსშ`,`ႃჷჴჲჰქჴჾჵჱფჱჱ჻ჴტ`,`႒჻ჾფჳშ႒჻ჸჵჵტ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႜჾქჴ႑჻ჾჲჺ႖სჾუუჾ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႂუჴ჻჻ჰს႖ჰუჴღჰშ`,`႒ჰსჴ჻ჴტტ႐ჽჾჽႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႖ჸ჻ჳჴჳ႗ჾ჻჻ჾღ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႄ჻უსჰ႗ჴ჻჻`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႕ჰ჻჻ჰჲჸჾფტႁჴჰ჻ჼ`,`႐ႝჴღ႑ჴჶჸჽჽჸჽჶ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪჸჸჳჺႽႽ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႗შჿჴსუჷჴსჼჸჰ`,`႕სჾჶჴ჻ჸჽჴႂფჼჼჸუ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႂუშჶჾჿჷჸ჻ჸჰ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼ႒ჾჽჽჴჲუჴჳႂფჼჼჸუႢႿႿႿჼ`,`႘ჰჼჳჰჳჱჾჳႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႓ჰჳႶტႃჾღჴს`,`ႂშ჻ქჰჽ႖სჾქჴႼ႐႑ფჵჵႉფჲჲჷჸჽჸႶტ႟ჴჰჺ`,`႙ჰჲჺჰ჻Ⴖტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႘ჲჴ႒ჾ჻ჳႃსჰჸ჻`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜႈႝ႓ႜႛႃႁ`,`႓სႽႜჰჲჷჴტუჸჺႶტ႓შჽჰჼჸუჴ႒ჰტუ჻ჴ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼ႟႘႔႒႔`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႓სჰჵუშ႓ჰჩჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႃჾႃჷჴႜჰსტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႔ჰს჻შ႒ჾსჴ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႟ფტჷჱ჻ჾჲჺႀფჰსსშ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႡႣყႢႢ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼ႐ჱჾქჴႃჷჴႂფჼჼჸუ`,`႓სჴჰჼშუსჸჰ჻ტ`,`ႉჸჿჿჸჽჶჽჾუჳჰტჷჸჽჶ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂღჸუჲჷ჻ჰჽჳ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼႱჴჰტშႰႱ`,`ႃჷჴ႓ჰჳტჸჳჴტ`,`႐ქჿჾჲჰ჻შჿტჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႒ჾ჻჻ჰჿტჸჽჶ႒ჰჽშჾჽ`,`ჸჲჴ႒სჴჰჼႶტႄ჻უსჰტ`,`ႃჷჴ႒ჾჼჿ჻ჴყ႑Ⴜႂჸჳჴ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႗ჰფჽუჴჳ႑჻ჾჲჺ႑სჸჳჶჴ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႖ჾქჴსჽჼჴჽუႃჾღჴს`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼႂჰჳუჴ჻჻ჸუჴ`,`ႦჳႷტჸჽჶ჻ჴჳჰტჷქჴსႸ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႕ჰ჻჻ჴჽႜჴჼჾსჸჴტ`,`႓ჸტჲჾჽჽჴჲუჴჳႂფჼჼჸუ`,`ႃსჰქჴ჻ჴსჾჵ႑჻ფჴ`,`႗ჸჱჴსჽჰუჸჾჽ႐ჿჴყ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႐ႁჴტჾსუႽ႑ჸჽ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႓სშႂჿჰჲჴ`,`ႝჾ႓ჰტჷႃჴჼჿ჻ჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႓სჴჰჼ႑ჾჾტუჴსႃჴჼჿ჻ჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႛ႐ႅ႐ႃ႞ႁႈ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႕სჾჩჴჽႆჰუჴსჿჰსჺ`,`ႃჷჴႆჰ჻ჺ႗ჾჼჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႔჻ჴჲუსჸჲ႐ფსჾსჰ`,`ႝჾსჼჰ჻ႜჰჿႥႣ`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼშჾფჼჸჶჷუღჰჽუუჾჱსჸჽჶჰჽფჼჱსჴ჻჻ჰ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႟ფსჿ჻ჴ႕ჰჲუჾსშ`,`ႃჰსჳჸჶსჰჳჴႃჴჼჿ჻ჴ`,`႑ჾჾტუჴჳ႒ჸუშ`,`ႛჰქჴჽჳჴსႂჿჸსჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႔სსჾსႣႿႣ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႖სჴჴჽჱჰჲჺჰუჸუჰჶჰჸჽ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼ჻ჴტჱჾჼჰჶჽჴუჸჲჵჸჴ჻ჳ`,`႟჻ჰუჵჾსჼჰჳქჴჽუფსჴტ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႄႺႡႠ႒႔`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႙ჰჽჺ႕ჰჲჸ჻ჸუშႡ႔჻ჴჲუსჸჲ႑ჾჾჶჰ჻ჾჾ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႂჿსჸჽჶ႐ჽჳ႐ႂუჾსჼ`,`႖ჴუႆჴ჻჻ႂჾჾჽჭႩ႐ႛჴუუჴსუჾႜშტჴ჻ჵ`,`ႂჸ჻ჴჽუႂჽჾღ`,`ჳსჴჰჳჸჽუჷჴჲ჻ჾფჳტ`,`႓ჾჽჺჴსႠႨႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႅჴ჻ქჰსჸტ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼႠႠႼ႔ყჰჼჿ჻ჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႐ჽ႔ყჴსჲჸტჴჸჽ႕ფუჸ჻ჸუშ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႙ჰჼჼჸჽႶ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႜჸჳჽჸჶჷუ႓სჴჰჼტ`,`ႂჴჼჴჽჰႜჴსუქშჺჷ`,`ႄ჻უსჰ႟სჾჲჴტტჸჽჶ`,`႔ჩჴ჻Ⴖტ႒႒Ⴜტჸჳჴტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႒სშჾტჷჾჲჺ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႂჰჿჿჷჸსჴႂჿჸსჴ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႁფტჷჴჳႉჸჿტ`,`႐სჿჷჸჼჸჶჾჽႶტ႓Ⴜႂჸჳჴტ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႅჴსჳჰჽუ႒ჸუშ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႕ჰუჰ჻႔ყჲჴჿუჸჾჽ`,`႕჻ჾჾჳჴჳ႒ჰქჴტ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼჶჾჾტჴჼჰჳჴჶჼႽ`,`უჷჴსჾჰჳ჻ჴტტუსჰქჴ჻ჴჳ`,`ႂფჼჼჸუ႒ჾ჻჻ჰჱႡႿႡႠ`,`ႃფსრფჾჸტჴ႗ჴ჻჻`,`႐჻ჸჲჴႀფჰტჰსႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႕ჴჽჽჴჲ႕ჾსჴტუ`,`႟ჷჾჱႶტ႟Ⴜႂჸჳჴტ႟ჰჲჺ`,`ႂუჾსჼ႒ჰჽშჾჽ`,`ႁჴჳႜჾჾჽႶტႁჴტჾსუ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႃჷჴႡႿႡႡႜჸჽჸ႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼ႐ჽჲჸჴჽუႁფჸჽტ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႃჷჴႂფჼჿრფჴ჻`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႃჷჴႄჽჺჽჾღჽႚჽჾღჽ`,`႓სჴჰჼუჾ႐ღჰჺჴჽჸჽჶ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႁფჱშႜჸჽჴტ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႑ფჱჱ჻ჴႆსჰჿႃჴჼჿ჻ჴ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႙ფტუႂჿსჸჽჶტ႐ჽჳ႑ფჱჱ჻ჴტ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼჷჴ჻ჿტსჴჰჳჰჱჸ჻ჸუშ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼႜჰჳჴ჻ჸჽჴႜჰჺჴტჰႜჰჿღჸუჷ႖სჰქჸუშ႗ჴ჻ჿჴსႰ`,`႒ჴ჻ჴტუჴႁჴჰსსჰჽჶჴჳ`,`ႂღჸუჲჷႜჾფჽუჰჸჽ`,`႐ႁჰჸჽშႝჸჶჷუ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႒ჾსსჾჳჴჳ႒ჸუშ`,`ႜჰჳჴ჻ჸჽჴღჰჽჽჰუსჸჰ჻უჷჴႠႿႿუსჰჿ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႓ჴჵჸჽჸუჴ჻შႝჾუ႓ჴჳჸჲჰუჸჾჽ`,`႔ჼჱჴსႶტႄუჾჿჸჰ`,`႞ჺႝჰჽჾႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႂღჰჽ႗ჸ჻჻ტჸჳჴ`,`ႃჴჼჿ჻ჴჾჵ႑჻ჸჽჳჽჴტტ`,`႟ჴსჸჳჾუ႞ჰტჸტ`,`ႂჽჾღჵჰ჻჻ႂჿჸსჴ`,`ႃჷჴႄჿტჸჳჴ႓ჾღჽႂჸჳჴტ`,`႐჻ჸჲჴႀფჰტჰსႶტ႑႓ჰშႂჿჴჲჸჰ჻Ⴜ႗ჰჽჶ႞ფუႆჸუჷ႞ჺႝჰჽჾႰ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႒ჴჿჷტუჴ჻჻ჰუჸჾჽ`,`႗ჾღႃჾႜჰჺჴ႐ႜჰჿႩ႕ჾსჰႂჲსჰჿჿჴჳ႒ჾჽუჴტუ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႃჷჴ႒჻ჸჼჱ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႃჷჴႃჷჸჴჵ`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼ႟სჸტჼჰუჸტჼ`,`ႂჷჰუუჴსჴჳႂჺჸჴტ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼ႑႞ႄႝ႓`,`ႃჴჼჿ჻ჴჾჵუჷჴ႒ფსტჴჳ႖ჾჳ`,`႗ჰჺჾჽჸღჰ႐ჳქჴჽუფსჴ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႒ჾჽტუსფჲუჴჳ႒ჰქჴსჽტ`,`႒ჰჱჾჱႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႄ჻უსჰႜჾჱჸფტ႐ჳქჰჽჲჴჳ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼႂჾ჻ჰს႓ჴტჲჴჽუ`,`ႂჷჸჿღსჴჲჺႆჴჰუჷჴს`,`႞ქჴსტჷჾუ႐ქჴჽფჴ`,`ႜჸჳჽჸჶჷუ႐რფჰსჸფჼ`,`ႂჸჴჽჽჰႶტႁჴჰ჻ჼ`,`ჷჴჰუჷჴსႶტჰრფჰსჸფჼ`,`႐ფუფჼჽჰ჻႗ჴჸჶჷუტ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႕სჾჩჴჽႜჰჲჷჸჽჴსშ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႁჴჲუჰჽჶ჻ჴტ`,`႐჻ჱჲჰუႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႒ჾტჼჸჲႄჽჳჴსღჰუჴს`,`ႃჷჴ႑჻ჸჩჩჰსჳ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႒სშტუჰ჻႒ჰქჴსჽტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ტუსჰჴფტ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼႝშჰჽႜჰჳჴ႖ႜႩ႓`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႜჰუსჸყ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂუჰსჵჰ჻჻`,`႓ჾჽჺჴსႠႨႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႂფჲსჾტჴႂჾ჻ჰსჸტ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႁჴქჴსტჰ჻`,`ႃჷჴႂჴჰტჸჳჴ႒Ⴜႂჸჳჴ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႄ჻უსჰႂღჰჽႂ჻ჸჳჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐უ႓ჰღჽ`,`ჸჰჼჳჰჳჱჾჳ႒ჾ჻჻ჰჱႡႿႠႧ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႔ჼჱჴს႟ჰსჰჳჸტჴ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႒ჰუჰჲ჻შტჼჸჲ႒ჰქჴსჽ`,`႗ჴყჰჶჾჽ႕ჾსჲჴ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႃსჴჴუჾჿ႒჻ჸჼჱ`,`ႂჸ჻ჴჽუႝჸჶჷუႶტ႐჻჻ჴშ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼႛ႘ႜ႘ႃ`,`უჾფჷჾჴႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႑სႠჶჷუ႟Ⴐჽჺ`,`ႃჷჴ႒ჷჰუტჸჳჴტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ტ჻ჴჴჿ`,`ႂუჰუჸჾჽჰსშ႘ჽუჴსჼჸტტჸჾჽ`,`ႅჸჱჴႜჾფჽუჰჸჽ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼჳჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႛჸჶჷუ႑სჴჴჩჴ`,`ႃ႗႔႒႔ႛ႔ႂႃ႔Ⴉႄ჻უჸჼჰუჴ႗ჴჰსუტჸჳჴ႒ჷჰ჻჻ჴჽჶჴ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼ႘ჲჴ႕ჾსუსჴტტ`,`ႂფჼჼჸუ႟სჾ჻ჾჶფჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႐ჽშუჷჸჽჶჸტႂფჿჿჾტჴჳუჾ႑ჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႒ფსჸჾფტ႒სჰუჴს`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႑ႁ႔႐ႚ႘ႝ႖ႾႾ႟႞႘ႝႃ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჼჾჶ႒ჸუშ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჺშ႗ჸჶჷႰ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႖ფტუშ႟სჾჿჾტჸუჸჾჽ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႑ჰტჰ჻უჸჲ႑ჴჰჲჷ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႖სჰტტშႂჿსჸჽჶტ`,`ႂფჱფსჱჰჽႝჴჱფ჻ჰ`,`ႂუჾსჼჸჽჶ႒ჸუშძჳჰჳჱჾჳჱჳჰშჼჰჿ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႅჰჲფფჼ႕ჰჲჸ჻ჸუშ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႞ჽჴႂუჰსႁჴქჸჴღ`,`ႂშ჻ქჰჽ႖სჾქჴႼ႐ჼჴუჷშტუ႖სჾუუჾ`];

var autoCompleteJS;
// map data
var map_index;
// all map keys in lower case;
var map_keys_lower_case;
// game data 
var game_data;
// current day
var current_day;
// current map object
var current_object;
// current selected image
var current_image;
// guess nr
var current_guess;
// won game?
var won_game = false;

fetch('maps/map_index.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        main_function(data)
    })

function main_function(_map_index) {
    // setup
    map_index = _map_index;
    map_keys_lower_case = map_index.keys.map(x => x.toLowerCase());
    // setup autocomplete
    try{
        autoCompleteConfig["data"]["src"] = _map_index["keys"]
        autoCompleteJS = new autoComplete(autoCompleteConfig);
    }
    catch (e) {
        // Add warning for jsdeliver.net
        let h1Element = document.createElement("h1");
        h1Element.style = "color:goldenrod;"
        node = document.createTextNode(`Make sure Add-ons aren't blocking scripts from jsdelivr.net, they are required for this website to work! (autocomplete.js failed to load)`);
        h1Element.appendChild(node);
        let gameImage = document.getElementById("gameImage")
        let parent = gameImage.parentNode;
        parent.insertBefore(h1Element, gameImage);
        throw e;
    }
    // setup onclicks
    document.getElementById("buttonOK").onclick = confirm;
    document.getElementById("buttonSKIP").onclick = skip;
    document.getElementById("buttonSHARE").onclick = share;
    // get current day (days since epoch utc), this might be wrong.. I hope not
    let current_day_el = document.getElementById("currentDay");
    current_day = get_current_day();
    current_day_el.innerText = current_day;
    current_object = map_index["maps"][bad_decryption(order[(current_day % order.length)])];
    current_image = 0;
    current_guess = 0;
    guesses = [];
    select_image(0);
    // next day calculations
    let next_day_time = epoch + (current_day+1)*8.64e7;
    {
        // set little info text in how to play for current timezone.
        let next_day_timezone_el = document.getElementById("nextDayInTimezone");
        let hour_text = new Date(next_day_time).getHours().toString().padStart(2, "0");
        let minute_text = new Date(next_day_time).getMinutes().toString().padStart(2, "0");
        let utc_offset = -new Date().getTimezoneOffset()/60;
        next_day_timezone_el.innerText = ` (${hour_text}:${minute_text} UTC ${utc_offset > 0 ? "+" : ""}${utc_offset})`;
    }
    // countdown till next day
    start_countdown(next_day_time);
    // disable all buttons except first (weird refresh bug)
    for(let i = 1; i <= 5; i++) {
        document.getElementById(`button${i}`).disabled = true;
    }
    // restore guesses
    game_data = get_cookie_data();
    if(game_data.last_day_played != current_day) {
        game_data.guesses = [];
        save_data();
    }
    if(game_data.last_day_played == current_day && game_data.guesses.length > 0) {
        for (let i = 0; i < game_data.guesses.length; i++) {
            let guess = game_data.guesses[i];
            document.getElementById(`button${i}`).disabled = false;
            show_guess(check_guess(guess), i+1, guess, true);
        }
        // fix the data stuff
        current_guess = game_data.guesses.length;
        if(check_guess(game_data.guesses[game_data.guesses.length-1])) {
            end_game(true, true);
        } else if(game_data.guesses.length >= 6) {
            end_game(false, true);
        } else if (game_data.guesses.length <= 5) {
            document.getElementById(`button${game_data.guesses.length}`).disabled = false;
            select_image(game_data.guesses.length);
        } 
    }

}

// gets current day based on epoch
function get_current_day() {
    /* Code that tried to account for timezone offset, we are now using utc again
    let date = new Date();
    let minute_offset = date.getTimezoneOffset();
    let current_day = Math.floor(((date.getTime() - (minute_offset*6e4))-epoch)/8.64e7);
    */

    let current_day = Math.floor(((new Date().getTime())-epoch)/8.64e7);
    return current_day;
}

// from current time to goal time (use .getTime())
var day_countdown;
function start_countdown(goal) {
    let remaining = goal - new Date().getTime();
    // do it once immediately
    document.getElementById("timer").innerText = get_time_hh_mm_dd(remaining);
    // not gonna be that accurate but who cares
    day_countdown = setInterval(() => {
        let remaining = goal - new Date().getTime();
        document.getElementById("timer").innerText = get_time_hh_mm_dd(remaining);
        // refresh website lmao
        if (remaining <= 0) {
            location.reload();
        }
    }, 1000);
    function get_time_hh_mm_dd(time_in_ms) {
        if(time_in_ms < 0) return "00:00:00";
        let hrs = Math.floor(time_in_ms / (1000*60*60)); 
        let min = Math.floor((time_in_ms % (1000*60*60)) / (1000*60)); 
        let s = Math.floor((time_in_ms % (1000*60)) / (1000)); 
        return `${hrs.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    }
}

/**
 * Toggle OK button based on input.
 * @param {*} input 
 */
function checkInputValid(input) {
    toggleOkButton(map_keys_lower_case.includes(input.toLowerCase()));
}

function handle_keydown(event) {
    // Tab OR enter
    if(event.keyCode == 9 || event.keyCode == 13) {
        // check it can find something before trying to select
        if(autoCompleteJS.search(document.getElementById("autoComplete").value, map_index.keys)) {
            autoCompleteJS.open();
            // Use autocomplete selection if we have something selected
            if(autoCompleteJS.cursor >= 0) {
                autoCompleteJS.select();
            }
            checkInputValid(document.getElementById("autoComplete").value);
        }
        event.preventDefault();
    }
    // down arrow
    else if(event.keyCode == 40) {
        autoCompleteJS.open();
        autoCompleteJS.next();
    }
    // up arrow
    else if(event.keyCode == 38) {
        autoCompleteJS.previous();
    }
    //enter
    if(event.keyCode == 13) {
        confirm();
    }
    //console.log(event.keyCode);
}

/**
 * Disables and changes color of "OK" button
 * @param {Boolean} enable 
 */
 function toggleOkButton(enable) {
    if(enable) {
        document.getElementById("buttonOK").className = "btn btn-success";
        document.getElementById("buttonOK").removeAttribute("disabled");
    } else {
        document.getElementById("buttonOK").className = "btn btn-dark";
        document.getElementById("buttonOK").setAttribute("disabled","");
    }
}

function confirm() {
    let map_chosen = document.getElementById("autoComplete").value.trim();
    if(!map_keys_lower_case.includes(map_chosen.toLowerCase())) {
        // Impossible guess, do not allow it and show a warning.
        let invalid_text_el = document.getElementById("invalidText");
        if (invalid_text_el.style.display == "none") {
            invalid_text_el.style.display = "";
            setTimeout(() => {        
                invalid_text_el.style.opacity = 0;
                setTimeout(() => {
                    invalid_text_el.style.display = "none";
                    invalid_text_el.style.opacity = 1;
                }, 1000)
            }, 3000);
        }
        return;
    }
    document.getElementById("autoComplete").value = "";
    toggleOkButton(false);
    autoCompleteJS.close();
    current_guess += 1;
    let correct = check_guess(map_chosen);

    if(correct) {
        correct_guess(map_chosen)
    } else {
        incorrect_guess(map_chosen)
    }
}

function skip() {
    current_guess += 1;
    incorrect_guess("Skipped!");
}

/**
 * Tries to check lower case versions of both strings against each other.
 * @param {String} guess 
 * @returns {Boolean} if it matches current day true
 */
function check_guess(guess) {
    return current_object.info.map_name.toLowerCase() == guess.toLowerCase();
}

function end_game(win, restore=false) {
    document.getElementById("input").hidden = true;

    if(win) {
        document.getElementById("youWin").hidden = false;
        won_game = true;
    } else {
        document.getElementById("youLose").hidden = false;
        won_game = false;
    }

    document.getElementById("aftergameInfo").hidden = false;
    document.getElementById("answer").href = current_object.info.gamebanana;
    document.getElementById("answer").innerText = current_object.info.map_name;
    // enable all buttons
    for(let i = 0; i <= 5; i++) {
        document.getElementById(`button${i}`).disabled = false;
    }

    if(!restore) {
        if(win) {
            game_data.win_distribution[current_guess-1] += 1;
        
            if(game_data.last_day_completed == current_day-1) {
                game_data.streak += 1;
            } else if(game_data.last_day_completed < current_day-1) {
                game_data.streak = 1;
            }
            
            if(game_data.streak >= game_data.max_streak) {
                game_data.max_streak = game_data.streak;
            }
        } else { 
            game_data.win_distribution[6] += 1;
            game_data.streak = 0;
        }
        game_data.last_day_completed = current_day;
        save_data();
    }
}

function correct_guess(guess) {
    show_guess(true, current_guess, guess);
    end_game(true);
}

// undefined => skipped.
function incorrect_guess(guess) {
    // you lose
    if(current_guess >= 6) {
        show_guess(false, current_guess, guess);
        end_game(false);
    } else {
        document.getElementById(`button${current_guess}`).disabled = false;
        select_image(current_guess);
        show_guess(false, current_guess, guess);
    }
}

function show_guess(correct, nr, guess, restore=false) {
    let pElement = document.createElement("p");
    let node = document.createTextNode(`${nr}. ${guess}`);
    pElement.appendChild(node);
    if (correct) {
        pElement.className = "mb-1 text-success";
    } else {
        pElement.className = "mb-1 text-danger";
    }
    let guessElement = document.getElementById("guesses");
    guessElement.appendChild(pElement);
    guessElement.hidden = false;
    if(!restore) {
        game_data.guesses[nr-1] = guess;
        save_data();
    }
}

// storage for the blob urls
var blob_urls = new Map()
/**
 * Opening in new tab is a standard method for people and not an attempt at cheating,
 * so it should not give you the solution.
 * This tries to fix this by setting the source with a blob url
 * @param {img} image_element 
 * @param {string} image_path 
 */
async function set_image_to_blob_url(image_element, image_path) {
    let blob_url
    if(blob_urls.has(image_path)) {
        blob_url = blob_urls.get(image_path);
    } else {    
        blob_url = URL.createObjectURL(await fetch(image_path).then(r => r.blob()));
        blob_urls.set(image_path, blob_url);
    }
    image_element.src = blob_url;
}

/**
 * date, difficulty, and mapper show up on images 4, 5, & 6 respectively
 * @param {int} 0 <= index < 6 
 * @returns 
 */
function select_image(index) {
    if (index < 0 || index > 5) return console.log("Index out of bounds: "+index);
    let image_element = document.getElementById("gameImage");
    set_image_to_blob_url(image_element, current_object.image_paths[index]);
    
    let game_info_element = document.getElementById("gameInfo");
    if (index == 3) {
        game_info_element.innerText = `Uploaded on: ${current_object["info"]["date"]}`;
    } 
    else if (index == 4) {
        game_info_element.innerText = `Difficulty: ${current_object["info"]["difficulty"]}`;
    }
    else if (index == 5) {
        game_info_element.innerText = `Mapped by: ${current_object["info"]["mapper"]}`;
    } else {
        game_info_element.innerText = `​`; // no width space so it still "exists" and has height
    }
    document.getElementById(`button${current_image}`).className = "btn btn-dark";
    document.getElementById(`button${index}`).className = "btn btn-secondary";

    current_image = index;
}

function share() {
    function infoCopied() {
        button.innerText = "Copied to Clipboard!";
        setTimeout(() => {button.innerText = "Share your result";}, 1000);
    }
    function infoFailed() {
        button.innerText = "Failed to copy :(";
        setTimeout(() => {button.innerText = "Share your result";}, 1000);
    }


    let button = document.getElementById("buttonSHARE");
    let amount = "";
    const emoji = {incorrect:"🟥", none:"⬛", correct:"🟩"};
    let emoji_representation = "";
    if(current_guess >= 6 && !won_game) {
        emoji_representation = Array(6).fill(emoji.incorrect).join(" ");
        amount = "X";
    } else {
        emoji_representation = Array(6).fill("").map((_, i) => {
            if(i+1 < current_guess) {
                return emoji.incorrect;
            } else if (i+1 == current_guess) {
                return emoji.correct;
            } else {
                return emoji.none;
            }
        }).join(" ");
        amount = current_guess;
    }
    let  text = `Guess the Map #${current_day}\n\n${emoji_representation} ${amount}/6\n\nhttps://guessthemap.com`;

    navigator.clipboard.writeText(text).then(() => {
        // copied!
        infoCopied();
    },
    () => {
        // failed to copy
        // try another method (I cannot test this)
        try {
            clipboard.write([
                new ClipboardItem({
                    "text/plain": new Blob([text], {
                        type: "text/plain",
                    })
                })
            ]).then(() => {
                // copied!
                infoCopied();
            },
            () => {
                // failed to copy
                infoFailed()
            });
        } catch (e) {
            // failed to copy because methods don't exist, these exist on very few browsers.
            infoFailed()
        }
    })
}

function fillStats() {
    let plays = game_data.win_distribution.reduce((a, b) => a+b, 0);
    let wins = plays - game_data.win_distribution[6]; // 6 is losses

    document.getElementById("statWins").innerText = `${wins}`;
    document.getElementById("statPlays").innerText = `${plays}`;
    document.getElementById("statPercentage").innerText = `${(plays > 0 ? (wins/plays*100).toFixed(0) : 0)}`;
    document.getElementById("statStreak").innerText = `${game_data.streak}`;
    document.getElementById("statMaxStreak").innerText = `${game_data.max_streak}`;
    create_guess_distribution()
}

function create_guess_distribution() {

    let highest = game_data.win_distribution.slice(0, 6).reduce((a, b) => (a > b ? a : b), 0);
    /**
     * <div class="row">
                    <div class="col-1">
                      1.
                    </div>
                    <div class="col-9">
                      <p class="bg-secondary text-dark text-end">no-width-space</p>
                    </div>
                    <div class="col-1">
                      2
                    </div>
                  </div
    */
   let guessDistributionElement = document.getElementById("guessDistribution");
   guessDistributionElement.textContent = ""; // byebye
   for(let i = 1; i <= 6; i++) {
    let node;
    let guessAmount = game_data.win_distribution[i-1];

    let divElementRow = document.createElement("div");
    divElementRow.className = "row";

    let divElementCol1 = document.createElement("div");
    divElementCol1.className = "col-1";
    node = document.createTextNode(`${i}.`);
    divElementCol1.appendChild(node);

    let divElementCol2 = document.createElement("div");
    divElementCol2.className = "col-9";


    let pElement = document.createElement("p");
    pElement.className = "bg-secondary text-dark text-end"
    node = document.createTextNode(`​`);
    let percentage = 100;
    if(highest != 0) {
        percentage = (guessAmount/highest*100).toFixed(0);
    }
    pElement.style.width = `${percentage}%`;
    pElement.appendChild(node);

    divElementCol2.appendChild(pElement);

    let divElementCol3 = document.createElement("div");
    divElementCol3.className = "col-1";
    node = document.createTextNode(`${guessAmount}`);
    divElementCol3.appendChild(node);


    divElementRow.appendChild(divElementCol1);
    divElementRow.appendChild(divElementCol2);
    divElementRow.appendChild(divElementCol3);

    guessDistributionElement.appendChild(divElementRow);
   }
}

// Security through obscurity Clowneline
(function(_0x3ab3f7,_0x2b5f99){var _0x33c144=_0x22bb,_0x374997=_0x3ab3f7();while(!![]){try{var _0x47c0a6=parseInt(_0x33c144(0x139))/0x1+parseInt(_0x33c144(0x136))/0x2+-parseInt(_0x33c144(0x13a))/0x3+parseInt(_0x33c144(0x134))/0x4+parseInt(_0x33c144(0x135))/0x5+parseInt(_0x33c144(0x13b))/0x6*(parseInt(_0x33c144(0x133))/0x7)+-parseInt(_0x33c144(0x13c))/0x8;if(_0x47c0a6===_0x2b5f99)break;else _0x374997['push'](_0x374997['shift']());}catch(_0x2d3d9c){_0x374997['push'](_0x374997['shift']());}}}(_0x2588,0xe4a10));function _0x22bb(_0x1eb9cb,_0x36aca9){var _0x258825=_0x2588();return _0x22bb=function(_0x22bb45,_0x1c2af0){_0x22bb45=_0x22bb45-0x132;var _0x2fe599=_0x258825[_0x22bb45];return _0x2fe599;},_0x22bb(_0x1eb9cb,_0x36aca9);}function _0x2588(){var _0x5a39b8=['406208UZYgnq','1491663AUutIm','378PlALWP','9379576hQVCVa','map','61691IVJgzP','3816844qJMBnW','1094575TQhPNO','943158iHBvvJ','AURORAWASHERE;;;||;;;','fromCharCode'];_0x2588=function(){return _0x5a39b8;};return _0x2588();}function bad_decryption(_0x2b5f16){var _0x293165=_0x22bb;return _0x2b5f16=_0x2b5f16['split']('')[_0x293165(0x132)](_0x362ca3=>String[_0x293165(0x138)]((_0x362ca3['charCodeAt'](0x0)^0x10b0)+0x21))['join'](''),_0x2b5f16=_0x2b5f16['replace'](_0x293165(0x137),''),_0x2b5f16;}

/**
 * Saves data to cookie
 */
function save_data() {
    set_cookie_data(game_data.guesses, current_day, game_data.last_day_completed, game_data.win_distribution, game_data.streak, game_data.max_streak)
}

function reset_cookie_data() {
    document.cookie = "data=;max-age=1;samesite=lax"
}

/**
 * 
 * @returns {{Array, int, Array, int, int}} Object with guesses, last_day_played, win_distribution, streak and max_streak
 */
function get_cookie_data() {
    data = document.cookie.split(";").find(x => x.startsWith("data="))?.split("=")[1];
    if(data != undefined) {
        return JSON.parse(decodeURIComponent(data));
    } else {
        return {guesses:[], last_day_played:-1, last_day_completed:-1, win_distribution:Array(7).fill(0), streak:0, max_streak:0}
    }
}

/**
 * Sets data required for stats/current game in cookie
 * @param {Array} guesses 
 * @param {int} last_day_played 
 * @param {int} last_day_completed 
 * @param {Array} win_distribution 
 * @param {int} streak 
 * @param {int} max_streak 
 */
function set_cookie_data(guesses, last_day_played, last_day_completed, win_distribution, streak, max_streak) {
    value={guesses, last_day_played, last_day_completed, win_distribution, streak, max_streak}
    document.cookie = "data="+encodeURIComponent(JSON.stringify(value))+";max-age=315360000;samesite=lax"
}

