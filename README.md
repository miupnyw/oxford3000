# Oxford 3000 — คลังคำศัพท์

A single-page vocabulary browser for **The Oxford 3000™** word list, with Thai
pronunciations and translations. Browse all 3,000 A1–B2 words, filter by CEFR
level or category, search in English / phonetics / Thai, and flip cards in a
review mode to quiz yourself.
🔗 Live Demo: [oxford3000-rho.vercel.app](https://oxford3000-rho.vercel.app)

## Features

- **3,000 words** spanning CEFR levels A1, A2, B1, and B2
- **Search** across the English word, Thai reading, and Thai meaning
- **Filter** by level and by category
- **Review mode** (โหมดทบทวน) — hides answers and lets you tap cards to reveal them
- Grouped by category and sorted by category size

## Files

| File              | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `index.html`      | Page markup (header, controls, list container)       |
| `styles.css`      | Styling                                              |
| `script.js`       | Loads the data and renders / filters the word list   |
| `oxford3000.json` | The word data — 3,000 entries                        |

### Data format

`oxford3000.json` is an array of objects:

```json
{
  "word": "ability",
  "pos": "n.",
  "level": "A2",
  "reading": "เออะบีลิที",
  "meaning": "ความสามารถ",
  "cat": "คำนาม (ทั่วไป)"
}
```

## Running locally

`script.js` fetches `oxford3000.json` at runtime, which browsers block when the
page is opened directly via `file://`. Serve the folder over HTTP instead:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Credits

The Oxford 3000™ © Oxford University Press. Thai readings and translations by
KruDew TOEIC.
