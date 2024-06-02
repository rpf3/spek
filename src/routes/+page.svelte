<script lang="ts">
	import type { Column } from '$lib/table/types';
	import type { PageData } from './$types';
	import type { SelectOption } from '$lib/combobox/types';
	import type { ComboboxSearchEvent } from '$lib/combobox/types';
	import type { ComboboxChangeEvent } from '$lib/combobox/types';
	import type { ChipListChangeEvent } from '$lib/chiplist/types';

	import { COLOR_MODE, FILL_MODE } from '$lib/types';

	import Table from '$lib/table/Table.svelte';
	import UserCell from './_components/UserCell.svelte';
	import UserHeaderCell from './_components/UserHeaderCell.svelte';
	import Button from '$lib/button/Button.svelte';
	import Dialog from '$lib/dialog/Dialog.svelte';
	import Chip from '$lib/chip/Chip.svelte';
	import Menu from '$lib/menu/Menu.svelte';
	import Paginator from '$lib/paginator/Paginator.svelte';
	import Combobox from '$lib/combobox/Combobox.svelte';
	import ChipList from '$lib/chiplist/ChipList.svelte';

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

	const comboboxOptions: SelectOption[] = [
		{
			value: 'bacon',
			text: 'Bacon'
		},
		{
			value: 'donut',
			text: 'Donut'
		},
		{
			value: 'pancake',
			text: 'Pancake'
		},
		{
			value: 'egg',
			text: 'Egg'
		},
		{
			value: 'sausage',
			text: 'Sausage'
		},
		{
			value: 'chocolate-milk',
			text: 'Chocolate Milk'
		},
		{
			value: 'bagel',
			text: 'Bagel'
		}
	];

	let comboboxValue: SelectOption | undefined = undefined;

	let filteredComboboxOptions = comboboxOptions;

	let selectedComboboxOptions: SelectOption[] = [];

	function filterComboboxOptions(searchText: string) {
		const selectedValues = selectedComboboxOptions.map((x) => {
			return x.value;
		});

		const filteredOptions = comboboxOptions
			.filter((x) => {
				return !selectedValues.includes(x.value);
			})
			.filter((x) => {
				return x.text.toLocaleLowerCase().includes(searchText);
			});

		return filteredOptions;
	}

	function handleComboboxSearch(e: ComboboxSearchEvent) {
		const searchText = e.detail.text.toLocaleLowerCase();

		filteredComboboxOptions = filterComboboxOptions(searchText);
	}

	function handleComboboxChange(e: ComboboxChangeEvent) {
		selectedComboboxOptions = [...selectedComboboxOptions, e.detail.value];

		filteredComboboxOptions = filterComboboxOptions('');

		comboboxValue = undefined;
	}

	function handleChipListChange(e: ChipListChangeEvent) {
		selectedComboboxOptions = [...e.detail.value];
	}
</script>

<div class="flex flex-col gap-8">
	<section>
		<h1 class="mb-4 text-2xl">Data Table</h1>

		<Table {columns} data={data.data} />
	</section>

	<section>
		<h1 class="mb-4 text-2xl">Button</h1>

		<h2 class="my-4 text-xl">Enabled</h2>

		<div class="flex flex-row gap-4">
			<div class="w-36">
				<Button fill={FILL_MODE.FILL} color={COLOR_MODE.PRIMARY}>spek</Button>
			</div>

			<div class="w-36">
				<Button fill={FILL_MODE.RING} color={COLOR_MODE.PRIMARY}>spek</Button>
			</div>

			<div class="w-36">
				<Button fill={FILL_MODE.FILL} color={COLOR_MODE.ACCENT}>spek</Button>
			</div>

			<div class="w-36">
				<Button fill={FILL_MODE.RING} color={COLOR_MODE.ACCENT}>spek</Button>
			</div>
		</div>

		<h2 class="my-4 text-xl">Disabled</h2>

		<div class="flex flex-row gap-4">
			<div class="w-36">
				<Button fill={FILL_MODE.FILL} color={COLOR_MODE.PRIMARY} disabled={true}>spek</Button>
			</div>

			<div class="w-36">
				<Button fill={FILL_MODE.RING} color={COLOR_MODE.PRIMARY} disabled={true}>spek</Button>
			</div>

			<div class="w-36">
				<Button fill={FILL_MODE.FILL} color={COLOR_MODE.ACCENT} disabled={true}>spek</Button>
			</div>

			<div class="w-36">
				<Button fill={FILL_MODE.RING} color={COLOR_MODE.ACCENT} disabled={true}>spek</Button>
			</div>
		</div>
	</section>

	<section>
		<h1 class="mb-4 text-2xl">Paginator</h1>

		<Paginator
			count={20}
			current={paginatorCurrentPage}
			on:goto={(e) => (paginatorCurrentPage = e.detail)}
			on:next={() => paginatorCurrentPage++}
			on:previous={() => paginatorCurrentPage--}
		/>
	</section>

	<section>
		<h1 class="mb-4 text-2xl">Menu</h1>

		<div class="flex">
			<Menu>
				<Button slot="toggle" fill={FILL_MODE.RING} color={COLOR_MODE.ACCENT}>open</Button>

				<div slot="content" class="w-32">
					Bacon ipsum dolor amet lorem bresaola sunt culpa in tri-tip.
				</div>
			</Menu>
		</div>
	</section>

	<section>
		<h1 class="mb-4 text-2xl">Combobox</h1>

		<div class="flex w-1/4 flex-col gap-2">
			<Combobox
				bind:value={comboboxValue}
				options={filteredComboboxOptions}
				on:search={handleComboboxSearch}
				on:change={handleComboboxChange}
			/>

			<ChipList value={selectedComboboxOptions} on:change={handleChipListChange} />
		</div>
	</section>

	<section>
		<h1 class="mb-4 text-2xl">Dialog</h1>

		<div class="w-36">
			<Button fill={FILL_MODE.FILL} color={COLOR_MODE.PRIMARY} on:click={() => (visible = true)}
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
							fill={FILL_MODE.FILL}
							color={COLOR_MODE.ACCENT}
							on:click={() => (visible = false)}>ok</Button
						>
					</div>
				</div>
			</Dialog>
		{/if}
	</section>

	<section>
		<h1 class="mb-4 text-2xl">Chip</h1>

		<div class="flex flex-row gap-4">
			<Chip fill={FILL_MODE.FILL} color={COLOR_MODE.PRIMARY}>spek</Chip>

			<Chip fill={FILL_MODE.RING} color={COLOR_MODE.PRIMARY}>spek</Chip>

			<Chip fill={FILL_MODE.FILL} color={COLOR_MODE.ACCENT}>spek</Chip>

			<Chip fill={FILL_MODE.RING} color={COLOR_MODE.ACCENT}>spek</Chip>
		</div>
	</section>
</div>
