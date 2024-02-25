"use strict";

let text = document.querySelector(".text");

const mainBtns = document.querySelector(".main-buttons");
// const buttons = document.querySelectorAll(".buttons");
const btn1 = document.querySelector(".button1");
const btn2 = document.querySelector(".button2");
const btn3 = document.querySelector(".button3");
const btn4 = document.querySelector(".button4");
const masterContainer = document.querySelector(".master-container");

const extraScreens = document.querySelectorAll(".extra-screens");

const blacksmith = document.querySelector(".blacksmith");
const armorer = document.querySelector(".armorer");
const store = document.querySelector(".store");

const battleScreen = document.querySelector(".battle");
const attackBtn = document.querySelector(".attack-btn");
const defendBtn = document.querySelector(".defend-btn");
const itemBtn = document.querySelector(".item-btn");
const runBtn = document.querySelector(".run-btn");

const vergeScreen = document.querySelector(".verge");

masterContainer.classList.add("hide");
btn2.classList.add("hide");
btn3.classList.add("hide");
btn4.classList.add("hide");

//Name Entry Variables
const enterName = document.querySelector(".enter-name");
const nameQuestion = document.querySelector("#name-question");
const invalidName = document.querySelector("#invalid-name");
const nameInput = document.querySelector("#name-input");
const sure = document.querySelectorAll(".sure");
const sureQuestion = document.querySelector(".sure-question");
const yesSure = document.querySelector(".yes-sure");
const noSure = document.querySelector(".no-sure");
const charName = document.querySelector(".char-name");

//Stat screen variables
const levelNum = document.querySelector(".level-num");
const healthNum = document.querySelector(".health-num");
const goldNum = document.querySelector(".gold-num");
const potionNum = document.querySelector(".potion-num");
const featherNum = document.querySelector(".feather-num");
const oreNum = document.querySelector(".ore-num");
// const levelText = document.querySelector(".level");
// const levelText = document.querySelector(".level");
// const levelText = document.querySelector(".level");
// const levelText = document.querySelector(".level");
// const levelText = document.querySelector(".level");

//Player State
let level = 1;
let xp = 0;
let health = 100;
let maxHealth = 100;
let damage = 15;
let armor = 1;
let items = {};
let gold = 0;
let potions = 0;
let feathers = 0;
let ores = 0;

const weapons = ["Sword", "Axe", "Maul"];

//Initialization Process

window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && nameInput.value == false) {
        console.log("no no noo");
        nameQuestion.classList.add("hide");
        invalidName.classList.remove("hide");
    } else if (event.key === "Enter" && nameInput !== false) {
        nameQuestion.classList.add("hide");
        invalidName.classList.add("hide");
        nameInput.classList.add("hide");
        sure.forEach((element) => {
            element.classList.remove("hide");
        });
        sureQuestion.innerHTML = `Are you sure you want your character's name to be <span class="name-confirm">${nameInput.value}</span>?`;
    }
});

yesSure.addEventListener("click", () => {
    sure.forEach((element) => {
        element.classList.add("hide");
    });
    enterName.classList.add("hide");
    masterContainer.classList.remove("hide");
    charName.innerText = nameInput.value;
});

noSure.addEventListener("click", () => {
    sure.forEach((element) => {
        element.classList.add("hide");
    });
    nameQuestion.classList.remove("hide");
    nameInput.classList.remove("hide");
});

updatePlayer();

btn1.innerText = "Begin journey";
btn1.onclick = function () {
    updateLoc("startCave");
    btn2.classList.remove("hide");
    btn3.classList.remove("hide");
    btn4.classList.remove("hide");
};

//Functions

// *******Core Gameplay Functions*********

function updatePlayer() {
    levelNum.innerText = level;
    healthNum.innerText = health;
    goldNum.innerText = gold;
    potionNum.innerText = potions;
    featherNum.innerText = feathers;
    oreNum.innerText = ores;
}

const drinkPot = function () {
    if (health === maxHealth) {
        text.innerText = "You already have full health!";
    } else if (health < maxHealth - 10) {
        health += 10;
        potions--;
    } else if (health >= maxHealth - 10) {
        health = maxHealth;
        potions--;
    }
};

const levelUp = () => {
    level++;
    text.innerText = `You levelled up! You are now level ${level}!`;
    maxHealth += 10;
    maxDamage += 0.1;
};

//Inventory & Main Screen

const openExtras = function () {
    extraScreens.forEach((extra) => {
        extra.classList.remove("hide");
    });
};

const closeExtras = function () {
    extraScreens.forEach((extra) => {
        extra.classList.add("hide");
    });
};

