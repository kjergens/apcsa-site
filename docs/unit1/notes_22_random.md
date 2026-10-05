# 1.22 Random

**CED Topics:** 1.11

`Math.random()` only ever gives a `double` in `[0.0, 1.0)` — see 1.21. The real skill here is turning that into a random *integer* in a specific, useful range, and avoiding the off-by-one trap that catches almost everyone the first time.

---

## 1. The Formula

To get a random `int` between `min` and `max`, **inclusive of both ends**:

```java
int roll = (int)(Math.random() * (max - min + 1)) + min;
```

Walk through it with `min = 1`, `max = 6` — simulating a six-sided die:

1. `Math.random()` gives something in `[0.0, 1.0)`.
2. Multiply by `(max - min + 1)`, which is `6` here: now the range is `[0.0, 6.0)`.
3. `(int)` **truncates** — not rounds — chopping off everything after the decimal point, exactly like 1.18's casting rule. That turns `[0.0, 6.0)` into the whole numbers `0, 1, 2, 3, 4, 5`. Six equally likely outcomes.
4. Add `min` (`1`): the range shifts to `1, 2, 3, 4, 5, 6` — a real die roll.

---

## 2. The Off-By-One Trap

The single most common mistake is leaving out the `+ 1` in step 2:

```java
int roll = (int)(Math.random() * (max - min)) + min;   // WRONG
```

With `min = 1`, `max = 6`, this multiplies by `5` instead of `6` — giving truncated values `0, 1, 2, 3, 4`, then adding `min` gives `1, 2, 3, 4, 5`. **The die can never roll a 6.** The range silently loses its top value, and nothing crashes or errors to tell you — the code runs fine, it's just quietly wrong. Whenever you're building a random range, check explicitly: does my scaling factor equal the *count* of possible outcomes, or one less than it?

---

## 3. Why Truncate Instead of Round?

It's tempting to reach for `Math.round()` instead of `(int)` — but rounding breaks the evenness of the distribution. Rounding pulls values *toward* each whole number from both directions, which means the values at the very edges of the range (like `0` and `max`) only get approached from one side, not two — so they end up less likely than the values in the middle. Truncation doesn't have that problem: every one of the equally-sized `[0,1)`, `[1,2)`, `[2,3)` ... slices truncates to exactly one whole number, with no uneven edges. This is exactly why 1.18 draws a hard line between truncating and rounding — here's a case where picking the wrong one doesn't just lose precision, it silently biases your results.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| A random range never produces its maximum value | Forgot the `+ 1` when computing the scaling factor | Scaling factor should be `max - min + 1`, the *count* of possible values |
| Used `Math.round()` instead of `(int)` | Rounding skews the distribution toward the middle of the range | Use `(int)` (truncation) for uniform random ranges, not rounding |
| Forgot to add `min` back on | Range starts at `0` instead of the intended minimum | The final `+ min` shifts the whole range into place |
