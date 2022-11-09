# Made by Aurora 
# Working with text files sucks lmao
# Makes them into json files I can use

# json struct
# [keys: [all map names], 
#  maps:{map_name:{info:{date, difficulty, gamebanana_name, map_name, mapper}, 
#  image_paths: [1,..,6]}]
import json
from os import listdir
from os.path import isfile, join
import urllib.parse

def check_files(files):    
    required_files = ["date.txt","difficulty.txt","gb.txt","mapper.txt","name.txt"]
    missing = []
    for required_file in required_files:
        if not required_file in files:
            missing.append(required_file)
    if len(missing) < 1: # nothing else missing check jpg/jpeg/png
        for i in range(1, 7):
            all_missing = True
            for ext in [".png", ".jpeg", ".jpg"]:
                if f"{i}{ext}" in files:
                    all_missing = False
            if all_missing:
                missing.append(f"Image {i}")
    return missing

def create_map_dictionary(path):
    obj = {"keys":[],"maps":{}}
    folders = [files for files in listdir(path) if not isfile(join(path, files))]
    folder_amount = len(folders)
    folder_counter = 1
    folder_len = len(str(folder_amount))
    count_missing = 0
    for folder in folders:
        print(f"Creating object for map {str(folder_counter).zfill(folder_len)}/{folder_amount}",end="\r")
        folder_counter += 1
        map_obj = { "info":
                        {
                            "date":"",
                            "difficulty":"",
                            "gamebanana":"",
                            "map_name":"",
                            "mapper":""
                        },
                    "image_paths":[]}

        files = [file for file in listdir(join(path, folder)) if isfile(join(path, folder, file))]
        
        if len(missing := check_files(files)) > 0:
            print(" "*50, "---- WARNING ----", sep="\r")
            print("Folder "+folder+" does not have all required files!")
            print("Missing: "+", ".join(missing))
            print("Skipping...")
            count_missing += 1
        else:
            for i in range(1, 7):
                img = ""
                for ext in [".png", ".jpg", ".jpeg"]:
                    if (fn:=f"{i}{ext}") in files:
                        img = join(path, urllib.parse.quote(folder), fn)
                map_obj["image_paths"].append(img)
            # Fill out info object
            info_obj = map_obj["info"]
            #This is kinda ugly but eh
            txt_files = [join(path, folder, fn) for fn in ["date.txt","difficulty.txt","gb.txt","name.txt","mapper.txt"]]
            obj_keys = ["date", "difficulty", "gamebanana", "map_name", "mapper"]
            for (key, file) in zip(obj_keys, txt_files):
                with open(file) as f:
                    info_obj[key] = f.readline()
            # lol. yep.
            name = ""
            with open(join(path, folder, "name.txt")) as f:
                name = f.readline()
            obj["keys"].append(name)
            obj["maps"][name] = map_obj
    print("")
    print("Folders with missing files: "+str(count_missing))
    return obj


def write_to_file(path, obj):
    json_object = json.dumps(obj, indent=4)
    with open(path, "w") as outfile:
        outfile.write(json_object)


if __name__ == "__main__":
    print("Welcome to files to json thingymajig by Aurora!")
    print("Generating object from files...")
    obj = create_map_dictionary("maps")
    print("Writing to file...")
    write_to_file(join("maps", "map_index.json"), obj)
    print("Done!")
    print()
