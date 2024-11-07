<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import {
		Search,
		Users,
		Clock,
		Music2,
		Bell,
		Mail,
		Calendar,
		MessageSquare,
		Share2,
		UserPlus,
		Activity,
		Lock,
		Globe,
		Pencil,
		MoreHorizontal
	} from 'lucide-svelte';
	import Waveform from '$lib/components/waveform.svelte';

	// Sample collaborations data
	const collaborations = [
		{
			id: 1,
			title: 'Summer Festival Mix',
			description: 'Main stage EDM collaboration',
			owner: 'FestivalPro',
			members: [
				{ name: 'FestivalPro', role: 'owner', avatar: '/api/placeholder/40/40' },
				{ name: 'BassKing', role: 'producer', avatar: '/api/placeholder/40/40' },
				{ name: 'MixMaster', role: 'engineer', avatar: '/api/placeholder/40/40' }
			],
			genre: 'EDM',
			daw: 'Ableton Live',
			bpm: 128,
			status: 'active',
			lastActive: '2 hours ago',
			visibility: 'private',
			unreadMessages: 3,
			dueDate: '2024-04-15',
			progress: 65,
			audioUrl: '/audio/audio.mp3'
		}
		// Add more collaborations...
	];

	// Sample pending invites
	const pendingInvites = [
		{
			id: 1,
			projectTitle: 'Deep House Collab',
			invitedBy: 'HouseMaster',
			role: 'producer',
			sentAt: '1 day ago',
			avatar: '/api/placeholder/40/40'
		}
		// Add more invites...
	];

	// Sample recent activity
	const recentActivity = [
		{
			id: 1,
			user: 'MixMaster',
			action: 'added new vocals',
			project: 'Summer Festival Mix',
			timestamp: '1 hour ago',
			avatar: '/api/placeholder/40/40'
		}
		// Add more activity...
	];

	let selectedTab = 'active';
	let searchQuery = '';
	let playingStates: Record<string, boolean> = {};

	function handlePlay(projectId: number) {
		Object.keys(playingStates).forEach((id) => {
			if (id !== projectId.toString()) playingStates[id] = false;
		});
		playingStates[projectId] = !playingStates[projectId];
		playingStates = { ...playingStates };
	}

	function getProgressColor(progress: number) {
		if (progress >= 75) return 'bg-success';
		if (progress >= 50) return 'bg-blue-500';
		if (progress >= 25) return 'bg-orange-500';
		return 'bg-destructive';
	}
</script>

