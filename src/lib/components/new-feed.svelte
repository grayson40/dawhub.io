<script lang="ts">
	import ProjectToolbar from '$lib/components/project-toolbar.svelte';
	import ProjectCard from '$lib/components/project-card.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Plus } from 'lucide-svelte';

	// Track playing state for each project
	let playingStates: Record<string, boolean> = {};

	// Sample project data
	let projects = [
		{
			id: '1',
			title: 'Synthwave Summer',
			description: 'A retro-inspired synthwave track with modern production elements',
			daw: 'Ableton Live',
			bpm: 120,
			genre: 'Synthwave',
			createdAt: '2024-03-15',
			updatedAt: '2 hours ago',
			likes: 24,
			comments: 8,
			forks: 3,
			audioUrl: '/audio/audio.mp3'
		},
		{
			id: '2',
			title: 'Deep House Template',
			description: 'Professional house music project template with mixing chain',
			daw: 'FL Studio',
			bpm: 128,
			genre: 'House',
			createdAt: '2024-03-14',
			updatedAt: '1 day ago',
			likes: 45,
			comments: 12,
			forks: 7,
			audioUrl: '/audio/audio2.mp3'
		}
		// Add more projects as needed
	];

	let filteredProjects = projects;
	let selectedTab = 'all';

	function handleSearch(query: string) {
		filteredProjects = projects.filter(
			(project) =>
				project.title.toLowerCase().includes(query.toLowerCase()) ||
				project.description.toLowerCase().includes(query.toLowerCase())
		);
	}

	function handleSort(value: string) {
		switch (value) {
			case 'recent':
				filteredProjects = [...projects].sort(
					(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				break;
			case 'popular':
				filteredProjects = [...projects].sort((a, b) => b.likes - a.likes);
				break;
			case 'name':
				filteredProjects = [...projects].sort((a, b) => a.title.localeCompare(b.title));
				break;
			default:
				filteredProjects = projects;
		}
	}

	function handlePlay(projectId: string) {
		// Stop all other playing audio
		Object.keys(playingStates).forEach((id) => {
			if (id !== projectId) {
				playingStates[id] = false;
			}
		});

		// Toggle current project's audio
		playingStates[projectId] = !playingStates[projectId];
		playingStates = { ...playingStates };
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">My Projects</h1>
			<p class="text-muted-foreground">Manage and organize your DAW projects</p>
		</div>
		<Button href="/projects/new">
			<Plus class="mr-2 h-4 w-4" />
			New Project
		</Button>
	</div>

	<!-- Project Categories -->
	<Tabs class="w-full">
		<TabsList>
			<TabsTrigger value="all">All Projects</TabsTrigger>
			<TabsTrigger value="active">Active</TabsTrigger>
			<TabsTrigger value="archived">Archived</TabsTrigger>
		</TabsList>
	</Tabs>

	<!-- Quick Filters -->
	<div class="flex flex-wrap gap-2">
		<Badge variant="outline" class="cursor-pointer">Ableton Live</Badge>
		<Badge variant="outline" class="cursor-pointer">FL Studio</Badge>
		<Badge variant="outline" class="cursor-pointer">Logic Pro</Badge>
		<Badge variant="outline" class="cursor-pointer">House</Badge>
		<Badge variant="outline" class="cursor-pointer">Techno</Badge>
	</div>

	<!-- Toolbar -->
	<ProjectToolbar onSearch={handleSearch} onSort={handleSort} />

	<!-- Project Grid -->
	<div class="grid gap-6 md:grid-cols-2">
		{#each filteredProjects as project (project.id)}
			<ProjectCard
				{project}
				isPlaying={playingStates[project.id] || false}
				onPlay={() => handlePlay(project.id)}
			/>
		{/each}
	</div>

	<!-- Empty State -->
	{#if filteredProjects.length === 0}
		<div class="py-12 text-center">
			<h3 class="mb-2 text-xl font-semibold">No projects found</h3>
			<p class="mb-4 text-muted-foreground">Get started by creating your first project</p>
			<Button href="/projects/new">
				<Plus class="mr-2 h-4 w-4" />
				New Project
			</Button>
		</div>
	{/if}
</div>
