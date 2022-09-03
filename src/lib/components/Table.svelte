<script lang="ts">
	import type { Column } from '$lib/types';
	import type { Config } from '$lib/types';

	import { dataset } from '$lib/stores/dataset';
	import { repository } from '$lib/stores/repository';
	import { page } from '$lib/stores/page';

	import DataCell from './DataCell.svelte';
	import HeaderCell from './HeaderCell.svelte';
	import Row from './Row.svelte';

	export let columns: Column[];
	export let data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	export let config: Config;

	const defaultConfig: Config = {
		pagination: {
			enabled: true,
			size: 10
		}
	};

	const mergedConfig = Object.assign(defaultConfig, config);

	dataset.init(data);
	page.init(mergedConfig);
</script>

<div class="flex flex-col gap-1 divide-y divid-solid p-2">
	<Row>
		<svelte:fragment>
			{#each columns as column}
				<HeaderCell {column} />
			{/each}
		</svelte:fragment>
	</Row>

	{#each $repository.rows as row}
		<Row>
			<svelte:fragment>
				{#each columns as column}
					<DataCell {row} {column} />
				{/each}
			</svelte:fragment>
		</Row>
	{/each}
</div>
