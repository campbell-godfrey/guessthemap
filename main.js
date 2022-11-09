/*
INFO
date, difficulty, and mapper show up on images 4, 5, & 6 respectively (will do above)
gb link after it is solved, map name redundant?

json structure
[keys: [all map names], 
maps:{map_name:{info:{date, difficulty, gamebanana, map_name, mapper}, image_paths: [1,..,6]}]
*/

// complete ms string from new date of what is "the first day".
const epoch = 1660597200000;
const autoCompleteConfig = {
        placeHolder: "Search for a Map",
        data: {
            src: ["Error loading Maps for Search"]
        },
        resultItem: {
            highlight: true,
        }, events: {
            input: {
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    autoCompleteJS.input.value = selection;
                },
                keydown: handle_keydown
            }
        },
};
// order
const order = ["Summit Encore","Midnight Aquarium","The first path","Water Space","Ultra Processing","ABuffZucchini's Various Maps - Windchill","Lunar Ruins","Olden Tower Ruins D-Side","Hexagon Force","Alice's Gay Week - i forgor","Sib","Gravity Complex","Frozen Heights","Hakoniwa Adventure","All gameplay no deco","Forsaken City E-Side(++)","The Blizzard","Petals of a Lilly","ABuffZucchini's Various Maps - The Complex","Madeline wanna trial the 100trap","The Complex B-Side","Avpocalypse","Delusional Canopy","Traveler of Blue","A Rainy Night","Dreamy trials","MINDCRACK Map Pack","dread in the clouds","Alice's Gay Week - alice made gm :(","Farewell D-Side - Final Goodbye","Into the Well","5b_Garbage_Version","StrawberryHunter","iamdadbod Collab 2018","Adranos","Dream to Awakening","Flooded Caves","Alice's Gay Week 2 - i flu u flu","Cryoshock","Mount Kimitany Saga","Albcat's Birthday Special - Cosmic Underwater","Farewell Plus","Smog City","Donker19's Birthday Special - Velvaris","Red Moon's Resort","Alice's Gay Week 2 - wetty wet waterfall","24x33","Early Core","Mount Everest","Tardigrade Temple","Anomaly chapter0","Leviathan's Rehearsal","Kaizo adventures","Abandoned City","Cloudy Cliffs","Kaizo Summit","World's Hardest Game - Celeste Remake","Small sanctuary: Third","ABuffZucchini's Various Maps - Above The Summit","The Secret of Celeste Mountain","Leviathan's Ultras +","Velvet","Juice Box","Astraeus","Last Night","Zipping not dashing","AliceQuasar's BDay Special - Hang Out With OkNano!","7d(single dash ver)","Zerex's Z-Sides","Moonsong","AliceQuasar's Birthday Special - Fennec Forest","Gravity Test","Shimmer","ABuffZucchini's Various Maps - The Abyss","Celeste Rearranged","Depleted Reservoir","Frogeline Summit","Error 404","A New Beginning","Monika's D-Sides Pack","Balls Tourney Lobby - andVoid","Getting Over It with Maddy Thorson","How To Make A Map: For a Scrapped Contest","Alice's Gay Week - volaris","Glyph D-Side","iceCream's Ultras","ABuffZucchini's Various Maps - Old Horizon","Balls Mines where they mine Ball-Shaped Gemstones","Ezel's CC-sides","ABuffZucchini's Various Maps - Ice Fortress","Paint Reverse","Rainy Today","Alice's Gay Week 2 - im bad at names","Dr. Machestik's Dynamite Castle","The Kayonara Collection","ABuffZucchini's Various Maps - Spike Pit","Crystalized","Leviathan's Ultras","Alice's Gay Week 2 - 11-Example","The Celeste Parable","Love Story","15-Second Jail Time","Shivering Hollows","Alice's Gay Week - de","Leviathan's Rehearsal+","OkNano's Birthday Special - Swan Hillside","Amber Terminus","Static Shift","Music World","ABuffZucchini's Various Maps - Reversal","Leviathan's Chateau","Blue Castle","Avian Ascension","Maddy's Hangover","Ferretâ€™s Micro Mountain","Autumnal Heights","The Dadsides","Sunset Rise","ABuffZucchini's Various Maps - Temple of the Fish","A Christmas Night","Arphimigon's D-Sides","Alice's Gay Week - the celeste mapper struggle","Anything is Possible","Abyss","Astral Tower","At Dawn","Another Farewell Map","Alice's Gay Week 2 - de 2","Alice's Gay Week - lesbomagnetic field","Alice's Gay Week 2 - helps readability","Anubi","Archaic Terrace","Alice's Gay Week - hi lennygold","Asleep","Alice's Gay Week 2 - the path to perfection"];

