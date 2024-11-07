<script lang="ts" context="module">
	import { z } from 'zod';

	export const projectFormSchema = z.object({
		title: z
			.string()
			.min(2, 'Title must be at least 2 characters.')
			.max(100, 'Title must not be longer than 100 characters'),
		description: z
			.string()
			.min(10, 'Description must be at least 10 characters.')
			.max(500, 'Description must not be longer than 500 characters')
			.default(''),
		genre: z.string({
			required_error: 'Please select a genre'
		}),
		bpm: z
			.number()
			.min(20, 'BPM must be at least 20')
			.max(300, 'BPM must not exceed 300')
			.default(120),
		key: z.string().optional(),
		isPublic: z.boolean().default(true),
		tags: z.array(z.string()).default([]),
		audioFile: z.any().optional() // You'll need to handle file validation separately
	});

	export type ProjectFormSchema = typeof projectFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Switch } from '$lib/components/ui/switch';
	import { Badge } from '$lib/components/ui/badge';
	import { X, Plus } from 'lucide-svelte';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { cn } from '$lib/utils.js';
	import { browser } from '$app/environment';

	export let data: SuperValidated<Infer<ProjectFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(projectFormSchema)
	});

	const { form: formData, enhance } = form;

	// Available genres
	const genres = [
		'Electronic',
		'Hip Hop',
		'Pop',
		'Rock',
		'R&B',
		'Jazz',
		'Classical',
		'Folk',
		'Country',
		'Metal',
		'Blues',
		'Latin',
		'Reggae',
		'World',
		'Other'
	];

	// Musical keys
	const musicalKeys = [
		'C',
		'C#',
		'D',
		'D#',
		'E',
		'F',
		'F#',
		'G',
		'G#',
		'A',
		'A#',
		'B',
		'Cm',
		'C#m',
		'Dm',
		'D#m',
		'Em',
		'Fm',
		'F#m',
		'Gm',
		'G#m',
		'Am',
		'A#m',
		'Bm'
	];

	let newTag = '';

	function addTag() {
		if (newTag && !$formData.tags.includes(newTag)) {
			$formData.tags = [...$formData.tags, newTag];
			newTag = '';
		}
	}

	function removeTag(tag: string) {
		$formData.tags = $formData.tags.filter((t) => t !== tag);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			addTag();
		}
	}
</script>

<form method="POST" class="space-y-8" use:enhance enctype="multipart/form-data">
	<!-- Title -->
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Project Title</Form.Label>
			<Input placeholder="Amazing Track" {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.Description>
			Give your project a memorable name. This will be visible to other users.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Description -->
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea
				{...attrs}
				bind:value={$formData.description}
				placeholder="Describe your project..."
			/>
		</Form.Control>
		<Form.Description>
			Tell others about your project. You can use basic formatting.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Genre -->
	<Form.Field {form} name="genre">
		<Form.Control let:attrs>
			<Form.Label>Genre</Form.Label>
			<Select.Root onSelectedChange={(s) => s && ($formData.genre = String(s.value))}>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a genre" />
				</Select.Trigger>
				<Select.Content>
					{#each genres as genre}
						<Select.Item value={genre} label={genre} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden name={attrs.name} bind:value={$formData.genre} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- BPM -->
	<Form.Field {form} name="bpm">
		<Form.Control let:attrs>
			<Form.Label>BPM</Form.Label>
			<Input type="number" {...attrs} bind:value={$formData.bpm} min="20" max="300" />
		</Form.Control>
		<Form.Description>The tempo of your track in beats per minute.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Key -->
	<Form.Field {form} name="key">
		<Form.Control let:attrs>
			<Form.Label>Key</Form.Label>
			<Select.Root onSelectedChange={(s) => s && ($formData.key = String(s.value))}>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a key" />
				</Select.Trigger>
				<Select.Content>
					{#each musicalKeys as key}
						<Select.Item value={key} label={key} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden name={attrs.name} bind:value={$formData.key} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Tags -->
	<Form.Field {form} name="tags">
		<Form.Control let:attrs>
			<Form.Label>Tags</Form.Label>
			<div class="flex flex-wrap gap-2">
				{#each $formData.tags as tag}
					<Badge variant="secondary">
						{tag}
						<button
							type="button"
							class="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
							on:click={() => removeTag(tag)}
						>
							<X class="h-3 w-3" />
							<span class="sr-only">Remove {tag} tag</span>
						</button>
					</Badge>
				{/each}
			</div>
			<div class="flex gap-2">
				<Input placeholder="Add tag..." bind:value={newTag} on:keydown={handleKeyDown} />
				<Button type="button" variant="outline" on:click={addTag}>
					<Plus class="h-4 w-4" />
				</Button>
			</div>
			<input hidden {...attrs} value={$formData.tags.join(',')} />
		</Form.Control>
		<Form.Description>Add relevant tags to help others find your project.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Audio File Upload -->
	<Form.Field {form} name="audioFile">
		<Form.Control let:attrs>
			<Form.Label>Audio File</Form.Label>
			<Input type="file" accept="audio/*" {...attrs} />
		</Form.Control>
		<Form.Description>Upload your audio file (MP3, WAV, etc.).</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Visibility -->
	<Form.Field {form} name="isPublic">
		<Form.Control let:attrs>
			<div class="flex items-center space-x-2">
				<Switch
					checked={$formData.isPublic}
					onCheckedChange={(checked) => ($formData.isPublic = checked)}
					{...attrs}
				/>
				<Form.Label>Make this project public</Form.Label>
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Submit Button -->
	<Form.Button>Create Project</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
