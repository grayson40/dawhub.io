<script lang="ts">
	import Nav from "$lib/components/nav.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
	import SideNav from "./(components)/side-nav.svelte";

	export let data;
</script>

<div class="hidden md:flex flex-col">
	<Nav page="dashboard" />
	<div class="grid lg:grid-cols-4">
		<SideNav />
		<div class="space-y-4 mt-5">
			{#each data.users as item (item.ID)}
				<Card class="p-4">
					<div class="flex justify-between items-center py-2">
						<h2 class="text-lg font-semibold tracking-tight">{item.Username}</h2>
						<p class="text-sm text-gray-500">{item.Email}</p>
					</div>
				</Card>
			{/each}
		</div>	
	</div>
</div>
