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