<div class="hidden flex-col md:flex">
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-3xl font-bold tracking-tight">Collaborations</h2>
				<p class="text-muted-foreground">Manage your collaborative projects and invites</p>
			</div>
			<Button>
				<UserPlus class="mr-2 h-4 w-4" />
				New Collaboration
			</Button>
		</div>

		<div class="grid gap-6 md:grid-cols-12">
			<!-- Main Content -->
			<div class="space-y-6 md:col-span-8">
				<!-- Search and Filters -->
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
					<div class="relative flex-1">
						<Search
							class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
						/>
						<Input placeholder="Search collaborations..." class="pl-9" bind:value={searchQuery} />
					</div>
					<Tabs value={selectedTab} class="w-full sm:w-auto">
						<TabsList>
							<TabsTrigger value="active">Active</TabsTrigger>
							<TabsTrigger value="pending">Pending</TabsTrigger>
							<TabsTrigger value="archived">Archived</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<!-- Collaborations List -->
				<div class="space-y-4">
					{#each collaborations as project}
						<Card class="transition-colors hover:bg-accent/5">
							<CardContent class="p-6">
								<div class="space-y-4">
									<!-- Project Header -->
									<div class="flex items-start justify-between">
										<div>
											<div class="flex items-center gap-2">
												<h3 class="text-lg font-semibold">{project.title}</h3>
												{#if project.visibility === 'private'}
													<Lock class="h-4 w-4 text-muted-foreground" />
												{:else}
													<Globe class="h-4 w-4 text-muted-foreground" />
												{/if}
											</div>
											<p class="text-sm text-muted-foreground">{project.description}</p>
										</div>
										<Button variant="ghost" size="icon">
											<MoreHorizontal class="h-4 w-4" />
										</Button>
									</div>

									<!-- Project Info -->
									<div class="grid gap-4 sm:grid-cols-2">
										<div class="space-y-4">
											<!-- Metadata -->
											<div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
												<div class="flex items-center gap-1">
													<Music2 class="h-4 w-4" />
													<span>{project.genre}</span>
												</div>
												<div class="flex items-center gap-1">
													<Activity class="h-4 w-4" />
													<span>{project.bpm} BPM</span>
												</div>
												<div class="flex items-center gap-1">
													<Clock class="h-4 w-4" />
													<span>Active {project.lastActive}</span>
												</div>
											</div>

											<!-- Members -->
											<div class="flex items-center gap-2">
												<div class="flex -space-x-2">
													{#each project.members as member}
														<img
															src={member.avatar}
															alt={member.name}
															class="h-8 w-8 rounded-full border-2 border-background"
														/>
													{/each}
												</div>
												<Button variant="ghost" size="sm">
													<UserPlus class="mr-1 h-4 w-4" />
													Invite
												</Button>
											</div>
										</div>

										<!-- Waveform -->
										<div class="space-y-2">
											<Waveform
												audioUrl={project.audioUrl}
												isPlaying={playingStates[project.id] || false}
												onPlayPause={() => handlePlay(project.id)}
											/>
										</div>
									</div>

									<!-- Progress Bar -->
									<div class="space-y-2">
										<div class="flex items-center justify-between text-sm">
											<span class="text-muted-foreground">Progress</span>
											<span class="font-medium">{project.progress}%</span>
										</div>
										<div class="h-2 rounded-full bg-muted">
											<div
												class={`h-full rounded-full ${getProgressColor(project.progress)}`}
												style={`width: ${project.progress}%`}
											/>
										</div>
									</div>

									<!-- Footer -->
									<div class="flex items-center justify-between border-t pt-4">
										<div class="flex items-center gap-4">
											<Button variant="outline" size="sm">
												<MessageSquare class="mr-1 h-4 w-4" />
												Chat
												{#if project.unreadMessages}
													<Badge variant="secondary" class="ml-2">
														{project.unreadMessages}
													</Badge>
												{/if}
											</Button>
											<Button variant="outline" size="sm">
												<Share2 class="mr-1 h-4 w-4" />
												Share
											</Button>
										</div>
										<Button variant="secondary" size="sm">
											<Pencil class="mr-1 h-4 w-4" />
											Open Project
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					{/each}
				</div>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6 md:col-span-4">
				<!-- Pending Invites -->
				<Card>
					<CardHeader>
						<div class="flex items-center justify-between">
							<CardTitle class="text-lg">Pending Invites</CardTitle>
							{#if pendingInvites.length > 0}
								<Badge variant="secondary">{pendingInvites.length}</Badge>
							{/if}
						</div>
					</CardHeader>
					<CardContent>
						{#if pendingInvites.length > 0}
							<div class="space-y-4">
								{#each pendingInvites as invite}
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-3">
											<img
												src={invite.avatar}
												alt={invite.invitedBy}
												class="h-8 w-8 rounded-full"
											/>
											<div class="space-y-1">
												<p class="font-medium">{invite.projectTitle}</p>
												<p class="text-sm text-muted-foreground">
													by {invite.invitedBy} • {invite.sentAt}
												</p>
											</div>
										</div>
										<div class="flex gap-2">
											<Button variant="outline" size="sm">Decline</Button>
											<Button size="sm">Accept</Button>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<div class="py-6 text-center text-muted-foreground">
								<Mail class="mx-auto mb-2 h-8 w-8" />
								<p>No pending invites</p>
							</div>
						{/if}
					</CardContent>
				</Card>

				<!-- Recent Activity -->
				<Card>
					<CardHeader>
						<CardTitle class="text-lg">Recent Activity</CardTitle>
					</CardHeader>
					<CardContent>
						{#if recentActivity.length > 0}
							<div class="space-y-4">
								{#each recentActivity as activity}
									<div class="flex gap-3">
										<img src={activity.avatar} alt={activity.user} class="h-8 w-8 rounded-full" />
										<div>
											<p class="text-sm">
												<span class="font-medium">{activity.user}</span>
												{activity.action} in
												<span class="font-medium">{activity.project}</span>
											</p>
											<p class="text-xs text-muted-foreground">
												{activity.timestamp}
											</p>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<div class="py-6 text-center text-muted-foreground">
								<Activity class="mx-auto mb-2 h-8 w-8" />
								<p>No recent activity</p>
							</div>
						{/if}
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Empty State -->
		{#if collaborations.length === 0}
			<Card class="p-12 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
					<Users class="h-8 w-8 text-muted-foreground" />
				</div>
				<h3 class="mb-2 text-xl font-semibold">No collaborations yet</h3>
				<p class="mb-4 text-muted-foreground">
					Start collaborating with other producers and musicians
				</p>
				<Button>
					<UserPlus class="mr-2 h-4 w-4" />
					Start Collaboration
				</Button>
			</Card>
		{/if}
	</div>
</div>
