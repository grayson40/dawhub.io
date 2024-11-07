<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Star, Users } from 'lucide-svelte';

	export let creators: {
			name: string;
			avatar: string;
			followers: number;
			genre: string;
			isVerified: boolean;
	}[];
</script>

<div class="rounded-lg bg-[#0D0D0D] border border-border">
	<!-- Header -->
	<div class="space-y-1 p-6">
			<div class="flex items-center gap-2">
					<Star class="h-5 w-5" />
					<h2 class="text-xl font-bold">Featured Creators</h2>
			</div>
			<p class="text-sm text-muted-foreground">Top producers and their latest work</p>
	</div>

	<!-- Creator Card -->
	<div class="p-4 bg-[#12151A] m-4 rounded-md">
			<div class="flex flex-col gap-4">
					<!-- Creator Info -->
					<div class="flex items-center gap-3">
							<div class="w-12 h-12 bg-accent rounded-sm flex items-center justify-center">
									<span class="text-lg font-semibold">Bass</span>
							</div>
							<div>
									<div class="flex gap-2 items-center">
											<h3 class="text-lg font-semibold">Bass Master</h3>
											<Badge class="bg-[#1A1F26] text-xs font-medium">Verified</Badge>
									</div>
									<div class="flex items-center gap-1 text-sm text-muted-foreground">
											<Users class="h-3 w-3" />
											<span>15000 followers</span>
									</div>
							</div>
					</div>

					<!-- Genre -->
					<Badge variant="outline" class="w-fit">Electronic</Badge>

					<!-- View Profile Button -->
					<Button variant="secondary" class="w-full">View Profile</Button>
			</div>
	</div>
</div>