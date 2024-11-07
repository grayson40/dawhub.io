<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Progress } from '$lib/components/ui/progress';
	import {
		Download,
		Package,
		AudioLines,
		Music2,
		FileText,
		Settings,
		Play,
		Pause,
		HardDrive,
		FolderTree
	} from 'lucide-svelte';
	import type { Project } from '$lib/types/project';

	export let files: Project['files'];

	let downloadProgress: Record<string, number> = {};
	let isDownloading = false;
	let isPlaying: Record<string, boolean> = {};

	function handleDownload(fileId: string) {
		isDownloading = true;
		downloadProgress[fileId] = 0;
		const interval = setInterval(() => {
			downloadProgress[fileId] += 10;
			downloadProgress = { ...downloadProgress };
			if (downloadProgress[fileId] >= 100) {
				clearInterval(interval);
				isDownloading = false;
			}
		}, 500);
	}

	function togglePlay(fileId: string) {
		isPlaying[fileId] = !isPlaying[fileId];
		isPlaying = { ...isPlaying };
	}
</script>

<div class="space-y-6">
	<!-- Overview Card -->
	<Card class="space-y-4 p-6">
		<div class="flex items-center justify-between">
			<h3 class="text-lg font-semibold">Project Files</h3>
			<Button disabled={isDownloading} on:click={() => handleDownload('all')}>
				<Download class="mr-2 h-4 w-4" />
				Download All
			</Button>
		</div>

		<div class="grid gap-4 md:grid-cols-3">
			<!-- Project File -->
			<div class="flex items-center gap-3 rounded-lg border p-3">
				<Package class="h-5 w-5 text-muted-foreground" />
				<div>
					<p class="font-medium">Main Project</p>
					<p class="text-sm text-muted-foreground">
						{files.mainProject.size}
					</p>
				</div>
			</div>

			<!-- Samples -->
			<div class="flex items-center gap-3 rounded-lg border p-3">
				<FolderTree class="h-5 w-5 text-muted-foreground" />
				<div>
					<p class="font-medium">Samples</p>
					<p class="text-sm text-muted-foreground">
						{files.samples.count} files • {files.samples.totalSize}
					</p>
				</div>
			</div>

			<!-- Stems -->
			<div class="flex items-center gap-3 rounded-lg border p-3">
				<AudioLines class="h-5 w-5 text-muted-foreground" />
				<div>
					<p class="font-medium">Stems</p>
					<p class="text-sm text-muted-foreground">
						{files.stems.count} tracks • {files.stems.size}
					</p>
				</div>
			</div>
		</div>
	</Card>

	<!-- Main Project File -->
	<Card class="p-6">
		<div class="space-y-4">
			<div class="flex items-start justify-between">
				<div class="flex items-center gap-3">
					<FileText class="h-5 w-5 text-muted-foreground" />
					<div>
						<h4 class="font-medium">{files.mainProject.name}</h4>
						<p class="text-sm text-muted-foreground">Main Project File</p>
					</div>
				</div>
				<Button variant="outline" size="sm">
					<Download class="mr-2 h-4 w-4" />
					Download Project
				</Button>
			</div>

			<div class="flex flex-wrap gap-2">
				<Badge variant="secondary">
					<HardDrive class="mr-1 h-3 w-3" />
					{files.mainProject.size}
				</Badge>
				<Badge variant="outline">Project File</Badge>
			</div>
		</div>
	</Card>

	<!-- Samples Section -->
	<Card class="p-6">
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<h4 class="font-medium">Sample Files</h4>
					<Badge variant="outline">{files.samples.count} files</Badge>
				</div>
				<Button variant="outline" size="sm">
					<Download class="mr-2 h-4 w-4" />
					Download All Samples
				</Button>
			</div>

			<div class="grid gap-4">
				{#each Object.entries(files.samples.categories) as [category, data]}
					<div class="rounded-lg border p-4">
						<div class="flex items-start justify-between">
							<div class="flex items-center gap-2">
								<Music2 class="h-4 w-4 text-muted-foreground" />
								<div>
									<h5 class="font-medium">{category}</h5>
									<p class="text-sm text-muted-foreground">
										{data.count} files • {data.size}
									</p>
								</div>
							</div>
							<div class="flex gap-2">
								<Button variant="outline" size="sm">Preview</Button>
								<Button variant="outline" size="sm">
									<Download class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Card>

	<!-- Stems Section -->
	<Card class="p-6">
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<h4 class="font-medium">Stems</h4>
					<Badge variant="outline">{files.stems.count} tracks</Badge>
				</div>
				<Button variant="outline" size="sm">
					<Download class="mr-2 h-4 w-4" />
					Download All Stems
				</Button>
			</div>

			{#each files.stems.files as file}
				<div class="rounded-lg border p-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<Button
								variant="ghost"
								size="sm"
								class="h-8 w-8 p-0"
								on:click={() => togglePlay(file.name)}
							>
								{#if isPlaying[file.name]}
									<Pause class="h-4 w-4" />
								{:else}
									<Play class="h-4 w-4" />
								{/if}
							</Button>
							<div>
								<h5 class="font-medium">{file.name}</h5>
								<p class="text-sm text-muted-foreground">
									{file.size}
								</p>
							</div>
						</div>
						<Button variant="outline" size="sm">
							<Download class="h-4 w-4" />
						</Button>
					</div>
					{#if downloadProgress[file.name]}
						<div class="mt-4">
							<Progress value={downloadProgress[file.name]} />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</Card>
</div>
