<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import {
		MessageSquare,
		Search,
		Plus,
		ThumbsUp,
		MessagesSquare,
		Tag,
		Clock,
		CheckCircle2,
		HelpCircle
	} from 'lucide-svelte';

	// Discussion categories
	const categories = [
		{
			id: 'q-and-a',
			name: 'Q&A',
			description: 'Ask questions and get help',
			icon: HelpCircle,
			color: 'text-blue-500'
		},
		{
			id: 'tutorials',
			name: 'Tutorials',
			description: 'Share production tips and techniques',
			icon: MessagesSquare,
			color: 'text-green-500'
		},
		{
			id: 'feedback',
			name: 'Feedback',
			description: 'Get feedback on your projects',
			icon: MessageSquare,
			color: 'text-purple-500'
		},
		{
			id: 'collaboration',
			name: 'Collaboration',
			description: 'Find collaborators and share projects',
			icon: ThumbsUp,
			color: 'text-orange-500'
		}
	];

	// Sample discussions data
	const discussions = [
		{
			id: 1,
			title: 'How to achieve better bass mixing in house music?',
			author: 'BassMaster',
			category: 'Q&A',
			tags: ['Mixing', 'House', 'Bass'],
			upvotes: 42,
			replies: 12,
			status: 'answered',
			lastActivity: '2 hours ago',
			avatar: '/api/placeholder/40/40'
		},
		{
			id: 2,
			title: 'Complete guide to sidechaining in Ableton Live',
			author: 'ProductionPro',
			category: 'Tutorials',
			tags: ['Ableton', 'Sidechaining', 'Tutorial'],
			upvotes: 156,
			replies: 34,
			status: 'discussion',
			lastActivity: '1 day ago',
			avatar: '/api/placeholder/40/40'
		}
		// Add more discussions...
	];

	let selectedTab = 'latest';
	let searchQuery = '';
</script>

<div class="hidden flex-col md:flex">
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-3xl font-bold tracking-tight">Discussions</h2>
				<p class="text-muted-foreground">Join the conversation about music production</p>
			</div>
			<Button>
				<Plus class="mr-2 h-4 w-4" />
				New Discussion
			</Button>
		</div>

		<!-- Search and Filters -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="relative max-w-md flex-1">
				<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder="Search discussions..." class="pl-9" bind:value={searchQuery} />
			</div>
			<Tabs value={selectedTab} class="w-full sm:w-auto">
				<TabsList>
					<TabsTrigger value="latest">Latest</TabsTrigger>
					<TabsTrigger value="top">Top</TabsTrigger>
					<TabsTrigger value="unanswered">Unanswered</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>

		<!-- Categories Grid -->
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{#each categories as category}
				<Card class="cursor-pointer transition-colors hover:bg-accent/5">
					<CardHeader>
						<div class="flex items-center gap-2">
							<svelte:component this={category.icon} class="h-5 w-5 {category.color}" />
							<CardTitle class="text-lg">{category.name}</CardTitle>
						</div>
						<CardDescription>{category.description}</CardDescription>
					</CardHeader>
				</Card>
			{/each}
		</div>

		<!-- Discussions List -->
		<div class="space-y-4">
			{#each discussions as discussion}
				<Card class="cursor-pointer transition-colors hover:bg-accent/5">
					<CardContent class="p-6">
						<div class="flex gap-4">
							<!-- Avatar -->
							<img src={discussion.avatar} alt={discussion.author} class="h-10 w-10 rounded-full" />

							<!-- Content -->
							<div class="flex-1 space-y-2">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="font-semibold hover:text-primary">
											{discussion.title}
										</h3>
										<p class="text-sm text-muted-foreground">
											Started by {discussion.author}
										</p>
									</div>
									{#if discussion.status === 'answered'}
										<Badge variant="success" class="flex items-center gap-1">
											<CheckCircle2 class="h-3 w-3" />
											Answered
										</Badge>
									{/if}
								</div>

								<!-- Tags -->
								<div class="flex flex-wrap gap-2">
									<Badge variant="secondary">{discussion.category}</Badge>
									{#each discussion.tags as tag}
										<Badge variant="outline">{tag}</Badge>
									{/each}
								</div>

								<!-- Stats -->
								<div class="flex items-center gap-4 text-sm text-muted-foreground">
									<div class="flex items-center gap-1">
										<ThumbsUp class="h-4 w-4" />
										<span>{discussion.upvotes}</span>
									</div>
									<div class="flex items-center gap-1">
										<MessagesSquare class="h-4 w-4" />
										<span>{discussion.replies} replies</span>
									</div>
									<div class="flex items-center gap-1">
										<Clock class="h-4 w-4" />
										<span>{discussion.lastActivity}</span>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>

		<!-- Empty State -->
		{#if discussions.length === 0}
			<Card class="p-12 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
					<MessageSquare class="h-8 w-8 text-muted-foreground" />
				</div>
				<h3 class="mb-2 text-xl font-semibold">No discussions yet</h3>
				<p class="mb-4 text-muted-foreground">
					Be the first to start a discussion about music production!
				</p>
				<Button>
					<Plus class="mr-2 h-4 w-4" />
					New Discussion
				</Button>
			</Card>
		{/if}
	</div>
</div>
