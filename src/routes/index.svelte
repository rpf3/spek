<script lang="ts">
	import type { Column } from '$lib/types';

	import Table from '$lib/components/Table.svelte';
	import TableFilter from '$lib/components/TableFilter.svelte';

	const columns: Column[] = [
		{
			key: 'id',
			header: 'ID',
			filterable: true
		},
		{
			key: 'userId',
			header: 'User ID',
			filterable: true
		},
		{
			key: 'title',
			header: 'Title',
			filterable: true
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
		<TableFilter {columns} />
		<Table {columns} data={albums} />
	</div>
{/await}
