# Performance baseline

Measured on 2026-07-15 as the performance and reference-page pass. The goal is to keep route-local features route-local: shared application JavaScript at or below 230 kB raw, search at or below 425 kB raw, sources at or below 10 kB raw, and the convergence-graph chapter at or below 510 kB raw.

## Baseline

`pnpm build`, with one warmup and three timed runs, measured:

| Metric | Result |
| --- | --- |
| Build minimum | 5.678 s |
| Build median | 5.705 s |
| Build maximum | 5.810 s |
| Shared application chunk | 222.91 kB raw, 72.68 kB gzip |
| Search chunk | 410.68 kB raw, 141.80 kB gzip |
| Sources chunk | 4.34 kB raw, 1.52 kB gzip |
| Convergence graph chapter | 494.74 kB raw, 160.31 kB gzip |

The client-build CPU profile covered 1.951 s. Garbage collection was the largest single sample category at 8.1%; no application function owned a meaningful fraction of the build. The search index and Cytoscape graph are already isolated in lazy route chunks, and the sources page fetches bibliography data rather than importing chapter UI chunks in the client.

The build now runs `pnpm check:bundles` before prerendering. It enforces these budgets so future changes cannot quietly move search or graph code onto the shared route.
