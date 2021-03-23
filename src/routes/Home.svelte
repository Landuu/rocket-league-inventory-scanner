<script lang="ts">
	import { getContext } from 'svelte';
	import { Validator, U } from '../libs/utils';
	import type { RLIS } from '../libs/rlis';
	const rlis :RLIS = getContext('rlis');

    const ids = {
        file: "formFile",
        submit: "formSubmit"
    }

    function processFile() :void {
        let file = (<HTMLInputElement> document.getElementById(ids.file)).files[0];
		if(!Validator.isFileAJson(file)) {
			alert('Uploaded file is not a .json!');
			return;
		}

		rlis.parseRawFile(file);
		U.redirect("/loading");
    }
</script>

<div class="container">
	<div class="row mt-5">
		<div class="col text-center">
			<h2>Rocket League Inventory Studio</h2>
		</div>
	</div>
	<div class="row mt-5">
		<div class="col-6 offset-3">
			<div class="mb-3 text-left">
				<label for={ids.file} class="form-label">Choose file containing your inventory (.json)</label>
				<input class="form-control" type="file" id={ids.file} accept="json">
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-6 offset-3">
			<div class="d-grid gap-2">
				<button id={ids.submit} on:click={processFile} class="btn btn-primary" type="button">Check item pricing</button>
			</div>
		</div>
	</div>
</div>