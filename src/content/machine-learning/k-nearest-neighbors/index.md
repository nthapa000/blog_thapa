---
title: "K-Nearest Neighbors (KNN)"
description: "A simple, non-parametric algorithm that classifies a point by looking at its closest neighbors — how it works, how to pick k, and where it breaks down."
date: 2026-09-01
tags: ["machine-learning", "classification", "knn"]
draft: false
---

## Problem

Given a labeled dataset, how do you classify a brand-new point without
training a model in the traditional sense — no weights, no gradient
descent, nothing learned ahead of time?

## Background

KNN is a **non-parametric, instance-based** algorithm: it doesn't learn a
compact set of parameters during "training." Instead, it just stores the
entire training set, and does all the real work at prediction time. This
makes it one of the simplest algorithms in machine learning to understand,
and a common first stop when teaching classification.

## Approach / Method

To classify a new point `x`:

1. Compute the distance from `x` to every point in the training set
   (usually Euclidean distance, though Manhattan or cosine distance work
   too depending on the data).
2. Pick the `k` closest points — the "nearest neighbors."
3. Take a majority vote among their labels. The most common label among
   the `k` neighbors becomes the prediction for `x`.

For regression instead of classification, you'd average the neighbors'
values instead of voting.

**Choosing `k`:**

- Small `k` (e.g. 1) → very sensitive to noise, can overfit to individual
  outliers.
- Large `k` → smoother decision boundary, but can underfit and blur the
  distinction between classes near their boundaries.
- A common starting point is `k = sqrt(n)`, then tune with cross-validation.
  Using an odd `k` avoids tie votes in binary classification.

**Feature scaling matters.** Since KNN relies entirely on distance, a
feature measured in the thousands (like income) will dominate a feature
measured in single digits (like age) unless you normalize or standardize
your features first.

## Experiments / Results

On a toy 2D dataset with two well-separated classes, `k=1` produces a
jagged, overfit boundary that wraps tightly around individual points,
while `k=15` produces a much smoother boundary that generalizes better —
right up until `k` gets so large it starts washing out the actual
separation between classes.

## Key Takeaways

- KNN has no real "training" step — all the cost is at prediction time,
  which is the opposite of most ML algorithms.
- Prediction cost scales with the size of the dataset (naively O(n) per
  query), so it doesn't scale well to very large datasets without extra
  structure (e.g. KD-trees, ball trees, or approximate nearest-neighbor
  indexes).
- Always scale your features before using distance-based methods like KNN.
- `k` is a bias-variance knob: small `k` = low bias/high variance, large
  `k` = high bias/low variance.

## References

- Cover, T., & Hart, P. (1967). *Nearest neighbor pattern classification.*
