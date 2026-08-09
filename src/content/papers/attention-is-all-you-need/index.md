---
title: "Attention Is All You Need"
description: "A walkthrough of the Transformer architecture — how self-attention replaced recurrence, and why that mattered."
date: 2026-08-10
tags: ["transformers", "attention", "nlp", "paper-review"]
draft: false
---

> Vaswani et al., 2017 — the paper that introduced the Transformer, and with
> it, the architecture underlying essentially every modern large language
> model.

## Why this paper mattered

Before Transformers, sequence modeling leaned on recurrent networks (RNNs,
LSTMs, GRUs) or convolutions. Both have a structural cost: recurrence
processes tokens one step at a time, which makes training hard to
parallelize and makes it difficult for information to flow between tokens
that are far apart in the sequence. Convolutional approaches parallelize
better but still need many layers to connect distant positions.

"Attention Is All You Need" made a simple, aggressive claim: drop recurrence
and convolution entirely, and build the model out of attention alone. The
result — the Transformer — trained faster, parallelized across the whole
sequence, and scaled better than anything that came before it.

## Self-attention, in short

Self-attention lets every position in a sequence look at every other
position directly, weighting how much to attend to each one. For each
token, the model computes three vectors:

- **Query (Q)** — what this token is looking for
- **Key (K)** — what this token offers, for matching against queries
- **Value (V)** — the actual content pulled forward if attended to

The attention weights come from comparing queries against keys:

```
Attention(Q, K, V) = softmax(QKᵀ / √d_k) V
```

The `√d_k` scaling keeps the dot products from growing too large as
dimensionality increases, which otherwise pushes the softmax into
saturated, low-gradient regions.

*(Placeholder — swap in the paper's actual scaled dot-product attention
diagram here once you have it: `./assets/scaled-dot-product-attention.png`)*

## Multi-head attention

Rather than computing a single attention function, the Transformer runs
several attention "heads" in parallel, each with its own learned Q/K/V
projections, then concatenates and linearly projects the results. Each head
can specialize — one might track syntactic relationships, another
coreference, another local word order — and the model combines those
perspectives rather than relying on one averaged view.

*(Placeholder — the paper's multi-head attention diagram fits well here:
`./assets/multi-head-attention.png`)*

## The encoder-decoder architecture

The Transformer keeps the encoder-decoder structure common in sequence
transduction, but built entirely from attention and feed-forward layers:

- **Encoder**: a stack of identical layers, each with a multi-head
  self-attention sub-layer followed by a position-wise feed-forward
  network, with residual connections and layer normalization around each.
- **Decoder**: the same, plus a second multi-head attention sub-layer that
  attends over the encoder's output, and a masking scheme on
  self-attention so a position can't attend to later positions (preserving
  the autoregressive property during generation).

*(Placeholder — the paper's full architecture diagram belongs here:
`./assets/architecture.png`)*

## Positional encoding

Since there's no recurrence or convolution, the model has no inherent
sense of token order — attention alone is permutation-invariant. The
paper injects position information via sinusoidal positional encodings
added to the input embeddings, using sine and cosine functions of
different frequencies. This lets the model learn to attend by relative
position, and in principle extrapolate to sequence lengths longer than
those seen during training.

## Why it scaled

Two properties made the Transformer unusually well suited to scaling up:

1. **Parallelism** — self-attention layers process all positions
   simultaneously, unlike the sequential dependency in RNNs, so training
   utilizes hardware (GPUs/TPUs) far more efficiently.
2. **Path length** — the maximum path length between any two positions in
   the network is constant (O(1) attention hops) rather than growing with
   sequence length, which makes it easier to learn long-range
   dependencies.

Those two properties, more than any single accuracy number in the original
paper, are why this architecture became the foundation for the language
models that followed it.

## Takeaways

- Attention can fully replace recurrence and convolution for sequence
  transduction, with better parallelism and shorter paths between distant
  tokens.
- Multi-head attention lets the model attend to information from multiple
  representation subspaces at once, rather than averaging everything into
  one.
- Positional encoding is the piece that reintroduces order into an
  otherwise order-agnostic mechanism.

---

*This is a template/seed post to validate the blog pipeline end-to-end.
Swap the placeholder figure notes above for the paper's real diagrams by
dropping images into `assets/` and adding `![caption](./assets/file.png)`
where noted.*
