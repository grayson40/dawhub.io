<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import {
		Music,
		FolderPlus,
		Compass,
		Radio,
		Star,
		GitFork,
		History,
		Users,
		Bookmark,
		Settings,
		Mic2,
		Download
	} from 'lucide-svelte';

	export let className = '';
	export let page: string;
</script>

<div class={cn('pb-12', className)}>
	<div class="space-y-4 py-4">
		<!-- Create Section -->
		<div class="px-3 py-2">
			<div class="mb-2 flex items-center justify-between px-4">
				<h2 class="text-lg font-semibold tracking-tight">Create</h2>
				<Button href="/projects/new" variant="success" size="sm">
					<FolderPlus size={13} class="mr-2" />
					New
				</Button>
			</div>
			<div class="space-y-1">
				<Button
					variant={page === 'projects' ? 'secondary' : 'ghost'}
					href="/projects"
					class="w-full justify-start"
				>
					<Music class="mr-2 h-4 w-4" />
					My Projects
				</Button>
				<Button
					variant={page === 'forks' ? 'secondary' : 'ghost'}
					href="/forks"
					class="w-full justify-start"
				>
					<GitFork class="mr-2 h-4 w-4" />
					My Forks
				</Button>
				<Button
					variant={page === 'collaborations' ? 'secondary' : 'ghost'}
					href="/collaborations"
					class="w-full justify-start"
				>
					<Users class="mr-2 h-4 w-4" />
					Collaborations
				</Button>
			</div>
		</div>

		<!-- Discover Section -->
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Discover</h2>
			<div class="space-y-1">
				<Button
					variant={page === 'explore' ? 'secondary' : 'ghost'}
					href="/explore"
					class="w-full justify-start"
				>
					<Compass class="mr-2 h-4 w-4" />
					Explore
				</Button>
				<!-- <Button
					variant={page === 'trending' ? 'secondary' : 'ghost'}
					href="/trending"
					class="w-full justify-start"
				>
					<Radio class="mr-2 h-4 w-4" />
					Trending
				</Button> -->
				<Button
					variant={page === 'featured' ? 'secondary' : 'ghost'}
					href="/featured"
					class="w-full justify-start"
				>
					<Star class="mr-2 h-4 w-4" />
					Featured
				</Button>
			</div>
		</div>

		<!-- Library Section -->
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Library</h2>
			<div class="space-y-1">
				<Button
					variant={page === 'recent' ? 'secondary' : 'ghost'}
					href="/recent"
					class="w-full justify-start"
				>
					<History class="mr-2 h-4 w-4" />
					Recent
				</Button>
				<Button
					variant={page === 'saved' ? 'secondary' : 'ghost'}
					href="/saved"
					class="w-full justify-start"
				>
					<Bookmark class="mr-2 h-4 w-4" />
					Saved
				</Button>
				<Button
					variant={page === 'downloads' ? 'secondary' : 'ghost'}
					href="/downloads"
					class="w-full justify-start"
				>
					<Download class="mr-2 h-4 w-4" />
					Downloads
				</Button>
			</div>
		</div>

		<!-- Resources Section -->
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Resources</h2>
			<div class="space-y-1">
				<Button
					variant={page === 'samples' ? 'secondary' : 'ghost'}
					href="/samples"
					class="w-full justify-start"
				>
					<Mic2 class="mr-2 h-4 w-4" />
					Samples
				</Button>
				<Button
					variant={page === 'settings' ? 'secondary' : 'ghost'}
					href="/settings"
					class="w-full justify-start"
				>
					<Settings class="mr-2 h-4 w-4" />
					Settings
				</Button>
			</div>
		</div>
	</div>
</div>
