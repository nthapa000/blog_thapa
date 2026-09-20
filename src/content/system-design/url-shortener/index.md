---
title: "Design: URL Shortener"
description: "A quick high-level design walkthrough for a URL shortener like bit.ly — encoding scheme, data model, and the read-heavy scaling story."
date: 2026-09-05
tags: ["system-design", "high-level-design"]
draft: false
---

## Problem Statement

Design a service like bit.ly: given a long URL, return a short URL that
redirects to it when visited.

## Requirements

**Functional**
- Given a long URL, generate a unique short URL.
- Visiting the short URL redirects (HTTP 301/302) to the original long URL.
- Optionally: let users pick a custom alias, and support link expiration.

**Non-functional**
- Read-heavy: redirects vastly outnumber creations (often 100:1 or more).
- Redirects should be low-latency (a redirect is on the critical path of
  someone's click).
- Short URLs must not collide — two different long URLs can never map to
  the same short code.
- Should scale to hundreds of millions of URLs.

## High-Level Design

At a high level, there are two endpoints:

- `POST /shorten` — takes a long URL, returns a short code.
- `GET /{code}` — looks up the long URL for `code` and redirects to it.

Components:

- **API layer** — stateless, handles both endpoints, sits behind a load
  balancer so it can scale horizontally.
- **Key generation service** — produces unique short codes.
- **Database** — stores the mapping from short code → long URL (plus
  metadata like creation time and expiration).
- **Cache** (e.g. Redis) — sits in front of the database for the read path,
  since redirects are the hot path and the mapping is immutable once
  created (cache-friendly).

```
client → API layer → cache (hit? return) → DB (miss → populate cache) → redirect
```

## Deep Dive

**Generating the short code.** Two common approaches:

1. **Base62 encode an auto-incrementing ID.** A counter (e.g. from the DB
   or a dedicated ID-generation service like Snowflake) hands out unique
   integers; each integer is base62-encoded (`[a-zA-Z0-9]`) into a short
   string. Simple, guaranteed unique, and a 7-character base62 string
   covers 62^7 ≈ 3.5 trillion codes — plenty of headroom.
2. **Hash the long URL** (e.g. MD5/SHA-256) and take the first N
   characters. Simpler conceptually, but needs collision handling (two
   different URLs can hash to the same prefix), which adds complexity back
   in. The counter-based approach avoids this entirely, so it's usually
   the better default.

**Data model** is intentionally minimal:

| Column       | Type      | Notes                          |
| ------------ | --------- | ------------------------------- |
| `code`       | string PK | the short code                  |
| `long_url`   | text      | the original URL                |
| `created_at` | timestamp |                                  |
| `expires_at` | timestamp | nullable                        |

**Why the cache matters:** once a `(code → long_url)` mapping is written,
it never changes. That makes it ideal for caching — a cache-aside strategy
(check cache, fall back to DB on miss, populate cache) absorbs the vast
majority of read traffic and keeps the database load light even at high
QPS.

## Trade-offs & Alternatives

- **301 vs 302 redirect:** a 301 (permanent) lets browsers cache the
  redirect, reducing load on your service — but it also means you lose
  visibility into every subsequent click, which matters if you want click
  analytics. A 302 (temporary) keeps every click hitting your service.
  Most link shorteners that care about analytics use 302 despite the
  extra load.
- **Counter-based IDs need coordination** in a distributed setup — a
  single auto-incrementing counter becomes a bottleneck/single point of
  failure at scale. A common fix is a Snowflake-style ID generator (or
  pre-allocating ID ranges to each server) so no single component has to
  serialize every ID request.
- **At 10x the scale**, the next bottleneck is usually the database itself
  — sharding by short code (e.g. by a hash of the code) becomes necessary
  once a single DB instance can't hold the full mapping table or serve the
  write throughput.

## Wrapping Up

The core of this design is simple — a key-value mapping with a cache in
front of it — and most of the interesting decisions are about how you
generate unique keys and how you keep the hot read path fast as traffic
grows.
