<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
	} from '$lib/components/ui/select';
	import { Search, Filter, ArrowUpDown } from 'lucide-svelte';

	export let onSearch: (query: string) => void;
	export let onSort: (value: string) => void;
</script>

<div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
	<div class="relative max-w-md flex-1">
		<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
		<Input
			placeholder="Search projects..."
			class="pl-9"
			on:input={(e) => onSearch(e.currentTarget.value)}
		/>
	</div>
	<div class="flex gap-2">
		<Button variant="outline" size="sm">
			<Filter class="mr-2 h-4 w-4" />
			Filter
		</Button>
		<Select onValueChange={onSort}>
			<SelectTrigger class="w-[180px]">
				<ArrowUpDown class="mr-2 h-4 w-4" />
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="recent">Most Recent</SelectItem>
				<SelectItem value="popular">Most Popular</SelectItem>
				<SelectItem value="name">Name</SelectItem>
				<SelectItem value="updated">Last Updated</SelectItem>
			</SelectContent>
		</Select>
	</div>
</div>
