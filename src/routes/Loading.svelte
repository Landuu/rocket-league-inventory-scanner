<script lang="ts">
    import { U } from '../libs/utils';
    setTimeout(() => { U.redirect("/items") }, U.getRandomInt(1500, 4000));
</script>

<div class="container mt-5">
    <div class="row">
        <div class="col mt-5 text-center">
            <h3>Parsing data...</h3>
        </div>
    </div>
    <div class="row">
        <div class="col mt-3 text-center">
            <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</div>
