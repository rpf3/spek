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
		class="absolute top-full right-0 mt-1 bg-spek-facade-50 dark:bg-spek-facade-600 border dark:border-transparent rounded shadow-lg shadow-spek-facade-400 dark:shadow-none p-1"
		class:hidden={visible === false}
		class:block={visible}
	>
		<slot name="content" />
	</div>
</div>
