<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import {
		Search,
		Clock,
		Calendar,
		Music2,
		Eye,
		ArrowUpRight,
		History,
		Radio,
		Users
	} from 'lucide-svelte';
	import Waveform from '$lib/components/waveform.svelte';

	// Sample recent activities
	const recentProjects = [
		{
			id: 1,
			title: 'Summer House Mix',
			description: 'Progressive house track with melodic elements',
			author: 'HouseMaster',
			lastViewed: '2 hours ago',
			lastActive: '1 hour ago',
			type: 'viewed',
			genre: 'House',
			bpm: 128,
			duration: '6:45',
			authorAvatar: '/api/placeholder/40/40',
			audioUrl: '/audio/audio.mp3',
			isOriginal: true
		},
		{
			id: 2,
			title: 'Deep Tech Project',
			description: 'Technical house with driving bassline',
			author: 'TechMaster',
			lastViewed: '4 hours ago',
			lastActive: '3 hours ago',
			type: 'active',
			genre: 'Techno',
			bpm: 125,
			duration: '7:30',
			authorAvatar: '/api/placeholder/40/40',
			audioUrl: '/audio/audio.mp3',
			originalProject: 'Tech House Template',
			originalAuthor: 'ProducerPro',
			isOriginal: false
		}
		// Add more recent projects...
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

	$: filteredProjects = recentProjects
		.filter((project) => selectedFilter === 'all' || selectedFilter === project.type)
		.filter(
			(project) =>
				project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				project.author.toLowerCase().includes(searchQuery.toLowerCase())
		);

	const timeGroups = {
		today: 'Today',
		yesterday: 'Yesterday',
		lastWeek: 'Last Week',
		lastMonth: 'Last Month'
	};

	function getTimeGroup(lastViewed: string): string {
		// This is a simple implementation - you might want to use a date library
		// to properly calculate these groups based on actual timestamps
		if (lastViewed.includes('hour')) return 'today';
		if (lastViewed.includes('day')) return 'yesterday';
		if (lastViewed.includes('week')) return 'lastWeek';
		return 'lastMonth';
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Recent</h1>
			<p class="text-muted-foreground">Your recently viewed and active projects</p>
		</div>
		<div class="flex items-center gap-2">
			<div class="relative">
				<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder="Search recent projects..."
					class="w-[250px] pl-9"
					bind:value={searchQuery}
				/>
			</div>
		</div>
	</div>

	<!-- Filter Buttons -->
	<div class="flex gap-2">
		<Button
			variant={selectedFilter === 'all' ? 'secondary' : 'ghost'}
			size="sm"
			on:click={() => (selectedFilter = 'all')}
		>
			<History class="mr-2 h-4 w-4" />
			All
		</Button>
		<Button
			variant={selectedFilter === 'viewed' ? 'secondary' : 'ghost'}
			size="sm"
			on:click={() => (selectedFilter = 'viewed')}
		>
			<Eye class="mr-2 h-4 w-4" />
			Viewed
		</Button>
		<Button
			variant={selectedFilter === 'active' ? 'secondary' : 'ghost'}
			size="sm"
			on:click={() => (selectedFilter = 'active')}
		>
			<Radio class="mr-2 h-4 w-4" />
			Active
		</Button>
	</div>

	<!-- Projects List -->
	{#each Object.entries(timeGroups) as [groupKey, groupLabel]}
		{#if filteredProjects.some((project) => getTimeGroup(project.lastViewed) === groupKey)}
			<div class="space-y-4">
				<h2 class="flex items-center gap-2 text-lg font-semibold">
					<Calendar class="h-4 w-4" />
					{groupLabel}
				</h2>

				<div class="space-y-4">
					{#each filteredProjects.filter((project) => getTimeGroup(project.lastViewed) === groupKey) as project}
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
												{#if !project.isOriginal}
													<div class="flex items-center gap-2 text-sm text-muted-foreground">
														<span>forked from</span>
														<a
															href="#"
															class="flex items-center gap-1 text-primary hover:underline"
														>
															{project.originalAuthor}/{project.originalProject}
															<ArrowUpRight class="h-3 w-3" />
														</a>
													</div>
												{:else}
													<p class="text-sm text-muted-foreground">
														by {project.author}
													</p>
												{/if}
											</div>
										</div>
										<div class="flex items-center gap-2">
											<Badge variant="outline" class="flex items-center gap-1">
												{#if project.type === 'viewed'}
													<Eye class="h-3 w-3" />
												{:else}
													<Radio class="h-3 w-3" />
												{/if}
												{project.type === 'viewed' ? 'Viewed' : 'Active'}
											</Badge>
										</div>
									</div>

									<!-- Project Info -->
									<div class="grid gap-4 sm:grid-cols-2">
										<div class="space-y-4">
											<p class="text-sm text-muted-foreground">
												{project.description}
											</p>

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
													<span>Active {project.lastActive}</span>
												</div>
											</div>
										</div>

										<!-- Waveform -->
										<div class="space-y-2">
											<Waveform
												audioUrl={project.audioUrl}
												isPlaying={playingStates[project.id] || false}
												onPlayPause={() => handlePlay(project.id)}
											/>
										</div>
									</div>

									<!-- Footer -->
									<div class="flex items-center justify-between border-t pt-4">
										<div class="flex items-center gap-4">
											<Button variant="outline" size="sm">View Project</Button>
										</div>
										<div class="flex items-center gap-1 text-sm text-muted-foreground">
											<Clock class="h-4 w-4" />
											{project.lastViewed}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					{/each}
				</div>
			</div>
		{/if}
	{/each}

	<!-- Empty State -->
	{#if filteredProjects.length === 0}
		<Card class="p-12 text-center">
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
				<History class="h-8 w-8 text-muted-foreground" />
			</div>
			<h3 class="mb-2 text-xl font-semibold">No recent projects</h3>
			<p class="mb-4 text-muted-foreground">
				{searchQuery
					? 'No projects match your search'
					: "You haven't viewed or worked on any projects recently"}
			</p>
			<Button href="/explore">Browse Projects</Button>
		</Card>
	{/if}
</div>
