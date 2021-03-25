<script lang="ts">
	import { getContext } from "svelte";
	import type { RLIS } from "../libs/rlis";
	import type { Inventory, Item } from "../libs/stucts";

	import TableRow from "./Items/TableRow.svelte";

	const ids = {
		i_listgroup: "list-items",
		bp_listgroup: "list-blueprints",
		i_select: "i_select",
		bp_select: "bp_select",
		i_confirm: "i_confirm",
		bp_confirm: "bp_confirm",
	};

	const rlis: RLIS = getContext("rlis");
	const inventory: Inventory = rlis.getInventory();
	const inv_keys = Object.keys(inventory.items);
	const bp_keys = Object.keys(inventory.blueprints);
	enum ItemType {
		Blueprint,
		Item,
	}

	let ui = {
		item_type: "",
		item_quality: "None",
	};

	let show_items: Item[] = [];

	function loadTableContent(type: ItemType): void {
		const select_id = type ? ids.i_select : ids.bp_select;
		const selected = (<HTMLInputElement>document.getElementById(select_id)).value;
		ui.item_quality = selected;
		ui.item_type = type ? "items" : "blueprints";

		show_items = type ? inventory.items[selected] : inventory.blueprints[selected];
	}
</script>

<div class="container">
	<div class="row mt-2">
		<div class="col text-center">
			<a href="/">Back to home</a>
		</div>
	</div>
	<div class="row mt-4">
		<div class="col-4">
			<div class="list-group" id="list-tab" role="tablist">
				<a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href={"#" + ids.i_listgroup} role="tab">Items </a>
				<a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href={"#" + ids.bp_listgroup} role="tab">Blueprints </a>
			</div>
		</div>
		<div class="col-8">
			<div class="tab-content" id="nav-tabContent">
				<div id={ids.i_listgroup} class="tab-pane fade show active" role="tabpanel">
					<!-- Items form -->
					<select id={ids.i_select} class="form-select">
						{#each inv_keys as key}
							<option value={key}>
								{key.toUpperCase()} ({inventory.items[key].length})
							</option>
						{/each}
					</select>
					<div class="mt-2">
						<button
							id={ids.i_confirm}
							on:click={() => {
								loadTableContent(ItemType.Item);
							}}
							type="button"
							class="btn btn-primary">Search items</button
						>
					</div>
				</div>
				<div id={ids.bp_listgroup} class="tab-pane fade" role="tabpanel">
					<!-- Blueprints form -->
					<select id={ids.bp_select} class="form-select">
						{#each bp_keys as key}
							<option value={key}>{key.toUpperCase()} ({inventory.blueprints[key].length})</option>
						{/each}
					</select>
					<div class="mt-2">
						<button
							id={ids.bp_confirm}
							on:click={() => {
								loadTableContent(ItemType.Blueprint);
							}}
							type="button"
							class="btn btn-primary">Search blueprints</button
						>
					</div>
				</div>
			</div>
		</div>
		<hr class="my-4" />
	</div>
	<div class="row">
		<div class="col">
			<!-- <h4>Currently showing: {ui.item_quality} {ui.item_type}</h4> -->
			<span class="table-header">Currently showing: </span>
			<span class="table-desc"> {ui.item_quality} {ui.item_type}</span>
		</div>
	</div>
	<div class="row mt-3">
		<div class="col">
			<table class="table table-striped table-hover table-sm">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Item name</th>
						<th scope="col">Owned</th>
						<th scope="col">Paint</th>
						<th scope="col">Certificate</th>
						<th scope="col">Value</th>
					</tr>
				</thead>
				<tbody>
					<TableRow items={show_items} />
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.table-header {
		font-size: 1.5rem;
		font-weight: lighter;
	}

	.table-desc {
		font-size: 1.4rem;
	}
</style>
