<script lang="ts">
	import { page } from '$lib/stores/page';

	import Left from './icons/Left.svelte';
	import Right from './icons/Right.svelte';
</script>

<div class="flex justify-center gap-1">
	<button class="border rounded p-1" on:click={page.previous}>
		<Left />
	</button>

	<button class="border rounded p-1" on:click={page.next}>
		<Right />
	</button>
</div>