//Combat Functions

const battle = function (enemyName, enemyDamage, enemyHealth) {
    mainBtns.classList.remove("flexy");
    mainBtns.classList.add("hide");
    battleScreen.classList.remove("hide");
    console.log(enemyName);

    attackBtn.addEventListener("click", () => {
        enemyHealth -= damage;
        health -= enemyDamage * armor;
        console.log(enemyDamage);
        if (enemyHealth <= 0) {
            text.innerText = `You have defeated the ${enemy}!`;
        }
    });
    defendBtn.addEventListener("click", () => {});
};

const verge = function () {
    text.innerText = "You are on the verge of death. Use a feather to revive?";
    battleScreen.classList.add("hide");
    vergeScreen.classList.remove("hide");
};

// verge();

const die = () => {
    text.innerText =
        "YOU DIED!... But it's okay, sorry if I startled you. Wanna try again?";
    btn2.classList.add("hide");
    btn3.classList.add("hide");
    btn1.innerText = "Retry";
};

const enemies = {
    orc: {
        attack: 2,
        health: 100,
    },
    vampire: {
        attack: 5,
        health: 500,
    },
};

const fightOrc = function () {
    battle("orc", 15, 50);
};

//DAMAGE PLAYER AFTER EVERY BUTTON PUSH EXCEPT DEFEND?

//TAKE DAMAGE WHEN YOU RUN BASED ON THE RATIO OF HEALTH REMAINING BY PLAYER TO THE ENEMY

//**************Combat Functions end here */

//Location Specific Functions

const lookCave = () => {
    text.innerText =
        "It is dark and you can't see anything interesting. Although it is a bit cramped. Wait a second... What's this? Well you found 27 gold.";
    gold += 27;
};
const smellCave = () => {
    text.innerText =
        "Smells like someone ate a couple of rotten eggs, drank some spoiled milk and then came here to die and become compost.";
};

const searchCave = () => {
    text.innerHTML =
        'You start feeling around the floor and your hands are covered with some weird substance. Eww. Oh but you find some gold coins! <br><br><br> <span class="gold-change"<strong>+20 gold added to your inventory</strong></span';
    gold += 20;
};

const goTown = () => {
    updateLoc("town");
};

const goMarket = () => {
    blacksmith.classList.remove("flexy");
    armorer.classList.remove("flexy");
    store.classList.remove("flexy");
    blacksmith.classList.add("hide");
    armorer.classList.add("hide");
    store.classList.add("hide");

    mainBtns.classList.remove("hide");
    mainBtns.classList.add("flexy");

    updateLoc("market");
};
const backMarket = document.querySelectorAll(".backMarket");
backMarket.forEach((button) => {
    button.addEventListener("click", () => {
        goMarket();
        console.log("yea");
    });
});

//STORE FUNCTIONS START HERE

const goStore = () => {
    store.classList.remove("hide");
    mainBtns.classList.remove("flexy");
    mainBtns.classList.add("hide");
};

//Buy Potion
document.querySelector("#buyPot").addEventListener("click", () => {
    if (gold >= 10) {
        potions++;
        gold -= 10;
        text.innerText = `You bought a potion. You now have ${potions} potions.`;
    } else {
        text.innerText = "You don't have enough money mate. Sorry:/";
    }
});

//Buy Feather
document.querySelector("#buyFeather").addEventListener("click", () => {
    if (gold >= 100) {
        feathers++;
        gold -= 100;
        text.innerText = `You bought a strange feather. You can use these heal yourself only when you are at death's door to give yourself another chance. You now have ${feathers} feathers.`;
    } else {
        text.innerText = "You don't have enough money mate. Sorry:/";
    }
});

//Buy Ore
document.querySelector("#buyOre").addEventListener("click", () => {
    if (gold >= 50) {
        ores++;
        gold -= 50;
        text.innerText = `You bought an ore. You can give these to the blacksmith to upgrade your weapons. You now have ${ores} ores.`;
    } else {
        text.innerText = "You don't have enough money mate. Sorry:/";
    }
});

//Store Gossip
document.querySelector("#storeGossip").addEventListener("click", () => {
    text.innerText =
        "You new around here? Are you one of those adventurers? If so don't go into the woods without proper gear. Unless you wanna just DIE. There are some nasty weird things in those woods I hear.";
});

//Store to Market

//*************STORE FUNCTIONS END HERE

//BLACKSMITH FUNCTIONS START HERE

const goBlacksmith = () => {
    blacksmith.classList.remove("hide");
    mainBtns.classList.remove("flexy");
    mainBtns.classList.add("hide");
    text.innerText =
        "Yarrrggghhh!!! Ahoy thar matey! I am the best blacksmith ye'll ever find in this here town forsaken by Neptune himself! Wha' do ye wants?";
};

