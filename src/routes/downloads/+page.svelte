<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import * as Progress from '$lib/components/ui/progress';
	import {
		Search,
		Clock,
		Music2,
		Download,
		MoreHorizontal,
		Radio,
		Trash2,
		PauseCircle,
		PlayCircle,
		CheckCircle2,
		AlertCircle,
		HardDrive,
		RefreshCcw
	} from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Waveform from '$lib/components/waveform.svelte';

	// Sample downloaded projects
	const downloads = [
		{
			id: 1,
			title: 'Deep House Template',
			description: 'Professional house music project template with mixing chain',
			author: 'ProducerPro',
			downloadedAt: '2 hours ago',
			size: '1.2 GB',
			genre: 'House',
			bpm: 125,
			status: 'completed', // completed, downloading, paused, error
			progress: 100,
			authorAvatar: '/api/placeholder/40/40',
			audioUrl: '/audio/audio.mp3',
			daw: 'Ableton Live',
			version: '11.2',
			location: 'Downloads/DAW Hub/Deep House Template'
		},
		{
			id: 2,
			title: 'Techno Project',
			description: 'Dark techno project with modular synths',
			author: 'TechnoMaster',
			downloadedAt: 'Just now',
			size: '856 MB',
			genre: 'Techno',
			bpm: 130,
			status: 'downloading',
			progress: 45,
			authorAvatar: '/api/placeholder/40/40',
			audioUrl: '/audio/audio.mp3',
			daw: 'FL Studio',
			version: '21.0',
			location: 'Downloads/DAW Hub/Techno Project'
		}
		// Add more downloads...
	];

	let playingStates: Record<string, boolean> = {};
	let selectedFilter = 'all';
	let searchQuery = '';

	function handlePlay(projectId: number) {
		Object.keys(playingStates).forEach((id) => {
			if (id !== projectId.toString()) playingStates[id] = false;
		});
		playingStates[projectId] = !playingStates[projectId];
		playingStates = { ...playingStates };
	}

	function getStatusBadge(status: string) {
		switch (status) {
			case 'completed':
				return { variant: 'success', icon: CheckCircle2, text: 'Completed' };
			case 'downloading':
				return { variant: 'secondary', icon: Download, text: 'Downloading' };
			case 'paused':
				return { variant: 'outline', icon: PauseCircle, text: 'Paused' };
			case 'error':
				return { variant: 'destructive', icon: AlertCircle, text: 'Error' };
			default:
				return { variant: 'outline', icon: Download, text: status };
		}
	}

	$: filteredDownloads = downloads
		.filter((download) => selectedFilter === 'all' || selectedFilter === download.status)
		.filter(
			(download) =>
				download.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				download.author.toLowerCase().includes(searchQuery.toLowerCase())
		);
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Downloads</h1>
			<p class="text-muted-foreground">Manage your downloaded projects</p>
		</div>
		<div class="flex items-center gap-4 text-sm text-muted-foreground">
			<div class="flex items-center gap-1">
				<HardDrive class="h-4 w-4" />
				<span>2.1 GB available</span>
			</div>
		</div>
	</div>

	<!-- Filters and Search -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div class="flex flex-wrap gap-2">
			<Button
				variant={selectedFilter === 'all' ? 'secondary' : 'ghost'}
				size="sm"
				on:click={() => (selectedFilter = 'all')}
			>
				<Download class="mr-2 h-4 w-4" />
				All Downloads
			</Button>
			<Button
				variant={selectedFilter === 'downloading' ? 'secondary' : 'ghost'}
				size="sm"
				on:click={() => (selectedFilter = 'downloading')}
			>
				<Download class="mr-2 h-4 w-4" />
				In Progress
			</Button>
			<Button
				variant={selectedFilter === 'completed' ? 'secondary' : 'ghost'}
				size="sm"
				on:click={() => (selectedFilter = 'completed')}
			>
				<CheckCircle2 class="mr-2 h-4 w-4" />
				Completed
			</Button>
		</div>
		<div class="relative">
			<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder="Search downloads..." class="w-[250px] pl-9" bind:value={searchQuery} />
		</div>
	</div>

	<!-- Downloads List -->
	<div class="space-y-4">
		{#each filteredDownloads as download}
			<Card class="transition-colors hover:bg-accent/5">
				<CardContent class="p-6">
					<div class="space-y-4">
						<!-- Header -->
						<div class="flex items-start justify-between">
							<div class="flex items-start gap-4">
								<img
									src={download.authorAvatar}
									alt={download.author}
									class="h-10 w-10 rounded-full"
								/>
								<div>
									<h3 class="font-semibold">{download.title}</h3>
									<p class="text-sm text-muted-foreground">
										by {download.author}
									</p>
								</div>
							</div>
							<div class="flex items-center gap-2">
								{#if download.status === 'downloading'}
									<Button variant="ghost" size="icon">
										<PauseCircle class="h-4 w-4" />
									</Button>
								{/if}
								<DropdownMenu.Root>
									<DropdownMenu.Trigger asChild let:builder>
										<Button builders={[builder]} variant="ghost" size="icon">
											<MoreHorizontal class="h-4 w-4" />
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<DropdownMenu.Item>Show in Folder</DropdownMenu.Item>
										{#if download.status === 'error'}
											<DropdownMenu.Item>
												<RefreshCcw class="mr-2 h-4 w-4" />
												Retry Download
											</DropdownMenu.Item>
										{/if}
										<DropdownMenu.Separator />
										<DropdownMenu.Item class="text-destructive">
											<Trash2 class="mr-2 h-4 w-4" />
											Delete Download
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</div>
						</div>

						<!-- Download Progress -->
						{#if download.status === 'downloading'}
							<div class="space-y-2">
								<div class="flex items-center justify-between text-sm">
									<span class="text-muted-foreground">Downloading...</span>
									<span class="font-medium">{download.progress}%</span>
								</div>
								<Progress.Root value={download.progress} class="h-2" />
							</div>
						{/if}

						<!-- Project Info -->
						<div class="grid gap-4 sm:grid-cols-2">
							<div class="space-y-4">
								<p class="text-sm text-muted-foreground">
									{download.description}
								</p>

								<div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
									<div class="flex items-center gap-1">
										<Music2 class="h-4 w-4" />
										<span>{download.genre}</span>
									</div>
									<div class="flex items-center gap-1">
										<Radio class="h-4 w-4" />
										<span>{download.bpm} BPM</span>
									</div>
									<div class="flex items-center gap-1">
										<HardDrive class="h-4 w-4" />
										<span>{download.size}</span>
									</div>
								</div>
							</div>

							{#if download.status === 'completed'}
								<div class="space-y-2">
									<Waveform
										audioUrl={download.audioUrl}
										isPlaying={playingStates[download.id] || false}
										onPlayPause={() => handlePlay(download.id)}
									/>
								</div>
							{/if}
						</div>

						<!-- Footer -->
						<div class="flex items-center justify-between border-t pt-4">
							<div class="flex items-center gap-4">
								<Badge
									variant={getStatusBadge(download.status).variant}
									class="flex items-center gap-1"
								>
									<svelte:component this={getStatusBadge(download.status).icon} class="h-3 w-3" />
									{getStatusBadge(download.status).text}
								</Badge>
								<span class="text-sm text-muted-foreground">
									{download.daw}
									{download.version}
								</span>
							</div>
							<div class="flex items-center gap-1 text-sm text-muted-foreground">
								<Clock class="h-4 w-4" />
								<span>{download.downloadedAt}</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>

	<!-- Empty State -->
	{#if filteredDownloads.length === 0}
		<Card class="p-12 text-center">
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
				<Download class="h-8 w-8 text-muted-foreground" />
			</div>
			<h3 class="mb-2 text-xl font-semibold">No downloads</h3>
			<p class="mb-4 text-muted-foreground">
				{searchQuery
					? 'No downloads match your search'
					: selectedFilter === 'all'
						? 'Start downloading projects to access them offline'
						: `No ${selectedFilter} downloads`}
			</p>
			<Button href="/explore">Browse Projects</Button>
		</Card>
	{/if}
</div>
