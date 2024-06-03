<script lang="ts">
	import { onMount } from 'svelte';
	import anime from 'animejs';
    import { Tooltip } from "bootstrap";

    enum StateTypes {
        FORWARDS = "FORWARDS",
        BACKWARDS = "BACKWARDS",
        WAITING = "WAITING"
    }

    function getType(newState: StateTypes) {
        switch(newState) {
            case 'FORWARDS':
            case 'BACKWARDS': return "run"
            default: return "sitting"
        }
    }

    function setState(newState: StateTypes) {
        state = newState;
        const type = getType(newState);
        const color = starbuncle.color == "rainbow" ? "white" : starbuncle.color;
        src = `/starbuncles/starbuncle_${type}_${color}.${type == "run" ? "gif" : "png"}`
    }

    (anime as any).suspendWhenDocumentHidden = false;

    let wrapper: Element;
    let tooltip: Tooltip | null = null;
	let state = 'none';
	let starbuncles = [
		{
			name: 'Bailey',
			adopter: 'Ars Nouveau Team',
			bio: 'Ars Nouveau is a passion project brought to life by hundreds of contributions from the community. We hope you enjoy this Rainbow-buncle as much as we enjoy making this mod! Thanks for playing!',
			color: 'rainbow'
		}
	];

    let starbuncle = starbuncles[0];
	$: src = "";
    
    setState(StateTypes.FORWARDS);

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
            anime.timeline({
                targets: '.buncle-box',
                loop: true,
                easing: 'linear'
            }).add({
                translateX: '80%',
                duration: 3500,
                changeBegin(_anim) {
                    setState(StateTypes.FORWARDS)
                },
            }).add({
                duration: 5000,
                changeBegin(_anim) {
                    setState(StateTypes.WAITING);
                },
            }).add({
                translateX: '-25%',
                endDelay: 1000,
                duration: 3500,
                changeBegin(_anim) {
                    setState(StateTypes.BACKWARDS);
                },
                changeComplete(_anim) {
                    starbuncle = starbuncles[getRandomStarbuncleIndex()];
                    updateTooltip();
                },
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
        image-rendering: crisp-edges;
    }

    .buncle-name {
        position: relative;
        height: 50px;
    }

    .mirrored {
        transform: scaleX(-1);
        margin-left: -7px;
    }

    .rainbow {
        animation-name: rainbow;
        animation-duration: 15s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    @keyframes rainbow {
        0% {
            filter: sepia() saturate(2.25) hue-rotate(0deg);
        }
        100% {
            filter: sepia() saturate(2.25) hue-rotate(360deg);
        }
    }
</style>

<div class="container-lg fixed-top no-pointer d-none d-lg-block">
    <div bind:this="{wrapper}" class="buncle-container pointer" data-bs-toggle="tooltip" data-bs-placement="bottom">
        <div class="buncle-name d-flex flex-column align-items-center">
            <p class="mb-0 text-body-emphasis">{starbuncle.name}</p>
            <p class="fs-6 lh-1">{starbuncle.adopter}</p>
        </div>
        <div class="buncle-box" style="transform: translateX(-25%)">
            <img src={src} alt="animated running Starbuncle" class="buncle" class:mirrored={state === "BACKWARDS"} class:rainbow={starbuncle.color === "rainbow"} />
        </div>
    </div>
</div>
