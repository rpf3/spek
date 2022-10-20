<script lang="ts">
	import type { Column } from '$lib/table/types';
	import type { PageData } from './$types';

	import { ColorMode, FillMode } from '$lib/types';

	import Table from '$lib/table/Table.svelte';
	import UserCell from './_components/UserCell.svelte';
	import UserHeaderCell from './_components/UserHeaderCell.svelte';
	import Button from '$lib/button/Button.svelte';
	import Dialog from '$lib/dialog/Dialog.svelte';
	import Chip from '$lib/chip/Chip.svelte';
	import Menu from '$lib/menu/Menu.svelte';
	import Paginator from '$lib/paginator/Paginator.svelte';

	export let data: PageData;

	const columns: Column[] = [
		{
			key: 'name',
			header: 'Name',
			size: 2,
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
			size: 2
		},
		{
			key: 'birthdate',
			header: 'Birth Date',
			filterable: true,
			size: 1
		},
		{
			key: 'bio',
			header: 'Bio',
			size: 5
		}
	];

	let visible = false;

	let paginatorCurrentPage = 1;
</script>

<div class="flex flex-col gap-8">
	<section>
		<h1 class="text-2xl mb-4">Data Table</h1>

		<Table {columns} data={data.data} />
	</section>

	<section>
		<h1 class="text-2xl mb-4">Button</h1>

		<div class="flex flex-row gap-4">
			<div class="w-36">
				<Button fill={FillMode.Fill} color={ColorMode.Primary}>spek</Button>
			</div>

			<div class="w-36">
				<Button fill={FillMode.Ring} color={ColorMode.Primary}>spek</Button>
			</div>

			<div class="w-36">
				<Button fill={FillMode.Fill} color={ColorMode.Accent}>spek</Button>
			</div>

			<div class="w-36">
				<Button fill={FillMode.Ring} color={ColorMode.Accent}>spek</Button>
			</div>
		</div>
	</section>

	<section>
		<h1 class="text-2xl mb-4">Paginator</h1>

		<Paginator
			count={20}
			current={paginatorCurrentPage}
			on:goto={(e) => (paginatorCurrentPage = e.detail)}
			on:next={() => paginatorCurrentPage++}
			on:previous={() => paginatorCurrentPage--}
		/>
	</section>

	<section>
		<h1 class="text-2xl mb-4">Dialog</h1>

		<div class="w-36">
			<Button fill={FillMode.Fill} color={ColorMode.Primary} on:click={() => (visible = true)}
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
						<Button fill={FillMode.Fill} color={ColorMode.Accent} on:click={() => (visible = false)}
							>ok</Button
						>
					</div>
				</div>
			</Dialog>
		{/if}
	</section>

	<section>
		<h1 class="text-2xl mb-4">Chip</h1>

		<div class="flex flex-row gap-4">
			<Chip fill={FillMode.Fill} color={ColorMode.Primary}>spek</Chip>

			<Chip fill={FillMode.Ring} color={ColorMode.Primary}>spek</Chip>

			<Chip fill={FillMode.Fill} color={ColorMode.Accent}>spek</Chip>

			<Chip fill={FillMode.Ring} color={ColorMode.Accent}>spek</Chip>
		</div>
	</section>

	<section>
		<h1 class="text-2xl mb-4">Menu</h1>

		<div class="flex">
			<Menu>
				<Button slot="toggle" fill={FillMode.Ring} color={ColorMode.Accent}>open</Button>

				<div slot="content" class="w-32">
					Bacon ipsum dolor amet lorem bresaola sunt culpa in tri-tip.
				</div>
			</Menu>
		</div>
	</section>
</div>
