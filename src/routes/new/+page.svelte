<script lang="ts">
	import type { PageData } from './$types.js';
	import ProfileForm from './profile-form.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Nav from '$lib/components/nav.svelte';
	export let data: PageData;
</script>

<Nav page="New Project" />
<div class="flex min-h-screen items-center justify-center space-y-6 p-10 pb-16 md:block">
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<div class="flex-1 lg:max-w-2xl">
			<div class="space-y-6">
				<div>
					<h3 class="text-lg font-medium">New Project</h3>
					<p class="text-sm text-muted-foreground">
						A repository contains all project files, including the revision history. Already have a
						project repository elsewhere? <a href="/import">Import a repository.</a>
					</p>
				</div>
				<Separator />
				<ProfileForm data={data.form} />
			</div>
		</div>
	</div>
</div>
