<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import Close from '$lib/icon/Close.svelte';

	const dispatch = createEventDispatcher();

	function dispatchCloseEvent() {
		dispatch('close');
	}
</script>

<div class="relative z-10" transition:fade={{ duration: 200 }}>
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
	<div class="fixed inset-0 z-10">
		<div class="flex min-h-full items-center justify-center">
			<div
				class="relative w-full max-w-lg transform rounded-lg bg-spek-facade-50 shadow-xl transition-all dark:bg-spek-facade-700"
			>
				<div class="flex flex-col bg-spek-facade-50 dark:bg-spek-facade-700">
					<div class="flex flex-row border-b p-3">
						<div class="grow text-center font-medium">
							<slot name="header" />
						</div>

						<button type="button" on:click={dispatchCloseEvent}>
							<Close />
						</button>
					</div>

					<div class="p-3">
						<slot name="body" />
					</div>

					{#if $$slots.footer}
						<div class="p-3 text-sm">
							<slot name="footer" />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
