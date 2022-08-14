<script lang="ts">
	import type { Column } from '$lib/types';

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
		},
		{
			key: 'ring',
			header: 'Ring Bearer'
		}
	];

	const data = [
		{
			name: 'Frodo',
			email: 'frodo@baggins.com',
			age: 50,
			ring: true
		},
		{
			name: 'Samwise',
			email: 'sam@wise.io',
			age: 38,
			ring: true
		},
		{
			name: 'Merry',
			email: 'merry@shire.net',
			age: 36,
			ring: false
		},
		{
			name: 'Pippin',
			email: 'pip@shire.net',
			age: 27,
			ring: false
		}
	];
</script>

<div class="max-w-screen-lg w-1/4 mx-auto my-10">
	<Table {columns} {data} />
</div>
