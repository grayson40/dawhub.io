<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Heart, MessageSquare, Share2 } from 'lucide-svelte';

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
	}

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
			bpm: 120
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
			bpm: 100
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
			bpm: 110
		}
	];
</script>

<div class="min-h-screen bg-background">
	<!-- Header section - sticky -->
	<div class="sticky top-0 z-40 bg-background pb-6 pt-6">
		<div class="flex items-center justify-between px-6">
			<div class="flex items-center gap-4">
				<h1 class="text-2xl font-semibold text-foreground">Project Feed</h1>
				<div class="rounded-md bg-success/20 px-2 py-1">
					<span class="text-sm text-success-foreground">New</span>
				</div>
			</div>
			<Button href="/new" variant="outline" class="gap-2">
				<span class="text-sm">New Project</span>
			</Button>
		</div>
	</div>

	<!-- Projects grid -->
	<div class="space-y-4 px-6 pb-6">
		{#each projects as project (project.id)}
			<a href="/projects/1" class="p-12">
				<Card class="bg-card transition-colors duration-200 hover:bg-muted/50">
					<div class="p-6">
						<!-- Project header -->
						<div class="mb-4 flex items-start justify-between">
							<div class="flex items-center gap-4">
								<div class="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
									<span class="text-lg font-medium text-accent-foreground">
										{project.author[0]}
									</span>
								</div>
								<div>
									<h3 class="text-lg font-semibold text-card-foreground">{project.title}</h3>
									<div class="flex items-center gap-2 text-sm text-muted-foreground">
										<span>by {project.author}</span>
										<span>•</span>
										<span>{project.createdAt}</span>
									</div>
								</div>
							</div>
							<div class="flex items-center gap-2 text-sm text-muted-foreground">
								<span>{project.genre}</span>
								<span>•</span>
								<span>{project.bpm} BPM</span>
							</div>
						</div>

						<!-- Project description -->
						<p class="mb-6 text-muted-foreground">{project.description}</p>

						<!-- Waveform placeholder -->
						<div class="mb-6 h-24 rounded-md bg-accent/10" />

						<!-- Project footer -->
						<div class="flex items-center justify-between">
							<div class="flex gap-4">
								<Button variant="ghost" size="sm" class="gap-2">
									<Heart class="h-4 w-4" />
									<span>{project.likes}</span>
								</Button>
								<Button variant="ghost" size="sm" class="gap-2">
									<MessageSquare class="h-4 w-4" />
									<span>{project.comments}</span>
								</Button>
							</div>
							<Button variant="ghost" size="sm" class="gap-2">
								<Share2 class="h-4 w-4" />
								<span>Share</span>
							</Button>
						</div>
					</div>
				</Card>
			</a>
		{/each}
	</div>
</div>
