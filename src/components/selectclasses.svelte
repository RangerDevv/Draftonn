<script lang="ts">
    export let user: string
    export let username: string

    let classes: {id: string, name: string}[] = []
</script>
<div class="flex justify-center h-56 sm:pt-10 2xl:scale-125 pt-12">
    <p class="text-3xl text-center h-44 font-bold pt-16">Select your classes</p>
    {#each classes as c}
        <label class="cursor-pointer label">
            <input value={c.id} type="checkbox" bind:group={classes} class="checkbox checkbox-info checkbox-lg" />
            <span class="label-text ml-2 text-lg text-white">{c.name}</span>
        </label>
    {/each}
</div>
