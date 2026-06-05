# Feature Plan — Version 1

## Version 1 Goal

Build only the opening experience:

* Preloader
* Smooth scrolling setup
* Scroll-linked sequence hero
* Text overlay animation
* TextRevealIntro section

## Completed Steps

### Step 1 — Project Setup [COMPLETED]
Created React Vite project with TypeScript and required stack (Tailwind CSS, Motion, Lenis).

### Step 2 — Folder Structure [COMPLETED]
Set up component architecture.

### Step 3 — Global Style [COMPLETED]
Set up global black background styling and premium typography.

### Step 4 — Smooth Scrolling [COMPLETED]
Set up Lenis smooth scrolling wrapper.

### Step 5 — Preloader [COMPLETED]
Built preloader with 0 to 100 percentage animation and clean exit.

### Step 6 — Sequence Hero [COMPLETED]
Built the HTML5 canvas scrubbing logic using Motion `useScroll`.

### Step 7 — Text Overlay and Hero Polish [COMPLETED]
Added animated text overlays mapping to scroll progress and a smooth fade to black cinematic exit at the end of the scroll.

## Next Steps

### Step 8 — TextRevealIntro
The next planned section after SequenceHero.
It features a scroll-based word reveal animation. 

Requirements:
* Comes immediately after SequenceHero.
* Premium, large typography.
* Splits the paragraph into words and fades them in on scroll overlappingly.
* No external splitting libraries, handled cleanly with JS and Motion.

## Manual Testing Checklist

* npm run dev works
* No console errors
* Preloader appears first and animates properly
* Hero appears after preloader seamlessly
* Canvas does not flicker while scrubbing
* Overlays fade perfectly based on scroll position
* TextRevealIntro reveals text naturally word-by-word while scrolling
* Works on mobile and desktop
