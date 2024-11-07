<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Heart, MessageSquare, GitFork, Clock, Music } from 'lucide-svelte';
	import Waveform from '$lib/components/waveform.svelte';

	export let project: {
		id: string;
		title: string;
		description: string;
		daw: string;
		bpm: number;
		genre: string;
		createdAt: string;
		updatedAt: string;
		likes: number;
		comments: number;
		forks: number;
		audioUrl: string;
	};

	export let isPlaying = false;
	export let onPlay: () => void;
</script>

<Card class="transition-colors hover:bg-accent/5">
	<CardHeader>
		<div class="flex items-start justify-between">
			<div>
				<CardTitle class="text-xl">{project.title}</CardTitle>
				<CardDescription>Last updated {project.updatedAt}</CardDescription>
			</div>
			<Badge variant="outline">{project.daw}</Badge>
		</div>
	</CardHeader>

	<CardContent class="space-y-4">
		<Waveform audioUrl={project.audioUrl} {isPlaying} onPlayPause={onPlay} />

		<p class="text-sm text-muted-foreground">{project.description}</p>

		<div class="flex items-center justify-between text-sm text-muted-foreground">
			<div class="flex items-center gap-4">
				<div class="flex items-center gap-1">
					<Music class="h-4 w-4" />
					<span>{project.genre}</span>
				</div>
				<div class="flex items-center gap-1">
					<Clock class="h-4 w-4" />
					<span>{project.bpm} BPM</span>
				</div>
			</div>
		</div>
	</CardContent>

	<CardFooter class="justify-between">
		<div class="flex gap-3">
			<Button variant="ghost" size="sm">
				<Heart class="mr-1 h-4 w-4" />
				{project.likes}
			</Button>
			<Button variant="ghost" size="sm">
				<MessageSquare class="mr-1 h-4 w-4" />
				{project.comments}
			</Button>
			<Button variant="ghost" size="sm">
				<GitFork class="mr-1 h-4 w-4" />
				{project.forks}
			</Button>
		</div>
		<Button variant="outline" size="sm" href="/projects/{project.id}">View Project</Button>
	</CardFooter>
</Card>
