<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Clock, GitBranch } from 'lucide-svelte';
	import VersionItem from './version-item.svelte';
	import type { ProjectHistory } from '$lib/types/project';

	export let history: ProjectHistory;

	let showAllVersions = false;
	$: displayedVersions = showAllVersions ? history.versions : history.versions.slice(0, 3);
</script>

<Card class="p-6">
	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-lg font-semibold">Version History</h3>
				<p class="text-sm text-muted-foreground">
					Current version: v{history.currentVersion}
				</p>
			</div>
			<Button variant="outline" size="sm">
				<GitBranch class="mr-2 h-4 w-4" />
				Create Fork
			</Button>
		</div>

		<!-- Timeline -->
		<div class="relative space-y-6">
			<div class="absolute left-[27px] top-0 h-full w-px bg-border" />

			{#each displayedVersions as version (version.version)}
				<VersionItem {version} />
			{/each}
		</div>

		{#if history.versions.length > 3}
			<Button
				variant="outline"
				class="w-full"
				on:click={() => (showAllVersions = !showAllVersions)}
			>
				<Clock class="mr-2 h-4 w-4" />
				{showAllVersions ? 'Show Less' : `Show All Versions (${history.versions.length})`}
			</Button>
		{/if}
	</div>
</Card>
