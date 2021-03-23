<script lang="ts">
    import { getContext } from 'svelte';
    import type { RLIS } from '../libs/rlis';
    import type { Inventory } from '../libs/stucts';

    const rlis :RLIS = getContext('rlis');
    const inventory :Inventory = rlis.getInventory();
</script>