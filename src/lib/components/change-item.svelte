<script lang="ts">
	import { PlusCircle, MinusCircle, Pencil, Wrench } from 'lucide-svelte';
	import type { VersionChange } from '$lib/types/project';

	export let change: VersionChange;

	const icons = {
		added: PlusCircle,
		removed: MinusCircle,
		modified: Pencil,
		fixed: Wrench
	};

	const colors = {
		added: 'text-success',
		removed: 'text-destructive',
		modified: 'text-blue-500',
		fixed: 'text-orange-500'
	};
</script>

<div class="flex items-start gap-2">
	<svelte:component this={icons[change.type]} class="mt-1 h-4 w-4 {colors[change.type]}" />
	<span class="text-sm text-muted-foreground">{change.description}</span>
</div>
