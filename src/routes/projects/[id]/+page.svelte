<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import Waveform from '$lib/components/waveform.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Play,
		Pause,
		SkipBack,
		SkipForward,
		Volume2,
		Heart,
		MessageSquare,
		Share2,
		Download,
		Clock,
		Music,
		Settings,
		Users,
		History
	} from 'lucide-svelte';

	// Mock project data
	const project = {
		id: '1',
		title: 'Summer Vibes Beat',
		description:
			'A chill electronic beat perfect for summer vibes and relaxation. Created using Ableton Live with analog synths and organic percussion samples.',
		author: {
			name: 'JohnDoe',
			avatar: '/path/to/avatar.jpg',
			followers: 1234
		},
		createdAt: 'Mar 14, 2024',
		likes: 42,
		comments: 12,
		genre: 'Electronic',
		bpm: 128,
		key: 'C Minor',
		duration: '3:45',
		tags: ['chill', 'summer', 'electronic', 'beats'],
		license: 'Creative Commons',
		downloads: 156,
		plays: 2890,
		collaborators: [
			{ name: 'Alice', role: 'Mixing' },
			{ name: 'Bob', role: 'Bass Guitar' }
		],
		version: '1.0.2',
		audioUrl: '/audio/audio.mp3'
	};

	let isPlaying = false;
	let currentTime = 0;
	let volume = 75;

	// Comments data
	const comments = [
		{
			id: 1,
			author: 'Jane Smith',
			avatar: '/path/to/jane.jpg',
			content:
				'Love the summer vibes in this! The percussion is on point. The way you mixed the analog synths with the organic percussion samples creates such a unique atmosphere. Would love to know more about your production process.',
			timestamp: '2 hours ago',
			likes: 5
		},
		{
			id: 2,
			author: 'Mike Wilson',
			avatar: '/path/to/mike.jpg',
			content: 'That bassline at 1:45 is incredible! Mind sharing what synth you used for that?',
			timestamp: '5 hours ago',
			likes: 3
		},
		{
			id: 3,
			author: 'Sarah Johnson',
			avatar: '/path/to/sarah.jpg',
			content:
				'Perfect summer track! Already added this to my playlist. The progression from 2:30 onwards is pure gold.',
			timestamp: '1 day ago',
			likes: 8
		}
	];

	function handlePlayPause() {
		isPlaying = !isPlaying;
	}
</script>

