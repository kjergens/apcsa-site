# 1.21 Random Numbers

**CED Topics:** 1.11

`Math.random()` only ever gives a `double` in `[0.0, 1.0)`. The real skill here is turning that into a random *integer* in a specific, useful range, and avoiding the off-by-one trap that catches almost everyone the first time.

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

The single most common mistake on the AP Exam is forgetting to add 1 to your range modifier. This creates a logical error: your code runs perfectly without crashing, but it will never hit the maximum value.

#### Bug vs. the fix

```java
// ❌ WRONG: Max is impossible to reach
int roll = (int)(Math.random() * (max - min)) + min;   

//  CORRECT: Includes all values from min to max
int roll2 = (int)(Math.random() * (max - min + 1)) + min;  
```


#### Why the Bug Happens (Using a 6-Sided Die)

If you want a random roll between min = 1 and max = 6, you have 6 possible outcomes (1, 2, 3, 4, 5, 6).
Look at what happens mathematically when you forget the + 1:

| Step	| ❌ The Buggy Range (max - min) | The Correct Range (max - min + 1) |
|---|---|---|
|1. Base Range |	Math.random() -> [0.0, 1.0) |	Math.random() -> [0.0, 1.0) |
|2. Scale	| Multiply by 5 (6 - 1) ->  [0.0, 4.9999] | 	Multiply by 6 (6 - 1 + 1) -> [0.0, 5.9999] |
|3. Truncate (int) |	Drops decimals -> 0, 1, 2, 3, 4	 | Drops decimals -> 0, 1, 2, 3, 4, 5 |
|4. Shift + min	| Add 1 -> 1, 2, 3, 4, 5	| Add 1 ->  1, 2, 3, 4, 5, 6 |
|Result	| Missing the 6! (range was too small) |	Perfect 1 to 6 die roll. |

Whenever you write a random range formula, ask yourself: Is my multiplier equal to the total count of possible outcomes?

- To get `N` consecutive integers, your scaling factor must be exactly `N`.
- Because `Math.random()` excludes 1.0, your multiplier needs to be (max - min + 1) to account for the inclusive upper bound.

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

## Homework 1.21 Random Numbers

!!! attention

    1. Write the correct expression for a random `int` between `10` and `20`, inclusive of both ends.

    2. To make a gambling game, someone wrote this line of code to randomly select one side of a 6-sided die. Explain what they did wrong and why:
    ```java
    int dieRoll = (int)(Math.random() * 5) + 1;
    ```

    3. If `Math.random()` returned `0.999999` what value would `result` have?
    ```java
    int result = (int)(Math.random() * 10) + 1;
    ```

    4. In your own words: why does the standard formula use `(int)` to truncate instead of `Math.round()`? What would happen to the distribution of a 1–6 die simulation if you used `Math.round()` instead?

    5. Write an expression that simulates rolling two six-sided dice and returns their sum as a single `int`. (Watch your parentheses.)

    6. A game needs a random integer between `-5` and `5`, inclusive. Identify `min`, `max`, and the scaling factor (`max - min + 1`), then write the full expression.

    7. True or False: Since `Math.random()` can theoretically return exactly `1.0`, a safe formula should use `(max - min + 2)` instead of `(max - min + 1)`.
