<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';

  let canvas: HTMLCanvasElement;
  export let canvasWidth: number;
  export let canvasHeight: number;
  export let color: string;
  export let peaks: number[] = [];

  const drawWave = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!ctx || !peaks?.length) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const barWidth = 2;
    const gap = 1;
    const totalBarWidth = barWidth + gap;
    const halfHeight = height / 2;

    ctx.fillStyle = color;

    // Draw bars
    for (let i = 0; i < peaks.length; i++) {
      const x = i * totalBarWidth;
      const amplitude = Math.abs(peaks[i]) * halfHeight;
      
      // Draw bar
      ctx.fillRect(
        x,
        halfHeight - amplitude,
        barWidth,
        amplitude * 2
      );
    }
  };

  const updateCanvas = () => {
    if (!canvas || !canvasWidth || !canvasHeight) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth / (window.devicePixelRatio || 1)}px`;
    canvas.style.height = `${canvasHeight / (window.devicePixelRatio || 1)}px`;

    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    drawWave(ctx, canvasWidth / (window.devicePixelRatio || 1), canvasHeight / (window.devicePixelRatio || 1));
  };

  onMount(updateCanvas);
  afterUpdate(updateCanvas);
</script>

<canvas
  bind:this={canvas}
  class="absolute top-0 left-0 w-full h-full"
/>