<div class="min-h-screen bg-background pb-20">
	<div class="fixed left-0 right-0 top-0 z-50 bg-background">
		<Nav page="project" />
	</div>

	<div class="container mx-auto px-4 pt-16 md:px-6 md:pt-20">
		<div class="grid gap-6 md:grid-cols-3">
			<div class="space-y-4 md:col-span-2 md:space-y-6">
				<Card>
					<div class="p-4 md:p-6">
						<Waveform audioUrl={project.audioUrl} {isPlaying} onPlayPause={handlePlayPause} />
					</div>
				</Card>

				<Tabs class="w-full">
					<TabsList class="grid w-full grid-cols-3">
						<TabsTrigger value="about" class="text-sm md:text-base">About</TabsTrigger>
						<TabsTrigger value="comments" class="text-sm md:text-base">
							Comments ({project.comments})
						</TabsTrigger>
						<TabsTrigger value="history" class="text-sm md:text-base">History</TabsTrigger>
					</TabsList>

					<TabsContent value="about" class="mt-4">
						<Card>
							<div class="p-4 md:p-6">
								<h3 class="mb-2 text-base font-semibold md:text-lg">Description</h3>
								<p class="text-sm text-muted-foreground md:text-base">{project.description}</p>
								<div class="mt-4 flex flex-wrap gap-2">
									{#each project.tags as tag}
										<Badge variant="secondary">{tag}</Badge>
									{/each}
								</div>
							</div>
						</Card>
					</TabsContent>

					<TabsContent value="comments" class="mt-4">
						<Card>
							<div class="space-y-4 p-4 md:space-y-6 md:p-6">
								<div class="flex gap-3 md:gap-4">
									<Avatar class="h-8 w-8 md:h-10 md:w-10">
										<AvatarImage src="/path/to/current-user.jpg" />
										<AvatarFallback>Y</AvatarFallback>
									</Avatar>
									<div class="flex-1 space-y-2">
										<textarea
											class="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:min-h-[100px]"
											placeholder="Add a comment..."
										/>
										<Button size="sm" class="ml-auto">Post Comment</Button>
									</div>
								</div>

								<div class="space-y-4">
									{#each comments as comment}
										<div class="flex gap-3 pt-4 first:pt-0 md:gap-4">
											<Avatar class="h-8 w-8 shrink-0 md:h-10 md:w-10">
												<AvatarImage src={comment.avatar} />
												<AvatarFallback>{comment.author[0]}</AvatarFallback>
											</Avatar>
											<div class="min-w-0 flex-1">
												<div class="flex flex-wrap items-center gap-2">
													<span class="text-sm font-semibold md:text-base">{comment.author}</span>
													<span class="text-xs text-muted-foreground md:text-sm"
														>{comment.timestamp}</span
													>
												</div>
												<p class="mt-1 text-sm text-muted-foreground">{comment.content}</p>
												<div class="mt-2 flex items-center gap-2">
													<Button variant="ghost" size="sm" class="h-8 px-2">
														<Heart class="mr-1 h-3 w-3 md:h-4 md:w-4" />
														<span class="text-xs md:text-sm">{comment.likes}</span>
													</Button>
													<Button variant="ghost" size="sm" class="h-8 px-2">
														<span class="text-xs md:text-sm">Reply</span>
													</Button>
												</div>
											</div>
										</div>
									{/each}
								</div>

								<Button variant="outline" size="sm" class="w-full">Load More Comments</Button>
							</div>
						</Card>
					</TabsContent>

					<TabsContent value="history" class="mt-4">
						<Card>
							<div class="p-4 md:p-6">
								<div class="flex items-center gap-2">
									<Badge variant="outline">v{project.version}</Badge>
									<span class="text-sm text-muted-foreground">Current Version</span>
								</div>
							</div>
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			<div class="space-y-4 md:space-y-6">
				<Card>
					<div class="space-y-4 p-4 md:space-y-6 md:p-6">
						<div class="flex items-center gap-3 md:gap-4">
							<Avatar class="h-12 w-12 md:h-16 md:w-16">
								<AvatarImage src={project.author.avatar} />
								<AvatarFallback>{project.author.name[0]}</AvatarFallback>
							</Avatar>
							<div>
								<h3 class="font-semibold">{project.author.name}</h3>
								<p class="text-xs text-muted-foreground md:text-sm">
									{project.author.followers} followers
								</p>
								<Button variant="outline" size="sm" class="mt-2">Follow</Button>
							</div>
						</div>

						<div class="grid gap-3">
							{#each [{ icon: Music, label: 'Genre', value: project.genre }, { icon: Clock, label: 'BPM', value: project.bpm }, { icon: Settings, label: 'Key', value: project.key }, { icon: Users, label: 'Collaborators', value: project.collaborators.length }] as item}
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-2">
										<svelte:component this={item.icon} class="h-4 w-4 text-muted-foreground" />
										<span class="text-sm">{item.label}</span>
									</div>
									<span class="text-sm font-medium">{item.value}</span>
								</div>
							{/each}
						</div>
					</div>
				</Card>

				<Card>
					<div class="p-4 md:p-6">
						<h3 class="mb-4 text-sm font-semibold md:text-base">Stats</h3>
						<div class="grid grid-cols-2 gap-4">
							{#each [{ value: project.plays, label: 'Total Plays' }, { value: project.downloads, label: 'Downloads' }] as stat}
								<div>
									<p class="text-xl font-bold md:text-2xl">{stat.value}</p>
									<p class="text-xs text-muted-foreground md:text-sm">{stat.label}</p>
								</div>
							{/each}
						</div>
					</div>
				</Card>
			</div>
		</div>
	</div>

	<div
		class="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	>
		<div class="container mx-auto">
			<div class="flex h-16 items-center px-4 md:h-20 md:px-6">
				<div class="hidden items-center gap-4 md:flex">
					<Avatar class="h-10 w-10">
						<AvatarImage src={project.author.avatar} />
						<AvatarFallback>{project.author.name[0]}</AvatarFallback>
					</Avatar>
					<div>
						<h3 class="font-semibold">{project.title}</h3>
						<p class="text-sm text-muted-foreground">{project.author.name}</p>
					</div>
				</div>

				<div class="flex flex-1 items-center justify-center gap-2 md:gap-4">
					<div class="flex items-center">
						<Button variant="ghost" size="sm" class="hidden md:inline-flex">
							<SkipBack class="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="sm">
							<Play class={isPlaying ? 'hidden' : 'h-4 w-4'} />
							<Pause class={!isPlaying ? 'hidden' : 'h-4 w-4'} />
						</Button>
						<Button variant="ghost" size="sm" class="hidden md:inline-flex">
							<SkipForward class="h-4 w-4" />
						</Button>
					</div>
					<div class="flex w-32 items-center gap-2 md:w-96">
						<span class="hidden text-xs text-muted-foreground md:inline md:text-sm">0:00</span>
						<div class="h-1 flex-1 rounded-full bg-accent/10" />
						<span class="hidden text-xs text-muted-foreground md:inline md:text-sm"
							>{project.duration}</span
						>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<div class="hidden items-center gap-2 md:flex">
						<Volume2 class="h-4 w-4 text-muted-foreground" />
						<input type="range" min="0" max="100" bind:value={volume} class="w-24" />
					</div>
					<Button variant="ghost" size="sm">
						<Heart class="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="sm" class="hidden md:inline-flex">
						<Share2 class="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
