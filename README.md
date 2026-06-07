# WP 7.0 related entity dirty repro evidence

This branch only hosts lightweight repro artifacts for the draft PR `fix/passive-render-dirty-entities`.

- `videos/before-wp70-8-related-auto-dirty.mp4`: before the fix, a tiny post edit causes eight related records to become dirty.
- `videos/after-no-related-dirty.mp4`: after the fix, the same post edit leaves only the post dirty, and saving clears all dirty records.
- `proof/before-proof.json`: DevTools proof for the before run.
- `proof/after-proof.json`: DevTools proof for the after run.
