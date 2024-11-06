<script lang="ts">
	import Waveform from '$lib/components/waveform.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Heart, MessageSquare, Share2 } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	interface Project {
		id: string;
		title: string;
		description: string;
		author: string;
		createdAt: string;
		likes: number;
		comments: number;
		genre: string;
		bpm: number;
		audioUrl: string;
	}

	// Track playing state for each project
	let playingStates: Record<string, boolean> = {};

	let projects: Project[] = [
		{
			id: '1',
			title: 'Project Alpha',
			description: 'A cutting-edge project pushing the boundaries of innovation.',
			author: 'John Doe',
			createdAt: '2022-01-01',
			likes: 100,
			comments: 20,
			genre: 'Technology',
			bpm: 120,
			audioUrl: '/audio/audio.mp3'
		},
		{
			id: '2',
			title: 'Project Bravo',
			description: 'A collaborative effort to revolutionize the industry.',
			author: 'Jane Smith',
			createdAt: '2022-02-01',
			likes: 50,
			comments: 10,
			genre: 'Science',
			bpm: 100,
			audioUrl: '/audio/audio.mp3'
		},
		{
			id: '3',
			title: 'Project Charlie',
			description: 'A groundbreaking initiative to transform the world.',
			author: 'Alex Johnson',
			createdAt: '2022-03-01',
			likes: 200,
			comments: 30,
			genre: 'Engineering',
			bpm: 110,
			audioUrl: '/audio/audio.mp3'
		}
	];

	function handlePlayPause(projectId: string, event: Event) {
		event.preventDefault();
		event.stopPropagation();

		// Stop all other playing audio
		Object.keys(playingStates).forEach((id) => {
			if (id !== projectId && playingStates[id]) {
				playingStates[id] = false;
			}
		});

		// Toggle current project's audio
		playingStates[projectId] = !playingStates[projectId];
		playingStates = { ...playingStates };
	}

	function handleButtonClick(event: Event) {
		event.preventDefault();
		event.stopPropagation();
	}

	function handleProjectClick(projectId: string) {
		// Stop any playing audio before navigation
		Object.keys(playingStates).forEach((id) => {
			if (playingStates[id]) {
				playingStates[id] = false;
			}
		});
		goto(`/projects/${projectId}`);
	}

	function handleLike(projectId: string, event: Event) {
		event.preventDefault();
		event.stopPropagation();
		// Implement like functionality
		console.log('Like clicked for project:', projectId);
	}

	function handleComment(projectId: string, event: Event) {
		event.preventDefault();
		event.stopPropagation();
		// Implement comment functionality
		console.log('Comment clicked for project:', projectId);
	}

	function handleShare(projectId: string, event: Event) {
		event.preventDefault();
		event.stopPropagation();
		// Implement share functionality
		console.log('Share clicked for project:', projectId);
	}
</script>

<div class="min-h-screen bg-background">
	<!-- Header section -->
	<div class="sticky top-0 z-40 bg-background pb-4 pt-4 md:pb-6 md:pt-6">
		<div class="flex items-center justify-between px-4 md:px-6">
			<div class="flex items-center gap-2 md:gap-4">
				<h1 class="text-xl font-semibold text-foreground md:text-2xl">Project Feed</h1>
				<div class="rounded-md bg-success/20 px-2 py-0.5 md:py-1">
					<span class="text-xs text-success-foreground md:text-sm">New</span>
				</div>
			</div>
			<Button href="/new" variant="outline" size="sm" class="h-8 md:h-10">
				<span class="text-sm">New Project</span>
			</Button>
		</div>
	</div>

	<!-- Projects grid -->
	<div class="space-y-4 px-4 pb-6 md:px-6">
		{#each projects as project (project.id)}
			<div
				class="cursor-pointer"
				on:click={() => handleProjectClick(project.id)}
				on:keydown={(e) => e.key === 'Enter' && handleProjectClick(project.id)}
				role="button"
				tabindex="0"
			>
				<Card class="bg-card transition-colors duration-200 hover:bg-muted/50">
					<div class="p-4 md:p-6">
						<!-- Project header -->
						<div
							class="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-start md:gap-4"
						>
							<div class="flex items-center gap-3 md:gap-4">
								<div
									class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent md:h-10 md:w-10"
								>
									<span class="text-base font-medium text-accent-foreground md:text-lg">
										{project.author[0]}
									</span>
								</div>
								<div>
									<h3 class="text-base font-semibold text-card-foreground md:text-lg">
										{project.title}
									</h3>
									<div class="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
										<span>by {project.author}</span>
										<span>•</span>
										<span>{project.createdAt}</span>
									</div>
								</div>
							</div>
							<div class="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
								<span>{project.genre}</span>
								<span>•</span>
								<span>{project.bpm} BPM</span>
							</div>
						</div>

						<!-- Project description -->
						<p class="mb-4 text-sm text-muted-foreground md:mb-6 md:text-base">
							{project.description}
						</p>

						<!-- Waveform -->
						<div
							class="mb-4 md:mb-6"
							on:click|stopPropagation
							on:mousedown|stopPropagation
							on:keydown|stopPropagation={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									handlePlayPause(project.id, e);
								}
							}}
							role="button"
							tabindex="0"
							aria-label={`Play ${project.title}`}
						>
							<Waveform
								audioUrl={project.audioUrl}
								isPlaying={playingStates[project.id] || false}
								onPlayPause={() => handlePlayPause(project.id, new Event('click'))}
							/>
						</div>

						<!-- Project footer -->
						<div class="flex items-center justify-between">
							<div class="flex gap-2 md:gap-4">
								<Button
									variant="ghost"
									size="sm"
									class="h-8 px-2 md:px-3"
									on:click={(e) => handleLike(project.id, e)}
								>
									<Heart class="h-4 w-4" />
									<span class="ml-1 text-sm">{project.likes}</span>
								</Button>
								<Button
									variant="ghost"
									size="sm"
									class="h-8 px-2 md:px-3"
									on:click={(e) => handleComment(project.id, e)}
								>
									<MessageSquare class="h-4 w-4" />
									<span class="ml-1 text-sm">{project.comments}</span>
								</Button>
							</div>
							<Button
								variant="ghost"
								size="sm"
								class="h-8 px-2 md:px-3"
								on:click={(e) => handleShare(project.id, e)}
							>
								<Share2 class="h-4 w-4" />
								<span class="ml-1 hidden text-sm md:inline">Share</span>
							</Button>
						</div>
					</div>
				</Card>
			</div>
		{/each}
	</div>
</div>
