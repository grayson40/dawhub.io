<script lang="ts">
	import type { PageData } from './$types.js';
	import ProjectForm from './project-form.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Nav from '$lib/components/nav.svelte';
	export let data: PageData;
</script>

<div class="container max-w-3xl py-10">
	<div class="space-y-6">
		<div>
			<h1 class="text-2xl font-semibold tracking-tight">Create New Project</h1>
			<p class="text-sm text-muted-foreground">
				Share your music with the world. Create a new project to upload your tracks, collaborate
				with others, and get feedback.
			</p>
		</div>
		<Separator />
		<ProjectForm data={data.form} />
	</div>
</div>
