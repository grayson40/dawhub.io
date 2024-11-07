<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Heart, Reply } from 'lucide-svelte';
	import CommentForm from './comment-form.svelte';

	export let comment: {
		id: number;
		author: {
			name: string;
			avatar: string;
			isVerified: boolean;
			isOP?: boolean;
		};
		content: string;
		timestamp: string;
		likes: number;
		isLiked: boolean;
		replies?: any[];
	};

	export let onLike: (id: number) => void;
	export let onReply: (id: number, content: string) => void;

	let isReplying = false;

	function handleReply(content: string) {
		onReply(comment.id, content);
		isReplying = false;
	}
</script>

<div class="space-y-4">
	<div class="flex gap-4">
		<Avatar class="h-10 w-10">
			<AvatarImage src={comment.author.avatar} alt={comment.author.name} />
			<AvatarFallback>{comment.author.name[0]}</AvatarFallback>
		</Avatar>
		<div class="flex-1 space-y-2">
			<div class="flex items-center gap-2">
				<span class="font-semibold">{comment.author.name}</span>
				{#if comment.author.isVerified}
					<Badge variant="secondary">Verified</Badge>
				{/if}
				{#if comment.author.isOP}
					<Badge variant="outline">Creator</Badge>
				{/if}
				<span class="text-sm text-muted-foreground">{comment.timestamp}</span>
			</div>
			<p class="text-sm text-muted-foreground">{comment.content}</p>
			<div class="flex gap-2">
				<Button variant="ghost" size="sm" class="gap-1" on:click={() => onLike(comment.id)}>
					<Heart class="h-4 w-4" fill={comment.isLiked ? 'currentColor' : 'none'} />
					{comment.likes}
				</Button>
				<Button variant="ghost" size="sm" class="gap-1" on:click={() => (isReplying = !isReplying)}>
					<Reply class="h-4 w-4" />
					Reply
				</Button>
			</div>
		</div>
	</div>

	{#if isReplying}
		<div class="ml-14">
			<CommentForm placeholder="Write a reply..." buttonText="Post Reply" onSubmit={handleReply} />
		</div>
	{/if}

	{#if comment.replies && comment.replies.length > 0}
		<div class="ml-14 space-y-4 border-l-2 pl-4">
			{#each comment.replies as reply}
				<svelte:self comment={reply} {onLike} {onReply} />
			{/each}
		</div>
	{/if}
</div>