//Why talk like that?
document.querySelector("#whyTho").addEventListener("click", () => {
    text.innerText =
        "ARRRRGGGGGGGHHHHHHHHHHHHHHHHHHHHH YOU'RE RIGHT AND IT HURTS. I guess I got them both confused.";
});

// **************BLACKSMITH FUNCTIONS END HERE

//ARMORER FUNCTIONS START HERE

const goArmorer = () => {
    // updateLoc("sell");
    armorer.classList.remove("hide");
    mainBtns.classList.remove("flexy");
    mainBtns.classList.add("hide");
    text.innerText =
        "Welcome. We got stuf so you don't die fighting monsters or whatever.";
};

//****************ARMORER FUNCTIONS END HERE

//TAVERN FUNCTIONS START HERE

const goTavern = () => {
    updateLoc("tavern");
};

const rentRoom = () => {
    if (gold >= 20) {
        text.innerText =
            "You rent a room. It's small and weird. But at least you are indoors and there is a bed. You go to sleep. You wake up feeling refreshed. Nice.";
        health = maxHealth;
    } else {
        text.innerText =
            "You don't have enough money to rent a room. Now scram!";
    }
};

const gossip = () => {
    text.innerText = "";
};

//TAVERN FUNCTIONS END HERE******************

//ENEMIES

const orc = function () {};

//LOCATION CHANGE

const goCave = () => {};

const goWild = () => {
    updateLoc("wild");
};

const goForest = () => {
    updateLoc("forest");
};

const goLake = () => {
    updateLoc("lake");
};

const goMountain = () => {
    updateLoc("mountain");
};

const updateLoc = function (scene) {
    btn1.innerText = locations[scene]["btnText"][0];
    btn2.innerText = locations[scene]["btnText"][1];
    btn3.innerText = locations[scene]["btnText"][2];
    btn4.innerText = locations[scene]["btnText"][3];
    btn1.onclick = locations[scene]["btnFunc"][0];
    btn2.onclick = locations[scene]["btnFunc"][1];
    btn3.onclick = locations[scene]["btnFunc"][2];
    btn4.onclick = locations[scene]["btnFunc"][3];
    text.innerText = locations[scene].text;
};

const locations = {
    startCave: {
        btnText: ["Look around", "Smell the air", "Search the cave", "Get out"],
        btnFunc: [lookCave, smellCave, searchCave, goTown],
        text: "You wake up on the floor of what seems to be a dark and damp cave. In the distance there seems to be a way out.",
    },
    town: {
        btnText: [
            "Go to the market",
            "Go to the tavern",
            "Go to wilderness",
            "Go to wilderness",
        ],
        btnFunc: [goMarket, goTavern, goWild, goWild],
        text: "You find yourself in the middle of a boringly ordinary medieval town. As the age we live in is the medieval age, nothing is out of the ordinary and no further inquisitive inquiries are needed, or indeed, welcome.",
    },
    market: {
        btnText: [
            "To the general store",
            "To the blacksmith",
            "To the armorer",
            "Get out",
        ],
        btnFunc: [goStore, goBlacksmith, goArmorer, goTown],
        text: "Lots of friendly faces that definitely look very happy to see you. Hide your little money sack just in case though. Where do you want to go?",
    },
    tavern: {
        btnText: ["Rent a room (20 gold)", "Gossip?", "**", "Get out"],
        btnFunc: [rentRoom, gossip, , goTown],
        text: "What an elegant and upstanding establishment. No one has been murdered here since last Tuesday.",
    },
    wild: {
        btnText: [
            "Go to the forest",
            "Go to the lake",
            "Go up the mountain",
            "Go back to the town",
        ],
        btnFunc: [goForest, goLake, goMountain, goTown],
        text: "Wow so much green stuff... The air is also impressive as it does not make you immediately gag when compared to that cesspool they call a 'town'. There is an ominous looking forest on the left side of the path and a scary mountain with a lake in between.",
    },
    forest: {
        btnText: ["Go to the ", "", "", "Go back to cliff"],
        btnFunc: [, , , goWild],
        text: "",
    },
    lake: {
        btnText: ["Go to the ", "", "", "Go back to cliff"],
        btnFunc: [, , , goWild],
        text: "",
    },
    mountain: {
        btnText: ["", "", "fight orc", "Go back to cliff"],
        btnFunc: [, , fightOrc, goWild],
        text: "Up the mountain",
    },
};

// textChange("lookCave");
