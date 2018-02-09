'use strict';

import { EVENT_NAMES } from '/app/constants.js';
import { document_load, listen } from '/app/utils.js';
import { init as scenarios_init } from '/app/menu/scenarios.js';
import { init as decklist_init } from '/app/menu/decklist.js';

function activate_tab(tabs, pages, activetab)
{
    for (let key in tabs)
    {
        tabs[key].className = (key == activetab) ? "" : "inactive";
    }
    for (let key in pages)
    {
        pages[key].className = (key == activetab) ? "tabbody" : "inactive tabbody";
    }
}

function show_settingspane(pane, cancelarea, show)
{
    console.log("!!!!")
    pane.className = show ? "pane" : "pane inactive";
    cancelarea.style.display = show ? "initial" : "none";
}

function init_ui()
{
    let menu =      document.getElementById("settingspane");

    let tabs =
    {
        scenarios:      document.getElementById("scenariotab"),
        decks:          document.getElementById("deckstab")
    };

    let pages =
    {
        scenarios:      document.getElementById("scenariospage"),
        decks:          document.getElementById("deckspage")
    };

    let buttons = {
        settings:       document.getElementById("settingsbtn"),
        cancel:         document.getElementById("cancelarea")       
    };

    tabs.scenarios.addEventListener("click", () => activate_tab(tabs, pages, "scenarios"));
    tabs.decks.addEventListener("click", () => activate_tab(tabs, pages, "decks"));
    buttons.settings.addEventListener("click", () => show_settingspane(menu, buttons.cancel, true));
    buttons.cancel.addEventListener("click", () => show_settingspane(menu, buttons.cancel, false));
    listen(EVENT_NAMES.LOAD_SCENARIO, () => show_settingspane(menu, buttons.cancel, false) );

    activate_tab(tabs, pages, "scenarios");

    scenarios_init();
    decklist_init();
}

document_load(init_ui);