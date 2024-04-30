<script lang="ts">
	export let visible = false;

	let menu: HTMLElement;

	function handleClick(event: Event) {
		if (!visible) {
			return;
		}

		const target = event.target as HTMLElement;

		if (!menu.contains(target)) {
			visible = false;
		}
	}

	function handleToggle() {
		visible = !visible;
	}
</script>

<svelte:window on:click={handleClick} />

<div class="relative" bind:this={menu}>
	<div class="flex" on:click={handleToggle}>
		<slot name="toggle" />
	</div>

	<div
		class="absolute right-0 top-full z-10 mt-1 rounded border bg-spek-facade-50 p-1 shadow-lg shadow-spek-facade-400 dark:border-transparent dark:bg-spek-facade-600 dark:shadow-none"
		class:hidden={visible === false}
		class:block={visible}
	>
		<slot name="content" />
	</div>
</div>
