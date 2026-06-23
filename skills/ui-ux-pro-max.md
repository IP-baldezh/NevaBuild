---
name: ui-ux-pro-max
source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
description: Comprehensive design intelligence for web/mobile UI. 67 styles, 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types. Priority-based rule system covering accessibility, touch, performance, layout, typography, animation, forms, and navigation.
---

# UI/UX Pro Max - Design Intelligence

Apply this skill whenever a task involves UI structure, visual design decisions, interaction patterns, or user experience quality control.

## When to Use

**Must use:** Designing new pages, creating/refactoring UI components, choosing color/typography/layout, reviewing UI code for accessibility or visual consistency, implementing navigation or animations, making product-level design decisions.

**Skip:** Pure backend logic, API/database design, performance optimization unrelated to UI, infrastructure/DevOps, non-visual scripts.

**Decision criteria:** If the task will change how a feature **looks, feels, moves, or is interacted with**, apply this skill.

---

## Rule Priority Order

| Priority | Category | Impact | Key Checks | Anti-Patterns |
|----------|----------|--------|------------|---------------|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels | Removing focus rings, Icon-only buttons without labels |
| 2 | Touch & Interaction | CRITICAL | Min size 44x44px, 8px+ spacing, Loading feedback | Relying on hover only, Instant state changes (0ms) |
| 3 | Performance | HIGH | WebP/AVIF, Lazy loading, Reserve space (CLS < 0.1) | Layout thrashing, Cumulative Layout Shift |
| 4 | Style Selection | HIGH | Match product type, Consistency, SVG icons (no emoji) | Mixing flat & skeuomorphic randomly, Emoji as icons |
| 5 | Layout & Responsive | HIGH | Mobile-first breakpoints, Viewport meta, No horizontal scroll | Fixed px container widths, Disable zoom |
| 6 | Typography & Color | MEDIUM | Base 16px, Line-height 1.5, Semantic color tokens | Text < 12px body, Gray-on-gray, Raw hex in components |
| 7 | Animation | MEDIUM | Duration 150-300ms, Motion conveys meaning, Spatial continuity | Decorative-only animation, Animating width/height |
| 8 | Forms & Feedback | MEDIUM | Visible labels, Error near field, Helper text | Placeholder-only label, Errors only at top |
| 9 | Navigation Patterns | HIGH | Predictable back, Bottom nav ≤5, Deep linking | Overloaded nav, Broken back behavior |
| 10 | Charts & Data | LOW | Legends, Tooltips, Accessible colors | Relying on color alone to convey meaning |

---

## 1. Accessibility (CRITICAL)

- `color-contrast` - Minimum 4.5:1 ratio for normal text (large text 3:1)
- `focus-states` - Visible focus rings on interactive elements (2-4px)
- `alt-text` - Descriptive alt text for meaningful images
- `aria-labels` - aria-label for icon-only buttons
- `keyboard-nav` - Tab order matches visual order; full keyboard support
- `form-labels` - Use label with for attribute
- `skip-links` - Skip to main content for keyboard users
- `heading-hierarchy` - Sequential h1→h6, no level skip
- `color-not-only` - Don't convey info by color alone (add icon/text)
- `dynamic-type` - Support system text scaling; avoid truncation as text grows
- `reduced-motion` - Respect prefers-reduced-motion; reduce/disable animations when requested
- `voiceover-sr` - Meaningful accessibilityLabel/accessibilityHint; logical reading order
- `escape-routes` - Provide cancel/back in modals and multi-step flows

## 2. Touch & Interaction (CRITICAL)

- `touch-target-size` - Min 44x44pt (Apple) / 48x48dp (Material); extend hit area beyond visual bounds if needed
- `touch-spacing` - Minimum 8px gap between touch targets
- `hover-vs-tap` - Use click/tap for primary interactions; don't rely on hover alone
- `loading-buttons` - Disable button during async operations; show spinner or progress
- `error-feedback` - Clear error messages near problem
- `cursor-pointer` - Add cursor-pointer to clickable elements (Web)
- `tap-delay` - Use touch-action: manipulation to reduce 300ms delay (Web)
- `press-feedback` - Visual feedback on press (ripple/highlight)
- `safe-area-awareness` - Keep primary touch targets away from notch, Dynamic Island, gesture bar

## 3. Performance (HIGH)

- `image-optimization` - Use WebP/AVIF, responsive images (srcset/sizes), lazy load non-critical assets
- `image-dimension` - Declare width/height or use aspect-ratio to prevent layout shift (CLS)
- `font-loading` - Use font-display: swap/optional to avoid invisible text (FOIT)
- `critical-css` - Prioritize above-the-fold CSS
- `lazy-loading` - Lazy load non-hero components via dynamic import / route-level splitting
- `bundle-splitting` - Split code by route/feature (React Suspense / Next.js dynamic)
- `content-jumping` - Reserve space for async content to avoid layout jumps
- `virtualize-lists` - Virtualize lists with 50+ items
- `progressive-loading` - Use skeleton screens / shimmer instead of long blocking spinners for >1s operations

## 4. Style Selection (HIGH)

- `style-match` - Match style to product type
- `consistency` - Use same style across all pages
- `no-emoji-icons` - Use SVG icons (Heroicons, Lucide, Phosphor), not emojis
- `effects-match-style` - Shadows, blur, radius aligned with chosen style
- `platform-adaptive` - Respect platform idioms (iOS HIG vs Material)
- `state-clarity` - Make hover/pressed/disabled states visually distinct
- `elevation-consistent` - Use a consistent elevation/shadow scale for cards, sheets, modals
- `dark-mode-pairing` - Design light/dark variants together
- `primary-action` - Each screen should have only one primary CTA

