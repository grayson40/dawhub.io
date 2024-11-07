<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { TrendingUp, Users, Flame } from 'lucide-svelte';

	export let trendingProjects: {
		title: string;
		author: string;
		genre: string;
		likes: number;
		listeners: number;
		isHot: boolean;
	}[];
</script>

<Card>
	<CardHeader>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<TrendingUp class="h-5 w-5 text-primary" />
				<CardTitle>Trending Today</CardTitle>
			</div>
			<Badge variant="secondary">Live</Badge>
		</div>
		<CardDescription>Popular projects in the last 24 hours</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="space-y-4">
			{#each trendingProjects as project, i}
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<span class="text-2xl font-bold text-muted-foreground">
							{(i + 1).toString().padStart(2, '0')}
						</span>
						<div>
							<p class="font-medium">{project.title}</p>
							<p class="text-sm text-muted-foreground">by {project.author}</p>
						</div>
					</div>
					<div class="flex items-center gap-4">
						{#if project.isHot}
							<Badge variant="destructive" class="flex items-center gap-1">
								<Flame class="h-3 w-3" />
								Hot
							</Badge>
						{/if}
						<div class="flex items-center gap-1 text-muted-foreground">
							<Users class="h-4 w-4" />
							<span class="text-sm">{project.listeners}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</CardContent>
</Card>
