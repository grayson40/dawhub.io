<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import {
		Search,
		Clock,
		Music2,
		Bookmark,
		Plus,
		MoreHorizontal,
		Folder,
		FolderPlus,
		Radio,
		Users,
		Edit,
		Heart
	} from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Waveform from '$lib/components/waveform.svelte';

	// Sample collections/folders
	const collections = [
		{
			id: 1,
			name: 'Favorites',
			icon: Heart,
			count: 5,
			isDefault: true
		},
		{
			id: 2,
			name: 'Reference Tracks',
			icon: Music2,
			count: 3,
			isDefault: false
		},
		{
			id: 3,
			name: 'Learning Material',
			icon: Folder,
			count: 2,
			isDefault: false
		}
	];

	// Sample saved projects
	const savedProjects = [
		{
			id: 1,
			title: 'Deep House Template',
			description: 'Professional house music project template with mixing chain',
			author: 'ProducerPro',
			savedAt: '2 days ago',
			genre: 'House',
			bpm: 125,
			collections: ['Favorites', 'Reference Tracks'],
			authorAvatar: '/api/placeholder/40/40',
			audioUrl: '/audio/audio.mp3',
			likes: 234,
			comments: 45
		}
		// Add more saved projects...
	];

	let playingStates: Record<string, boolean> = {};
	let selectedCollection = 'all';
	let searchQuery = '';

	function handlePlay(projectId: number) {
		Object.keys(playingStates).forEach((id) => {
			if (id !== projectId.toString()) playingStates[id] = false;
		});
		playingStates[projectId] = !playingStates[projectId];
		playingStates = { ...playingStates };
	}

	$: filteredProjects = savedProjects
		.filter(
			(project) => selectedCollection === 'all' || project.collections.includes(selectedCollection)
		)
		.filter(
			(project) =>
				project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				project.author.toLowerCase().includes(searchQuery.toLowerCase())
		);
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Saved</h1>
			<p class="text-muted-foreground">Your bookmarked projects and collections</p>
		</div>
		<div class="flex items-center gap-2">
			<Button variant="outline" size="sm">
				<FolderPlus class="mr-2 h-4 w-4" />
				New Collection
			</Button>
		</div>
	</div>

	<!-- Collections and Search -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div class="flex flex-wrap gap-2">
			<Button
				variant={selectedCollection === 'all' ? 'secondary' : 'ghost'}
				size="sm"
				on:click={() => (selectedCollection = 'all')}
				class="flex items-center gap-2"
			>
				<Bookmark class="h-4 w-4" />
				All Saved
				<Badge variant="outline">{savedProjects.length}</Badge>
			</Button>
			{#each collections as collection}
				<Button
					variant={selectedCollection === collection.name ? 'secondary' : 'ghost'}
					size="sm"
					on:click={() => (selectedCollection = collection.name)}
					class="flex items-center gap-2"
				>
					<svelte:component this={collection.icon} class="h-4 w-4" />
					{collection.name}
					<Badge variant="outline">{collection.count}</Badge>
				</Button>
			{/each}
		</div>
		<div class="relative">
			<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				placeholder="Search saved projects..."
				class="w-[250px] pl-9"
				bind:value={searchQuery}
			/>
		</div>
	</div>

	<!-- Projects Grid -->
	<div class="grid gap-6 md:grid-cols-2">
		{#each filteredProjects as project}
			<Card class="transition-colors hover:bg-accent/5">
				<CardContent class="p-6">
					<div class="space-y-4">
						<!-- Header -->
						<div class="flex items-start justify-between">
							<div class="flex items-start gap-4">
								<img
									src={project.authorAvatar}
									alt={project.author}
									class="h-10 w-10 rounded-full"
								/>
								<div>
									<h3 class="font-semibold">{project.title}</h3>
									<p class="text-sm text-muted-foreground">
										by {project.author}
									</p>
								</div>
							</div>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button builders={[builder]} variant="ghost" size="icon">
										<MoreHorizontal class="h-4 w-4" />
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>Collections</DropdownMenu.Label>
									{#each collections as collection}
										<DropdownMenu.CheckboxItem
											checked={project.collections.includes(collection.name)}
										>
											{collection.name}
										</DropdownMenu.CheckboxItem>
									{/each}
									<DropdownMenu.Separator />
									<DropdownMenu.Item>
										<Bookmark class="mr-2 h-4 w-4" />
										Remove from Saved
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>

						<!-- Project Info -->
						<div class="space-y-4">
							<p class="text-sm text-muted-foreground">
								{project.description}
							</p>

							<div class="flex flex-wrap gap-2">
								{#each project.collections as collection}
									<Badge variant="outline">
										<Folder class="mr-1 h-3 w-3" />
										{collection}
									</Badge>
								{/each}
							</div>

							<div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
								<div class="flex items-center gap-1">
									<Music2 class="h-4 w-4" />
									<span>{project.genre}</span>
								</div>
								<div class="flex items-center gap-1">
									<Radio class="h-4 w-4" />
									<span>{project.bpm} BPM</span>
								</div>
								<div class="flex items-center gap-1">
									<Clock class="h-4 w-4" />
									<span>Saved {project.savedAt}</span>
								</div>
							</div>

							<Waveform
								audioUrl={project.audioUrl}
								isPlaying={playingStates[project.id] || false}
								onPlayPause={() => handlePlay(project.id)}
							/>
						</div>

						<!-- Footer -->
						<div class="flex items-center justify-between border-t pt-4">
							<div class="flex items-center gap-4">
								<Button variant="outline" size="sm">View Project</Button>
							</div>
							<div class="flex items-center gap-4 text-sm text-muted-foreground">
								<div class="flex items-center gap-1">
									<Heart class="h-4 w-4" />
									{project.likes}
								</div>
								<div class="flex items-center gap-1">
									<Users class="h-4 w-4" />
									{project.comments}
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>

	<!-- Empty State -->
	{#if filteredProjects.length === 0}
		<Card class="p-12 text-center">
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
				<Bookmark class="h-8 w-8 text-muted-foreground" />
			</div>
			<h3 class="mb-2 text-xl font-semibold">No saved projects</h3>
			<p class="mb-4 text-muted-foreground">
				{searchQuery
					? 'No projects match your search'
					: selectedCollection === 'all'
						? 'Start saving projects to access them later'
						: `No projects in "${selectedCollection}" collection`}
			</p>
			<Button href="/explore">Browse Projects</Button>
		</Card>
	{/if}
</div>
