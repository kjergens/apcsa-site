# 2.9 Implementing Selection and Iteration Algorithms

**CED Topics:** 2.9

---

## 1. Combining Selection and Iteration

This lesson doesn't introduce new syntax — it's about combining everything from 2.1 through 2.8 into a few **standard algorithm patterns** that show up constantly, in AP questions and in real programs alike. Putting an `if` statement inside a loop lets a program make a decision *every single time it repeats* — reacting differently depending on what the current value is.

```java
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        System.out.println(i + " is even");
    }
}
```

---

## 2. The Accumulator Pattern

An **accumulator** is a variable that collects a running result across every iteration of a loop — a running total, a running product, a running count. The pattern always has the same shape: initialize the accumulator *before* the loop, then update it *inside* the loop body.

```java
int total = 0;               // initialize before the loop
for (int i = 1; i <= 5; i++) {
    total += i;               // update inside the loop
}
System.out.println(total);    // 15 (1+2+3+4+5)
```

The most common accumulator bug is initializing it *inside* the loop by mistake — that resets it every single iteration instead of building up a running result:

```java
for (int i = 1; i <= 5; i++) {
    int total = 0;    // BUG: resets to 0 every iteration!
    total += i;
}
// total doesn't even exist out here — and even if it did, it would only ever hold the last value added
```

---

## 3. Counting How Many Values Satisfy a Condition

Combine an accumulator with an `if` to count how many values, out of everything the loop checks, meet some condition:

```java
import java.util.Scanner;

Scanner scan = new Scanner(System.in);
int count = 0;

for (int i = 0; i < 10; i++) {
    int score = scan.nextInt();
    if (score >= 70) {
        count++;
    }
}
System.out.println(count + " passing scores");
```

Here the accumulator (`count`) only increases when the `if` condition is true — on the iterations where it's false, `count` is simply left alone.

---

## 4. Finding a Maximum (or Minimum)

Finding the largest value seen so far is another accumulator pattern, except the accumulator holds a *value* rather than a running total, and gets updated only when something larger shows up:

```java
Scanner scan = new Scanner(System.in);
int max = scan.nextInt();    // seed with the FIRST value, not 0

for (int i = 0; i < 9; i++) {   // 9 more values, since the first was already read above
    int next = scan.nextInt();
    if (next > max) {
        max = next;
    }
}
System.out.println("Largest: " + max);
```

**Seeding `max` with `0` instead of the first real value is a classic bug** — if every actual input happens to be negative, a `0` seed would incorrectly "win" as the max, even though it was never one of the real values at all. Always seed a max/min accumulator with a genuine first value from the data, not an arbitrary guess like `0`.

---

## 5. Putting It Together

A single loop can run multiple independent patterns side by side — an accumulator, a counter, and a max-finder can all update inside the same loop body, from the same stream of values:

```java
Scanner scan = new Scanner(System.in);
int total = 0, count = 0, max = Integer.MIN_VALUE;

for (int i = 0; i < 5; i++) {
    int value = scan.nextInt();
    total += value;
    if (value > max) {
        max = value;
    }
    if (value > 0) {
        count++;
    }
}
System.out.println("Sum: " + total + ", Max: " + max + ", Positive count: " + count);
```

Each pattern is independent — tracing one doesn't require tracing the others — but they all share the same loop, each updated once per iteration based on the same current value.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Declaring/initializing an accumulator *inside* the loop body | The accumulator resets to its starting value every single iteration instead of accumulating across iterations | Initialize the accumulator once, immediately before the loop starts |
| Seeding a max/min accumulator with `0` (or some other arbitrary constant) | If every real value is negative (for max) or positive (for min), the arbitrary seed can "win" even though it was never a real value | Seed with the first actual value from the data, then loop over the rest |
| Using `=` instead of `+=`/`++` when updating an accumulator | `total = i` replaces the running total instead of adding to it | Use the compound assignment that matches the pattern: `+=` for sums, `++`/`--` for counts |
| Putting an unrelated `if` condition on the wrong variable | Easy to mix up, e.g. counting how many values are positive but accidentally testing the running total instead of the current value | Double check which variable — the per-iteration value or the accumulator itself — the condition is supposed to test |

## Homework 2.9 Implementing Selection and Iteration Algorithms

!!! attention

    1. Trace this code and give the final printed value. Explain what's wrong with it:
    ```java
    int total = 0;
    for (int i = 1; i <= 4; i++) {
        int total = 0;
        total += i;
    }
    System.out.println(total);
    ```

    2. Write a loop that reads 8 integers from a `Scanner` and prints their sum.

    3. Write a loop that reads 8 integers from a `Scanner` and counts how many of them are negative.

    4. Write a loop that reads 6 integers from a `Scanner` and finds the *smallest* one. Seed it correctly — explain in a comment why you seeded it the way you did.

    5. Explain, with a concrete example, why seeding a "find the maximum" accumulator with `0` can give the wrong answer.

    6. Write a single loop that reads 5 integers and reports both the sum and the count of how many were even, using two separate accumulators.

    7. Trace this code for the inputs `3, -1, 7, -2, 5` (in that order) and give the final values of `total`, `count`, and `max`:
    ```java
    int total = 0, count = 0, max = Integer.MIN_VALUE;
    for (int i = 0; i < 5; i++) {
        int value = scan.nextInt();
        total += value;
        if (value > max) { max = value; }
        if (value > 0) { count++; }
    }
    ```
