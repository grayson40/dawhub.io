<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import SideNav from './(components)/side-nav.svelte';
	import ProjectFeed from '$lib/components/project-feed.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Menu } from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet';

	let isMobileMenuOpen = false;
</script>

<div class="min-h-screen bg-background">
	<div class="fixed left-0 right-0 top-0 z-50 bg-background">
		<Nav page="dashboard" />
	</div>

	<div
		class="hidden md:fixed md:bottom-0 md:left-0 md:top-16 md:block md:w-60 md:border-r md:bg-background"
	>
		<SideNav />
	</div>

	<div class="fixed bottom-4 right-4 z-50 md:hidden">
		<Sheet.Root bind:open={isMobileMenuOpen}>
			<Sheet.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="default"
					size="icon"
					class="h-12 w-12 rounded-full shadow-lg"
				>
					<Menu class="h-6 w-6" />
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left" class="w-72">
				<Sheet.Header>
					<Sheet.Title>Menu</Sheet.Title>
				</Sheet.Header>
				<div class="py-4">
					<SideNav />
				</div>
			</Sheet.Content>
		</Sheet.Root>
	</div>

	<div class="pt-16 md:pl-60">
		<ProjectFeed />
	</div>
</div>
