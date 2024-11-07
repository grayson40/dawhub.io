<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import CommentForm from './comment-form.svelte';
	import CommentItem from './comment-item.svelte';

	export let comments: {
		count: number;
		items: any[];
	};

	function handleNewComment(content: string) {
		// Implement new comment logic
		console.log('New comment:', content);
	}

	function handleLike(commentId: number) {
		// Implement like logic
		console.log('Like comment:', commentId);
	}

	function handleReply(commentId: number, content: string) {
		// Implement reply logic
		console.log('Reply to comment:', commentId, content);
	}
</script>

<Card class="p-6">
	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<h3 class="text-lg font-semibold">Comments</h3>
			<span class="text-sm text-muted-foreground">{comments.count} comments</span>
		</div>

		<CommentForm onSubmit={handleNewComment} />

		<div class="space-y-6">
			{#each comments.items as comment (comment.id)}
				<CommentItem {comment} onLike={handleLike} onReply={handleReply} />
			{/each}
		</div>
	</div>
</Card>
