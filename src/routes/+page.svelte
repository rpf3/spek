<script lang="ts">
	import type { Column } from '$lib/table/types';

	import Table from '$lib/table/Table.svelte';
	import UserCell from './_components/UserCell.svelte';
	import UserHeaderCell from './_components/UserHeaderCell.svelte';

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
</script>

{#await promise then albums}
	<div class="max-w-screen-lg w-1/2 mx-auto pt-10">
		<Table {columns} data={albums} />
	</div>
{/await}
