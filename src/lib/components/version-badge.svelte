<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';

	export let version: string;
	export let isLatest = false;
</script>

<div class="flex items-center gap-2">
	<Badge variant={isLatest ? 'success' : 'secondary'}>v{version}</Badge>
	{#if isLatest}
		<Badge variant="outline">Latest</Badge>
	{/if}
</div>
