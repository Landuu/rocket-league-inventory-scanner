<script lang="ts">
    import { U } from '../../libs/utils';
    import type { Item } from '../../libs/stucts';

    export let items :Item[];
</script>

{#each items as item, i}
    <tr>
        <th scope="row">{i}</th>
        <td>{item.name}</td>
        <td>{item.amount}</td>
        <td>{item.paint}</td>
        <td>{item.certificate}</td>
        <td>{U.getRandomInt(100, 1000)}</td>
    </tr>
{/each}

{#if items.length == 0}
    <tr>
        <th scope="row">-</th>
        <td>You don't have any items of this type.</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>

{/if}