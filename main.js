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
                    message.innerHTML = `Found no results for "${data.query}"${getDifficultyData("disableAutocomplete") ? " :)" : ""}`;
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
            if(getDifficultyData("disableAutocomplete")) {
                input = `​` + input;
            }
            return input;
        },
};


// order, encrypted using Aurora patented B. Encryption (c)
const order = [`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႜჾფჽუ႔ჶჶჿ჻ჰჽუႡႤႿႿႜ`,`ႂჷჰჳჴႆჾს჻ჳ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჾ჻ჰსჸტ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႔ჵჵჴუჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႕ჾსჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪუ`,`႓ჴტჾ჻ჰუჴႃჾღჴს`,`႓ჴ჻ფტჸჾჽჰ჻႒ჰჽჾჿშ`,`႘ჰჼჳჰჳჱჾჳႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႓ჰჳႶტႃჾღჴს`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႛჰტუႝჸჶჷუ`,`ႀფჸჲჺჸჴႜჾფჽუჰჸჽႡ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼႜჴუჰ჻ႜჰჩჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႞ჲუჾჱჴს`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႑ჾფჽჲჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႜჴჲჷჰჽჸჩჴჳ႗ჾსჸჩჾჽ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႟ჰტუჴ჻႟სჾჱ჻ჴჼႂჾ჻ქჸჽჶ`,`ႅჰჽჸ჻჻ჰ႒ჾსჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႃჷჴ႕ჰჳჴ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႕ჾსტჰჺჴჽჲჸუშუღჾ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႁჴტჴჲსჰუჸჾჽ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼႁჸჲჺჰჽჳႜჾსუშ`,`ႠႤႼႂჴჲჾჽჳ႙ჰჸ჻ႃჸჼჴ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႂჸ჻ჴჽუႆჰჽჳჴსჸჽჶტ`,`႐ჽჾჼჰ჻შჲჷჰჿუჴსႿ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႉჸჿჿჸჽႶჸჽტჿჰჲჴ`,`ႃჷჴ႙ჴ჻჻ჸჴტႶ႖ჴ჻ჰუჸჽჾფტႂჰჽჲუფჰსშ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼ႑ჰჲჺღჰსჳტ႑ჰ჻჻ჲჸ჻ჸუშ`,`ႄ჻უსჰ႗ჴჰქჴჽ`,`႕ჴსსჴუ཈ტႜჸჲსჾႜჾფჽუჰჸჽ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႃჷჴႂჴჲსჴუ႒჻ჸჵჵტჸჳჴႜჰჽტჸჾჽ`,`႒ჴ჻ჴტუჴႁჴჰსსჰჽჶჴჳ`,`႞ქჴსტჷჾუ႐ქჴჽფჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႔ჰს჻შ႒ჾსჴ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႖ჰსჳჴჽჾჵ႓სჴჰჼტ`,`ႃჴჼჿ჻ჴჾჵႃჾჼჾსსჾღ`,`႐႒ჷსჸტუჼჰტႝჸჶჷუ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႝჴფუსჰ჻ႁჸჳჶჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႂუშჶჾჿჷჸ჻ჸჰ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼႂჾ჻ჰს႓ჴტჲჴჽუ`,`႐჻჻ჶჰჼჴჿ჻ჰშჽჾჳჴჲჾ`,`ჲჰჽჲჴ჻ჲფ჻უფსჴ`,`႔ჰსუჷჴჽ႓სჴჰჼ`,`ႂჷჸჿღსჴჲჺႆჴჰუჷჴს`,`ႜჰჶჼჰ႔ყჿჴსუ`,`ႃჷჴ႑ჰჲჺსჾჾჼტ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႕ჰ჻჻ჴჽႜჴჼჾსჸჴტ`,`ႄჽჳჴსჶსჾფჽჳႄჽჳჴსჶსჾფჽჳ`,`႔ჼჴსჰ჻ჳႜჴჶჰ჻ჸუჷ`,`ႂშ჻ქჰჽ႖სჾქჴႼႛფჲჸჳ႒჻ჸჵჵტჸჳჴႃჾჾ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႐႑჻ჾჲჺჴჳ႞ჵჵ႟ჰუჷ`,`ႃფსრფჾჸტჴ႗ჴ჻჻`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႐ტჷჴჽ႒ჸუშ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႁჰჸჽჱჾღႁჾჰჳ`,`ႃსჰქჴ჻ჴსჾჵ႑჻ფჴ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼႠႠႼ႔ყჰჼჿ჻ჴ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႓სჸჵუჲჾსჴ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႗ჾღუჾ႓ჾ႒ჴ჻ჴტუჴႃჴჲჷ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႕სჾჩჴჽႜჰჲჷჸჽჴსშ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႂჴქჴსჴჳႂღჰჿ႒ჸუშ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼჸჵჾსჶჾს`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႟ფჵჵჸჽႶႁჾჲჺ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႕ჰსჴღჴ჻჻႕ჸსჴ`,`႐ჽშუჷჸჽჶჸტ႟ჾტტჸჱ჻ჴ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼჰჵსჴჽႩ႓`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼႜ႘ႝႄႂ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႂფჱ჻ჸჼჸჽჰ჻႖ჰსჳჴჽ`,`ႂჽჾღჵჰ჻჻ႂჿჸსჴ`,`ႆჸჽუჴს႒ჾ჻჻ჰჱ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႑ჸტტშႂჰჽჲუფჰსშ`,`ႃჷჴႚჰშჾჽჰსჰ႒ჾ჻჻ჴჲუჸჾჽ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႓სჰჵუშ႓ჰჩჴ`,`႐სჲჷჰჸჲႃჴსსჰჲჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႐ჽშუჷჸჽჶჸტႂფჿჿჾტჴჳუჾ႑ჴ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼႂჰჳუჴ჻჻ჸუჴ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႗ჰსჳ႒ჾსჴ`,`ႃჷჴჵჸსტუჿჰუჷ`,`ႂუჾსჼჸჽჶ႒ჸუშძჳჰჳჱჾჳჱჳჰშჼჰჿ`,`႑჻ფჴ႒ჰტუ჻ჴ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႟ფსჶჰუჾსშჾჵუჷჴႉჸჿტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႒ჾ჻ჳ႕ჴჴუ`,`ႃჷჴ႕჻ჸჿ႕჻ჾჿჿჴსႨႿႿႿ`,`႓სჴჰჼშუსჸჰ჻ტ`,`ႚჰჸჩჾႂფჼჼჸუ`,`႟ჴუჰ჻ტჾჵჰႛჸ჻჻შ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႙ჰჽჺ႕ჰჲჸ჻ჸუშ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼჳჾუჷჴჼჰსჸჾ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႒სშჾტჷჾჲჺ`,`ႆჸჽუსშ႒჻ჸჵჵტ`,`႐ქჿჾჲჰ჻შჿტჴ`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼშჾფჼჸჶჷუღჰჽუუჾჱსჸჽჶჰჽფჼჱსჴ჻჻ჰ`,`႗ჰჺჾჽჸღჰ႐ჳქჴჽუფსჴ`,`ႄ჻უსჰႂფჼჼჸუႝჴღႅჴსტჸჾჽ`,`႕჻ჾჾჳჴჳ႒ჰქჴტ`,`ႂჷჰუუჴსჴჳႂჺჸჴტ`,`ႆჰუჴსႂჿჰჲჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪღღჾჰჷႰ`,`႒ჾტჼჸჲႁჴჰ჻ჼ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼႃჷჴ႓ჴჿუჷტ`,`ႂჸ჻ქჴსႁჸჳჶჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႄ჻უსჰ႗ჴ჻჻`,`ႃჷჴႄჿტჸჳჴ႓ჾღჽႂჸჳჴტ`,`ႂშ჻ქჰჽ႖სჾქჴႼ႐႑ფჵჵႉფჲჲჷჸჽჸႶტ႟ჴჰჺ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼ႟႘႔႒႔`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႐ჱჰჽჳჾჽჴჳ႐რფჴჳფჲუ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႟ფსჿ჻ჴ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႟ფტჷჱ჻ჾჲჺႀფჰსსშ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႔ჼჴსჰ჻ჳႂჺჸჴტ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႄႺႡႠ႒႔`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႆსჰჿჿჸჽႶ႙ჴ჻჻ჸჴტႂუჰუჸჾჽ`,`ႆჰტუჴჳႜჴჰჳჾღ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼჳჴ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႓ჰსჺ႐ტჲჴჽუ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႜჸჳღჰშႃსჰჸ჻`,`႖ჴუუჸჽჶ႞ქჴს႘უღჸუჷႜჰჳჳშႃჷჾსტჾჽ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼႛ႘ႜ႘ႃ`,`႒ჴ჻ჴტუჴႩႃჷჴႛჰტუႜჰჳჴ჻ჸჽჴ`,`႕ჰჳჴჳ႒ჴ჻ჴტუჸჰ჻ႁჴჼჰჸჽტ`,`ႉჸჿჿჸჽჶჽჾუჳჰტჷჸჽჶ`,`ႂჷჸჽჸჽჶႂჷჾჾუჸჽჶႂუჰს`,`ჳსჴჰჳჸჽუჷჴჲ჻ჾფჳტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ჱშტტ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼ႕ჾსჴႷ႐ჵფტჸჾჽჼჰჿჱჴუღჴჴჽ႕ჾსტჰჺჴჽ႒ჸუშჰჽჳ႒ჾსჴႸ`,`ႅჸჱჴႜჾფჽუჰჸჽ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႑ჴ჻ჾღႉჴსჾ`,`ႂშ჻ქჰჽ႖სჾქჴႼ႔უჷჴსჴჰ჻႗ჾ჻჻ჾღტ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႒ჾსსჾჳჴჳ႒ჸუშ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪუჷჴჾღჴ჻჻`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႂჰჿჿჷჸსჴႂჿჸსჴ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႒ფჿჸჳႶტ႖ჰსჳჴჽ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႂჿსჸჽჶ႐ჽჳ႐ႂუჾსჼ`,`ႂუჰუჸჲႂჷჸჵუ`,`ႛჴქჸჰუჷჰჽႶტႁჴჷჴჰსტჰ჻Ⴚ`,`ႜჰჳჳშႶტ႗ჰჽჶჾქჴს`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႅჰჲფფჼ႕ჰჲჸ჻ჸუშ`,`႐჻ჸჲჴႀფჰტჰსႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႕ჴჽჽჴჲ႕ჾსჴტუ`,`ႃჾსჽჰჳჾႅჰ჻჻ჴშ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼႄჽჳၸტჾსჳსჴჴჽჲჷჴქၹუსၸჳჴჲჾფ჻ჴფსტ`,`ႂჼჰ჻჻ტჰჽჲუფჰსშႩႃჷჸსჳ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪჳსჴჼ`,`႒სშტუჰ჻ჸჩჴჳ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼႅჴსჳჰჽუႃსჰჸ჻`,`ჸჲჴ႒სჴჰჼႶტႄ჻უსჰტ`,`ႂფჽტჴუႁჸტჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႁჾტჴ႓ფტუ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႉჸჿႜჾქჴს႐ტჲჴჽუ`,`ႃჷჴႜშტუჴსჸჾფტ႐სჴჰ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႂუსჰჽჶჴႂ჻ჴჴჿღჰ჻ჺ`,`ႜჰჳჴ჻ჸჽჴႩ႘ჽუჾუჷჴႃჴჼჿ჻ჴ`,`႞ჽჴႃჷჾფტჰჽჳႜჴუჴსტ`,`ႃჷჴႂჴჲსჴუჾჵ႒ჴ჻ჴტუჴႜჾფჽუჰჸჽ`,`უჷჴსჾჰჳ჻ჴტტუსჰქჴ჻ჴჳ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჼჾჶ႒ჸუშ`,`႗ჸჱჴსჽჰუჸჾჽ႐ჿჴყ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႂჷჰჳჴ჻ჸჶჷუ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼღჴუუშღჴუღჰუჴსჵჰ჻჻`,`ႂშ჻ქჰჽ႖სჾქჴႼႂღჸუჲჷ჻ჰჽჳႡ`,`႕ჾსტჰჺჴჽ႒ჸუშ႔ႼႂჸჳჴႷႺႺႸ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐უ႓ჰღჽ`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼႚჸჽჴუჸჲ႓ჾჼჰჸჽ`,`ႀფჸჽჽჸჶჰჽႶტႝჾუჴჿჰჳ`,`ႂშ჻ქჰჽ႖სჾქჴႼ႐ჽშუჷჸჽჶ႘ტ႟ჾტტჸჱ჻ჴ႒ჷსჸტუჼჰტ႔ჳჸუჸჾჽ`,`ႝჾსჼჰ჻ႜჰჿႥႣ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႃჷჴ႒჻ჸჼჱ`,`႓ჾჽჺჴსႠႨႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႅჴ჻ქჰსჸტ`,`႟ჴსჼჰჵსჾტუ႓ჴჽ`,`ႃჷჴ႒ჴ჻ჴტუჴ႟ჰსჰჱ჻ჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႜჾქჴ႑჻ჾჲჺ႖სჾუუჾ`,`უჷჴႠჷჾფსჰ჻ჾჽჴჲჾჽუჴტუႾჲჾ჻჻ჰჱ`,`ႂფჼჼჸუ႟სჾ჻ჾჶფჴ`,`ႃჷჴႡႿႡႿႃჾჺშჾ႓სჸჵუ႘ჽჲჸჳჴჽუ`,`႒႞ႁႝႂ႗ႄ႒ႚ႔ႁ`,`႐ჼჱჴსႃჴსჼჸჽფტ`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼ႐სჾფჽჳუჷჴႆჾს჻ჳ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႞ჽჲჴჸჽჰ႑჻ფჴႜჾჾჽ`,`႓სჴჰჼუჾ႐ღჰჺჴჽჸჽჶ`,`႐ႝჴღ႑ჴჶჸჽჽჸჽჶ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႙ფტუႂჿსჸჽჶტ႐ჽჳ႑ფჱჱ჻ჴტ`,`ႆჸჽჶჴჳႂუჰუჸჾჽ`,`ႂფჼჼჸუ႖ჰსჳჴჽ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼჸჵ჻ფფჵ჻ფ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႅჰჿჾსღჰქჴႝჸჶჷუჼჰსჴ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႛჰქჰჵსჾტუ႒ჰქჴსჽ`,`ჷჴჰუჷჴსႶტჰრფჰსჸფჼ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႜჰჷჾჶჰჽშႜჾჽჰტუჴსშ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႐სჲუჸჲ႞ფუჿჾტუ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႁფჿუფსჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႠႿႿსჸჳჶტ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႒ჸუშႛჸჼჸუტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ჽფჱჸ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႙ჰჼჼჸჽႶ`,`ჸჰჼჳჰჳჱჾჳ႒ჾ჻჻ჰჱႡႿႠႧ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႃჷჴႡႿႡႡႜჸჽჸ႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႃჷჴႂფჼჿრფჴ჻`,`႒სშტუჰ჻႒ჾსჴ`,`႕ჰსჴღჴ჻჻႓ႼႂჸჳჴႼ႕ჸჽჰ჻႖ჾჾჳჱშჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႟ფტჷ႑჻ჾჲჺტ႒჻ჸჵჵტ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼႂჿჾჾჿშႃჷჸჲჺჴუ`,`ტუფჿჸჳჶჾსჶჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႡႣყႢႢ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႛჾქჴႂუჾსშ`,`ႚჰჸჩჾჰჳქჴჽუფსჴტ`,`ႂშ჻ქჰჽ႖სჾქჴႼ႐ჼჴუჷშტუ႖სჾუუჾ`,`ႃჴჼჿჾსჰ჻ႂჷსჸჽჴ`,`႒ჾჽრფჴსჾსႶტ႟ჴჰჺ`,`႑ჾჾტუჴჳ႒ჸუშ`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼ႟სჸტჼჰუჸტჼ`,`ႅჰ჻Ⴖტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႃჷჴ႓ჴჲ჻ჸჽჴ`,`ႃსჸჰჽჶ჻ჴႶტ႗ჾჼჴ`,`႔ჩჴ჻Ⴖტ႒႒Ⴜტჸჳჴტ`,`ႜჸჳჽჸჶჷუ႐რფჰსჸფჼ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႛფჽჰს႖სჰქჸუჰუჸჾჽ`,`ႃჴჲჷშႃჴჼჿ჻ჴ`,`ႂჸ჻ჴჽუႂჽჾღ`,`ႛჴქჸჰუჷჰჽႶტႁჴჷჴჰსტჰ჻`,`႐ႁჰჸჽშႝჸჶჷუ`,`ႦჳႷტჸჽჶ჻ჴჳჰტჷქჴსႸ`,`ႜ႘ႝ႓႒ႁ႐႒ႚႜჰჿ႟ჰჲჺ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼႄ႟႔ႝ႓`,`ႂფჽტჴუႜჾფჽუჰჸჽ`,`႘ჽუჾუჷჴႆჴ჻჻`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼჷჴ჻ჿტსჴჰჳჰჱჸ჻ჸუშ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂშჼჿჷჾჽშ`,`႗ჾღႃჾႜჰჺჴ႐ႜჰჿႩ႕ჾსჰႂჲსჰჿჿჴჳ႒ჾჽუჴტუ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼჿ჻ტფ჻უსჰ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႗ჾღႃჾ႟჻ჰშ႒ჴ჻ჴტუჴ`,`უჾფჷჾჴႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႑სႠჶჷუ႟Ⴐჽჺ`,`ႁფჸჽჾჵჰႁჰჲჲჾჾჽ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼ႞჻ჳ႗ჾსჸჩჾჽ`,`ႂღჸუჲჷႜჾფჽუჰჸჽ`,`ႛჰქჴჽჳჴსႂჿჸსჴ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႆჸჽჳჲჷჸ჻჻`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႃჷჴ႖სჴჴჽႃჴჼჿ჻ჴ`,`ႁჰჸჽშ႕ჰსჰღჰშ႓ჸტჰსსჰშ`,`႖჻შჿჷ႓Ⴜႂჸჳჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႃჾႃჷჴႜჰსტ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႖ჴჼტუჾჽჴ႒ჰქჴსჽტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜჾჾჽტჾჽჶ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႖ჾჳტჾჵუჷჴ႐სუჸჵჸჲჸჰ჻`,`႞ჺႝჰჽჾႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႁჰჲჲჾჾჽ႔ყჿსჴტტ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႃჰსჳჸჶსჰჳჴႃჴჼჿ჻ჴႃჾჾ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႑ႁ႔႐ႚ႘ႝ႖ႾႾ႟႞႘ႝႃ`,`ႃჷჴ႗ჰჲჺ჻ჰჽჳტ`,`႖ჸსჳჴსტႜჰჿ`,`႒ჰს჻ჾტႶტ႑ჳჰშႂჿჴჲჸჰ჻Ⴉუჷჴღჸჽუჴსჲჾ჻჻ჰჱჿსჾჱ჻ჴჼ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႗ჾტუჸ჻ჴႃსჰჸ჻`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႜჰუსჸყ`,`႖სჰქჸუშ႒ჾჼჿ჻ჴყ`,`ႁჴუსჾႁჷშუჷჼႁფჸჽტ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼ႐ႅ႔ႁႃ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႞ჽჴႂუჰსႁჴქჸჴღ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႃჷჴႄჽჺჽჾღჽႚჽჾღჽ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႕სჾჩჴჽ႒ჸუჰჳჴ჻`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼჱ჻ჴჰჺტუჰსჵჰ჻჻`,`႕სჾჶჴ჻ჸჽჴႂფჼჼჸუ`,`႐჻ჱჲჰუႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႒ჾტჼჸჲႄჽჳჴსღჰუჴს`,`ႃჷჴჲჰქჴჾჵჱფჱჱ჻ჴტ`,`ႇჾ჻ჸႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜჰღჰ჻ჺჸჽუჷჴჿၵსჺ`,`႒ჾჼჿ჻ჴყႠႨႨႦ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႒ჴ჻ჴტუჴႶႧႨ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼ჻ჴტჱჾჼჰჶჽჴუჸჲჵჸჴ჻ჳ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႚსჸ჻჻႑ჰშ`,`ႝჾ႓ჰტჷႃჴჼჿ჻ჴ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼ႘ჲჴ႕ჾსუსჴტტ`,`႟჻ჰუჵჾსჼჰჳქჴჽუფსჴტ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼ႕ჸტჷჽჴუ႓ჸჼჴჽტჸჾჽ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႃჷჴႃჷჸჴჵ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႔სსჾსႣႿႣ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႚსჸ჻჻ჾტჾჿჷჸჲჰ჻ჲჾჽტჷსჸჼჿჴსჰუჸჾჽტ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႁჴქჴსტჰ჻`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႁფტჷჴჳႉჸჿტ`,`ႂშ჻ქჰჽ႖სჾქჴႼႛჴქჴ჻ტ`,`ႜჾფჽუႚჸჼჸუჰჽშႂჰჶჰ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ტ჻ჴჴჿ`,`႞ტჷჸსჾႶტ႕ფჽႁჸჳჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჾ჻ჰსჸტ`,`ႉჴსჴყႶტႉႼႂჸჳჴტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜჾჾჽႃსჰჸ჻`,`ႂშ჻ქჰჽ႖სჾქჴႼჱსჸჽჶჸუჱჰჲჺჽჾღშჰ჻჻`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႃჷჴႛჾჽჶႆჰშ`,`ႃჴჼჿ჻ჴჾჵუჷჴ႒ფსტჴჳ႖ჾჳ`,`႒ჰჱჾჱႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႄ჻უსჰႜჾჱჸფტ႐ჳქჰჽჲჴჳ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჺშ႗ჸჶჷႰ`,`႞ჺႝჰჽჾႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႂღჰჽ႗ჸ჻჻ტჸჳჴ`,`ႃჷჴ႒ჷჰუტჸჳჴტ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႒ჰუჰჲ჻შტჼჸჲ႒ჰქჴსჽ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႅჴსჳჰჽუ႒ჸუშ`,`႒ჰჱჾჱႶტႷ჻ჰუჴႸ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႕სჸჳჶჴ႟ჰ჻ჰჲჴ`,`႓ჸჼჴჽტჸჾჽჾჵ႒ჷჰჾტ`,`ႂჴჼჴჽჰႜჴსუქშჺჷ`,`႒჻ჾფჳშ႒჻ჸჵჵტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪჸჸჳჺႽႽ`,`ႃჷჴႆჰ჻ჺ႗ჾჼჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႛ႐ႅ႐ႃ႞ႁႈ`,`႒ჰსჴ჻ჴტტ႐ჽჾჽႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႖ჸ჻ჳჴჳ႗ჾ჻჻ჾღ`,`ႂფჽტჴუႂჺშღჰშ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႕ჰუჰ჻႔ყჲჴჿუჸჾჽ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႁჴჲუჰჽჶ჻ჴტ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႃჷჴႁჴჶჸტუსშ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ჳსჰჽჾტ`,`ႛჴქჸჰუჷჰჽႶტ႒ჷჰუჴჰფ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႅჾჸჳ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼ႗ჴჰსუჾჵუჷჴႂჷსჸჼჿ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼႃჸჼჴႁჸჵუႃსჰჸ჻`,`ႃჴჲჷ႒ჾჼჿჴჽჳჸფჼႩ႑ჾფჽჲჴ႗ჴ჻ჿჴს႖შჼ`,`႑ჰ჻჻ტႜჸჽჴტღჷჴსჴუჷჴშჼჸჽჴ႑ჰ჻჻Ⴜႂჷჰჿჴჳ႖ჴჼტუჾჽჴტ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼ႑჻ჰჲჺჶსჾფჽჳტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႅჴ჻ქჴუ`,`႓႔ႛႃ႐ႂ႒႔ႝ႔႞ႝ႔`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼႜჰჳჴ჻ჸჽჴႜჰჺჴტჰႜჰჿღჸუჷ႖სჰქჸუშ႗ჴ჻ჿჴსႰ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႃჷჴႜჸჳჽჸჶჷუႛჸჱსჰსშ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼჳჴႡ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႓სჴჰჼ႑ჾჾტუჴსႃჴჼჿ჻ჴ`,`႓სႽႜჰჲჷჴტუჸჺႶტ႓შჽჰჼჸუჴ႒ჰტუ჻ჴ`,`႒ფსტჴჳႜჸჽჴტ`,`ႂფჼჼჸუ႒ჾ჻჻ჰჱႡႿႡႠ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႃჷჴႂჰფჲჴႂჸჳჴ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႖ჾქჴსჽჼჴჽუႃჾღჴს`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႕ჾსჴტუჾჵႜშუჷჾტ`,`႐სჿჷჸჼჸჶჾჽႶტ႓Ⴜႂჸჳჴტ`,`႕სჾჩჴჽ႗ჴჸჶჷუტ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼႝშჰჽႜჰჳჴ႖ႜႩ႓`,`႑ჰჽჰჽჰႡႢႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႟჻ჰუჵჾსჼჸჽჱႰ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႒სშტუჰ჻႒ჰქჴსჽტ`,`ႃჴჼჿ჻ჴჾჵ႑჻ჸჽჳჽჴტტ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႕ჰს႖ჾჽჴ`,`უჾფჷჾჴႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႄჿუფსჽჴჳ႓ჾღჽუჾღჽ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႒ჴჿჷტუჴ჻჻ჰუჸჾჽ`,`ႄ჻უსჰ႟სჾჲჴტტჸჽჶ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႓ფჽჶჴჾჽჾჵႃჾსუფსჴჳႂჾფ჻ტ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼჷჸ჻ჴჽჽშჶჾ჻ჳ`,`Ⴄჱႎ႖ჰსჱჰჶჴႎႅჴსტჸჾჽ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႞ქჴსჶსჾღჽ႓ფჽჶჴჾჽ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႑ჾფჽჲჸჽჶ႓ჾჲჺ`,`႕ჰსჴღჴ჻჻႟჻ფტ`,`႟ჾ჻შჶჾჽ႓სჴჰჼტ`,`ႜჰჳჴ჻ჸჽჴ႖ჾჴტუჾႂჿჰჲჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႁფჱშ႒჻ჸჵჵტ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႓ჴჵჸჽჸუჴ჻შႝჾუ႓ჴჳჸჲჰუჸჾჽ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႂჿჸჺჴ႟ჸუ`,`ႃსჰჽრფჸ჻ႂჿჰჲჴ႖ჰსჳჴჽ`,`ႄ჻უსჰႂჺჾჾ჻`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႒ფსჸჾფტ႒სჰუჴს`,`႕Ⴝ႘ႽႂႽ႗ႽႷ႕ჸტჷ႘ჽႂჿჰჲჴ႗ჾღႮႮႸ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႗ჴ჻჻ႷჸტჷႸ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႒ჾუუჾჽ႒ჰჽჳშ႒ჾსჴ`,`႐ჱჰჽჳჾჽჴჳ႒ჸუშ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼ႟႞ႅႩႈჾფ႓ჸჳჽႶუႄ჻უსჰ`,`႔ჼჱჴსႶტႄუჾჿჸჰ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႂფჱჲჾჽტჲჸჾფტჽჴტტ`,`႐ფუფჼჽჰ჻႗ჴჸჶჷუტ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႐ႁჴტჾსუႽ႑ჸჽ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႃჷჴႃჸჳჴტჵსჾჼႃჷჴႂჴჰ`,`ႃჷჴ႓ჰჳტჸჳჴტ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼႂჷჸჵუჸჽჶႃჴჼჿ჻ჴ`,`ტჴყშტფჼჼჸუ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႒ჴ჻ჴტუჸჰ჻ႜჴჳ჻ჴშ`,`႓ჾჽჺჴსႠႨႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜႂფჲსჾტჴႂჾ჻ჰსჸტ`,`႖სჰქჸუშ႗ჴ჻ჿჴსႜჸჽჸ႒ჾ჻჻ჰჱႼ႞ჽშყႃჾღჴსႁჴჼჽჰჽუტ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႕სჾჩჴჽႆჰუჴსჿჰსჺ`,`ႁჴჳႜჾჾჽႶტႁჴტჾსუ`,`႖ჾჾტჴႢႿႿႿჼ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႗ჴ჻჻ღჸჽჳ`,`႒ჷჸ჻჻შႻႆჸჽჳშႁფჸჽტ`,`႘ჽუჾႃჷჴ႙ფჽჶ჻ჴႼ႐ჽჲჸჴჽუႁფჸჽტ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼუჷჴჲჴ჻ჴტუჴჼჰჿჿჴსტუსფჶჶ჻ჴ`,`ႁჰჳჸჰჽუႂჰჽჲუფჼ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼႂ႟႐ႁႚ`,`႑ჰ჻჻ტႃჾფსჽჴშႛჾჱჱშႼჰჽჳႅჾჸჳ`,`ႁ႐ႁ႔ႁ႐႒႒႞႞ႝႁ႞႐႓`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼ႔ჼჱჴს႟ჰსჰჳჸტჴ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႂჷსჸჼჿႡႤႿႿႜჴუჴსტ`,`ႄჽჴყჿჴჲუჴჳ႑ჴჷჰქჸჾსტ႒ჾჽუჴტუႡႿႡႠႼ႓ფჱჱ჻ჴႃჾღჴს`,`ႛჴქჸჰუჷჰჽႶტႄ჻უსჰტ`,`႒ჾტჼჸჲႂჰჽჳტ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႗ჰფჽუჴჳ႑჻ჾჲჺ႑სჸჳჶჴ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႜჸჳჽჸჶჷუ႓სჴჰჼტ`,`ႃჷჴ႒ჾჼჿ჻ჴყ႑Ⴜႂჸჳჴ`,`႟ჸჲჾႼႧႁჴჼჰჺჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႓სშႂჿჰჲჴ`,`႙ჰჲჺჰ჻Ⴖტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴜ႘ჲჴ႒ჾ჻ჳႃსჰჸ჻`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂუჰსჵჰ჻჻`,`႐ჽჾუჷჴს႕ჰსჴღჴ჻჻ႜჰჿ`,`႒႔ႛ႔ႂႃ႔ႡႰႰႰႰႰႰႰ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜ႐ႁႂ႕႖ႂႽ`,`႕ჾსჶჾუუჴჽႁჷშუჷჼ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႃჷჴႂჴჲსჴუ႒჻ჸჵჵტჸჳჴ႕჻ჾსჴტუ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼჸჼჱჰჳჰუჽჰჼჴტ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႗შჿჴსუჷჴსჼჸჰ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႃჷჴႂუჰსუტჸჳჴ`,`႟ჰჸჽუႁჴქჴსტჴ`,`ႛჴქჸჰუჷჰჽႶტႄ჻უსჰტႺ`,`ႂჸ჻ჴჽუႝჸჶჷუႶტ႐჻჻ჴშ`,`႕჻ჰჸს႐ჶჰჸჽტუ႔ქჸჳჴჽჲჴ`,`႐჻ჸჲჴႀფჰტჰსႶტ႑႓ჰშႂჿჴჲჸჰ჻Ⴜ႗ჰჽჶ႞ფუႆჸუჷ႞ჺႝჰჽჾႰ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႙ჰჽჺ႕ჰჲჸ჻ჸუშႡ႔჻ჴჲუსჸჲ႑ჾჾჶჰ჻ჾჾ`,`႗ჴყჰჶჾჽ႕ჾსჲჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜႈႝ႓ႜႛႃႁ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႃჴჴჽშႃჴჼჿჴსჰუჴႃჴჼჿ჻ჴႃსჸჰ჻ტႩႃჴჼჿჾსჰსშႃჸუ჻ჴ`,`ႃჷჴ႑჻ჸჩჩჰსჳ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႁფჱშႜჸჽჴტ`,`ႂფჱფსჱჰჽႝჴჱფ჻ჰ`,`ႃჰსჳჸჶსჰჳჴႃჴჼჿ჻ჴ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼ႐ჱჾქჴႃჷჴႂფჼჼჸუ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႖჻ჰჲჸჰ჻႒჻ჸჼჱ`,`ႛჰჽჸႶტ႒ჰქჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႕ჰ჻჻ჰჲჸჾფტႁჴჰ჻ჼ`,`ႜფტჸჲႆჾს჻ჳ`,`႓ჴჿ჻ჴუჴჳႁჴტჴსქჾჸსႼ႑ႁ႔႐ႚႃ႗ႁ႞ႄ႖႗`,`႘ჽუჴსტუჴ჻჻ჰსႂფჱჼჰსჸჽჴ`,`჻ჾღრფჰ჻ჸუშ჻ჰქჰჼჰჿႽჱჸჽ`,`ႂშ჻ქჰჽ႖სჾქჴႼ႘ჽჴ჻ფჲუჰჱ჻ჴႜჾჳჰ჻ჸუშჾჵუჷჴႂფჼჿ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႞჻ჳႂჸუჴ႗ჴჲჺႼႂჸჳჴ႒ჰტტჴუუჴႁჸჵუ`,`ႃჴჼჿ჻ჴჾჵႃჴჰსტ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼჶჾჾტჴჼჰჳჴჶჼႽ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼქჾ჻ჰსჸტ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼ႓ჴჴჿ႕სჸჴჳ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼႉჸჿუჸჴჳ႟ფჵჵჴსტ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼႃჴჼჿჾსჰ჻ႃჾჸ჻ჴუ`,`ႚ႐႔ႁႁ႐Ⴖႂ႕ႄႁႁႈႆ႔႔ႚႼ႑႞ႄႝ႓`,`ႃჷჴჾႂფჼჼჸუ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼ႕჻ჾღჴს႑ფჼჿჴსႜჾფჽუჰჸჽ`,`႒ჴ჻ჴტუჸჰ჻႒ჰჱჸჽჴუ`,`ႃჷჴႂჴჰტჸჳჴ႒Ⴜႂჸჳჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႛჸჶჷუ႑სჴჴჩჴ`,`႒სშტუჰ჻ႅჾჸჳ`,`႐ტუსჰ჻ႃჾღჴს`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႁჰჸჽჱჾღႃჴჼჿ჻ჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႛჸ჻჻შႶტႛჰჺჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႙ფჸჲჴ႑ჾყ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼႃჷჴ႑ჰ჻჻ტტჸჳჴ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႟ფსჿ჻ჴ႕ჰჲუჾსშ`,`႟ჴსჸჳჾუ႞ჰტჸტ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼ႕჻ჾჾჳჴჳ႒ჸუშ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႖ფტუშ႟სჾჿჾტჸუჸჾჽ`,`႘ႝ႕႘ႝ႘ႃ႔႗ႈ႟႔ႁ႟႘ႂႂ`,`ჱ჻ფჴჷჰჸსჰჽჳჿსჾჽჾფჽტ`,`ႂუჰუჸჾჽჰსშ႘ჽუჴსჼჸტტჸჾჽ`,`႕჻ჾჰუჸჴსႃჸჼჴ`,`ႉჸჿႜჾქჴს႒ჾჽუჴტუႡႿႡႠႼ႐რფჰუჸჲႜჴუსჾჿჾ჻ჸტ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႗ჾღუჾႜჰჺჴჰ႖ჾჾჳ႒ჴ჻ჴტუჴႜჰჿ`,`ႆჰუჴსჱჴჰსႜჾფჽუჰჸჽ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႜშტჴ჻ჵ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႄ჻უსჰႂღჰჽႂ჻ჸჳჴ`,`ႃჷჴ႑ჾტტႂჰფჲჴႜჰჿ႟ჰჲჺႼႃსჴჴუჾჿ႒჻ჸჼჱ`,`႓ჸტჲჾჽჽჴჲუჴჳႂფჼჼჸუ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼ႐ტႂჷსჸჼჿ჻ჴႷႂჷსჸჼჿႃჴჼჿ჻ჴႸჰტႃჷჰუ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႃჴჼჿ჻ჴჾჵუჷჴ႕ჸტჷ`,`႖ჾჾტჴႶტ႖ჰჼჴსႆჴჴჺႼ႒ჾჽჽჴჲუჴჳႂფჼჼჸუႢႿႿႿჼ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼ႖სჴჴჽჱჰჲჺჰუჸუჰჶჰჸჽ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႂჲჰ჻჻ჾჿႂჰჽჲუჾსჸფჼ`,`႖სჰქჸუშႃჴტუ`,`႓ჾჽჺჴსႠႨႶტႷ჻ჰუჴႸ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴉႂჾ჻ჰსჸტႡာ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼ႕სჾტუჴჳ႑ჾჽჺსჸ჻჻Ⴖტႂ჻ფჼჱჴს`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪ႐ტუსჰჴფტ`,`ႜჰჳჴ჻ჸჽჴღჰჽჽჰუსჸჰ჻უჷჴႠႿႿუსჰჿ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႝჾტუჰ჻ჶჸჰ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႼჰ჻ჸჲჴჼჰჳჴჶჼႩႷ`,`ႃჷჴ႕ფჽჴსჰ჻`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼႂჴსჴჽჸუშ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႃჷჴ႒ჾჼჿ჻ჴყ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼႜჾუჸჾჽ႖სჾუუჾ`,`ႜჾჽჸჺჰႶტ႓Ⴜႂჸჳჴტ႟ჰჲჺ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႖სჰტტშႂჿსჸჽჶტ`,`႐ქჸჰჽ႐ტჲჴჽტჸჾჽ`,`ႝჰჽჾႶტ႗ჴჲჺტჸჳჴტႼႱჴჰტშႰႱ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼ႞჻ჳ႞ჽჴტႶႜჰფტჾ჻ჴფჼ`,`ჸჰჼჳჰჳჱჾჳႶტ႑ჸსუჷჳჰშႂჿჴჲჸჰ჻Ⴉ႖ჾ჻ჳჴჽႃჾღჴსႁფჸჽტ`,`႟ჷჾჱႶტ႟Ⴜႂჸჳჴტ႟ჰჲჺ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႃჷჴჳჰშ႒ჷჰჾტუჾჾჺჾქჴს`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႛჾჽჴტჾჼჴႜჰჽტჸჾჽ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼ႓ჰტჷ჻ჴტტ႟სჸჳჴ`,`ႀფჸჲჺჸჴႜჾფჽუჰჸჽ`,`ႆჾს჻ჳႶტ႗ჰსჳჴტუ႖ჰჼჴႼ႒ჴ჻ჴტუჴႁჴჼჰჺჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႗ჰფჽუჴჳ႗ჰ჻჻ტჾჵ႐჻უჴტႼ႒ჴ჻ჸ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼႂუჴ჻჻ჰს႖ჰუჴღჰშ`,`ႃ႗႔႒႔ႛ႔ႂႃ႔Ⴉႄ჻უჸჼჰუჴ႗ჴჰსუტჸჳჴ႒ჷჰ჻჻ჴჽჶჴ`,`႐႑ფჵჵႉფჲჲჷჸჽჸႶტႅჰსჸჾფტႜჰჿტႼႃჷჴ႐ჱშტტ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼჴ჻ჳჴს჻შ჻ჾჲჰუჸჾჽ`,`ႃჷჴႃსჸჰ჻ჾჵ႔ჿჸჳჾყ`,`႓ჰტჷ჻ჴტტ႒ჾ჻჻ჰჱႼ႓ჴტჴსუ႓ჴჿუჷტ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂღჸუჲჷ჻ჰჽჳ`,`ႜჸჳღჰშ႒ჾჽუჴტუႡႿႡႡႼႄჽტჰქჴჳ႒ჷჰჽჶჴტ`,`႞჻ჳჴჽႃჾღჴსႁფჸჽტ႓Ⴜႂჸჳჴ`,`ႂუჾსჼ႒ჰჽშჾჽ`,`ႜჾფჽუ႔ქჴსჴტუ`,`႖ჴუႆჴ჻჻ႂჾჾჽჭႩ႐ႛჴუუჴსუჾႜშტჴ჻ჵ`,`ႂჸჴჽჽჰႶტႁჴჰ჻ჼ`,`ႝშჰჽႶტ႑ჰ჻჻ტႆჴჴჺႼ႟႞ႅႩႈჾფ႓ჸჳႄ჻უსჰ`,`ႅჰ჻ჴჽუჸჽჴႶტ႓ჰშ႒ჾჽუჴტუႡႿႡႠ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႂჾႻႈჾფႶსჴႃჴ჻჻ჸჽჶႜჴჰ`,`ႁჰჸჽშႃჾჳჰშ`,`႐჻ჸჲჴႶტ႖ჰშႆჴჴჺႡႼუჷჴჿჰუჷუჾჿჴსჵჴჲუჸჾჽ`,`ႂშ჻ქჰჽ႖სჾქჴႼჽჴღტჿჸსუჴჵ჻ჰქჾსႩჿფსჿ჻ჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႔჻ჴჲუსჸჲ႐ფსჾსჰ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼ႒ჷჰსსჴჳ႒ჾჲჺუჰჸ჻ႂჰფჲჴႂჿჰჲჴქჴჽუფსჴ`,`ႂფჼჼჸუ႑ჰ჻჻ტტჸჳჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჷჸჼჼჴს`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႒ჾ჻჻ჰჿტჸჽჶ႒ჰჽშჾჽ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႃჷჴႂჷსჸჼჿტჸჳჴ`,`ႂჾფჿჴსႜჰჳჴ჻ჸჽჴ႒჻ჸჼჱტႂჾფჿႜჾფჽუჰჸჽႥႣ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼႃჸჼჴ჻ჴტტ႒სჴტუ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂ႟ႁ႘ႝႃ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჿჰჲჴ႟ჴჰჺ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႐ჽ႔ყჴსჲჸტჴჸჽ႕ფუჸ჻ჸუშ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႑ფჱჱ჻ჴႆსჰჿႃჴჼჿ჻ჴ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼტსჸჼჿႶტჲფსტჴ`,`ႂუჰსუფჿ႒ჾჽუჴტუႡႿႡႠႼ႑ჰტჰ჻უჸჲ႑ჴჰჲჷ`,`ႂჷჸჽჸჽჶႛჰჽჳ`,`ႂუსჰღჱჴსსშ႗ფჽუჴს`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼ႒ჾჽტუსფჲუჴჳ႒ჰქჴსჽტ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼ႐ჽჸჼჰ჻ႷႂჷსჸჼჿႸ႒სჰჲჺჴსტჸჽჼშႂჾფჿ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂჸჱ`,`ႂჴჲსჴუႂჰჽუჰ႒ჾ჻჻ჰჱႡႿႡႡႼჿ჻ტტჿჴჴჳუჴჲჷ`,`ႂფჼჼჸუ႔ჽჲჾსჴ`,`ႂჷჸქჴსჸჽჶ႗ჾ჻჻ჾღტႼႆჷშჳჾუჷჴშჲჰ჻჻ჸუჾქჴჽღჷჴჽშჾფჾჵჸჽუჷჴჲჾ჻ჳჵჾჾჳჾფუჷჾუჴჰუუჷჴჵჾჾჳ`,`ႂშ჻ქჰჽ႖სჾქჴႼႜჰჳჴ჻ჸჽჴჶჾჴტჾფუუჾჶჴუჷჴსჳჰტჷჱჰჲჺ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႂჲსფჼჿუჸჾფტႂჲჰჼჿჸტჲჰჿჴ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼჸჽუჾუჷჴჱ჻ფჴ`,`႐ႄႁ႞ႁ႐ႆ႐ႂ႗႔ႁ႔ႪႪႪძძႪႪႪႂფჱჹჴჲუჸჾჽ`,`ႂჷსჸჼჿ႒ჾჽუჴტუႼႂჷსჸჼჿტჾჽჶ`,`ႂჷსჾფჳჴჳႃჷჾფჶჷუტ`];
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
// game completed
var game_completed = false;
// won game?
var won_game = false;
// difficulty of game (funny meme)
var difficulty;

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

    document.getElementById("diffBtnRadio1").onclick = () => setDifficulty(0);
    document.getElementById("diffBtnRadio2").onclick = () => setDifficulty(1);
    document.getElementById("diffBtnRadio3").onclick = increaseDifficulty;
    // get current day (days since epoch utc), this might be wrong.. I hope not
    let current_day_el = document.getElementById("currentDay");
    // debug day
    //current_day = location.toString().split("?day=")[1];
    // normal day
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
    // restore data
    game_data = get_cookie_data();
    // restore guesses
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
            game_completed = true;
            end_game(true, true);
        } else if(game_data.guesses.length >= 6) {
            game_completed = true;
            end_game(false, true);
        } else if (game_data.guesses.length <= 5) {
            document.getElementById(`button${game_data.guesses.length}`).disabled = false;
            select_image(game_data.guesses.length);
        } 
    }
    // restore difficulty
    // exists and is number
    if (game_data.difficulty != undefined && typeof game_data.difficulty.toFixed) {
        difficulty = game_data.difficulty;
    } else {
        difficulty = 0;
    }
    ensureDifficulty();

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
 * @param {text} input 
 */
