<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import {
		Search,
		Music2,
		Download,
		PlayCircle,
		PauseCircle,
		List,
		ListMusic,
		Mic2,
		Plus,
		Filter,
		FolderPlus
	} from 'lucide-svelte';

	// Sample categories
	const categories = [
		{ id: 'drums', name: 'Drums', count: 156 },
		{ id: 'bass', name: 'Bass', count: 89 },
		{ id: 'synths', name: 'Synths', count: 124 },
		{ id: 'fx', name: 'FX', count: 78 },
		{ id: 'vocals', name: 'Vocals', count: 45 },
		{ id: 'loops', name: 'Loops', count: 92 }
	];

	// Sample packs
	const packs = [
		{ id: 1, name: 'Deep House Essentials', count: 245 },
		{ id: 2, name: 'Analog Drums Vol. 1', count: 120 },
		{ id: 3, name: 'Future Bass Pack', count: 180 }
	];

	// Sample audio files
	const samples = [
		{
			id: 1,
			name: 'Deep Kick 01',
			category: 'drums',
			pack: 'Deep House Essentials',
			duration: '0:02',
			bpm: 128,
			key: 'C',
			format: 'WAV',
			size: '156 KB',
			tags: ['kick', 'house', 'punchy'],
			waveform: '/api/placeholder/200/40',
			audioUrl: '/audio/audio.mp3',
			downloadCount: 1240
		},
		{
			id: 2,
			name: 'Analog Bass Loop',
			category: 'bass',
			pack: 'Deep House Essentials',
			duration: '0:04',
			bpm: 128,
			key: 'Fm',
			format: 'WAV',
			size: '320 KB',
			tags: ['bass', 'loop', 'analog'],
			waveform: '/api/placeholder/200/40',
			audioUrl: '/audio/audio.mp3',
			downloadCount: 890
		}
		// Add more samples...
	];

	let playingStates: Record<string, boolean> = {};
	let selectedCategory = 'all';
	let selectedPack = 'all';
	let searchQuery = '';
	let viewMode: 'grid' | 'list' = 'grid';

	function handlePlay(sampleId: number) {
		Object.keys(playingStates).forEach((id) => {
			if (id !== sampleId.toString()) playingStates[id] = false;
		});
		playingStates[sampleId] = !playingStates[sampleId];
		playingStates = { ...playingStates };
	}

	$: filteredSamples = samples
		.filter(
			(sample) =>
				(selectedCategory === 'all' || sample.category === selectedCategory) &&
				(selectedPack === 'all' || sample.pack === selectedPack)
		)
		.filter(
			(sample) =>
				sample.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				sample.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
		);
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Samples</h1>
			<p class="text-muted-foreground">Browse and manage your sample library</p>
		</div>
		<div class="flex items-center gap-2">
			<Button variant="outline" size="sm">
				<FolderPlus class="mr-2 h-4 w-4" />
				Import Samples
			</Button>
			<Button size="sm">
				<Plus class="mr-2 h-4 w-4" />
				New Pack
			</Button>
		</div>
	</div>

	<!-- Main Content Grid -->
	<div class="grid gap-6 md:grid-cols-12">
		<!-- Sidebar -->
		<div class="space-y-6 md:col-span-3">
			<!-- Categories -->
			<div class="space-y-2">
				<h3 class="text-sm font-medium">Categories</h3>
				<div class="space-y-1">
					<Button
						variant={selectedCategory === 'all' ? 'secondary' : 'ghost'}
						class="w-full justify-start"
						size="sm"
						on:click={() => (selectedCategory = 'all')}
					>
						<ListMusic class="mr-2 h-4 w-4" />
						All Samples
					</Button>
					{#each categories as category}
						<Button
							variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
							class="w-full justify-start"
							size="sm"
							on:click={() => (selectedCategory = category.id)}
						>
							<Music2 class="mr-2 h-4 w-4" />
							{category.name}
							<Badge variant="outline" class="ml-auto">
								{category.count}
							</Badge>
						</Button>
					{/each}
				</div>
			</div>

			<!-- Sample Packs -->
			<div class="space-y-2">
				<h3 class="text-sm font-medium">Sample Packs</h3>
				<div class="space-y-1">
					<Button
						variant={selectedPack === 'all' ? 'secondary' : 'ghost'}
						class="w-full justify-start"
						size="sm"
						on:click={() => (selectedPack = 'all')}
					>
						<ListMusic class="mr-2 h-4 w-4" />
						All Packs
					</Button>
					{#each packs as pack}
						<Button
							variant={selectedPack === pack.id ? 'secondary' : 'ghost'}
							class="w-full justify-start"
							size="sm"
							on:click={() => (selectedPack = pack.id)}
						>
							<Music2 class="mr-2 h-4 w-4" />
							{pack.name}
							<Badge variant="outline" class="ml-auto">
								{pack.count}
							</Badge>
						</Button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="space-y-6 md:col-span-9">
			<!-- Search and Filters -->
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div class="relative flex-1">
					<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input placeholder="Search samples..." class="pl-9" bind:value={searchQuery} />
				</div>
				<div class="flex items-center gap-2">
					<Button variant="outline" size="sm">
						<Filter class="mr-2 h-4 w-4" />
						Filters
					</Button>
					<div class="flex rounded-md border">
						<Button
							variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
							size="sm"
							class="rounded-r-none"
							on:click={() => (viewMode = 'grid')}
						>
							<ListMusic class="h-4 w-4" />
						</Button>
						<Button
							variant={viewMode === 'list' ? 'secondary' : 'ghost'}
							size="sm"
							class="rounded-l-none"
							on:click={() => (viewMode = 'list')}
						>
							<List class="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			<!-- Samples Grid/List -->
			{#if viewMode === 'grid'}
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredSamples as sample}
						<Card class="transition-colors hover:bg-accent/5">
							<CardContent class="p-4">
								<div class="space-y-3">
									<div class="flex items-center justify-between">
										<div>
											<h3 class="font-medium">{sample.name}</h3>
											<p class="text-sm text-muted-foreground">{sample.pack}</p>
										</div>
										<Button variant="ghost" size="icon" on:click={() => handlePlay(sample.id)}>
											{#if playingStates[sample.id]}
												<PauseCircle class="h-5 w-5" />
											{:else}
												<PlayCircle class="h-5 w-5" />
											{/if}
										</Button>
									</div>

									<img
										src={sample.waveform}
										alt="Waveform"
										class="h-12 w-full rounded bg-muted object-cover"
									/>

									<div class="flex flex-wrap gap-2">
										{#each sample.tags as tag}
											<Badge variant="outline">{tag}</Badge>
										{/each}
									</div>

									<div class="flex items-center justify-between text-sm text-muted-foreground">
										<div class="flex items-center gap-3">
											<span>{sample.duration}</span>
											<span>{sample.key}</span>
											<span>{sample.bpm} BPM</span>
										</div>
										<Download class="h-4 w-4" />
									</div>
								</div>
							</CardContent>
						</Card>
					{/each}
				</div>
			{:else}
				<div class="space-y-2">
					{#each filteredSamples as sample}
						<div class="flex items-center justify-between rounded-md p-2 hover:bg-accent/5">
							<div class="flex items-center gap-4">
								<Button variant="ghost" size="icon" on:click={() => handlePlay(sample.id)}>
									{#if playingStates[sample.id]}
										<PauseCircle class="h-5 w-5" />
									{:else}
										<PlayCircle class="h-5 w-5" />
									{/if}
								</Button>
								<div>
									<h3 class="font-medium">{sample.name}</h3>
									<p class="text-sm text-muted-foreground">{sample.pack}</p>
								</div>
							</div>
							<div class="flex items-center gap-6">
								<div class="flex items-center gap-3 text-sm text-muted-foreground">
									<span>{sample.duration}</span>
									<span>{sample.key}</span>
									<span>{sample.bpm} BPM</span>
								</div>
								<Button variant="ghost" size="icon">
									<Download class="h-4 w-4" />
								</Button>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Empty State -->
			{#if filteredSamples.length === 0}
				<Card class="p-12 text-center">
					<div
						class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted"
					>
						<Mic2 class="h-8 w-8 text-muted-foreground" />
					</div>
					<h3 class="mb-2 text-xl font-semibold">No samples found</h3>
					<p class="mb-4 text-muted-foreground">
						{searchQuery
							? 'No samples match your search'
							: 'Start by importing samples or creating a new pack'}
					</p>
					<div class="flex justify-center gap-2">
						<Button variant="outline">
							<FolderPlus class="mr-2 h-4 w-4" />
							Import Samples
						</Button>
						<Button>
							<Plus class="mr-2 h-4 w-4" />
							New Pack
						</Button>
					</div>
				</Card>
			{/if}
		</div>
	</div>
</div>
