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
</script>

<Table {columns} />
