<script lang="ts">
	import type { Column } from '$lib/table/types';
	import { ButtonMode, ButtonType } from '$lib/button/types';

	import Table from '$lib/table/Table.svelte';
	import UserCell from './_components/UserCell.svelte';
	import UserHeaderCell from './_components/UserHeaderCell.svelte';
	import Button from '$lib/button/Button.svelte';
	import Dialog from '$lib/dialog/Dialog.svelte';
	import Chip from '$lib/chip/Chip.svelte';
	import Menu from '$lib/menu/Menu.svelte';

	const columns: Column[] = [
		{
			key: 'email',
			header: 'User',
			slots: {
				cell: UserCell,
				header: UserHeaderCell
			}
		},
		{
			key: 'email',
			header: 'Email',
			filterable: true,
			sortable: true,
			size: 3
		},
		{
			key: 'name',
			header: 'Name',
			filterable: true,
			size: 3
		},
		{
			key: 'body',
			header: 'Post',
			size: 5
		}
	];

	async function fetchAlbums() {
		const response = await fetch('https://jsonplaceholder.typicode.com/comments');
		const albums = await response.json();

		return albums;
	}

	let promise = fetchAlbums();

	let visible = false;
</script>

<div class="flex flex-col gap-8">
	<section>
		<h1 class="text-2xl mb-4">Data Table</h1>

		{#await promise then albums}
			<Table {columns} data={albums} />
		{/await}
	</section>

	<section>
		<h1 class="text-2xl mb-4">Button</h1>

		<div class="flex flex-row gap-4">
			<div class="w-36">
				<Button mode={ButtonMode.Fill} type={ButtonType.Primary}>spek</Button>
			</div>

			<div class="w-36">
				<Button mode={ButtonMode.Ring} type={ButtonType.Primary}>spek</Button>
			</div>

			<div class="w-36">
				<Button mode={ButtonMode.Fill} type={ButtonType.Accent}>spek</Button>
			</div>

			<div class="w-36">
				<Button mode={ButtonMode.Ring} type={ButtonType.Accent}>spek</Button>
			</div>
		</div>
	</section>

	<section>
		<h1 class="text-2xl mb-4">Dialog</h1>

		<div class="w-36">
			<Button mode={ButtonMode.Fill} type={ButtonType.Primary} on:click={() => (visible = true)}
				>open</Button
			>
		</div>

		{#if visible}
			<Dialog on:close={() => (visible = false)}>
				<p slot="header">spek</p>

				<div slot="body">
					<p>
						Bacon ipsum dolor amet occaecat non boudin proident meatball duis laboris rump. Pork
						occaecat ad flank consectetur aute velit tail. Ball tip esse short loin do. Brisket
						hamburger t-bone shankle buffalo in.
					</p>
				</div>

				<div slot="footer" class="flex justify-end">
					<div class="w-24">
						<Button
							mode={ButtonMode.Fill}
							type={ButtonType.Accent}
							on:click={() => (visible = false)}>ok</Button
						>
					</div>
				</div>
			</Dialog>
		{/if}
	</section>

	<section>
		<h1 class="text-2xl mb-4">Chip</h1>

		<div class="flex">
			<Chip>spek</Chip>
		</div>
	</section>

	<section>
		<h1 class="text-2xl mb-4">Menu</h1>

		<div class="flex">
			<Menu>
				<Button slot="toggle" mode={ButtonMode.Ring} type={ButtonType.Accent}>open</Button>

				<div slot="content" class="w-32">
					Bacon ipsum dolor amet lorem bresaola sunt culpa in tri-tip.
				</div>
			</Menu>
		</div>
	</section>
</div>
