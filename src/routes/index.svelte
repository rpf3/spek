<script lang="ts">
	import type { Column } from '$lib/types';

	import { createDataRows } from '$lib/utils';

	import Table from '$lib/components/Table.svelte';

	const columns: Column[] = [
		{
			key: 'name',
			header: 'Name'
		},
		{
			key: 'email',
			header: 'Email'
		},
		{
			key: 'age',
			header: 'Age'
		}
	];

	const rawData = [
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

	const data = createDataRows(rawData);
</script>

<div class="max-w-screen-lg w-1/4 mx-auto my-10">
	<Table {columns} {data} />
</div>
