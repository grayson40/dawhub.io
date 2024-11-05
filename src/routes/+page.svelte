<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import SideNav from './(components)/side-nav.svelte';
	import ProjectFeed from '$lib/components/project-feed.svelte';
</script>

<div class="min-h-screen bg-background">
	<div class="fixed left-0 right-0 top-0 z-50 bg-background">
		<Nav page="dashboard" />
	</div>

	<div class="fixed bottom-0 left-0 top-16 w-60 border-r bg-background">
		<SideNav />
	</div>

	<div class="pl-60 pt-16">
		<ProjectFeed />
	</div>
</div>
