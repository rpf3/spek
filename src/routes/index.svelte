<script lang="ts">
	import type { Column } from '$lib/types';

	import Table from '$lib/components/Table.svelte';
	import UserCell from './UserCell.svelte';

	const columns: Column[] = [
		{
			key: 'id',
			header: 'ID',
			filterable: true,
			sortable: true
		},
		{
			key: 'userId',
			header: 'User',
			filterable: true,
			slots: {
				cell: UserCell
			}
		},
		{
			key: 'title',
			header: 'Title 1',
			filterable: true,
			size: 3
		},
		{
			key: 'title',
			header: 'Title 2'
		},
		{
			key: 'title',
			header: 'Title 3',
			size: 2
		}
	];

	async function fetchAlbums() {
		const response = await fetch('https://jsonplaceholder.typicode.com/albums');
		const albums = await response.json();

		return albums;
	}

	let promise = fetchAlbums();
</script>

{#await promise then albums}
	<div class="max-w-screen-lg w-1/2 mx-auto my-10">
		<Table {columns} data={albums} />
	</div>
{/await}
