# 2.8 for Loops

**CED Topics:** 2.8

---

## 1. The Three Parts of a for Loop

A **`for` loop** is built for the case 2.7 didn't cover well: repeating something a **known** number of times. It packages the three things every counting loop needs into one line:

```java
for (int count = 0; count < 5; count++) {
    System.out.println(count);
}
```

| Part | Example | When it runs |
|---|---|---|
| **Initialization** | `int count = 0` | Once, before the loop starts at all |
| **Condition** | `count < 5` | Checked before every iteration, including the first |
| **Update** | `count++` | After the body runs, before the condition is checked again |

The variable declared in the initialization (`count`, here) is called the **loop control variable** — it's the value being tracked to decide when the loop ends.

---

## 2. A `for` Loop Is a `while` Loop in Disguise

Every `for` loop can be rewritten as an equivalent `while` loop — they're built from exactly the same three pieces, just arranged differently:

```java
// for version
for (int count = 0; count < 5; count++) {
    System.out.println(count);
}

// equivalent while version
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
```

The difference is purely organizational: `for` keeps the initialization, condition, and update all visible together on one line, which makes it harder to accidentally forget the update — a common `while`-loop bug from 2.7.

---

## 3. Increment and Decrement

`count++` is shorthand for `count = count + 1` — increasing a value by exactly 1, called **incrementing**. The mirror operation, decreasing by 1, is **decrementing**, written `count--`.

```java
number++;   // same as: number = number + 1;
number--;   // same as: number = number - 1;
```

A `for` loop's update doesn't have to be `++` or `--` — it can be any statement, including stepping by more than one or counting backward:

```java
for (int number = 3; number > 0; number--) {
    System.out.println(number * 5);
}
```

---

## 4. Tracing a for Loop

Same method as tracing a `while` loop — step through iteration by iteration:

```java
for (int number = 3; number > 0; number--) {
    System.out.println(number * 5);
}
```

| `number` | Condition (`number > 0`) | Prints |
|---|---|---|
| 3 | true | 15 |
| 2 | true | 10 |
| 1 | true | 5 |
| 0 | false | *(loop ends)* |

Console output: `15`, `10`, `5` — exactly as in 2.7's `while` version of the same loop, confirming they really are equivalent.

---

## 5. Off-By-One Errors

An **off-by-one error** happens when a loop runs one time too many, or one time too few — almost always from a condition that should have used `<` but used `<=`, or vice versa.

```java
for (int count = 1; count <= 11; count++) {
    System.out.print(count + " ");
}
// Output: 1 2 3 4 5 6 7 8 9 10 11
```

If this was meant to print `1` through `10`, it's wrong — `count <= 11` lets the loop run one extra time, including `11`. The fix is tightening the condition:

```java
for (int count = 1; count < 11; count++) {
    System.out.print(count + " ");
}
// Output: 1 2 3 4 5 6 7 8 9 10
```

Whenever you write a counting loop, check both ends deliberately: what's the *first* value the loop control variable takes, and what's the *last* one? Don't just trust that `<` or `<=` "looks right."

---

## 6. Choosing `for` vs. `while`

Neither loop can do something the other can't — the choice is about which one communicates your intent more clearly:

- Use **`for`** when you know the exact number of repetitions (or can calculate it) before the loop starts — counting from 1 to 100, processing a fixed-size range.
- Use **`while`** when repetition depends on a condition that isn't tied to a fixed count — reading input until a sentinel value appears, repeating "until it's correct."

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Using `<=` when the intent was `<` (or vice versa) | This is exactly where off-by-one errors come from — the loop body runs one extra or one fewer time than intended | Explicitly check the *first* and *last* value the loop control variable should take, don't guess from habit |
| Re-declaring or resetting the loop control variable inside the loop body | This can reset the counting progress and change (or infinite-loop) the whole trace | Only the `for` header's own initialization and update should touch the loop control variable |
| Assuming a `for` loop is somehow different in *what* it can compute compared to a `while` loop | They're interchangeable — every `for` has an equivalent `while`, and vice versa | Choose based on readability/intent (known count vs. condition-based), not capability |
| Forgetting that the update step runs *after* the body, not before | Tracing the loop in the wrong order gives the wrong output | Trace as: check condition → run body (if true) → run update → re-check condition |

## Homework 2.8 for Loops

!!! attention

    1. Trace this loop with a table and give the full console output:
    ```java
    for (int i = 5; i >= 1; i--) {
        System.out.println(i * i);
    }
    ```

    2. Rewrite this `for` loop as an equivalent `while` loop:
    ```java
    for (int i = 0; i < 20; i += 4) {
        System.out.println(i);
    }
    ```

    3. Identify the off-by-one bug in this code (meant to print 1 through 5) and fix it:
    ```java
    for (int i = 0; i <= 5; i++) {
        System.out.print(i + " ");
    }
    ```

    4. Write a `for` loop that prints every even number from 2 to 20, inclusive.

    5. Write a `for` loop that counts *down* from 100 to 0 in steps of 10.

    6. For each situation, say whether a `for` or a `while` loop fits better, and justify your answer: (a) printing the first 50 square numbers, (b) rolling a die repeatedly until it comes up 6.

    7. In your own words, explain why `for (int i = 0; i < 5; i++)` and `for (int i = 0; i <= 4; i++)` produce the exact same number of iterations, even though one uses `<` and the other `<=`.