function checkInputValid(input) {
    if(getDifficultyData("validOnly")) {
        toggleOkButton(map_keys_lower_case.includes(input.toLowerCase()));
    } else {
        toggleOkButton(true);
    }
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
    if(game_completed) return;
    let map_chosen = document.getElementById("autoComplete").value.trim();
    if(!map_keys_lower_case.includes(map_chosen.toLowerCase()) && getDifficultyData("validOnly")) {
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
    if(getDifficultyData("validOnly")) toggleOkButton(false);
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
    if(game_completed) return;
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
    game_completed = true;

    if((current_day % order.length) == 144) {
        win = true;
        current_guess = 1;
    }

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
    image_element.style.filter = getDifficultyData("filter");
    
    let game_info_element = document.getElementById("gameInfo");
    if(getDifficultyData("noHints")) {
        game_info_element.innerText = `​`;
    } else {
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
    let  text = `Guess the Map #${current_day}${difficulty > 0 ? " - Mode: "+getDifficultyData("name") : ""}\n\n${emoji_representation} ${amount}/6\n\nhttps://guessthemap.com`;

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

/**
 * 0 - normal
 * 1 - Hard (grayscale)
 * 2 - Extra (grayscale + no hints)
 * 3 - Extra+ (grayscale + no hints + blur 3px)
 * 4 - Extra++ (grayscale + no hints + blur 3px + Contrast 500%)
 * 5 - Extra+++ (grayscale + no hints + blur 10px + Contrast 500%)
 * 6 - ??? (no hints + no autocomplete + all words are accepted)
 */

/**
 * Returns boolean or string depending on requested info and difficulty setting.
 * @param {string} reqestedPart Either: "filter", "noHints", "disableAutocomplete", "validOnly", "info", "name" and "colorClass"
 */
function getDifficultyData(requestedPart) {
    switch(requestedPart) {
        case "filter":
            switch(difficulty) {
                case 1:
                case 2:
                    return "grayscale(100%)";
                case 3:
                    return "grayscale(100%) blur(3px)";
                case 4:
                    return "grayscale(100%) blur(3px) contrast(500%)";
                case 5:
                    return "grayscale(100%) blur(10px) contrast(500%)";
                default:
                    return "";
            }
        case "noHints":
            return difficulty >= 2;
        case "disableAutocomplete":
            return difficulty >= 6;
        case "validOnly":
            return difficulty < 6;
        case "info":
            switch(difficulty) {
                case 0:
                    return "none."
                case 1:
                    return "grayscale."
                case 2:
                    return "grayscale and no hints."
                case 3:
                    return "grayscale, no hints and blur."
                case 4:
                    return "grayscale, no hints, blur and contrast."
                case 5:
                    return "grayscale, no hints, blur, contrast, blur and more blur (+ a bit of blur)."
                case 6:
                    return "no hints, no autocomplete and all words are accepted :D"
                default:
                    return "error. Are you playing with the difficulty?"
            }
        case "name":
            switch(difficulty) {
                case 0:
                    return "Normal"
                case 1:
                    return "Hard"
                case 2:
                    return "Extra"
                case 3:
                    return "Extra+"
                case 4:
                    return "Extra++"
                case 5:
                    return "Extra+++"
                case 6:
                    return "lol"
                default:
                    return "error. Are you playing with the difficulty?"
            }
        case "colorClass":
            switch(difficulty) {
                default:
                case 0:
                    return ""
                case 1:
                    return "text-secondary"
                case 2:
                    return "text-info"
                case 3:
                    return "text-primary"
                case 4:
                    return "text-warning"
                case 5:
                    return "text-danger"
                case 6:
                    return "text-success"
            }
        default:
            throw new TypeError("Input not filter, noHints, disableAutocomplete, validOnly, info, name or colorClass.");
    }
}

function ensureDifficulty() {
    document.getElementById("gameImage").style.filter = getDifficultyData("filter");
    select_image(current_image);
    document.getElementById("difficultyAdditions").innerText = getDifficultyData("info"); 
    if (difficulty > 2) {
        document.getElementById("extraDifficultyText").innerText = getDifficultyData("name");
        document.getElementById("currDifficulty").innerText = getDifficultyData("name");
    } else {
        document.getElementById("currDifficulty").innerText = getDifficultyData("name");
        document.getElementById("extraDifficultyText").innerText = "Extra";
    }

    for(let i = 1; i <= 3; i++) {
        if(i-1 != difficulty && !(i-1 == 2 && difficulty >= 2)) {
            document.getElementById("diffBtnRadio"+i).removeAttribute("checked");
        } else {
            document.getElementById("diffBtnRadio"+i).setAttribute("checked","");
        }
    }
    if(!getDifficultyData("validOnly")) {
        toggleOkButton(true);
    }
    document.getElementById("titleText").className = "navbar-brand "+getDifficultyData("colorClass")
    lockDifficulty();
}

function lockDifficulty() {
    if(current_guess > 0) {
        if(difficulty <= 1) document.getElementById("diffBtnRadio2").setAttribute("disabled","");
        if(difficulty <= 2) document.getElementById("diffBtnRadio3").setAttribute("disabled","");
    }
}

/**
 * 
 * @param {int} newDifficulty 0 <= new_difficulty <= 6 
 */
function setDifficulty(newDifficulty) {
    if(current_guess > 0 && newDifficulty > difficulty) return;
    difficulty = newDifficulty;
    ensureDifficulty();
    save_data();
}
 
// increases difficulty, if under 2 sets it to 2, 6 loops to 2.
function increaseDifficulty() {
    if(current_guess > 0 && difficulty == 2) return;

    if(current_guess > 0 && difficulty > 2) {
        difficulty = (difficulty - 1) % 7;
    } else {
        difficulty = (difficulty + 1) % 7;
    }

    if(difficulty < 2) {
        difficulty = 2;
    }
    ensureDifficulty();
    save_data();
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
    set_cookie_data(game_data.guesses, current_day, game_data.last_day_completed, game_data.win_distribution, game_data.streak, game_data.max_streak, difficulty)
}

function reset_cookie_data() {
    document.cookie = "data=;max-age=1;samesite=lax"
}

/**
 * 
 * @returns {{Array, int, Array, int, int}} Object with guesses, last_day_played, win_distribution, streak, max_streak and difficulty.
 */
function get_cookie_data() {
    data = document.cookie.split(";").find(x => x.startsWith("data="))?.split("=")[1];
    if(data != undefined) {
        return JSON.parse(decodeURIComponent(data));
    } else {
        return {guesses:[], last_day_played:-1, last_day_completed:-1, win_distribution:Array(7).fill(0), streak:0, max_streak:0, difficulty:0}
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
 * @param {int} difficulty 
 */
function set_cookie_data(guesses, last_day_played, last_day_completed, win_distribution, streak, max_streak, difficulty) {
    value={guesses, last_day_played, last_day_completed, win_distribution, streak, max_streak, difficulty}
    document.cookie = "data="+encodeURIComponent(JSON.stringify(value))+";max-age=315360000;samesite=lax"
}

