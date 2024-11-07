<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Card, CardContent } from '$lib/components/ui/card';
	import {
		Search,
		GitFork,
		Clock,
		Music2,
		ArrowUpRight,
		History,
		Users,
		ArrowRight,
		Radio
	} from 'lucide-svelte';
	import Waveform from '$lib/components/waveform.svelte';

	// Sample forked projects data
	const forkedProjects = [
		{
			id: 1,
			title: 'Deep House Remix',
			description: 'Added new bassline and modified arrangement',
			author: 'RemixMaster',
			originalAuthor: 'HousePro',
			originalTitle: 'Deep House Template',
			createdAt: '2024-03-15',
			lastModified: '2 hours ago',
			genre: 'House',
			daw: 'Ableton Live',
			bpm: 125,
			status: 'modified',
			changes: ['Modified bassline', 'Added new percussion', 'Extended breakdown'],
			collaborators: 2,
			audioUrl: '/audio/audio.mp3',
			avatar: '/api/placeholder/40/40'
		}
		// Add more forked projects...
	];

	let selectedTab = 'active';
	let searchQuery = '';
	let playingStates: Record<string, boolean> = {};

	function handlePlay(projectId: number) {
		Object.keys(playingStates).forEach((id) => {
			if (id !== projectId.toString()) playingStates[id] = false;
		});
		playingStates[projectId] = !playingStates[projectId];
		playingStates = { ...playingStates };
	}

	function getStatusColor(status: string) {
		switch (status) {
			case 'modified':
				return 'text-blue-500';
			case 'synced':
				return 'text-green-500';
			case 'outdated':
				return 'text-orange-500';
			default:
				return 'text-muted-foreground';
		}
	}
</script>

<div class="hidden flex-col md:flex">
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-3xl font-bold tracking-tight">Forked Projects</h2>
				<p class="text-muted-foreground">Manage your remixes and project variations</p>
			</div>
		</div>

		<!-- Search and Filters -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="relative max-w-md flex-1">
				<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder="Search forks..." class="pl-9" bind:value={searchQuery} />
			</div>
			<Tabs value={selectedTab} class="w-full sm:w-auto">
				<TabsList>
					<TabsTrigger value="active">Active</TabsTrigger>
					<TabsTrigger value="recent">Recent</TabsTrigger>
					<TabsTrigger value="archived">Archived</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>

		<!-- Forks List -->
		<div class="space-y-6">
			{#each forkedProjects as project}
				<Card>
					<CardContent class="p-6">
						<div class="space-y-4">
							<!-- Header -->
							<div class="flex items-start justify-between">
								<div class="flex items-start gap-4">
									<img src={project.avatar} alt={project.author} class="h-10 w-10 rounded-full" />
									<div>
										<h3 class="text-lg font-semibold">{project.title}</h3>
										<div class="flex items-center gap-2 text-sm text-muted-foreground">
											<span>forked from</span>
											<a href="#" class="flex items-center gap-1 text-primary hover:underline">
												{project.originalAuthor}/{project.originalTitle}
												<ArrowUpRight class="h-3 w-3" />
											</a>
										</div>
									</div>
								</div>
								<Badge variant="outline" class="flex items-center gap-1">
									<GitFork class={`h-3 w-3 ${getStatusColor(project.status)}`} />
									{project.status}
								</Badge>
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
											<span>Modified {project.lastModified}</span>
										</div>
									</div>

									<!-- Changes List -->
									<div class="space-y-2">
										<h4 class="text-sm font-medium">Changes made:</h4>
										<ul class="space-y-1 text-sm text-muted-foreground">
											{#each project.changes as change}
												<li class="flex items-center gap-2">
													<ArrowRight class="h-3 w-3" />
													{change}
												</li>
											{/each}
										</ul>
									</div>
								</div>

								<!-- Waveform -->
								<div class="space-y-4">
									<div class="rounded-md bg-muted p-1">
										<Waveform
											audioUrl={project.audioUrl}
											isPlaying={playingStates[project.id] || false}
											onPlayPause={() => handlePlay(project.id)}
										/>
									</div>
								</div>
							</div>

							<!-- Footer -->
							<div class="flex items-center justify-between border-t pt-4">
								<div class="flex items-center gap-4">
									<Button variant="outline" size="sm" class="gap-2">
										<History class="h-4 w-4" />
										View Changes
									</Button>
									<Button variant="outline" size="sm" class="gap-2">
										<Users class="h-4 w-4" />
										{project.collaborators} Collaborators
									</Button>
								</div>
								<Button variant="secondary" size="sm">Open Project</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>

		<!-- Empty State -->
		{#if forkedProjects.length === 0}
			<Card class="p-12 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
					<GitFork class="h-8 w-8 text-muted-foreground" />
				</div>
				<h3 class="mb-2 text-xl font-semibold">No forked projects</h3>
				<p class="mb-4 text-muted-foreground">
					Start by forking a project you'd like to remix or modify
				</p>
				<Button href="/explore">Browse Projects</Button>
			</Card>
		{/if}
	</div>
</div>
