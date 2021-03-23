<script lang="ts">
    const src = "https://cdn.frankerfacez.com/emoticon/471298/4";
</script>

<div class="container mt-5">
    <div class="row">
        <div class="col-12 mt-5 flex-column">
            <span class="header">404</span>
            <span class="sub">Page not found</span>
        </div>
        <div class="col-12 mt-4 text-center">
            <img src={src} alt="sadge">
        </div>
        <div class="col-12 mt-3 text-center">
            <a href="/" class="link">Back to home</a>
        </div>
    </div>
</div>

<style>
    .flex-column {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .header {
        font-weight: lighter;
        font-size: 5rem;
    }

    .sub {
        margin-top: -2rem;
        font-size: 3rem;
    }

    .link {
        color: white;
        font-size: 2rem;
        text-decoration: none;
    }
</style>
