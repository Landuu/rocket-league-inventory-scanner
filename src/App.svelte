<script lang="ts">
	import Router from 'svelte-spa-router'

	import Home from './routes/Home.svelte';
	import NotFound from './routes/NotFound.svelte';

	const routes =  {
		'/': Home,

		'*': NotFound
	}
</script>

<Router {routes}/>

<style lang="scss" global>
	// Required
	@import "../node_modules/bootstrap/scss/bootstrap-utilities";


	// Custom variable overrides
	$body-bg: #2e2e2e;
	$body-color: #e7e7e7;
	$theme-colors: (
  		"primary": $cyan-700,
	);

	// Optional
	@import "../node_modules/bootstrap/scss/root";
	@import "../node_modules/bootstrap/scss/reboot";
	@import "../node_modules/bootstrap/scss/type";
	@import "../node_modules/bootstrap/scss/containers";
	@import "../node_modules/bootstrap/scss/grid";
	@import "../node_modules/bootstrap/scss/images";
	@import "../node_modules/bootstrap/scss/buttons";
	@import "../node_modules/bootstrap/scss/forms";

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
