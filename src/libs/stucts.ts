export interface Inventory {
    items: ItemContainer;
    blueprints: BlueprintContainer;
}

export interface Item {
    name :string;
    amount :number;
    quality :string;
    certificate :string;
    paint :string;
    product_id :number;
}

export interface Blueprint extends Item {
    bp_cost :number;
    bp_item_id :number;
}

export class ItemContainer {
    public common :Item[] = [];
    public uncommon :Item[] = [];
    public rare :Item[] = [];
    public veryrare :Item[] = [];
    public import :Item[] = [];
    public exotic :Item[] = [];
    public blackmarket :Item[] = [];
    public limited :Item[] = [];
}

export class BlueprintContainer {
    public common :Blueprint[] = [];
    public uncommon :Blueprint[] = [];
    public rare :Blueprint[] = [];
    public veryrare :Blueprint[] = [];
    public import :Blueprint[] = [];
    public exotic :Blueprint[] = [];
    public blackmarket :Blueprint[] = [];
    public limited :Blueprint[] = [];
}

export interface EventData {
    detail :object;
}