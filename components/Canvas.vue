<template>
    <div class=" select-none">
    
        <canvas class=""></canvas>
    </div>
</template>

<script setup>

onMounted(() => {


    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    let time = 0, velocity = 0.1, velocityTarget = 0.1, width, height

    let MAX_OFFSET = 400;
    let SPACING = 4;
    let POINTS = MAX_OFFSET / SPACING;
    let PEAK = MAX_OFFSET * 0.25;
    let POINTS_PER_LAP = 6;
    let SHADOW_STRENGTH = 6;

    resize();
    step();

    window.addEventListener('resize', resize);

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function step() {

        time += velocity;
        velocity += (velocityTarget - velocity) * 0.3;
        clear(); render(); requestAnimationFrame(step);
    }

    function clear() {
        context.clearRect(0, 0, width, height);
    }

    function render() {

        let x, y, cx = width / 2, cy = height / 2;
        context.globalCompositeOperation = 'lighter';
        context.strokeStyle = '#fff';
        context.shadowColor = '#fff';
        context.lineWidth = 2;
        context.beginPath();

        for (var i = POINTS; i > 0; i--) {

            let value = i * SPACING + (time % SPACING);
            let ax = Math.sin(value / POINTS_PER_LAP) * Math.PI, ay = Math.cos(value / POINTS_PER_LAP) * Math.PI;
            x = ax * value, y = ay * value * 0.35;
            let o = 1 - (Math.min(value, PEAK) / PEAK);

            y -= Math.pow(o, 2) * 200;
            y += 200 * value / MAX_OFFSET;
            y += x / cx * width * 0.1;

            context.globalAlpha = 1 - (value / MAX_OFFSET);
            context.shadowBlur = SHADOW_STRENGTH * o;
            context.lineTo(cx + x, cy + y);
            context.stroke();
            context.beginPath();
            context.moveTo(cx + x, cy + y);
        }

        context.lineTo(cx, cy - 200);
        context.lineTo(cx, 0);
        context.stroke();
    }

});

</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

canvas {
    background-color: #B42C3E;
}
</style>