## 5. Layout & Responsive (HIGH)

- `viewport-meta` - width=device-width initial-scale=1 (never disable zoom)
- `mobile-first` - Design mobile-first, then scale up
- `breakpoint-consistency` - Use systematic breakpoints (375 / 768 / 1024 / 1440)
- `readable-font-size` - Minimum 16px body text on mobile (avoids iOS auto-zoom)
- `line-length-control` - Mobile 35-60 chars per line; desktop 60-75 chars
- `horizontal-scroll` - No horizontal scroll on mobile
- `spacing-scale` - Use 4pt/8dp incremental spacing system
- `container-width` - Consistent max-width on desktop (max-w-6xl / 7xl)
- `z-index-management` - Define layered z-index scale
- `viewport-units` - Prefer min-h-dvh over 100vh on mobile
- `visual-hierarchy` - Establish hierarchy via size, spacing, contrast - not color alone

## 6. Typography & Color (MEDIUM)

- `line-height` - Use 1.5-1.75 for body text
- `line-length` - Limit to 65-75 characters per line
- `font-pairing` - Match heading/body font personalities
- `font-scale` - Consistent type scale (e.g. 12 14 16 18 24 32)
- `weight-hierarchy` - Bold headings (600-700), Regular body (400), Medium labels (500)
- `color-semantic` - Define semantic color tokens (primary, secondary, error, surface) not raw hex
- `color-dark-mode` - Dark mode uses desaturated / lighter tonal variants, not inverted colors
- `color-accessible-pairs` - Foreground/background pairs must meet 4.5:1 (AA) or 7:1 (AAA)
- `number-tabular` - Use tabular/monospaced figures for data columns, prices, and timers
- `whitespace-balance` - Use whitespace intentionally to group related items

## 7. Animation (MEDIUM)

- `duration-timing` - Use 150-300ms for micro-interactions; complex transitions ≤400ms
- `transform-performance` - Use transform/opacity only; avoid animating width/height/top/left
- `loading-states` - Show skeleton or progress indicator when loading exceeds 300ms
- `excessive-motion` - Animate 1-2 key elements per view max
- `easing` - Use ease-out for entering, ease-in for exiting; avoid linear for UI transitions
- `motion-meaning` - Every animation must express a cause-effect relationship
- `continuity` - Page/screen transitions should maintain spatial continuity
- `spring-physics` - Prefer spring/physics-based curves for natural feel
- `exit-faster-than-enter` - Exit animations shorter than enter (~60-70% of enter duration)
- `stagger-sequence` - Stagger list/grid item entrance by 30-50ms per item
- `interruptible` - Animations must be interruptible; user tap/gesture cancels in-progress animation
- `no-blocking-animation` - Never block user input during an animation
- `layout-shift-avoid` - Animations must not cause layout reflow or CLS

## 8. Forms & Feedback (MEDIUM)

- `input-labels` - Visible label per input (not placeholder-only)
- `error-placement` - Show error below the related field
- `submit-feedback` - Loading then success/error state on submit
- `required-indicators` - Mark required fields (e.g. asterisk)
- `empty-states` - Helpful message and action when no content
- `toast-dismiss` - Auto-dismiss toasts in 3-5s
- `confirmation-dialogs` - Confirm before destructive actions
- `input-helper-text` - Provide persistent helper text below complex inputs, not just placeholder
- `disabled-states` - Disabled elements use reduced opacity (0.38-0.5) + cursor change + semantic attribute
- `progressive-disclosure` - Reveal complex options progressively; don't overwhelm users upfront
- `inline-validation` - Validate on blur (not keystroke); show error only after user finishes input
- `input-type-keyboard` - Use semantic input types (email, tel, number) to trigger correct mobile keyboard
- `autofill-support` - Use autocomplete / textContentType attributes so system can autofill
- `undo-support` - Allow undo for destructive or bulk actions
- `error-clarity` - Error messages must state cause + how to fix (not just "Invalid input")
- `destructive-emphasis` - Destructive actions use semantic danger color (red) and are visually separated

## 9. Navigation Patterns (HIGH)

- `bottom-nav-limit` - Bottom navigation max 5 items; use labels with icons
- `drawer-usage` - Use drawer/sidebar for secondary navigation, not primary actions
- `back-behavior` - Back navigation must be predictable and consistent; preserve scroll/state
- `deep-linking` - All key screens must be reachable via deep link / URL
- `nav-label-icon` - Navigation items must have both icon and text label
- `nav-state-active` - Current location must be visually highlighted in navigation

---

## Pre-Delivery Verification

Before completing any UI work, confirm:
- [ ] Vector-only assets used (no emoji icons)
- [ ] Pressed states don't shift layout
- [ ] Semantic color tokens control theming (no raw hex in components)
- [ ] Touch targets meet minimums (44x44px)
- [ ] Focus order matches visual hierarchy
- [ ] Both light and dark modes tested
- [ ] Viewport stability: `min-h-[100dvh]`, never `h-screen`
- [ ] Accessibility traits properly implemented (aria-labels, alt text, keyboard nav)
- [ ] No horizontal scroll on mobile
- [ ] Animation respects `prefers-reduced-motion`
