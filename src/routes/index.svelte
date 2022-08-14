<script lang="ts">
	import type { Column } from '$lib/types';

	import Table from '$lib/components/Table.svelte';

	const columns: Column[] = [
		{
			id: 'name',
			name: 'Name'
		},
		{
			id: 'email',
			name: 'Email'
		},
		{
			id: 'age',
			name: 'Age'
		}
	];

	const data = [
		{
			name: 'Frodo',
			email: 'frodo@baggins.com',
			age: 50
		},
		{
			name: 'Samwise',
			email: 'sam@wise.io',
			age: 38
		},
		{
			name: 'Merry',
			email: 'merry@shire.net',
			age: 36
		},
		{
			name: 'Pippin',
			email: 'pip@shire.net',
			age: 27
		}
	];
</script>

<div class="max-w-screen-lg w-96 mx-auto my-10">
	<Table {columns} {data} />
</div>
