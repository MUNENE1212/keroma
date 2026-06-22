# KEROMA — Brand Specification

> *"Recipes that remember."*

A heritage-modern brand for African recipe intelligence. Editorial, not SaaS.

---

## 1. Voice

| | We are | We are NOT |
|---|---|---|
| **Tone** | Warm, knowledgeable, unhurried | Preachy, excitable, dismissive |
| **Person** | A friend who's been cooking for thirty years and knows the why behind the recipe | A chef on TV; a corporate brand voice |
| **Verbosity** | Direct, every word earns its place | Long-winded, full of disclaimers |
| **Vocabulary** | Real African culinary terms — jiko, sufuria, ugali, matoke, berbere, nsima, injera, attiéké — without explaining them | Oversimplified to "African food", generic "global cuisine" |
| **AI honesty** | "Made with the help of AI" is fine to mention, but never lean on it as a selling point. The food matters, not the tech. | "Powered by GPT-4!", "AI magic", anthropomorphizing the model |

**Sample copy:**
- ✓ *"Pilau masala that turns weeknight chicken into a Swahili coast feast."*
- ✗ *"Unlock the power of AI-generated African cuisine!"*
- ✓ *"On the jiko, low heat, until the onions turn the colour of dark honey."*
- ✗ *"Cook your chicken until it's done!"*

---

## 2. Color

See `app/globals.css` for live values.

| Token | Hex | When to use |
|---|---|---|
| `clay` `#B5482A` | Primary CTAs, brand mark, link underline on hover | Don't use for body text |
| `clay-deep` `#7A2E1A` | Hover state on clay, headings in dark mode | |
| `cream` `#F5EFE6` | Page background (light mode) | |
| `cream-warm` `#EFE6D7` | Card surfaces, search backgrounds | |
| `moss` `#2C4A3E` | "Live" badges, success state, secondary CTAs | |
| `saffron` `#D6A437` | Premium upsells, ratings, featured ribbons | |
| `ink` `#1F1B17` | Body text | |
| `ink-soft` `#5C544B` | Captions, secondary text | |
| `mist` `#E8DFD3` | Dividers, disabled surfaces | |
| `error` `#A8321F` | Error state | |

---

## 3. Typography

- **Display (Fraunces)** — variable serif with heritage warmth. Use `font-display` class for H1–H3, hero, recipe titles, pull quotes.
- **Body (Inter)** — variable sans, clean. Use `font-body` (or default) for everything else.
- **Mono (JetBrains Mono)** — timers, ingredient weights, code.

**Sentence case everywhere.** Only `font-weight 500+` for category eyebrows in caps with `letter-spacing: 0.12em`.

**Optical sizing:** Fraunces has an `opsz` axis — use `font-variation-settings: "opsz" 144` for display sizes, `"opsz" 14` for body. Always set in the relevant CSS variable.

---

## 4. Photography

- Real, warm-lit, slightly imperfect. Avoid stock-photo gloss.
- Hand-thrown pottery (clay pots, sufuria, sufuria lids), wooden boards, copper bowls.
- Steam visible. Hands mid-action. Hands-of-granny cooking.
- Backgrounds: wood, clay, stone, fabric (kanga if region appropriate), not marble/stainless steel.
- Color cast: warm amber / late-afternoon window light. Avoid blue-shifted or high-key white.
- For recipe hero images: overhead shot at 45°, plate fills 60% of frame, garnish visible.

---

## 5. Logo

Wordmark only at MVP. Custom K with a cooking pot/steam curl as the left leg of the K. See `components/brand/Logo.tsx`.

Full logo lockup with tagline variant in v2.

---

## 6. Do / Don't

### Do
- Lead with the recipe, not the tech
- Use real African food vocabulary
- Show the source: "From the Swahili coast", "Berbere spice routes"
- Default to generous whitespace
- Default to light mode (dark is opt-in via toggle)

### Don't
- Lead with "AI", "GPT", "machine learning", or any model name
- Use "elevate", "unleash", "journey", "transform", "experience" (as a verb)
- Show people with stock-photo smiles
- Use icons where a word would do
- Apply heavy box shadows
- Use gradients on text