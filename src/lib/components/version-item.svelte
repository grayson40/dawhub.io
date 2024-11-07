<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import VersionBadge from './version-badge.svelte';
	import ChangeItem from './change-item.svelte';
	import type { Version } from '$lib/types/project';

	export let version: Version;
</script>

<div class="space-y-4">
	<div class="flex items-start justify-between">
		<div class="flex items-center gap-4">
			<Avatar class="h-10 w-10">
				<AvatarImage src={version.author.avatar} alt={version.author.name} />
				<AvatarFallback>{version.author.name[0]}</AvatarFallback>
			</Avatar>
			<div>
				<VersionBadge version={version.version} isLatest={version.isLatest} />
				<div class="mt-1 text-sm text-muted-foreground">
					Updated by {version.author.name} • {version.date}
				</div>
			</div>
		</div>
	</div>

	<div class="ml-14 space-y-2">
		{#each version.changes as change}
			<ChangeItem {change} />
		{/each}
	</div>
</div>
