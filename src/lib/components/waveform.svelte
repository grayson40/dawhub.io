<script lang="ts">
	import { onMount } from 'svelte';
	import WaveCanvas from './wave-canvas.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Play, Pause } from 'lucide-svelte';
	import { browser } from '$app/environment';

	export let audioUrl: string;
	export let isPlaying: boolean = false;
	export let onPlayPause: (event: MouseEvent) => void;

	let containerWidth: number;
	let peaks: number[] = [];
	let percent = 0;
	let isLoading = true;
	let audio: HTMLAudioElement;

	const height = 128;
	const waveColor = 'rgba(148, 163, 184, 0.4)';
	const progressColor = '#22c55e';
	let pixelRatio = 1;

	async function loadAudio() {
		if (!browser) return;

		try {
			const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
			const audioContext = new AudioContext();

			audio = new Audio(audioUrl);
			audio.addEventListener('timeupdate', updateProgress);

			const response = await fetch(audioUrl);
			const arrayBuffer = await response.arrayBuffer();
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

			const rawData = audioBuffer.getChannelData(0);
			const sampleSize = Math.floor(rawData.length / containerWidth);
			peaks = generatePeaks(rawData, sampleSize);

			isLoading = false;
		} catch (error) {
			console.error('Error loading audio:', error);
			isLoading = false;
		}
	}

	function generatePeaks(data: Float32Array, sampleSize: number): number[] {
		const peaks: number[] = [];

		for (let i = 0; i < data.length; i += sampleSize) {
			let min = 1.0;
			let max = -1.0;

			for (let j = 0; j < sampleSize && i + j < data.length; j++) {
				const value = data[i + j];
				if (value > max) max = value;
				if (value < min) min = value;
			}

			peaks.push(max);
		}

		return peaks;
	}

	function updateProgress() {
		if (!audio) return;
		percent = audio.currentTime / audio.duration;
	}

	function handleWaveClick(e: MouseEvent) {
		if (!audio || !containerWidth) return;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const x = e.clientX - rect.left;
		const clickPosition = x / containerWidth;
		audio.currentTime = clickPosition * audio.duration;
		percent = clickPosition;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onPlayPause(new MouseEvent('click'));
		}
	}

	function handlePlayPauseClick(e: MouseEvent) {
		e.stopPropagation();
		onPlayPause(e);
	}

	onMount(async () => {
		if (!browser) return;
		pixelRatio = window.devicePixelRatio || 1;
		await loadAudio();
	});
</script>

<div class="relative w-full overflow-hidden rounded-lg border border-border bg-card">
	{#if isLoading}
		<div class="h-32 animate-pulse bg-accent/10" />
	{:else}
		<button
			type="button"
			class="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
			bind:clientWidth={containerWidth}
			on:click={handleWaveClick}
			on:keydown={handleKeyDown}
			aria-label={`${isPlaying ? 'Pause' : 'Play'} audio waveform`}
		>
			{#if peaks.length > 0 && containerWidth}
				<!-- Background wave -->
				<WaveCanvas
					{peaks}
					color={waveColor}
					canvasWidth={containerWidth * pixelRatio}
					canvasHeight={height * pixelRatio}
				/>

				<!-- Progress wave -->
				<div
					class="absolute left-0 top-0 overflow-hidden transition-all duration-100"
					style="width: {containerWidth * percent}px; height: {height}px;"
				>
					<WaveCanvas
						{peaks}
						color={progressColor}
						canvasWidth={containerWidth * pixelRatio}
						canvasHeight={height * pixelRatio}
					/>
				</div>
			{/if}

			<!-- Play button -->
			<div class="absolute left-4 top-1/2 -translate-y-1/2">
				<Button
					variant="outline"
					size="icon"
					class="h-8 w-8 rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background/90"
					on:click={handlePlayPauseClick}
				>
					{#if isPlaying}
						<Pause class="h-4 w-4" />
					{:else}
						<Play class="h-4 w-4" />
					{/if}
				</Button>
			</div>
		</button>
	{/if}
</div>

<style>
	button {
		height: 128px;
		cursor: pointer;
	}
</style>
