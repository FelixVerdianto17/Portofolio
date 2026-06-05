# AI Coding Rules

## Critical Rule
Always read PROJECT_BRIEF.md, FEATURE_PLAN.md, and AI_RULES.md before making changes.

## Main Rule

Build only what is requested in the current step.

Do not build extra sections unless requested.
Do not redesign the whole project.
Do not add unnecessary libraries.
Do not change unrelated files.

## Tech Rules

Use only:

* React
* Vite
* TypeScript
* Tailwind CSS
* Motion (for general React animations)
* Lenis (for smooth scrolling)
* HTML5 Canvas (for the sequence hero)

Do not use:

* Next.js
* Three.js
* Webflow
* Unsplash
* External image URLs
* Image generation tools

### GSAP Rule
GSAP is allowed ONLY for advanced text reveal or complex scroll-based text animation if absolutely necessary. Do not use GSAP everywhere. Keep Motion as the primary animation library.

## Asset Rules

Use only the image sequence from:

/public/sequence/

Do not rename the sequence files unless requested.
Do not replace the sequence images.
Do not generate new images.

## Code Rules

Keep code modular, clean, and easy to maintain.

Each component should have a clear responsibility:

* Preloader.tsx handles loading screen only.
* SmoothScrolling.tsx handles Lenis only.
* SequenceHero.tsx handles canvas sequence and hero overlay only.
* TextRevealIntro.tsx handles the word-by-word scroll reveal only.
* sequence.ts handles sequence path utilities.

## TypeScript Rules

Use proper TypeScript types.
Avoid using `any` unless truly necessary.
Avoid messy logic inside JSX.

## Styling Rules

Use Tailwind CSS.
Keep the design cinematic, dark, premium, and minimal.
Avoid messy gradients and random decorations.
Use responsive layout.

## Animation Rules

Use Motion for React animation.
Use Lenis for smooth scrolling.
Make animation smooth but not excessive.

## Canvas Rules

Preload images before drawing the sequence.
Prevent flickering.
Handle resize.
Use object-fit: cover logic.
Keep first and last frames stable.

## Response Rules

After making changes, explain:

1. Which MD files were changed
2. What direction was updated
3. What the next coding step should be

## Important Limitation

Do not continue to the next feature until the current feature works correctly.
