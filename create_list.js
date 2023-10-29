a = ["aa","ba","ca","ab","bb","cb","ac","bc","cc","ad","bd","cd"]
// todo based on map -> % create a version that orients them with that percentage chance somehow? (what)
// Just make it so it's not possible to have things similarly named next to eachother. (with like at least x distance?)
// this will not be used live it's to create the order
function create_list(keys) {
    keys = [...keys];
    let random_list = [];
    for(var i = keys.length-1;i>=0;i--){
        let new_list = keys.map((_,i) => i);
        if(random_list.length >= 2) {
          // try filtering it so the first letters are not the same for last two entries.
          new_list = keys.map((x,i) => [x,i])
          .filter(x => x[0][0] != random_list[random_list.length-2][0] && x[0][0] != random_list[random_list.length-1][0])
          if(new_list.length == 0) {
            new_list = keys.map((_,i) => i);
          } else {
            new_list = new_list.map((x) => x[1]);
          }
        }

        let idx = Math.floor(Math.random()*new_list.length);
        random_list.push(keys[new_list[idx]]);
        keys.splice(new_list[idx], 1);
      }
    return random_list;
}

// order unobfuscated
const order = [`Shivering Hollows - Mount Eggplant 2500M`,`Shade World`,`Solaris`,`Midway Contest 2022 - Effete`,`Fore`,`t`,`Desolate Tower`,`Delusional Canopy`,`Iamdadbod's Birthday Special - Dad's Tower`,`Last Night`,`Quickie Mountain 2`,`Nano's Hecksides - Metal Maze`,`October`,`The BossSauce Map Pack - Bounce`,`Startup Contest 2021 - Mechanized Horizon`,`Unexpected Behaviors Contest 2021 - Pastel Problem Solving`,`Vanilla Core`,`The Fade`,`Zip Mover Contest 2021 - Forsaken city two`,`Secret Santa Collab 2022 - Resecration`,`Nyan's Balls Week - Rick and Morty`,`15-Second Jail Time`,`Midway Contest 2022 - Silent Wanderings`,`Anomaly chapter0`,`Zip Mover Contest 2021 - Zippin' in space`,`The Jellies' Gelatinous Sanctuary`,`Goose's Gamer Week - Backwards Ballcility`,`Ultra Heaven`,`Ferret’s Micro Mountain`,`Startup Contest 2021 - The Secret Cliffside Mansion`,`Celeste Rearranged`,`Overshot Avenue`,`Early Core`,`Dashless Collab - Garden of Dreams`,`Temple of Tomorrow`,`A Christmas Night`,`Unexpected Behaviors Contest 2021 - Neutral Ridge`,`Secret Santa Collab 2022 - Stygophilia`,`Depleted Reservoir - Solar Descent`,`All gameplay no deco`,`cancel culture`,`Earthen Dream`,`Shipwreck Weather`,`Magma Expert`,`The Backrooms`,`Startup Contest 2021 - Fallen Memories`,`Underground Underground`,`Emerald Megalith`,`Sylvan Grove - Lucid Cliffside Too`,`Unexpected Behaviors Contest 2021 - A Blocked Off Path`,`Turquoise Hell`,`Zip Mover Contest 2021 - Ashen City`,`Dashless Collab - Rainbow Road`,`Traveler of Blue`,`Alice's Gay Week 2 - 11-Example`,`Nano's Hecksides - Driftcore`,`Midway Contest 2022 - How to Do Celeste Tech`,`Secret Santa Collab 2022 - Frozen Machinery`,`Unexpected Behaviors Contest 2021 - Severed Swap City`,`Alice's Gay Week - i forgor`,`Dashless Collab - Puffin' Rock`,`Midway Contest 2022 - Farewell Fire`,`Anything is Possible`,`Shivering Hollows - a fren :D`,`KAERRA'S FURRY WEEK - MINUS`,`Zip Mover Contest 2021 - Subliminal Garden`,`Snowfall Spire`,`Winter Collab Birthday Special - Bissy Sanctuary`,`The Kayonara Collection`,`Midway Contest 2022 - Drafty Daze`,`Archaic Terrace`,`Secret Santa Collab 2022 - Anything is Supposed to Be`,`Nano's Hecksides - Sadtellite`,`Dashless Collab - Hard Core`,`The first path`,`Storming City | dadbod bday map`,`Blue Castle`,`Unexpected Behaviors Contest 2021 - Purgatory of the Zips`,`Cold Feet`,`The Flip Flopper 9000`,`Dreamy trials`,`Kaizo Summit`,`Petals of a Lilly`,`Depleted Reservoir - Jank Facility`,`Goose's Gamer Week - do the mario`,`Cryoshock`,`Wintry Cliffs`,`Avpocalypse`,`Gravity Helper Mini Collab - you might want to bring an umbrella`,`Hakoniwa Adventure`,`Ultra Summit New Version`,`Flooded Caves`,`Shattered Skies`,`Water Space`,`wwoah!`,`Cosmic Realm`,`Into The Jungle - The Depths`,`Silver Ridge`,`Ultra Hell`,`The Upside Down Sides`,`Sylvan Grove - ABuffZucchini's Peak`,`KAERRA'S FURRY WEEK - PIECE`,`Depleted Reservoir - Abandoned Aqueduct`,`Purple`,`Unexpected Behaviors Contest 2021 - Pushblock Quarry`,`Zip Mover Contest 2021 - Emerald Skies`,`Midway Contest 2022 - U+21CE`,`Secret Santa Collab 2022 - Wrappin' Jellies Station`,`Wasted Meadow`,`Alice's Gay Week - de`,`Nano's Hecksides - Dark Ascent`,`Midway Contest 2022 - Midway Trail`,`Getting Over It with Maddy Thorson`,`KAERRA'S FURRY WEEK - LIMIT`,`Celeste: The Last Madeline`,`Faded Celestial Remains`,`Zipping not dashing`,`Shining Shooting Star`,`dread in the clouds`,`Abyss`,`Goose's Gamer Week - Fore (A fusion map between Forsaken City and Core)`,`Vibe Mountain`,`Nano's Hecksides - Below Zero`,`Sylvan Grove - Ethereal Hollows`,`The BossSauce Map Pack - Corroded City`,`theowell`,`Secret Santa Collab 2022 - Sapphire Spire`,`Midway Contest 2022 - Cupid's Garden`,`Zip Mover Contest 2021 - Spring And A Storm`,`Static Shift`,`Leviathan's Rehearsal+`,`Maddy's Hangover`,`Startup Contest 2021 - Vacuum Facility`,`AliceQuasar's Birthday Special - Fennec Forest`,`Tornado Valley`,`Depleted Reservoir - Un désordre enchevêtré de couleurs`,`Small sanctuary: Third`,`drem`,`Crystalized`,`Into The Jungle - Verdant Trail`,`iceCream's Ultras`,`Sunset Rise`,`Rose Dust`,`Zip Mover Contest 2021 - Zip Mover Ascent`,`The Mysterious Area`,`Startup Contest 2021 - Strange Sleepwalk`,`Madeline: Into the Temple`,`One Thousand Meters`,`The Secret of Celeste Mountain`,`the road less traveled`,`Smog City`,`Hibernation Apex`,`The BossSauce Map Pack - Shadelight`,`Alice's Gay Week 2 - wetty wet waterfall`,`Sylvan Grove - Switchland 2`,`Forsaken City E-Side(++)`,`At Dawn`,`Gravity Helper Mini Collab - Kinetic Domain`,`Quinnigan's Notepad`,`Sylvan Grove - Anything Is Possible Christmas Edition`,`Normal Map 64`,`The Climb`,`Donker19's Birthday Special - Velvaris`,`Permafrost Den`,`The Celeste Parable`,`Startup Contest 2021 - Move Block Grotto`,`the 1 hour alone contest/collab`,`Summit Prologue`,`The 2020 Tokyo Drift Incident`,`CORNSHUCKER`,`Amber Terminus`,`Gravity Helper Mini Collab - Around the World`,`Secret Santa Collab 2022 - Once in a Blue Moon`,`Dream to Awakening`,`A New Beginning`,`Unexpected Behaviors Contest 2021 - Just Springs And Bubbles`,`Winged Station`,`Summit Garden`,`Alice's Gay Week 2 - i flu u flu`,`Unexpected Behaviors Contest 2021 - Vaporwave Nightmare`,`The BossSauce Map Pack - Lavafrost Cavern`,`heather's aquarium`,`Midway Contest 2022 - Mahogany Monastery`,`Dashless Collab - Arctic Outpost`,`Rupture`,`Secret Santa Collab 2022 - 100 ridgs`,`Depleted Reservoir - City Limits`,`Anubi`,`The BossSauce Map Pack - Jammin'`,`iamdadbod Collab 2018`,`Dashless Collab - The 2022 Mini Dashless Collab`,`Shivering Hollows - The Sumpquel`,`Crystal Core`,`Farewell D-Side - Final Goodbye`,`Secret Santa Collab 2022 - Push Blocks Cliffs`,`Into The Jungle - Spoopy Thicket`,`stupid gorge`,`24x33`,`Love Story`,`Kaizo adventures`,`Sylvan Grove - Amethyst Grotto`,`Temporal Shrine`,`Conqueror's Peak`,`Boosted City`,`Gravity Helper Mini Collab - Prismatism`,`Val's Birthday Special - The Decline`,`Triangle's Home`,`Ezel's CC-sides`,`Midnight Aquarium`,`Dashless Collab - Lunar Gravitation`,`Techy Temple`,`Silent Snow`,`Leviathan's Rehearsal`,`A Rainy Night`,`7d(single dash ver)`,`MINDCRACK Map Pack`,`KAERRA'S FURRY WEEK - UPEND`,`Sunset Mountain`,`Into the Well`,`Alice's Gay Week 2 - helps readability`,`Symphony`,`How To Make A Map: For a Scrapped Contest`,`Nyan's Balls Week - pls ultra`,`Startup Contest 2021 - How To Play Celeste`,`touhoe's Birthday Special - Br1ght P!nk`,`Ruin of a Raccoon`,`ABuffZucchini's Various Maps - Old Horizon`,`Switch Mountain`,`Lavender Spire`,`ABuffZucchini's Various Maps - Windchill`,`Shrimp Contest -  The Green Temple`,`Rainy Faraway Disarray`,`Glyph D-Side`,`ToTheMars`,`Zip Mover Contest 2021 - Gemstone Caverns`,`Moonsong`,`Shivering Hollows - Gods of the Artificial`,`OkNano's Birthday Special - Raccoon Express`,`Midway Contest 2022 - Tardigrade Temple Too`,`Secret Santa Collab 2022 - BREAKING//POINT`,`The Hacklands`,`Girders Map`,`Carlos's Bday Special: the winter collab problem`,`Startup Contest 2021 - Hostile Trail`,`The BossSauce Map Pack - Matrix`,`Gravity Complex`,`Retro Rhythm Ruins`,`KAERRA'S FURRY WEEK - AVERT`,`Secret Santa Collab 2022 - One Star Review`,`Unexpected Behaviors Contest 2021 - The Unknown Known`,`Midway Contest 2022 - Frozen Citadel`,`Goose's Gamer Week - bleak starfall`,`Frogeline Summit`,`Albcat's Birthday Special - Cosmic Underwater`,`The cave of bubbles`,`Xoli's Birthday Special - a walk in the pærk`,`Complex 1997`,`Dashless Collab - Celeste '89`,`Alice's Gay Week - lesbomagnetic field`,`Shrimp Contest -  Krill Bay`,`No Dash Temple`,`ABuffZucchini's Various Maps - Ice Fortress`,`Platform adventures`,`Shrimp Contest -  Fishnet Dimension`,`Dashless Collab - The Thief`,`Error 404`,`Shrimp Contest -  Krillosophical conshrimperations`,`ABuffZucchini's Various Maps - Reversal`,`Zip Mover Contest 2021 - Rushed Zips`,`Sylvan Grove - Levels`,`Mount Kimitany Saga`,`Asleep`,`Oshiro's Fun Ride`,`Solaris`,`Zerex's Z-Sides`,`Moon Trail`,`Sylvan Grove - bring it back now yall`,`Dashless Collab - The Long Way`,`Temple of the Cursed God`,`Cabob's Birthday Special - Ultra Mobius Advanced`,`Sky High!`,`OkNano's Birthday Special - Swan Hillside`,`The Chatsides`,`Dashless Collab - Cataclysmic Cavern`,`Startup Contest 2021 - Verdant City`,`Cabob's (late) Birthday Special - Fridge Palace`,`Dimension of Chaos`,`Semena Mertvykh`,`Cloudy Cliffs`,`iidk..`,`The Walk Home`,`LAVATORY`,`CarelessAnon's Birthday Special - Gilded Hollow`,`Sunset Skyway`,`Nano's Hecksides - Fatal Exception`,`Rectangles`,`Shrimp Contest -  The Registry`,`Adranos`,`Leviathan's Chateau`,`Void`,`Shrimp Contest -  Heart of the Shrimp`,`Unexpected Behaviors Contest 2021 - Time Rift Trail`,`Tech Compendium: Bounce Helper Gym`,`Balls Mines where they mine Ball-Shaped Gemstones`,`Shrimp Contest - Blackgrounds`,`Velvet`,`DELTASCENEONE`,`Goose's Gamer Week - Madeline Makes a Map with Gravity Helper!`,`Midway Contest 2022 - The Midnight Library`,`Alice's Gay Week 2 - de 2`,`Startup Contest 2021 - Dream Booster Temple`,`Dr. Machestik's Dynamite Castle`,`Cursed Mines`,`SummitCollab2021`,`The BossSauce Map Pack - The Sauce Side`,`Dashless Collab - Government Tower`,`Shivering Hollows - Forest of Mythos`,`Arphimigon's D-Sides`,`Frozen Heights`,`Nyan's Balls Week - Nyan Made GM :D`,`Banana 23's Birthday Special - Platforminb!`,`Secret Santa Collab 2022 - Crystal Caverns`,`Temple of Blindness`,`Midway Contest 2022 - Far Gone`,`touhoe's Birthday Special - Upturned Downtown`,`Secret Santa Collab 2022 - Cephstellation`,`Ultra Processing`,`Zip Mover Contest 2021 - Dungeon of Tortured Souls`,`Alice's Gay Week - hi lennygold`,`5b_Garbage_Version`,`Midway Contest 2022 - Overgrown Dungeon`,`Unexpected Behaviors Contest 2021 - Bouncing Dock`,`Farewell Plus`,`Polygon Dreams`,`Madeline Goes to Space`,`Startup Contest 2021 - Ruby Cliffs`,`Zip Mover Contest 2021 - Definitely Not Dedication`,`ABuffZucchini's Various Maps - Spike Pit`,`Tranquil Space Garden`,`Ultra Skool`,`Startup Contest 2021 - Curious Crater`,`F.I.S.H. ( Fish In Space How ?? )`,`Nano's Hecksides - Hell(ish)`,`Dashless Collab - Cotton Candy Core`,`Abandoned City`,`Nyan's Balls Week - POV: You Didn't Ultra`,`Ember's Utopia`,`Startup Contest 2021 - Subconsciousness`,`Autumnal Heights`,`Midway Contest 2022 - A Resort .Bin`,`Shrimp Contest -  The Tides from The Sea`,`The Dadsides`,`Into The Jungle - Shifting Temple`,`sexy summit`,`Secret Santa Collab 2022 - Celestial Medley`,`Donker19's Birthday Special - Sucrose Solaris`,`Gravity Helper Mini Collab - Onyx Tower Remnants`,`Zip Mover Contest 2021 - Frozen Waterpark`,`Red Moon's Resort`,`Goose 3000m`,`The BossSauce Map Pack - Hellwind`,`Chilly, Windy Ruins`,`Into The Jungle - Ancient Ruins`,`Alice's Gay Week - the celeste mapper struggle`,`Radiant Sanctum`,`KAERRA'S FURRY WEEK - SPARK`,`Balls Tourney Lobby - andVoid`,`RARE RACCOON ROAD`,`Midway Contest 2022 - Ember Paradise`,`Shrimp Contest -  Shrimp 2500 Meters`,`Unexpected Behaviors Contest 2021 - Dubble Tower`,`Leviathan's Ultras`,`Cosmic Sands`,`Shivering Hollows - Haunted Block Bridge`,`Dashless Collab - Midnight Dreams`,`The Complex B-Side`,`Pico-8 Remake`,`Dry Space`,`Jackal's Birthday Special - Ice Cold Trail`,`Starfall`,`Another Farewell Map`,`CELESTE 2!!!!!!!`,`MARS FGS.`,`Forgotten Rhythm`,`Secret Santa Collab 2022 - The Secret Cliffside Florest`,`Alice's Gay Week 2 - im bad at names`,`Nano's Hecksides - Hyperthermia`,`Startup Contest 2021 - The Startside`,`Paint Reverse`,`Leviathan's Ultras +`,`Silent Night's Alley`,`Flair Against Evidence`,`AliceQuasar's BDay Special - Hang Out With OkNano!`,`Shivering Hollows - Jank Facility 2 Electric Boogaloo`,`Hexagon Force`,`MYNDMLTR`,`Shivering Hollows - Teeny Temperate Temple Trials: Temporary Title`,`The Blizzard`,`Midway Contest 2022 - Ruby Mines`,`Suburban Nebula`,`Tardigrade Temple`,`ABuffZucchini's Various Maps - Above The Summit`,`Depleted Reservoir - Glacial Climb`,`Lani's Cave`,`Secret Santa Collab 2022 - Fallacious Realm`,`Music World`,`Depleted Reservoir - BREAKTHROUGH`,`Interstellar Submarine`,`lowqualitylavamap.bin`,`Sylvan Grove - Ineluctable Modality of the Sump`,`Nano's Hecksides - Old Site Heck-Side Cassette Rift`,`Temple of Tears`,`Goose's Gamer Week - goose made gm.`,`Alice's Gay Week - volaris`,`Shrimp Contest -  DeepFried`,`Zip Mover Contest 2021 - Ziptied Puffers`,`Nyan's Balls Week - Temporal Toilet`,`KAERRA'S FURRY WEEK - BOUND`,`Theo Summit`,`Shrimp Contest -  Flower Bumper Mountain`,`Celestial Cabinet`,`The Seaside C-Side`,`Startup Contest 2021 - Light Breeze`,`Crystal Void`,`Astral Tower`,`Midway Contest 2022 - Rainbow Temple`,`Startup Contest 2021 - Lilly's Lake`,`Juice Box`,`Nyan's Balls Week - The Ballsside`,`Secret Santa Collab 2022 - Purple Factory`,`Peridot Oasis`,`The BossSauce Map Pack - Flooded City`,`Secret Santa Collab 2022 - Gusty Proposition`,`INFINITE HYPERPISS`,`blue hair and pronouns`,`Stationary Intermission`,`Floatier Time`,`Zip Mover Contest 2021 - Aquatic Metropolis`,`Secret Santa Collab 2022 - How to Make a Good Celeste Map`,`Waterbear Mountain`,`Myself`,`Shivering Hollows - Ultra Swan Slide`,`The BossSauce Map Pack - Treetop Climb`,`Disconnected Summit`,`Shrimp Contest -  As Shrimple (Shrimp Temple) as That`,`ABuffZucchini's Various Maps - Temple of the Fish`,`Goose's Gamer Week - Connected Summit 3000m`,`Nano's Hecksides - Green back at it again`,`Shrimp Contest -  Scallop Sanctorium`,`Gravity Test`,`Donker19's (late) Birthday Special: Solaris 2½`,`Shrimp Contest -  Frosted Bonkrill's Slumber`,`Astraeus`,`Madeline wanna trial the 100trap`,`Shivering Hollows - Nostalgia`,`Alice's Gay Week - alice made gm :(`,`The Funeral`,`Startup Contest 2021 - Serenity`,`ABuffZucchini's Various Maps - The Complex`,`Nano's Hecksides - Motion Grotto`,`Monika's D-Sides Pack`,`Startup Contest 2021 - Grassy Springs`,`Avian Ascension`,`Nano's Hecksides - "easy!"`,`Secret Santa Collab 2022 - Old Ones' Mausoleum`,`iamdadbod's Birthday Special: Golden Tower Ruins`,`Phob's P-Sides Pack`,`Shrimp Contest -  The day Chaos took over`,`Dashless Collab - Lonesome Mansion`,`Nyan's Balls Week - Dashless Pride`,`Quickie Mountain`,`World's Hardest Game - Celeste Remake`,`Startup Contest 2021 - Haunted Halls of Altes-Celi`,`Dashless Collab - Stellar Gateway`,`THE CELESTE: Ultimate Heartside Challenge`,`ABuffZucchini's Various Maps - The Abyss`,`Shrimp Contest -  elderly location`,`The Trial of Epidox`,`Dashless Collab - Desert Depths`,`Switchland`,`Midway Contest 2022 - Unsaved Changes`,`Olden Tower Ruins D-Side`,`Storm Canyon`,`Mount Everest`,`Get Well Soon~: A Letter to Myself`,`Sienna's Realm`,`Nyan's Balls Week - POV: You Did Ultra`,`Valentine's Day Contest 2021`,`Shrimp Contest -  So, You're Telling Me a`,`Rainy Today`,`Alice's Gay Week 2 - the path to perfection`,`Sylvan Grove - new spirte flavor : purple`,`Startup Contest 2021 - Electric Aurora`,`Shrimp Contest -  Charred Cocktail Sauce Spaceventure`,`Summit Ballsside`,`Shimmer`,`Startup Contest 2021 - Collapsing Canyon`,`Shrimp Contest -  The Shrimpside`,`Souper Madeline Climbs Soup Mountain 64`,`Secret Santa Collab 2022 - Timeless Crest`,`SPRINT`,`Space Peak`,`Startup Contest 2021 - An Exercise in Futility`,`Startup Contest 2021 - Bubble Wrap Temple`,`Shrimp Contest - srimp's curse`,`Startup Contest 2021 - Basaltic Beach`,`Shining Land`,`StrawberryHunter`,`Shivering Hollows - Constructed Caverns`,`Shrimp Contest -  Animal (Shrimp) Crackers in my Soup`,`Sib`,`Secret Santa Collab 2022 - pls speedtech`,`Summit Encore`,`Shivering Hollows - Why do they call it oven when you of in the cold food out hot eat the food`,`Sylvan Grove - Madeline goes out to get her dash back`,`Shrimp Contest -  Scrumptious Scampiscape`,`Shrimp Contest -  into the blue`,`Subjection`,`Shrimp Contest -  Shrimpsong`,`Shrouded Thoughts`];

// the decryption/encryption functions.
function bad_encryption(str) {
	if(str.length < 11) {
		str = "AURORAWASHERE;;;||;;;" + str;
	}
	return str.split("").map(x => String.fromCharCode((x.charCodeAt(0)-33)^4272)).join("");
}

function bad_decryption(str) {
	str = str.split("").map(x => String.fromCharCode((x.charCodeAt(0)^4272)+33)).join("");
	str = str.replace("AURORAWASHERE;;;||;;;","");
	return str 
}

// test to see it works
test = order.map(x => bad_encryption(x))
order2 = test.map(x => bad_decryption(x))
// if this has an element it did not work!
not_same = order2.filter((_,i) => order[i] != order2[i]);
