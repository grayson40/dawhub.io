<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let className: string | undefined | null = undefined;
	export let items: { href: string; title: string; icon?: any }[];
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<nav class={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}>
	{#each items as item}
		{@const isActive = $page.url.pathname === item.href}

		<Button
			href={item.href}
			variant="ghost"
			class={cn(!isActive && 'hover:underline', 'relative justify-start hover:bg-transparent')}
			data-sveltekit-noscroll
		>
			{#if isActive}
				<div
					class="absolute inset-0 rounded-md bg-muted"
					in:send={{ key: 'active-sidebar-tab' }}
					out:receive={{ key: 'active-sidebar-tab' }}
				/>
			{/if}
			{#if item.icon}
				<div class="relative mr-2">
					<svelte:component this={item.icon} size={18} color="#6B7280" />
				</div>
			{/if}
			<div class="relative">
				{item.title}
			</div>
		</Button>
	{/each}
</nav>
