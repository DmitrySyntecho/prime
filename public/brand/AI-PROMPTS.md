# Prime Line AV — AI visual guidelines

Tool: **Higgsfield** · model `gpt_image_2_5` · 2k · quality high

These are the templates that produced the banner plates and the 3D icon set in this kit. Fill the [VARIABLES], keep the palette and negative-space lines verbatim, and generate one plate per aspect ratio — never crop a 16:9 into a 9:16. For icons, keep the camera, light and materials identical so the set stays coherent.

## Palette to name in every prompt

- `#FF2D6F` — Prime Pink — primary light source, LED walls, beams
- `#FF5E3A` — Stage Coral — warm partner of pink, uplighting
- `#FFD24A` — Spotlight Gold — pin-spots, highlights, sparkle
- `#7C3AED` — Haze Violet — ambient haze and shadows only
- `#050310` — Stage Black — the ground every plate falls off into

## Rules

- Light the scene like a show: coloured stage light (pink, coral, gold) cutting through haze, never flat daylight or office fluorescents.
- Every plate falls off into Stage Black #050310 on the side where copy will sit — LEFT for 16:9 and 1:1, BOTTOM for 4:5 and 9:16.
- People are real crew, guests and presenters mid-moment: eyes open, faces lit, never posed stock smiles at camera.
- Keep the key subject and the text zone apart — the subject owns one side, the copy owns the other.
- High contrast, crushed blacks, rich saturated colour. Cinematic lens language (ARRI / 35mm / shallow depth of field).
- No text, logos, watermarks or readable screen content in the plate — copy is set afterwards in Manrope.
- Violet is atmosphere only. Never make violet the dominant light — that reads as nightclub, not production.

## Advertising visual — event in full swing

**When:** Banner backgrounds for a service campaign (stage, LED, sound, lighting).

**Ratios:** 16:9 · 1:1 · 4:5 · 9:16

**Variables:** [SCENE] [SUBJECT] [CAMPAIGN] [COPY_SIDE]

```text
Cinematic photoreal photograph of [SCENE] for a [CAMPAIGN] campaign. [SUBJECT] positioned on the opposite side from [COPY_SIDE], eyes open, lit by stage light. A massive LED wall and moving-head beams glow hot pink #FF2D6F and coral orange #FF5E3A, warm gold #FFD24A pin-spots, light atmospheric haze. The [COPY_SIDE] of the frame falls off into deep near-black #050310 with only soft violet #7C3AED ambient haze — clean negative space for headline text, no objects there. Shot on ARRI Alexa, 35mm, shallow depth of field, high contrast, crushed blacks, rich saturated stage colour, no text, no logos, no watermark.
```

## Person — crew, presenter or guest

**When:** Portrait-led social posts, testimonials, hiring, ‘meet the crew’.

**Ratios:** 1:1 · 4:5 · 9:16

**Variables:** [SUBJECT] [SCENE] [COPY_SIDE]

```text
Photoreal portrait of [SUBJECT] at [SCENE], eyes open and engaged with the moment, natural expression, face lit by warm gold #FFD24A key light with hot pink #FF2D6F and coral #FF5E3A rim light from the stage behind, background dissolving into magenta bokeh. The [COPY_SIDE] of the frame fades into deep near-black #050310 with subtle violet #7C3AED haze for text. 50mm lens, shallow depth of field, cinematic grade, real skin texture, no text, no logos, no watermark.
```

## Product / equipment hero

**When:** Rental catalogue, LED wall sizes, packages, shop product cards.

**Ratios:** 1:1 · 4:5 · 16:9

**Variables:** [PRODUCT] [SCENE] [COPY_SIDE]

```text
Premium product photograph of [PRODUCT] set up at [SCENE], hero three-quarter angle, crisp detail on hardware, LED pixels and cables. Lit like a stage: hot pink #FF2D6F and coral #FF5E3A edge light, a single warm gold #FFD24A spot on the product, glossy black floor reflection. The [COPY_SIDE] of the frame is clean deep near-black #050310 negative space. High contrast, studio-meets-stage, 85mm, no text, no logos, no watermark.
```

## Abstract — light, haze and beams

**When:** Backgrounds for announcements, offers, quote-form hero, email headers.

**Ratios:** 16:9 · 1:1 · 9:16 · 21:9

**Variables:** [CAMPAIGN] [COPY_SIDE]

```text
Abstract stage-lighting composition for [CAMPAIGN]: volumetric beams of hot pink #FF2D6F and coral orange #FF5E3A fanning through dense haze from the top corner, sparse warm gold #FFD24A sparkles, a soft 56px light grid barely visible on the floor plane, violet #7C3AED ambient glow deep in the shadows. The [COPY_SIDE] is calm near-black #050310 for text. Photoreal volumetric light, film grain, high contrast, no people, no text, no logos.
```

## 3D equipment icon

**When:** Product categories, empty states, ad stickers — one consistent set (12 shipped in /brand/icons-3d).

**Ratios:** 1:1 · background: transparent

**Variables:** [OBJECT] [DETAIL]

```text
Premium 3D app-style icon of [OBJECT], [DETAIL]. Glossy dark graphite body, main surfaces in a hot pink #FF2D6F to coral #FF5E3A gradient, warm gold #FFD24A accent details, subtle pink rim light and soft inner glow, three-quarter isometric view, centered with generous padding, smooth rounded forms, high-end Octane/Blender render, studio lighting, transparent background, no text, no logos, absolutely no green.
```
