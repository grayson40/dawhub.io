<script lang="ts">
	import type { Project } from '$lib/types/project';
	import CommentSection from '$lib/components/comment-section.svelte';
	import Waveform from '$lib/components/waveform.svelte';
	import FileBrowser from '$lib/components/file-browser.svelte';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
	import { Music, Clock, HardDrive } from 'lucide-svelte';
	import HistorySection from '$lib/components/history-section.svelte';

	export let data: { project: Project };
	const { project } = data;

	let isPlaying = false;
	let activeTab = 'about';

	function handlePlayPause() {
		isPlaying = !isPlaying;
	}
</script>

<div class="min-h-screen bg-background">
	<div class="space-y-6">
		<div class="grid gap-6 md:grid-cols-3">
			<!-- Left Column -->
			<div class="space-y-6 md:col-span-2">
				<!-- Waveform -->
				<Card class="p-6">
					<Waveform audioUrl={project.audioUrl} {isPlaying} onPlayPause={handlePlayPause} />
				</Card>

				<!-- Tabs -->
				<Tabs value={activeTab}>
					<TabsList class="grid w-full grid-cols-4">
						<TabsTrigger value="about">About</TabsTrigger>
						<TabsTrigger value="files">Files</TabsTrigger>
						<TabsTrigger value="comments">Comments</TabsTrigger>
						<TabsTrigger value="history">History</TabsTrigger>
					</TabsList>

					<TabsContent value="about" class="mt-4">
						<Card class="p-6">
							<div class="space-y-4">
								<div>
									<h3 class="mb-2 text-lg font-semibold">Description</h3>
									<p class="text-muted-foreground">
										{project.description}
									</p>
								</div>
							</div>
						</Card>
					</TabsContent>

					<TabsContent value="files" class="mt-4">
						<FileBrowser files={project.files} />
					</TabsContent>

					<TabsContent value="comments" class="mt-4">
						<Card class="p-6">
							<CommentSection comments={project.comments} />
						</Card>
					</TabsContent>

					<TabsContent value="history" class="mt-4">
						<Card class="p-6">
							<!-- <h3 class="text-lg font-semibold">History</h3> -->
							<HistorySection history={project.history} />
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			<!-- Right Column -->
			<div class="space-y-4">
				<Card class="p-6">
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<h3 class="text-lg font-semibold">Project Info</h3>
						</div>

						<div class="flex flex-wrap gap-2">
							<Badge variant="secondary">
								<Music class="mr-1 h-4 w-4" />
								{project.genre}
							</Badge>
							<Badge variant="secondary">
								<Clock class="mr-1 h-4 w-4" />
								{project.bpm} BPM
							</Badge>
							<Badge variant="secondary">
								<HardDrive class="mr-1 h-4 w-4" />
								{project.technicalInfo.size}
							</Badge>
						</div>

						<div class="border-t pt-4">
							<div class="space-y-2">
								<h4 class="font-medium">Technical Details</h4>
								<p class="text-sm text-muted-foreground">
									{project.technicalInfo.daw}
									{project.technicalInfo.dawVersion}
								</p>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	</div>
</div>
