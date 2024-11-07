<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';

	export let userAvatar = '/api/placeholder/40/40';
	export let userName = 'You';
	export let onSubmit: (content: string) => void;
	export let placeholder = 'Add a comment...';
	export let buttonText = 'Post Comment';

	let content = '';

	function handleSubmit() {
		if (content.trim()) {
			onSubmit(content);
			content = '';
		}
	}
</script>

<div class="flex gap-4">
	<Avatar class="h-10 w-10">
		<AvatarImage src={userAvatar} alt={userName} />
		<AvatarFallback>{userName[0]}</AvatarFallback>
	</Avatar>
	<div class="flex-1 space-y-2">
		<Textarea bind:value={content} {placeholder} class="min-h-[100px] resize-none" />
		<div class="flex justify-end">
			<Button size="sm" disabled={!content.trim()} on:click={handleSubmit}>
				{buttonText}
			</Button>
		</div>
	</div>
</div>
