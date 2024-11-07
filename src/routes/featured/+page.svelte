<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { Search, Star, Flame, Users, Play, Clock, Music2 } from 'lucide-svelte';
	import Waveform from '$lib/components/waveform.svelte';

	// Sample featured projects data
	const featuredProjects = [
		{
			id: 1,
			title: 'Summer Festival Anthem',
			description: 'Main stage EDM track with progressive house elements',
			author: 'BassMaster',
			genre: 'EDM',
			bpm: 128,
			duration: '6:45',
			listens: 15000,
			image: '/api/placeholder/600/300',
			authorAvatar: '/api/placeholder/40/40',
			isVerified: true,
			audioUrl: '/audio/audio.mp3'
		}
		// Add more featured projects...
	];

	// Sample featured creators
	const featuredCreators = [
		{
			name: 'BassMaster',
			avatar: '/api/placeholder/100/100',
			genre: 'Electronic',
			followers: 15000,
			isVerified: true,
			recentProjects: 3,
			topGenres: ['House', 'Techno', 'EDM']
		}
		// Add more featured creators...
	];

	let playingStates: Record<string, boolean> = {};

	function handlePlay(projectId: number) {
		Object.keys(playingStates).forEach((id) => {
			if (id !== projectId.toString()) playingStates[id] = false;
		});
		playingStates[projectId] = !playingStates[projectId];
		playingStates = { ...playingStates };
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Featured</h1>
			<p class="text-muted-foreground">Discover trending projects and top creators</p>
		</div>
		<div class="flex items-center gap-2">
			<div class="relative max-w-sm">
				<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder="Search featured..." class="pl-9" />
			</div>
		</div>
	</div>

	<!-- Featured Project of the Week -->
	<div>
		<h2 class="mb-4 flex items-center gap-2 text-2xl font-semibold">
			<Star class="h-5 w-5 text-yellow-500" />
			Project of the Week
		</h2>
		<Card>
			<CardContent class="p-6">
				<div class="grid gap-6 md:grid-cols-2">
					<div>
						<img
							src="/api/placeholder/600/300"
							alt="Featured Project"
							class="aspect-video w-full rounded-lg object-cover"
						/>
					</div>
					<div class="space-y-4">
						<div>
							<h3 class="text-2xl font-bold">Summer Festival Anthem</h3>
							<div class="mt-1 flex items-center gap-2">
								<img src="/api/placeholder/40/40" alt="BassMaster" class="h-6 w-6 rounded-full" />
								<span class="text-muted-foreground">by BassMaster</span>
								<Badge variant="secondary">Verified</Badge>
							</div>
						</div>

						<p class="text-muted-foreground">
							A powerful main stage EDM track featuring energetic drops and emotional breakdowns.
						</p>

						<div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
							<div class="flex items-center gap-1">
								<Music2 class="h-4 w-4" />
								<span>EDM</span>
							</div>
							<div class="flex items-center gap-1">
								<Clock class="h-4 w-4" />
								<span>128 BPM</span>
							</div>
							<div class="flex items-center gap-1">
								<Users class="h-4 w-4" />
								<span>15k plays</span>
							</div>
						</div>

						<div class="space-y-2">
							<Waveform
								audioUrl="/audio/audio.mp3"
								isPlaying={playingStates[1] || false}
								onPlayPause={() => handlePlay(1)}
							/>
						</div>

						<Button class="w-full sm:w-auto">View Project</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Featured Creators -->
	<div>
		<h2 class="mb-4 flex items-center gap-2 text-2xl font-semibold">
			<Flame class="h-5 w-5 text-orange-500" />
			Featured Creators
		</h2>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredCreators as creator}
				<Card>
					<CardContent class="p-6">
						<div class="flex items-start gap-4">
							<img src={creator.avatar} alt={creator.name} class="h-16 w-16 rounded-full" />
							<div class="space-y-1">
								<div class="flex items-center gap-2">
									<h3 class="font-semibold">{creator.name}</h3>
									{#if creator.isVerified}
										<Badge variant="secondary">Verified</Badge>
									{/if}
								</div>
								<p class="text-sm text-muted-foreground">{creator.followers} followers</p>
								<div class="flex flex-wrap gap-1">
									{#each creator.topGenres as genre}
										<Badge variant="outline">{genre}</Badge>
									{/each}
								</div>
							</div>
						</div>
						<Button variant="secondary" class="mt-4 w-full">View Profile</Button>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>

	<!-- Featured Projects Grid -->
	<div>
		<h2 class="mb-4 text-2xl font-semibold">More Featured Projects</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each featuredProjects as project}
				<Card class="transition-colors hover:bg-accent/5">
					<CardContent class="p-6">
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<img
										src={project.authorAvatar}
										alt={project.author}
										class="h-10 w-10 rounded-full"
									/>
									<div>
										<h3 class="font-semibold">{project.title}</h3>
										<p class="text-sm text-muted-foreground">by {project.author}</p>
									</div>
								</div>
								{#if project.isVerified}
									<Badge variant="secondary">Verified</Badge>
								{/if}
							</div>

							<Waveform
								audioUrl={project.audioUrl}
								isPlaying={playingStates[project.id] || false}
								onPlayPause={() => handlePlay(project.id)}
							/>

							<div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
								<div class="flex items-center gap-1">
									<Music2 class="h-4 w-4" />
									<span>{project.genre}</span>
								</div>
								<div class="flex items-center gap-1">
									<Clock class="h-4 w-4" />
									<span>{project.bpm} BPM</span>
								</div>
								<div class="flex items-center gap-1">
									<Users class="h-4 w-4" />
									<span>{project.listens} plays</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</div>
