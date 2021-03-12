import { RLIS } from "./rlis";
import { Inventory } from "./stucts";


const rlis = new RLIS();
let inventory :Inventory;

//
// Random class
//

class Random {
    public static getInclusiveInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}


//
// Interface class
//

class Interface {
    public static el :any = {
        init: {
            container: document.getElementById("containerFile"),
            file: document.getElementById("initFile"),
            submit: document.getElementById("initSubmit"),
        },
        spinner: {
            container: document.getElementById("containerLoadSpinner")
        },
        selection: {
            container: document.getElementById("containerSelection"),
            quality_select: document.getElementById("qualitySelect"),
            item_type_item: document.getElementById("itemTypeRadio0"),
            item_type_blueprint: document.getElementById("itemTypeRadio1"),
            templates: {
                quality_option: document.getElementById("templateQualityOption")
            }
        }
    }

    public static setVisibility(element :HTMLElement ,visibility :boolean) {
        let ecl = element.classList;
        if(visibility) {
            if(!ecl.contains("d-none")) return;
            ecl.remove("d-none");
        } else {
            if(ecl.contains("d-none")) return;
            ecl.add("d-none");
        }
    }

    public static initializeForm() {
        // Populate quality select with options
        enum Item_T {Item, Blueprint};
        const item_type = this.el.selection.item_type_item.checked ? Item_T.Item : Item_T.Blueprint;
        const selection = this.el.selection.quality_select;
        const option_template = this.el.selection.templates.quality_option;
        const local_inventory = item_type ? inventory.blueprints : inventory.items;
        const local_inventory_keys = Object.keys(local_inventory);
        selection.innerHTML = "";

        local_inventory_keys.forEach(key => {
            if(local_inventory[key].length == 0) return;
            
            let option_temp = option_template.content.cloneNode(true);
            let option_temp_element = option_temp.querySelector("option");
            option_temp_element.value = key;
            option_temp_element.innerHTML = key + ` (${local_inventory[key].length})`;
            selection.appendChild(option_temp);
        });
    }

    public static showPricing() {
        
    }
}


//
// Events
//

Interface.el.init.submit.addEventListener("click", () => {
    const file = Interface.el.init.file.files[0];
    if(typeof file == "undefined") {
        alert("You need to choose a file!");
        return;
    }

    rlis.parseRawFile(file);
});

Interface.el.selection.item_type_item.addEventListener("change", () => {
    Interface.initializeForm();
});

Interface.el.selection.item_type_blueprint.addEventListener("change", () => {
    Interface.initializeForm();
})

document.addEventListener("data_inventory", e => {
    const inv = <Inventory> (<CustomEvent> e).detail;
    inventory = inv;
});

document.addEventListener("interface_load_start", () => {
    Interface.setVisibility(Interface.el.init.container, false);
    Interface.setVisibility(Interface.el.spinner.container, true);
});

document.addEventListener("interface_load_end", () => {
    Interface.setVisibility(Interface.el.spinner.container, false);
    Interface.setVisibility(Interface.el.selection.container, true);
    Interface.initializeForm();
});
