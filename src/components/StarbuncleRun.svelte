<script lang="ts">
	import { onMount } from 'svelte';
	import anime from 'animejs';
    import { Tooltip } from "bootstrap";

    let wrapper: Element;
    let tooltip: Tooltip | null = null;
	let state = 'none';
	let changeBegan = 0;
	let starbuncles = [
		{
			name: 'Bailey',
			adopter: 'Ars Nouveau Team',
			bio: 'Ars Nouveau is a passion project brought to life by hundreds of contributions from the community. We hope you enjoy this Rainbow-buncle as much as we enjoy making this mod! Thanks for playing!',
			color: 'red'
		}
	];

	$: starbuncleIndex = 0;
    $: starbuncle = starbuncles[0];
	$: src = `/starbuncles/starbuncle_run_${starbuncles[starbuncleIndex].color}.gif`;

	function getRandomStarbuncleIndex() {
		return Math.floor(Math.random() * starbuncles.length);
	}

    function updateTooltip() {
        if (wrapper == null) return;
        if (tooltip != null) tooltip.dispose();
        tooltip = new Tooltip(wrapper, {
            title: starbuncle.bio
        })
    }

	onMount(() => {
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			anime({
				targets: '.buncle-box',
				translateX: ['-25%', '79%'],
				delay: 1000,
				endDelay: 5000,
				loop: true,
				duration: 3500,
				direction: 'alternate',
				easing: 'linear',
				changeBegin: function(_anim) {
					changeBegan++;
                    state = changeBegan % 2 === 1 ? 'FORWARDS' : 'BACKWARDS';
                    src = `/starbuncles/starbuncle_run_${starbuncles[starbuncleIndex].color}.gif`;
				},
				changeComplete: function(_anim) {
					if (changeBegan % 2 === 1) {
						state = 'WAITING';
						src = `/starbuncles/starbuncle_sitting_${starbuncles[starbuncleIndex].color}.png`;
					} else {
						starbuncleIndex = getRandomStarbuncleIndex();
                        starbuncle = starbuncles[starbuncleIndex];
                        updateTooltip();
					}
				}
			});
		}

		fetch('https://raw.githubusercontent.com/baileyholl/Ars-Nouveau/main/supporters.json')
			.then(response => response.json())
			.then(data => {
				starbuncles.push(...data.starbuncleAdoptions);
			});

        new Tooltip(wrapper, {
            title: starbuncle.bio
        });
	});
</script>

<style>
    .no-pointer {
        pointer-events: none
    }

    .pointer {
        pointer-events: auto;
    }

    .buncle-container {
        overflow: hidden;
        height: 50px;
        max-width: 500px;
        margin: auto;
        margin-top: 10px;
    }

    .buncle-box {
        height: 50px;
        width: 100%;
        background-color: white;
        position: relative;
        top: -100%;
    }

    :global(html[data-bs-theme="dark"]) .buncle-box {
        background-color: rgb(23, 24, 28);
    }

    .buncle {
        height: 100%;
        margin-left: -3px;
    }

    .buncle-name {
        position: relative;
        height: 50px;
    }

    .mirrored {
        transform: scaleX(-1);
        margin-left: -7px;
    }
</style>

<div class="container-lg fixed-top no-pointer">
    <div bind:this="{wrapper}" class="buncle-container pointer" data-bs-toggle="tooltip" data-bs-placement="bottom">
        <div class="buncle-name d-flex flex-column align-items-center">
            <p class="mb-0 text-body-emphasis">{starbuncle.name}</p>
            <p class="fs-6 lh-1">{starbuncle.adopter}</p>
        </div>
        <div class="buncle-box">
            <img src={src} alt="animated running Starbuncle" class="buncle" class:mirrored={state === "BACKWARDS"} />
        </div>
    </div>
</div>
