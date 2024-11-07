<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Search } from 'lucide-svelte';
	import TrendingSection from '$lib/components/trending-section.svelte';
	import GenreGrid from '$lib/components/genre-grid.svelte';
	import FeaturedCreators from '$lib/components/featured-creators.svelte';
	import ProjectCard from '$lib/components/project-card.svelte';

	// Sample data
	const trendingProjects = [
		{
			title: 'Summer Vibes',
			author: 'DJ Sunshine',
			genre: 'House',
			likes: 1200,
			listeners: 450,
			isHot: true
		}
		// Add more trending projects...
	];

	const featuredCreators = [
		{
			name: 'Bass Master',
			avatar: '/api/placeholder/100/100',
			followers: 15000,
			genre: 'Electronic',
			isVerified: true
		}
		// Add more creators...
	];

	let playingStates: Record<string, boolean> = {};
	let selectedTab = 'trending';

	function handlePlay(projectId: string) {
		Object.keys(playingStates).forEach((id) => {
			if (id !== projectId) playingStates[id] = false;
		});
		playingStates[projectId] = !playingStates[projectId];
		playingStates = { ...playingStates };
	}
</script>

<div class="hidden flex-col md:flex">
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div>
				<h1 class="text-3xl font-bold tracking-tight">Explore</h1>
				<p class="text-muted-foreground">Discover new projects and creators</p>
			</div>
			<div class="flex items-center gap-2">
				<div class="relative max-w-sm">
					<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input placeholder="Search projects..." class="pl-9" />
				</div>
				<Button>Filters</Button>
			</div>
		</div>

		<!-- Navigation Tabs -->
		<Tabs value={selectedTab} class="w-full">
			<TabsList>
				<TabsTrigger value="trending">Trending</TabsTrigger>
				<TabsTrigger value="recent">Recent</TabsTrigger>
				<TabsTrigger value="following">Following</TabsTrigger>
			</TabsList>
		</Tabs>

		<!-- Main Content -->
		<div class="grid gap-6 md:grid-cols-12">
			{#if selectedTab === 'trending'}
				<!-- Left Column -->
				<div class="space-y-6 md:col-span-8">
					<TrendingSection {trendingProjects} />
					<GenreGrid />
				</div>

				<!-- Right Column -->
				<div class="md:col-span-4">
					<FeaturedCreators creators={featuredCreators} />
				</div>
			{/if}
		</div>
	</div>
</div>
