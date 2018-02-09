'use strict';

import { EVENT_NAMES } from '/app/constants.js';
import { SCENARIO_DEFINITIONS } from '/app/data/scenarios.js';
import { dispatch } from '/app/utils.js';

var selected_scenario;
let scenario_level;
let scenario_number;
let scenario_load;
let scenario_name;

function loadScenario(){
	dispatch(EVENT_NAMES.LOAD_SCENARIO, selected_scenario);
}

function loadName(){
	var scenarioNumber = parseInt(scenario_number.value);

	if (isNaN(scenarioNumber)) return;

	var scenario = SCENARIO_DEFINITIONS[scenarioNumber-1];

	if (!scenario) return;

	selected_scenario = scenario;
	scenario_name.textContent = selected_scenario.name;
}

function init() {

	scenario_level = document.getElementById('scenario_level');
	scenario_number = document.getElementById('scenario_number');
	scenario_load = document.getElementById('applyscenario');
	scenario_name = document.getElementById('scenario_name');

	scenario_number.setAttribute("max", SCENARIO_DEFINITIONS.length);
	scenario_number.addEventListener('change', loadName);

	scenario_load.addEventListener('click', loadScenario);

	loadName();
}

// function ScenarioList(scenarios) {
//     var scenariolist = {};
//     scenariolist.ul = document.createElement("ul");
//     scenariolist.ul.className = "selectionlist";
//     scenariolist.spinner = null;
//     scenariolist.decks = {};
//     scenariolist.special_rules = {};
//     scenariolist.level_selector = null;

//     scenariolist.level_selector = new LevelSelector("Select level", false);

//     scenariolist.ul.appendChild(scenariolist.level_selector.html);

//     for (var i = 0; i < scenarios.length; i++) {
//         var scenario = scenarios[i];
//         scenariolist.decks[i] = scenario.decks;
//         scenariolist.special_rules[i] = scenario.special_rules ? scenario.special_rules : "";
//     }

//     var listitem = document.createElement("li");
//     listitem.innerText = "Select scenario number";
//     scenariolist.ul.appendChild(listitem);

//     var scenario_spinner = create_input("number", "scenario_number", "1", "");
//     scenario_spinner.input.min = 1;
//     scenario_spinner.input.max = scenarios.length;
//     listitem.appendChild(scenario_spinner.input);
//     scenariolist.spinner = scenario_spinner.input;

//     scenariolist.get_selection = function () {
//         // We're using the scenario index that is zero-based, but the scenario list is 1-based
//         var current_value = scenariolist.spinner.value - 1;
//         return Math.min(current_value, scenarios.length + 1);
//     }

//     scenariolist.get_level = function (deck_name, special_rules) {

//         var base_level = scenariolist.level_selector.get_selection();

//         if ((special_rules.indexOf(SPECIAL_RULES.living_corpse_two_levels_extra) >= 0) && (deck_name == SPECIAL_RULES.living_corpse_two_levels_extra.affected_deck)) {
//             return Math.min(7, (parseInt(base_level) + parseInt(SPECIAL_RULES.living_corpse_two_levels_extra.extra_levels)));
//         } else {
//             return base_level;
//         }
//     }

//     scenariolist.get_scenario_decks = function () {
//         return (this.decks[this.get_selection()].map(function (deck) {
//             if (DECKS[deck.name]) {
//                 deck.class = DECKS[deck.name].class;
//             } else if (deck.name.indexOf("Boss") != -1) {
//                 deck.class = DECKS["Boss"].class;
//             }
//             deck.level = scenariolist.get_level(deck.name, scenariolist.get_special_rules());
//             return deck;
//         }));
//     }

//     scenariolist.get_scenario_name = function()
//     {
//         return scenarios[this.get_selection()].name;
//     }

//     scenariolist.get_special_rules = function () {
//         return this.special_rules[this.get_selection()];
//     }

//     return scenariolist;
// }

// function init_() {
//     var scenariospage = document.getElementById("scenariospage");
//     var applydeckbtn = document.getElementById("applydecks");
//     var applyscenariobtn = document.getElementById("applyscenario");
//     var applyloadbtn = document.getElementById("applyload");

//     var decklist = new DeckList();
//     var scenariolist = new ScenarioList(SCENARIO_DEFINITIONS);

//     scenariospage.insertAdjacentElement("afterbegin", scenariolist.ul);

//     applydeckbtn.onclick = function () {
//         // localStorage.clear();
//         var selected_deck_names = decklist.get_selected_decks();
//         // write_to_storage("selected_deck_names", JSON.stringify(selected_deck_names));
//         var selected_decks = selected_deck_names.map(function (deck_names) {
//             return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
//         });
//         apply_deck_selection(selected_decks, true);
//         apply_scenario_name(null);
//         // write_to_storage("scenario_name", null);
//     };

//     applyscenariobtn.onclick = function () {
//         // localStorage.clear();
//         var selected_deck_names = scenariolist.get_scenario_decks();
//         // write_to_storage("selected_deck_names", JSON.stringify(selected_deck_names));
//         // write_to_storage("scenario_name", scenariolist.get_scenario_name());
//         decklist.set_selection(selected_deck_names);
//         var selected_decks = selected_deck_names.map(function (deck_names) {
//             return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
//         });
//         apply_deck_selection(selected_decks, false);
//         apply_scenario_name(scenariolist.get_scenario_name());
//     };

//     applyloadbtn.onclick = function () {
//         var selected_deck_names = JSON.parse(get_from_storage("selected_deck_names"));
//         decklist.set_selection(selected_deck_names);
//         var selected_decks = selected_deck_names.map(function (deck_names) {
//             return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
//         });
//         apply_deck_selection(selected_decks, true);
//         apply_scenario_name(get_from_storage("scenario_name"));

//     }

//     window.onresize = refresh_ui.bind(null, visible_ability_decks);
// }



export { init };




