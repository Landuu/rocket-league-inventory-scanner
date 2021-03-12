import { Validator } from "./utils";
import { Blueprint, BlueprintContainer, EventData, Inventory, Item, ItemContainer } from "./stucts";


export class RLIS {
    private inventory :Inventory = {
        items: new ItemContainer,
        blueprints: new BlueprintContainer
    }

    //
    // Public
    //
    public parseRawFile(file :Blob) :void {
        if(typeof file == "undefined") {
            alert("File read errror");
            return;
        }

        if(!Validator.isFileAJson(file)) {
            alert("File is not a JSON");
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const content :any = event.target.result;
            const json = JSON.parse(content);
            this.parseInventoryFromJson(json.inventory);
        }
        fileReader.readAsText(file);
    }

    //
    // Private
    //
    private parseInventoryFromJson(inventory :any[]) :void {
        EventManager.emitEvent(EventManager.types.interface_load_start);

        for(let i = 0; i < inventory.length; i++) {
            const item = inventory[i];
            if(item.tradeable == "false") continue;

            if(item.blueprint_cost == 0)
                this.populateItem(item);
            else
                this.populateBlueprint(item);
        }

        EventManager.emitEventWithData(EventManager.types.data_inventory, {detail: this.inventory});
        setTimeout(() => {
            EventManager.emitEvent(EventManager.types.interface_load_end);
        }, 20);
    }

    private populateItem(item :any) :void {
        const qstring = item.quality.toLowerCase().replace(/\s+/g, '');
        const it :Item = {
            name: item.name,
            amount: item.amount,
            quality: qstring,
            paint: item.paint,
            certificate: item.rank_label,
            product_id: item.product_id
        }
        this.inventory.items[it.quality].push(it);
    }

    private populateBlueprint(item: any) :void {
        const qstring = item.quality.toLowerCase().replace(/\s+/g, '');
        const bp :Blueprint = {
            name: item.blueprint_item,
            amount: item.amount,
            quality: qstring,
            paint: item.paint,
            certificate: item.rank_label,
            product_id: item.product_id,
            bp_item_id: item.blueprint_item_id,
            bp_cost: item.blueprint_cost
        }
        this.inventory.blueprints[bp.quality].push(bp);
    }
}


class EventManager {
    public static types = {
        interface_load_start: "interface_load_start",
        interface_load_end: "interface_load_end",
        data_inventory: "data_inventory"
    }

    public static emitEvent(name :string) :void {
        document.dispatchEvent(new Event(name));
    }

    public static emitEventWithData(name :string, data :EventData) {
        document.dispatchEvent(new CustomEvent(name, <any> data))
    }
}