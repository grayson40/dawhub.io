<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Play, Pause } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let audioUrl: string;
	export let isPlaying: boolean = false;
	export let onPlayPause: () => void = () => {};

	let canvas: HTMLCanvasElement;
	let audioContext: AudioContext | undefined;
	let audioBuffer: AudioBuffer | undefined;
	let canvasCtx: CanvasRenderingContext2D | undefined;
	let hoveredPosition = -1;
	let animationFrame: number | undefined;
	let audio: HTMLAudioElement | undefined;

	// Tweened values for smooth animations
	const currentPosition = tweened(0, {
		duration: 200,
		easing: cubicOut
	});

	// Professional color scheme
	const backgroundColor = '#0f172a'; // Slate 900
	const waveformColor = 'rgba(148, 163, 184, 0.4)'; // Slate 400 with opacity
	const progressColor = '#22c55e'; // Success green
	const progressColorLight = 'rgba(34, 197, 94, 0.2)'; // Success green with opacity
	const hoverColor = 'rgba(255, 255, 255, 0.1)';

	// Performance optimization: Pre-calculate waveform data
	let waveformData: { min: number; max: number }[] = [];

	onMount(async () => {
		if (!browser) return;

		audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		canvasCtx = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D; // Assert type
		audio = new Audio(audioUrl);

		try {
			const response = await fetch(audioUrl);
			const arrayBuffer = await response.arrayBuffer();
			audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

			// Pre-calculate waveform data
			calculateWaveformData();
			resizeCanvas();
			drawWaveform();

			window.addEventListener('resize', resizeCanvas);
		} catch (error) {
			console.error('Error loading audio:', error);
		}
	});

	onDestroy(() => {
		if (!browser) return;
		window.removeEventListener('resize', resizeCanvas);
		if (animationFrame) {
			window.cancelAnimationFrame(animationFrame);
		}
		if (audioContext) {
			audioContext.close();
		}
	});

	function calculateWaveformData() {
		if (!audioBuffer || !canvas) return;

		const width = canvas.width;
		const channelData = audioBuffer.getChannelData(0);
		const step = Math.ceil(channelData.length / width);

		waveformData = Array.from({ length: width }, (_, i) => {
			let min = 1.0;
			let max = -1.0;

			for (let j = 0; j < step; j++) {
				const datum = channelData[i * step + j];
				if (datum < min) min = datum;
				if (datum > max) max = datum;
			}

			return { min, max };
		});
	}

	function resizeCanvas() {
		if (!canvas) return;
		const parentWidth = canvas.parentElement?.clientWidth ?? 800;
		const scale = window.devicePixelRatio || 1;

		canvas.width = parentWidth * scale;
		canvas.height = 128 * scale;
		canvas.style.width = `${parentWidth}px`;
		canvas.style.height = '128px';

		if (canvasCtx) {
			canvasCtx.scale(scale, scale);
		}

		calculateWaveformData();
		drawWaveform();
	}

	function drawWaveform() {
		if (!canvasCtx || !canvas || !waveformData.length) return;

		const width = canvas.width / (window.devicePixelRatio || 1);
		const height = canvas.height / (window.devicePixelRatio || 1);
		const amp = height / 2;
		const barWidth = 2;
		const gap = 1;
		const totalBarWidth = barWidth + gap;

		// Clear canvas with background
		canvasCtx.fillStyle = backgroundColor;
		canvasCtx.fillRect(0, 0, width, height);

		// Draw center line
		canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
		canvasCtx.fillRect(0, height / 2, width, 1);

		const currentPos = $currentPosition * width;

		// Draw waveform bars
		waveformData.forEach((data, i) => {
			const x = i * totalBarWidth;
			const isProgress = x < currentPos;

			// Skip rendering if outside visible area
			if (x > width) return;

			// Calculate bar height with smoothing
			const barHeight = Math.max(2, (data.max - data.min) * amp);
			const barY = (height - barHeight) / 2;

			// Determine bar color
			if (isProgress) {
				canvasCtx!.fillStyle = progressColor;
				// Draw progress background
				canvasCtx!.fillStyle = progressColorLight;
				canvasCtx!.fillRect(x, 0, barWidth, height);
			} else {
				canvasCtx!.fillStyle = waveformColor;
			}

			// Draw hover effect
			if (i === hoveredPosition) {
				canvasCtx!.fillStyle = hoverColor;
				canvasCtx!.fillRect(x - 1, 0, totalBarWidth + 2, height);
			}

			// Draw bar
			canvasCtx!.fillRect(x, barY, barWidth, barHeight);
		});
	}

	function handleMouseMove(event: MouseEvent) {
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		hoveredPosition = Math.floor(x / 3);
		drawWaveform();
	}

	function handleMouseLeave() {
		hoveredPosition = -1;
		drawWaveform();
	}

	function handleClick(event: MouseEvent) {
		if (!canvas || !audio) return;
		const rect = canvas.getBoundingClientRect();
		const clickPosition = (event.clientX - rect.left) / rect.width;

		audio.currentTime = clickPosition * audio.duration;
		currentPosition.set(clickPosition);
		drawWaveform();
	}

	function updateProgress() {
		if (!browser || !audio) return;

		if (isPlaying) {
			currentPosition.set(audio.currentTime / audio.duration);
			drawWaveform();
		}
		animationFrame = window.requestAnimationFrame(updateProgress);
	}

	$: if (browser && audio) {
		if (isPlaying) {
			audio.play();
			updateProgress();
		} else {
			audio.pause();
			if (animationFrame) {
				window.cancelAnimationFrame(animationFrame);
			}
		}
	}
</script>

<div class="relative w-full overflow-hidden rounded-lg border border-border bg-card">
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/5 to-background/20"
	/>

	<canvas
		bind:this={canvas}
		class="w-full cursor-pointer"
		on:mousemove={handleMouseMove}
		on:mouseleave={handleMouseLeave}
		on:click={handleClick}
	/>

	<div class="absolute left-4 top-1/2 -translate-y-1/2">
		<Button
			variant="outline"
			size="icon"
			class="h-8 w-8 rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background/90"
			on:click={onPlayPause}
		>
			{#if isPlaying}
				<Pause class="h-4 w-4" />
			{:else}
				<Play class="h-4 w-4" />
			{/if}
		</Button>
	</div>
</div>
