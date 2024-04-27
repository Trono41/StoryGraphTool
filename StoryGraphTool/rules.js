/*
let button_a = false;
let button_b = false;
let key_frag_a = false;
let key_frag_b = false;
let complete_key = false;
*/

let glob = {
    "button_a": false,
    "button_b": false,
    "key_frag_a": false,
    "key_frag_b": false,
    "complete_key": false
    };

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data

        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
        /*
        if(locationData.Conditional) {
            for(let choice of locationData.Conditional) {
                if(eval(choice.Condition.length) >= 1) {
                    if(eval(choice.Condition[0]) == true) {
                        if (choice.Condition[1]) {
                            if(eval(choice.Condition[0] && choice.Condition[1]) == true) {
                                this.engine.addChoice(choice.Text, choice);
                            }
                        }
                        else {
                            this.engine.addChoice(choice.Text, choice);
                        }
                    }
                }
                
            }
        }*/
    }

    handleChoice(choice) {
        if(choice) {
            /*if(choice.Target == "InspectButton1") {
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(ButtonRoom, choice.Target);
                console.log("You are at " + choice.Target);
            }
            else {
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
                console.log("You are at " + choice.Target);
            }*/
            this.engine.show("&gt; "+choice.Text);
            if (choice.Text = "Inspect button") {
                this.engine.gotoScene(ButtonRoom, choice.Target);
            }
            else {
                this.engine.gotoScene(Location, choice.Target);
            }
            console.log("You are at " + choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class ButtonRoom extends Location {
    handleChoice(choice) {
        console.log("You are in a button room.");
        if (choice.text == "Press Button") {
            console.log(button_a);
            if(glob[Locations.Button] == false) {
                glob[Locations.Button] = true;
                console.log(button_a);
    
                this.engine.show("&gt; "+"Button pressed!");
                this.engine.gotoScene(Location, "Room1");
            }
        }
        
        else if (this.engine.Locations == "Room2") {
            if (choice.Text == "Press Button") {
                if(!eval(Locations.Button)) {
                    eval(Locations.Button) = true;
                    console.log(button_b)
    
                    this.engine.show("&gt; "+"Button pressed!");
                    this.engine.gotoScene(ButtonRoom, "Room2");
                }
            }
        }
    }
}

class Forge extends Location {
    handleChoice(choice) {
        if(choice.Text == "Reforge key") {
            if (key_frag_a == true && key_frag_b == true) {
                complete_key = true;
                key_frag_a = false;
                key_frag_b = false;

                this.engine.show("&gt; "+"Key reforged!");
                this.engine.gotoScene(Forge, "Room4");
            }
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');