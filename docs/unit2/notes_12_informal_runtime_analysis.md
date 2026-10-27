# 2.12 Informal Run-Time Analysis

**CED Topics:** 2.12

---

## 1. What Makes an Algorithm "Good"?

Algorithms can be evaluated along three separate dimensions:

- **Correctness** — does it actually produce the right answer, for every valid input?
- **Readability** — can another programmer understand what it does and why?
- **Efficiency** — how much work does it take to run?

This lesson is about the third one: a way to measure efficiency *without* a profiler or any special tool — just by reading the code and counting.

---

## 2. Statement Execution Count

A **statement execution count** is exactly what it sounds like: the number of times one specific line of code actually runs during the program's execution. For a statement that isn't inside any loop, the count is just `1` — it runs once, the program passes it by, done.

Inside a loop, the count equals the number of times that loop body executes:

```java
for (int i = 0; i < 7; i++) {
    System.out.println("Hi");   // this line executes 7 times
}
```

---

## 3. Statement Execution Counts Multiply Across Nested Loops

For a statement inside a **nested** loop, the count is the **product** of how many times each surrounding loop runs — this follows directly from 2.11: the inner loop fully repeats once for every single outer iteration.

```java
for (int i = 0; i < 7; i++) {
    System.out.println("outer");        // statement 1
    for (int j = 0; j < 4; j++) {
        System.out.println("inner");    // statement 2
    }
}
```

Work it out step by step:

- **Statement 1** is inside the outer loop only, so it runs once per outer iteration: the outer loop runs **7** times, so statement 1 executes **7 times** total.
- **Statement 2** is inside *both* loops. For each single pass through the outer loop, the entire inner loop runs **4** times. Since that happens once for every one of the outer loop's 7 passes, statement 2's total count is `7 × 4 = `**28 times**.

| Statement | Location | Execution count |
|---|---|---|
| Statement 1 | inside outer loop only | 7 |
| Statement 2 | inside outer loop **and** inner loop | 7 × 4 = 28 |

---

## 4. Counting Through Three Levels

The same multiplication rule just keeps extending — a statement nested inside three loops executes once for every combination of all three loops' iteration counts:

```java
for (int a = 0; a < 3; a++) {
    for (int b = 0; b < 4; b++) {
        for (int c = 0; c < 5; c++) {
            System.out.println("deepest");   // runs 3 x 4 x 5 = 60 times
        }
    }
}
```

The general rule: find the execution count of a statement by multiplying together the number of iterations of **every loop that directly contains it**, from the outermost down to the innermost.

---

## 5. Why This Matters: Comparing Algorithms

Two algorithms that both get the correct answer can still differ enormously in efficiency. A single loop over `n` items has a statement execution count that grows proportionally with `n`; the same task done with nested loops over `n` items each can grow proportionally with `n × n`. For small `n` the difference might not be noticeable, but as `n` grows, an algorithm with nested loops over the same data can require dramatically more total operations than one that only needs a single pass — informal run-time analysis is how you spot that difference *before* running either program, just by reading the code.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Counting a statement inside a nested loop by *adding* the loop counts instead of multiplying | Addition would be correct if the loops ran one after another, but a nested inner loop runs completely, every single outer pass — that's multiplication, not addition | Multiply the iteration counts of every loop that directly surrounds the statement |
| Forgetting that a statement between the outer loop's start and the inner loop's start only belongs to the *outer* loop's count | Only statements literally inside the inner loop's braces get multiplied by the inner loop's count | Check exactly which loop's `{ }` a statement sits inside before deciding which counts apply to it |
| Assuming every loop in a nested structure runs the same number of times | Each loop's header is independent — an inner loop's bound can be completely unrelated to the outer loop's bound (as in the 7-and-4 example above) | Read each loop's own condition separately; don't assume symmetry |
| Treating "efficiency" and "correctness" as the same thing | A program can be perfectly efficient and still produce wrong answers, or correct but very inefficient — they're independent qualities | Evaluate correctness and efficiency as separate questions about the same algorithm |

## Homework 2.12 Informal Run-Time Analysis

!!! attention

    1. Give the statement execution count for the marked line:
    ```java
    for (int i = 0; i < 10; i++) {
        System.out.println("line");   // <-- this one
    }
    ```

    2. Give the statement execution count for each marked line:
    ```java
    for (int i = 0; i < 6; i++) {
        System.out.println("A");          // statement 1
        for (int j = 0; j < 3; j++) {
            System.out.println("B");      // statement 2
        }
    }
    ```

    3. Give the statement execution count for the innermost line:
    ```java
    for (int a = 0; a < 2; a++) {
        for (int b = 0; b < 3; b++) {
            for (int c = 0; c < 4; c++) {
                System.out.println("deep");
            }
        }
    }
    ```

    4. A statement executes 40 times, and it's nested inside exactly two loops, one of which runs 5 times. How many times does the other loop run? Explain your reasoning.

    5. Explain, without running any code, why a statement nested inside two loops that each run `n` times will have its execution count grow much faster as `n` increases than a statement inside just one loop that runs `n` times.

    6. True or False: correctness and efficiency always improve or worsen together — a more efficient algorithm is always more correct. Justify your answer.

    7. Write (don't run) a short nested-loop code segment where a single `System.out.println` statement executes exactly 24 times, using two nested loops. Show your reasoning for the bounds you chose.
