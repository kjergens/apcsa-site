# 2.11 Nested Iteration

**CED Topics:** 2.11

---

## 1. A Loop Inside a Loop

A **nested loop** is a loop placed inside the body of another loop. The inner loop runs through **all** of its iterations every single time the outer loop advances by just one iteration.

```java
for (int outer = 1; outer <= 5; outer++) {
    for (int inner = 1; inner <= 2; inner++) {
        // code here runs 5 x 2 = 10 times total
    }
}
```

**The inner loop must finish completely before the outer loop is allowed to move to its next iteration.** Nothing about the outer loop's variable changes while the inner loop is still running — it's paused, waiting.

---

## 2. Tracing a Nested Loop

Tracing works the same way as a single loop, just with an extra column: for every value the outer variable takes, the *entire* inner loop runs through all of its own values before the outer variable updates again.

```java
for (int outer = 1; outer <= 3; outer++) {
    for (int inner = 1; inner <= 2; inner++) {
        System.out.println(outer * inner);
    }
}
```

| `outer` | `outer <= 3` | `inner` | `inner <= 2` | Prints |
|---|---|---|---|---|
| 1 | true | 1 | true | 1 |
| 1 | true | 2 | true | 2 |
| 1 | true | 3 | false | *(inner loop ends, outer advances)* |
| 2 | true | 1 | true | 2 |
| 2 | true | 2 | true | 4 |
| 2 | true | 3 | false | *(inner loop ends, outer advances)* |
| 3 | true | 1 | true | 3 |
| 3 | true | 2 | true | 6 |
| 3 | true | 3 | false | *(inner loop ends)* |
| 4 | false | — | — | *(outer loop ends)* |

Notice `inner` **resets back to `1`** every time the outer loop advances — it isn't a continuation of wherever it left off, it's a completely fresh run of the inner loop's own header.

---

## 3. Nested Loops Produce Grid-Like Output

Because the inner loop fully repeats for every outer iteration, nested loops are the standard way to produce row-and-column (grid-shaped) output:

```java
for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= 4; col++) {
        System.out.print("* ");
    }
    System.out.println();   // move to the next line AFTER the inner loop finishes a full row
}
```

```
* * * * 
* * * * 
* * * * 
```

The `System.out.println()` that starts a new line sits **outside** the inner loop but **inside** the outer loop — it only needs to run once per row, after that row's four stars are already printed, which is exactly what "once per outer iteration" means.

---

## 4. A Decrementing Outer Loop

The outer and inner loop don't have to count in the same direction, or use the same bounds — each loop's header is completely independent of the other's:

```java
for (int outer = 1; outer >= 0; outer--) {
    for (int inner = 0; inner <= 1; inner++) {
        System.out.println(outer + " " + inner);
    }
}
```

| `outer` | `inner` | Prints |
|---|---|---|
| 1 | 0 | `1 0` |
| 1 | 1 | `1 1` |
| 0 | 0 | `0 0` |
| 0 | 1 | `0 1` |

`outer` only takes two values (`1`, then `0`) because it's counting *down*, but `inner` still runs its own full `0`-to-`1` count each time — the two loops never interfere with each other's logic.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Assuming the inner loop "remembers" where it left off between outer iterations | The inner loop's header runs fresh every time — its variable is re-initialized to the inner loop's own starting value each time | Trace the inner loop as if it's starting from scratch on every single outer iteration |
| Placing a line like `System.out.println()` inside the inner loop when it was meant to run once per outer iteration | Code inside the inner loop runs once per *inner* iteration — far more often than intended | Place it after the inner loop's closing brace, but still inside the outer loop's body |
| Using the same variable name for both loop control variables | The inner loop's variable would shadow/conflict with the outer one, or cause a compile error, depending on scope | Give each loop its own distinct loop control variable name (`outer`/`inner`, or `row`/`col`) |
| Confusing which loop is "outer" and which is "inner" when tracing | Swapping them changes which variable resets more often and which one changes more slowly | The loop written first/outermost in the code is "outer" — it only advances once the entire inner loop (written inside it) finishes |

## Homework 2.11 Nested Iteration

!!! attention

    1. Trace this nested loop with a full table and give the complete console output:
    ```java
    for (int outer = 1; outer <= 2; outer++) {
        for (int inner = 1; inner <= 3; inner++) {
            System.out.println(outer + "," + inner);
        }
    }
    ```

    2. How many total times does the inner `System.out.println` statement execute in Question 1? Show how you calculated it.

    3. Write nested loops that print a 4-row by 5-column grid of `"#"` characters, with each row on its own line.

    4. Find the bug: this code was supposed to print a label once per row, but it prints one every time through the inner loop instead. Fix it.
    ```java
    for (int row = 1; row <= 3; row++) {
        for (int col = 1; col <= 3; col++) {
            System.out.print(col + " ");
            System.out.println("end of row");
        }
    }
    ```

    5. Trace this loop (note the outer loop is *decrementing*) and give the full output:
    ```java
    for (int outer = 2; outer >= 1; outer--) {
        for (int inner = 1; inner <= 2; inner++) {
            System.out.println(outer * inner);
        }
    }
    ```

    6. Write nested loops to print a multiplication table for 1 through 5 (print `i * j` for every combination of `i` and `j` from 1 to 5).

    7. In your own words, explain why the inner loop's variable resets instead of continuing from its last value, every time the outer loop advances.
