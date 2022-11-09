/*
INFO
date, difficulty, and mapper show up on images 4, 5, & 6 respectively (will do above)
gb link after it is solved, map name redundant?

json structure
[keys: [all map names], 
maps:{map_name:{info:{date, difficulty, gamebanana, map_name, mapper}, image_paths: [1,..,6]}]
*/

// complete ms string from new date of what is "the first day".
const epoch = 1667862000000;
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
const order = [`Shivering Hollows - Mount Eggplant 2500M`,`Shade World`,`Solaris`,`Midway Contest 2022 - Effete`,`Fore`,`t`,`Desolate Tower`,`Delusional Canopy`,`Quickie Mountain 2`,`The BossSauce Map Pack - Bounce`,`Startup Contest 2021 - Mechanized Horizon`,`Unexpected Behaviors Contest 2021 - Pastel Problem Solving`,`Vanilla Core`,`The Fade`,`Zip Mover Contest 2021 - Forsaken city two`,`Secret Santa Collab 2022 - Resecration`,`Nyan's Balls Week - Rick and Morty`,`15-Second Jail Time`,`Midway Contest 2022 - Silent Wanderings`,`Anomaly chapter0`,`Zip Mover Contest 2021 - Zippin' in space`,`The Jellies' Gelatinous Sanctuary`,`Goose's Gamer Week - Backwards Ballcility`,`Ultra Heaven`,`Ferretâ€™s Micro Mountain`,`Balls Mines where they mine Ball-Shaped Gemstones`,`5b_Garbage_Version`,`Silver Ridge`,`Void`,`The Backrooms`,`KAERRA'S FURRY WEEK - SPARK`,`Depleted Reservoir - BREAKTHROUGH`,`Radiant Sanctum`,`Earthen Dream`,`Archaic Terrace`,`Purple`,`Shivering Hollows - a fren :D`,`Tranquil Space Garden`,`RARE RACCOON ROAD`,`Quickie Mountain`,`Zerex's Z-Sides`,`CORNSHUCKER`,`Startup Contest 2021 - Strange Sleepwalk`,`Nyan's Balls Week - pls ultra`,`Wintry Cliffs`,`The BossSauce Map Pack - Shadelight`,`Petals of a Lilly`,`Cold Feet`,`The BossSauce Map Pack - The Sauce Side`,`Secret Santa Collab 2022 - Wrappin' Jellies Station`,`MINDCRACK Map Pack`,`Waterbear Mountain`,`The Kayonara Collection`,`Zip Mover Contest 2021 - Dungeon of Tortured Souls`,`Floatier Time`,`Mount Kimitany Saga`,`Secret Santa Collab 2022 - Once in a Blue Moon`,`Nyan's Balls Week - Temporal Toilet`,`Balls Tourney Lobby - andVoid`,`ABuffZucchini's Various Maps - Old Horizon`,`Sunset Rise`,`Celeste: The Last Madeline`,`Alice's Gay Week 2 - i flu u flu`,`Startup Contest 2021 - The Startside`,`Cursed Mines`,`Olden Tower Ruins D-Side`,`Shivering Hollows - Gods of the Artificial`,`Goose's Gamer Week - do the mario`,`Crystalized`,`Madeline Goes to Space`,`Startup Contest 2021 - Haunted Halls of Altes-Celi`,`Last Night`,`Midway Contest 2022 - Frozen Citadel`,`Temple of Tomorrow`,`F.I.S.H. ( Fish In Space How ?? )`,`ABuffZucchini's Various Maps - Windchill`,`Midway Contest 2022 - Mahogany Monastery`,`Depleted Reservoir - Jank Facility`,`Anything is Possible`,`Unexpected Behaviors Contest 2021 - A Blocked Off Path`,`Nano's Hecksides - Metal Maze`,`Shivering Hollows - Teeny Temperate Temple Trials: Temporary Title`,`Alice's Gay Week - alice made gm :(`,`Nano's Hecksides - Driftcore`,`October`,`Underground Underground`,`Dashless Collab - Cotton Candy Core`,`Zip Mover Contest 2021 - Zip Mover Ascent`,`Val's Birthday Special - The Decline`,`Secret Santa Collab 2022 - Old Ones' Mausoleum`,`Goose's Gamer Week - Fore (A fusion map between Forsaken City and Core)`,`Moonsong`,`The Celeste Parable`,`Secret Santa Collab 2022 - Push Blocks Cliffs`,`Winter Collab Birthday Special - Bissy Sanctuary`,`Unexpected Behaviors Contest 2021 - Neutral Ridge`,`OkNano's Birthday Special - Raccoon Express`,`Summit Ballsside`,`KAERRA'S FURRY WEEK - UPEND`,`wwoah!`,`INFINITE HYPERPISS`,`Nano's Hecksides - Old Site Heck-Side Cassette Rift`,`Unexpected Behaviors Contest 2021 - Time Rift Trail`,`Gravity Helper Mini Collab - Kinetic Domain`,`Farewell Plus`,`Midway Contest 2022 - Overgrown Dungeon`,`Emerald Megalith`,`Dashless Collab - Lonesome Mansion`,`Tech Compendium: Bounce Helper Gym`,`Into the Well`,`Midway Contest 2022 - How to Do Celeste Tech`,`Unexpected Behaviors Contest 2021 - Dubble Tower`,`Sunset Mountain`,`Alice's Gay Week 2 - the path to perfection`,`Permafrost Den`,`The first path`,`Startup Contest 2021 - Subconsciousness`,`Abandoned City`,`Flair Against Evidence`,`Blue Castle`,`Startup Contest 2021 - How To Play Celeste`,`Midway Contest 2022 - The Midnight Library`,`Theo Summit`,`Into The Jungle - Verdant Trail`,`DELTASCENEONE`,`ABuffZucchini's Various Maps - The Abyss`,`Secret Santa Collab 2022 - pls speedtech`,`Leviathan's Rehearsal`,`The 2020 Tokyo Drift Incident`,`Alice's Gay Week 2 - im bad at names`,`sexy summit`,`Sylvan Grove - bring it back now yall`,`Velvet`,`Getting Over It with Maddy Thorson`,`MARS FGS.`,`Zip Mover Contest 2021 - Gemstone Caverns`,`Sib`,`Dashless Collab - Hard Core`,`Magma Expert`,`The Secret of Celeste Mountain`,`Startup Contest 2021 - Hostile Trail`,`Depleted Reservoir - Abandoned Aqueduct`,`Avian Ascension`,`Gravity Test`,`Secret Santa Collab 2022 - The Secret Cliffside Florest`,`Midway Contest 2022 - Midway Trail`,`Interstellar Submarine`,`Leviathan's Ultras +`,`Kaizo adventures`,`Space Peak`,`Dimension of Chaos`,`Xoli's Birthday Special - a walk in the pÃ¦rk`,`Summit Encore`,`Cosmic Realm`,`Techy Temple`,`Anubi`,`Nyan's Balls Week - The Ballsside`,`lowqualitylavamap.bin`,`blue hair and pronouns`,`Unexpected Behaviors Contest 2021 - Bouncing Dock`,`Juice Box`,`Moon Trail`,`SPRINT`,`Kaizo Summit`,`Nyan's Balls Week - POV: You Did Ultra`,`theowell`,`Secret Santa Collab 2022 - Timeless Crest`,`Valentine's Day Contest 2021`,`Tornado Valley`,`Goose's Gamer Week - bleak starfall`,`Unexpected Behaviors Contest 2021 - Severed Swap City`,`Into The Jungle - Spoopy Thicket`,`Sylvan Grove - Madeline goes out to get her dash back`,`Winged Station`,`Zip Mover Contest 2021 - Aquatic Metropolis`,`Startup Contest 2021 - Ruby Cliffs`,`Cosmic Sands`,`The Flip Flopper 9000`,`Sunset Skyway`,`KAERRA'S FURRY WEEK - MINUS`,`Gravity Helper Mini Collab - Onyx Tower Remnants`,`Ruin of a Raccoon`,`Small sanctuary: Third`,`Ultra Skool`,`Monika's D-Sides Pack`,`Dashless Collab - Arctic Outpost`,`One Thousand Meters`,`Astral Tower`,`Retro Rhythm Ruins`,`Gravity Complex`,`Shining Land`,`Complex 1997`,`Music World`,`Alice's Gay Week - i forgor`,`Shimmer`,`Farewell D-Side - Final Goodbye`,`Water Space`,`Alice's Gay Week - volaris`,`Sylvan Grove - Lucid Cliffside Too`,`Depleted Reservoir - Un dÃ©sordre enchevÃªtrÃ© de couleurs`,`Ultra Summit New Version`,`Sylvan Grove - Switchland 2`,`Into The Jungle - The Depths`,`Nano's Hecksides - Motion Grotto`,`Forgotten Rhythm`,`ABuffZucchini's Various Maps - Spike Pit`,`The Funeral`,`Dashless Collab - Rainbow Road`,`Startup Contest 2021 - Lilly's Lake`,`CELESTE 2!!!!!!!`,`ABuffZucchini's Various Maps - The Complex`,`The BossSauce Map Pack - Lavafrost Cavern`,`Goose 3000m`,`Midway Contest 2022 - Far Gone`,`Depleted Reservoir - City Limits`,`Triangle's Home`,`Oshiro's Fun Ride`,`Conqueror's Peak`,`Abyss`,`Pico-8 Remake`,`Zip Mover Contest 2021 - Ashen City`,`Sylvan Grove - Ineluctable Modality of the Sump`,`Rupture`,`Temporal Shrine`,`Cabob's (late) Birthday Special - Fridge Palace`,`Dashless Collab - Puffin' Rock`,`Souper Madeline Climbs Soup Mountain 64`,`Midway Contest 2022 - Rainbow Temple`,`Leviathan's Chateau`,`All gameplay no deco`,`Midway Contest 2022 - Cupid's Garden`,`Gravity Helper Mini Collab - Around the World`,`Shrouded Thoughts`,`Maddy's Hangover`,`cancel culture`,`Shivering Hollows - Why do they call it oven when you of in the cold food out hot eat the food`,`Madeline: Into the Temple`,`The Hacklands`,`Symphony`,`Glyph D-Side`,`Zip Mover Contest 2021 - Ziptied Puffers`,`the 1 hour alone contest/collab`,`Celestial Cabinet`,`Paint Reverse`,`Amber Terminus`,`StrawberryHunter`,`Dashless Collab - Desert Depths`,`Polygon Dreams`,`Startup Contest 2021 - The Secret Cliffside Mansion`,`Lani's Cave`,`Dashless Collab - Lunar Gravitation`,`Static Shift`,`A Christmas Night`,`drem`,`Unexpected Behaviors Contest 2021 - Purgatory of the Zips`,`World's Hardest Game - Celeste Remake`,`Dashless Collab - Garden of Dreams`,`Midway Contest 2022 - Tardigrade Temple Too`,`Nyan's Balls Week - Dashless Pride`,`iamdadbod's Birthday Special: Golden Tower Ruins`,`The Trial of Epidox`,`Sylvan Grove - new spirte flavor : purple`,`Midway Contest 2022 - Farewell Fire`,`Nano's Hecksides - Below Zero`,`Secret Santa Collab 2022 - 100 ridgs`,`Chilly, Windy Ruins`,`Alice's Gay Week - the celeste mapper struggle`,`Unexpected Behaviors Contest 2021 - Vaporwave Nightmare`,`Shining Shooting Star`,`Carlos's Bday Special: the winter collab problem`,`Dashless Collab - The Long Way`,`Midway Contest 2022 - Unsaved Changes`,`Shivering Hollows - Nostalgia`,`Alice's Gay Week - hi lennygold`,`Crystal Core`,`Sylvan Grove - Levels`,`Quinnigan's Notepad`,`ABuffZucchini's Various Maps - Temple of the Fish`,`Into The Jungle - Shifting Temple`,`The BossSauce Map Pack - Hellwind`,`KAERRA'S FURRY WEEK - AVERT`,`Forsaken City E-Side(++)`,`Crystal Void`,`touhoe's Birthday Special - Upturned Downtown`,`Temple of Tears`,`Wasted Meadow`,`Zip Mover Contest 2021 - Emerald Skies`,`Subjection`,`Myself`,`Leviathan's Rehearsal+`,`Secret Santa Collab 2022 - Celestial Medley`,`Nano's Hecksides - Hell(ish)`,`Faded Celestial Remains`,`Banana 23's Birthday Special - Platforminb!`,`Summit Garden`,`Dashless Collab - Celeste '89`,`The BossSauce Map Pack - Flooded City`,`Alice's Gay Week 2 - de 2`,`Nano's Hecksides - Dark Ascent`,`Rainy Faraway Disarray`,`Depleted Reservoir - Glacial Climb`,`Zip Mover Contest 2021 - Subliminal Garden`,`Shivering Hollows - Forest of Mythos`,`Donker19's (late) Birthday Special: Solaris 2Â½`,`Leviathan's Ultras`,`stupid gorge`,`Rainy Today`,`Startup Contest 2021 - Serenity`,`Nyan's Balls Week - POV: You Didn't Ultra`,`Secret Santa Collab 2022 - How to Make a Good Celeste Map`,`Rose Dust`,`Adranos`,`Sylvan Grove - Ethereal Hollows`,`Girders Map`,`Alice's Gay Week 2 - wetty wet waterfall`,`Sylvan Grove - Anything Is Possible Christmas Edition`,`Frozen Heights`,`Mount Everest`,`Another Farewell Map`,`Love Story`,`The cave of bubbles`,`Cloudy Cliffs`,`Startup Contest 2021 - Move Block Grotto`,`Dashless Collab - Stellar Gateway`,`CarelessAnon's Birthday Special - Gilded Hollow`,`Ultra Hell`,`Secret Santa Collab 2022 - Fallacious Realm`,`A New Beginning`,`iidk..`,`Nano's Hecksides - Hyperthermia`,`Frogeline Summit`,`Secret Santa Collab 2022 - Stygophilia`,`Goose's Gamer Week - Connected Summit 3000m`,`Iamdadbod's Birthday Special - Dad's Tower`,`Sylvan Grove - ABuffZucchini's Peak`,`Jackal's Birthday Special - Ice Cold Trail`,`MYNDMLTR`,`Dr. Machestik's Dynamite Castle`,`KAERRA'S FURRY WEEK - PIECE`,`Midway Contest 2022 - Drafty Daze`,`ToTheMars`,`Early Core`,`Unexpected Behaviors Contest 2021 - Pushblock Quarry`,`24x33`,`ABuffZucchini's Various Maps - Above The Summit`,`Dreamy trials`,`Zipping not dashing`,`Switchland`,`Nano's Hecksides - "easy!"`,`The Dadsides`,`Avpocalypse`,`Startup Contest 2021 - Collapsing Canyon`,`iceCream's Ultras`,`The Complex B-Side`,`Shivering Hollows - Haunted Block Bridge`,`Dashless Collab - Government Tower`,`Nano's Hecksides - Sadtellite`,`7d(single dash ver)`,`Startup Contest 2021 - Fallen Memories`,`Disconnected Summit`,`Traveler of Blue`,`Hibernation Apex`,`Midway Contest 2022 - A Resort .Bin`,`Dry Space`,`No Dash Temple`,`Startup Contest 2021 - Dream Booster Temple`,`LAVATORY`,`Zip Mover Contest 2021 - Frozen Waterpark`,`The Walk Home`,`Startup Contest 2021 - Electric Aurora`,`Normal Map 64`,`Gravity Helper Mini Collab - you might want to bring an umbrella`,`Secret Santa Collab 2022 - Purple Factory`,`Tardigrade Temple`,`Boosted City`,`Lavender Spire`,`Error 404`,`Nano's Hecksides - Green back at it again`,`Alice's Gay Week - lesbomagnetic field`,`Platform adventures`,`Midway Contest 2022 - U+21CE`,`Shivering Hollows - Jank Facility 2 Electric Boogaloo`,`Zip Mover Contest 2021 - Spring And A Storm`,`Get Well Soon~: A Letter to Myself`,`Silent Snow`,`dread in the clouds`,`Donker19's Birthday Special - Velvaris`,`Alice's Gay Week 2 - 11-Example`,`Startup Contest 2021 - An Exercise in Futility`,`The BossSauce Map Pack - Jammin'`,`Dashless Collab - Midnight Dreams`,`Semena Mertvykh`,`Ultra Processing`,`Ezel's CC-sides`,`Cryoshock`,`Secret Santa Collab 2022 - Sapphire Spire`,`Zip Mover Contest 2021 - Rushed Zips`,`Arphimigon's D-Sides`,`Startup Contest 2021 - Verdant City`,`Nano's Hecksides - Fatal Exception`,`Flooded Caves`,`Goose's Gamer Week - goose made gm.`,`the road less traveled`,`SummitCollab2021`,`Turquoise Hell`,`AliceQuasar's Birthday Special - Fennec Forest`,`Phob's P-Sides Pack`,`Storm Canyon`,`Red Moon's Resort`,`Dashless Collab - The 2022 Mini Dashless Collab`,`Into The Jungle - Ancient Ruins`,`Shivering Hollows - The Sumpquel`,`Unexpected Behaviors Contest 2021 - The Unknown Known`,`Dream to Awakening`,`Midway Contest 2022 - Ruby Mines`,`Startup Contest 2021 - Bubble Wrap Temple`,`Unexpected Behaviors Contest 2021 - Just Springs And Bubbles`,`Alice's Gay Week 2 - helps readability`,`Goose's Gamer Week - Madeline Makes a Map with Gravity Helper!`,`Celeste Rearranged`,`Switch Mountain`,`A Rainy Night`,`The BossSauce Map Pack - Corroded City`,`Madeline wanna trial the 100trap`,`Zip Mover Contest 2021 - Definitely Not Dedication`,`Ember's Utopia`,`OkNano's Birthday Special - Swan Hillside`,`Temple of Blindness`,`Peridot Oasis`,`Snowfall Spire`,`The Upside Down Sides`,`AliceQuasar's BDay Special - Hang Out With OkNano!`,`Secret Santa Collab 2022 - Cephstellation`,`How To Make A Map: For a Scrapped Contest`,`The Climb`,`Dashless Collab - The Thief`,`Gravity Helper Mini Collab - Prismatism`,`Shattered Skies`,`KAERRA'S FURRY WEEK - BOUND`,`Temple of the Cursed God`,`Hakoniwa Adventure`,`Shivering Hollows - Constructed Caverns`,`Cabob's Birthday Special - Ultra Mobius Advanced`,`Depleted Reservoir - Solar Descent`,`Shipwreck Weather`,`Overshot Avenue`,`Midnight Aquarium`,`Sienna's Realm`,`heather's aquarium`,`Autumnal Heights`,`Secret Santa Collab 2022 - Frozen Machinery`,`Rectangles`,`Albcat's Birthday Special - Cosmic Underwater`,`The Blizzard`,`Secret Santa Collab 2022 - Crystal Caverns`,`Astraeus`,`Nyan's Balls Week - Nyan Made GM :D`,`The BossSauce Map Pack - Matrix`,`Starfall`,`Donker19's Birthday Special - Sucrose Solaris`,`ABuffZucchini's Various Maps - Reversal`,`The Seaside C-Side`,`Shivering Hollows - Ultra Swan Slide`,`At Dawn`,`iamdadbod Collab 2018`,`Midway Contest 2022 - Ember Paradise`,`Dashless Collab - Cataclysmic Cavern`,`Hexagon Force`,`The BossSauce Map Pack - Treetop Climb`,`Silent Night's Alley`,`KAERRA'S FURRY WEEK - LIMIT`,`touhoe's Birthday Special - Br1ght P!nk`,`The Chatsides`,`Asleep`,`Stationary Intermission`,`Vibe Mountain`,`Alice's Gay Week - de`,`Startup Contest 2021 - Light Breeze`,`THE CELESTE: Ultimate Heartside Challenge`,`ABuffZucchini's Various Maps - Ice Fortress`,`Summit Prologue`,`Secret Santa Collab 2022 - Anything is Supposed to Be`,`Startup Contest 2021 - Curious Crater`,`Secret Santa Collab 2022 - BREAKING//POINT`,`Smog City`,`Sky High!`,`Secret Santa Collab 2022 - Gusty Proposition`,`Startup Contest 2021 - Basaltic Beach`,`Startup Contest 2021 - Grassy Springs`,`Suburban Nebula`,`Storming City | dadbod bday map`,`Startup Contest 2021 - Vacuum Facility`,`Secret Santa Collab 2022 - One Star Review`,`Sylvan Grove - Amethyst Grotto`];

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
    let date = new Date();
    let minute_offset = date.getTimezoneOffset();
    current_day = Math.floor(((date.getTime() - (minute_offset*6e4))-epoch)/8.64e7);
    current_day_el.innerText = current_day;
    current_object = map_index["maps"][order[(current_day % order.length)]];
    current_image = 0;
    current_guess = 0;
    guesses = [];
    select_image(0);
    // countdown till next day
    start_countdown();
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
function start_countdown() {
    let goal = new Date().setHours(23,59,59,999);
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

