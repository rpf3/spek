<script lang="ts">
	export let value: string;
	export let name = '';
</script>

<input
	{name}
	type="date"
	bind:value
	on:change
	class="w-full rounded border bg-spek-facade-50 p-1 text-sm outline-none outline-offset-0 focus:outline-spek-primary-400 dark:border-transparent dark:bg-spek-facade-500"
/>
