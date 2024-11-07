<script lang="ts">
	import { Card } from '$lib/components/ui/card';

	const genres = [
		{
			name: 'House',
			color: 'from-orange-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:to-yellow-500/20',
			image: '/api/placeholder/400/200'
		},
		{
			name: 'Techno',
			color: 'from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20',
			image: '/api/placeholder/400/200'
		},
		{
			name: 'Hip Hop',
			color: 'from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20',
			image: '/api/placeholder/400/200'
		},
		{
			name: 'Lo-Fi',
			color: 'from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20',
			image: '/api/placeholder/400/200'
		},
		{
			name: 'Drum & Bass',
			color: 'from-violet-500/10 to-indigo-500/10 hover:from-violet-500/20 hover:to-indigo-500/20',
			image: '/api/placeholder/400/200'
		},
		{
			name: 'Ambient',
			color: 'from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20',
			image: '/api/placeholder/400/200'
		}
	];
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each genres as genre}
		<a href="/explore/{genre.name.toLowerCase()}" class="block">
			<Card class="overflow-hidden">
				<div class="relative">
					<div class="absolute inset-0 bg-gradient-to-r {genre.color} transition-colors" />
					<img src={genre.image} alt={genre.name} class="h-32 w-full object-cover opacity-50" />
					<div class="absolute inset-0 flex items-center justify-center">
						<h3 class="text-2xl font-bold">{genre.name}</h3>
					</div>
				</div>
			</Card>
		</a>
	{/each}
</div>