var autoCompleteJS;
// map data
var map_index;
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
    // setup autocomplete
    autoCompleteConfig["data"]["src"] = _map_index["keys"]
    autoCompleteJS = new autoComplete(autoCompleteConfig);
    // setup onclicks
    document.getElementById("buttonOK").onclick = confirm;
    document.getElementById("buttonSKIP").onclick = skip;
    document.getElementById("buttonSHARE").onclick = share;
    // get current day (days since epoch utc), this might be wrong by a bit in 10000 years.
    current_day = Math.floor(((new Date().getTime())-epoch)/8.64e7);
    current_object = map_index["maps"][order[(current_day % order.length)]];
    current_image = 0;
    current_guess = 0;
    guesses = [];
    select_image(0);
    // countdown till next day
    start_countdown(current_day);
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

var day_countdown;
function start_countdown(day) {
    let day_in_ms = 864e5;
    let goal = epoch+((day+1)*day_in_ms);
    let remaining = goal - new Date().getTime();
    // do it once immediately
    document.getElementById("timer").innerText = get_time_hh_mm_dd(remaining);
    // not gonna be that accurate but who cares
    day_countdown = setInterval(() => {
        document.getElementById("timer").innerText = get_time_hh_mm_dd(remaining);
        remaining -= 1000;
        // refresh website lmao
        if (remaining <= 0) {
            location.reload();
        }
    }, 1000);
    function get_time_hh_mm_dd(time_in_ms) {
        let hrs = Math.floor(time_in_ms / (1000*60*60)); 
        let min = Math.floor((time_in_ms % (1000*60*60)) / (1000*60)); 
        let s = Math.floor((time_in_ms % (1000*60)) / (1000)); 
        return `${hrs.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    }
}

function handle_keydown(event) {
    // Tab OR enter
    if(event.keyCode == 9 || event.keyCode == 13) {
        // check it can find something before trying to select
        if(autoCompleteJS.search(document.getElementById("autoComplete").value, map_index.keys)) {
            autoCompleteJS.open();
            if(autoCompleteJS.cursor < 0) {
                autoCompleteJS.select(0);
            } else {
                autoCompleteJS.select();
            }
        }
        event.preventDefault()
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

function confirm() {
    current_guess += 1;
    let map_chosen = document.getElementById("autoComplete").value.trim();
    document.getElementById("autoComplete").value = "";
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

function check_guess(guess) {
    return current_object.info.map_name == guess;
}

function end_game(win, restore=false) {
    document.getElementById("input").hidden = true;

    if(win) {
        document.getElementById("youWin").hidden = false;
    } else {
        document.getElementById("youLose").hidden = false;
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
                if(game_data.streak >= game_data.max_streak) {
                    game_data.max_streak = game_data.streak;
                }
            } else if(game_data.last_day_completed < current_day-1) {
                game_data.streak = 1;
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
    let button = document.getElementById("buttonSHARE");
    let amount = "";
    const emoji = {incorrect:"🟥", none:"⬛", correct:"🟩"};
    let emoji_representation = "";
    if(current_guess >= 6) {
        emoji_representation = Array(6).fill(emoji.incorrect).join("");
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
        }).join("");
        amount = current_guess;
    }
    let  text = `Guess the Map #${current_day}\n${emoji_representation} ${amount}/6\n\nhttps://guessthemap.com`;

    navigator.clipboard.writeText(text).then(() => {
        // copied!
        button.innerText = "Copied to Clipboard!";
        setTimeout(() => {button.innerText = "Share your result";}, 1000);
    },
    () => {
        // copy failed
        button.innerText = "Failed to copy :(";
        setTimeout(() => {button.innerText = "Share your result";}, 1000);
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

