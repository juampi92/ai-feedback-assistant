<script>
    export let title = "";
    export let subtitle = "";
    export let styles = "";
</script>

<section
    class="row-span-2 p-8 border border-gray-100 rounded-xl bg-gray-50 {styles}"
>
    <div class="h-full flex flex-col space-y-4">
        <h2 class="text-xl font-semibold -mb-2">{@html title}</h2>
        {#if subtitle}
            <h3 class="mb-4 mt-0 text-gray-500">{@html subtitle}</h3>
        {/if}

        <slot />
        <!-- <p class="text-gray-600 text-xl"> <span class="font-serif">"</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repellat perspiciatis excepturi est. Non ipsum iusto aliquam consequatur repellat provident, omnis ut, sapiente voluptates veritatis cum deleniti repudiandae ad doloribus. <span class="font-serif">"</span></p> -->
    </div>
</section>
