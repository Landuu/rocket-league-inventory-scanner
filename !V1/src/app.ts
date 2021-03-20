import { RLIS } from "./rlis";
import { Inventory, Item } from "./stucts";


const rlis = new RLIS();
enum Item_T {Item = 0, Blueprint = 1};

//
// Random class
//

class Random {
    public static getInclusiveInt(min: number, max: number) :number {
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
            submit: document.getElementById("filterSubmit"),
            templates: {
                quality_option: document.getElementById("templateQualityOption")
            }
        },
        pricing: {
            container: document.getElementById("containerPricing"),
            table_body: document.getElementById("pricingTableBody"),
            templates: {
                table_row: {
                    root: document.getElementById("templatePricingTableRow"),
                    elementsId: {
                        id: "#ptr_id",
                        name: "#ptr_name",
                        paint:  "#ptr_paint",
                        certificate: "#ptr_certificate",
                        amount: "#ptr_amount",
                        value: "#ptr_value"
                    }
                }
            }
        }
    }

    public static setVisibility(element :HTMLElement ,visibility :boolean) :void {
        let ecl = element.classList;
        if(visibility) {
            if(!ecl.contains("d-none")) return;
            ecl.remove("d-none");
        } else {
            if(ecl.contains("d-none")) return;
            ecl.add("d-none");
        }
    }

    public static initializeForm() :void {
        // Populate quality select with options
        const inventory = rlis.getInventory();
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

    public static showPricing() :void {
        const inventory = rlis.getInventory();
        const selection = this.el.selection.quality_select;
        const table_body = this.el.pricing.table_body;
        const table_row_template = this.el.pricing.templates.table_row;
        const table_row_template_root = table_row_template.root;
        const item_type = this.el.selection.item_type_item.checked ? Item_T.Item : Item_T.Blueprint;
        const option_selected = selection.value;
        const local_inventory = item_type ? inventory.blueprints[option_selected] : inventory.items[option_selected];

        table_body.innerHTML = "";

        for(let i = 0; i < local_inventory.length; i++) {
            const item :Item = local_inventory[i];
            let row_temp = table_row_template_root.content.cloneNode(true);

            let el_id = row_temp.querySelector(table_row_template.elementsId.id);
            let el_name = row_temp.querySelector(table_row_template.elementsId.name);
            let el_paint = row_temp.querySelector(table_row_template.elementsId.paint);
            let el_certificate = row_temp.querySelector(table_row_template.elementsId.certificate);
            let el_amount = row_temp.querySelector(table_row_template.elementsId.amount);
            let el_value = row_temp.querySelector(table_row_template.elementsId.value);

            el_id.innerHTML = i + 1;
            el_name.innerHTML = item.name;
            el_paint.innerHTML = item.paint;
            el_certificate.innerHTML = item.certificate;
            el_amount.innerHTML = item.amount;
            el_value.innerHTML = Random.getInclusiveInt(10, 1000);

            table_body.appendChild(row_temp);
        }

        Interface.setVisibility(this.el.pricing.container, true);
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

Interface.el.selection.submit.addEventListener("click", () => {
    Interface.showPricing();
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
