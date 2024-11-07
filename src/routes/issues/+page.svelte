<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Card, CardContent } from '$lib/components/ui/card';
	import {
		AlertCircle,
		Search,
		Plus,
		Filter,
		Clock,
		Bug,
		Lightbulb,
		Hammer,
		Volume2,
		Workflow,
		CheckCircle2,
		MessagesSquare
	} from 'lucide-svelte';

	// Issue types and their corresponding icons
	const issueTypes = {
		bug: { icon: Bug, label: 'Bug', color: 'text-destructive' },
		feature: { icon: Lightbulb, label: 'Feature Request', color: 'text-success' },
		technical: { icon: Hammer, label: 'Technical', color: 'text-blue-500' },
		audio: { icon: Volume2, label: 'Audio', color: 'text-orange-500' },
		workflow: { icon: Workflow, label: 'Workflow', color: 'text-purple-500' }
	};

	// Issue priorities
	const priorities = {
		high: { label: 'High', variant: 'destructive' },
		medium: { label: 'Medium', variant: 'secondary' },
		low: { label: 'Low', variant: 'outline' }
	};

	// Sample issues data
	const issues: Array<{
		id: number;
		title: string;
		author: string;
		type: keyof typeof issueTypes;
		priority: keyof typeof priorities;
		status: string;
		project: string;
		created: string;
		comments: number;
		labels: string[];
		assignee: string;
		avatar: string;
	}> = [
		{
			id: 1,
			title: 'Audio glitches when exporting project',
			author: 'AudioPro',
			type: 'bug',
			priority: 'high',
			status: 'open',
			project: 'Summer Vibes',
			created: '2 days ago',
			comments: 5,
			labels: ['export', 'audio-quality'],
			assignee: 'TechSupport',
			avatar: '/api/placeholder/40/40'
		},
		{
			id: 2,
			title: 'Add support for parallel processing chains',
			author: 'MixMaster',
			type: 'feature',
			priority: 'medium',
			status: 'in-progress',
			project: 'Mix Template',
			created: '1 week ago',
			comments: 12,
			labels: ['enhancement', 'mixing'],
			assignee: 'DevTeam',
			avatar: '/api/placeholder/40/40'
		}
		// Add more issues...
	];

	let selectedTab = 'open';
	let searchQuery = '';
	let selectedFilters = {
		type: null,
		priority: null,
		status: null
	};

	function getStatusBadgeVariant(status: string) {
		switch (status) {
			case 'open':
				return 'destructive';
			case 'in-progress':
				return 'secondary';
			case 'resolved':
				return 'success';
			default:
				return 'outline';
		}
	}
</script>

<div class="hidden flex-col md:flex">
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-3xl font-bold tracking-tight">Issues</h2>
				<p class="text-muted-foreground">Track and manage project issues</p>
			</div>
			<Button>
				<Plus class="mr-2 h-4 w-4" />
				New Issue
			</Button>
		</div>

		<!-- Search and Filters -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
			<div class="relative max-w-md flex-1">
				<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder="Search issues..." class="pl-9" bind:value={searchQuery} />
			</div>
			<div class="flex gap-2">
				<Button variant="outline" size="sm">
					<Filter class="mr-2 h-4 w-4" />
					Filters
				</Button>
				<Tabs value={selectedTab}>
					<TabsList>
						<TabsTrigger value="open">Open</TabsTrigger>
						<TabsTrigger value="in-progress">In Progress</TabsTrigger>
						<TabsTrigger value="resolved">Resolved</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</div>

		<!-- Issue Types Quick Filter -->
		<div class="flex flex-wrap gap-2">
			{#each Object.entries(issueTypes) as [key, type]}
				<Button variant="outline" size="sm" class="gap-2">
					<svelte:component this={type.icon} class="h-4 w-4 {type.color}" />
					{type.label}
				</Button>
			{/each}
		</div>

		<!-- Issues List -->
		<div class="space-y-4">
			{#each issues as issue}
				<Card class="transition-colors hover:bg-accent/5">
					<CardContent class="p-6">
						<div class="flex items-start gap-4">
							<!-- Status Icon -->
							<div class="mt-1">
								{#if issue.status === 'open'}
									<AlertCircle class="h-5 w-5 text-destructive" />
								{:else if issue.status === 'in-progress'}
									<Clock class="h-5 w-5 text-secondary-foreground" />
								{:else}
									<CheckCircle2 class="h-5 w-5 text-success" />
								{/if}
							</div>

							<!-- Content -->
							<div class="flex-1 space-y-2">
								<div class="flex items-start justify-between">
									<div>
										<h3 class="cursor-pointer font-semibold hover:text-primary">
											{issue.title}
										</h3>
										<p class="text-sm text-muted-foreground">
											#{issue.id} opened {issue.created} by {issue.author}
										</p>
									</div>
									<div class="flex items-center gap-2">
										{#if issue.assignee}
											<img src={issue.avatar} alt={issue.assignee} class="h-6 w-6 rounded-full" />
										{/if}
										<Badge variant={priorities[issue.priority].variant}>
											{priorities[issue.priority].label}
										</Badge>
									</div>
								</div>

								<!-- Project and Labels -->
								<div class="flex flex-wrap items-center gap-2">
									<Badge variant="secondary" class="flex items-center gap-1">
										<svelte:component
											this={issueTypes[issue.type].icon}
											class="h-3 w-3 {issueTypes[issue.type].color}"
										/>
										{issue.project}
									</Badge>
									{#each issue.labels as label}
										<Badge variant="outline">{label}</Badge>
									{/each}
								</div>

								<!-- Comments -->
								<div class="flex items-center gap-2 text-sm text-muted-foreground">
									<MessagesSquare class="h-4 w-4" />
									<span>{issue.comments} comments</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>

		<!-- Empty State -->
		{#if issues.length === 0}
			<Card class="p-12 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
					<CheckCircle2 class="h-8 w-8 text-muted-foreground" />
				</div>
				<h3 class="mb-2 text-xl font-semibold">No issues found</h3>
				<p class="mb-4 text-muted-foreground">
					Create an issue to track bugs, feature requests, or improvements
				</p>
				<Button>
					<Plus class="mr-2 h-4 w-4" />
					New Issue
				</Button>
			</Card>
		{/if}
	</div>
</div>
