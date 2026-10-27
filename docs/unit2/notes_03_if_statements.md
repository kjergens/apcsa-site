# 2.3 if Statements

**CED Topics:** 2.3

---

## 1. One-Way Selection: `if`

An `if` statement tests a Boolean expression. If it's `true`, the body runs; if it's `false`, the body is skipped entirely and the program moves on.

```java
if (boolean expression) {
    // runs only if the expression is true
    statement;
}
```

```java
int temperature = 95;
if (temperature > 90) {
    System.out.println("Heat advisory!");
}
System.out.println("Done checking.");
```

If `temperature` were `80` instead, the heat-advisory line would simply never print — nothing takes its place. That's what makes it **one-way**: there's a path for "true," and no path at all for "false."

A single statement doesn't strictly need curly braces, but **always use them anyway**:

```java
// Technically legal, but dangerous:
if (temperature > 90)
    System.out.println("Heat advisory!");
    System.out.println("Stay hydrated!");   // NOT actually part of the if! Runs every time.
```

Without braces, only the *next single statement* belongs to the `if` — indentation is just for human readers and means nothing to the compiler. The second `println` above looks like part of the warning, but it will print every single time the program runs, heat advisory or not. Curly braces remove the ambiguity entirely.

---

## 2. Two-Way Selection: `if`-`else`

An `if`-`else` statement gives you a path for *both* outcomes — one block if the condition is `true`, a different block if it's `false`. Exactly one of the two blocks runs, always.

```java
if (boolean expression) {
    statement;      // runs if true
} else {
    statement;      // runs if false
}
```

```java
int score = 65;
if (score >= 70) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}
```

Unlike a bare `if`, `else` doesn't test a condition of its own — it's the automatic catch-all for "the `if`'s condition was false," whatever that includes. This is the construct that handles the "everything else I didn't anticipate" case raised back in 2.1.

---

## 3. Tracing Multiple Separate `if` Statements

A classic trap: several standalone `if` statements in a row are **not** the same as one `if`-`else` chain. Each separate `if` tests its own condition independently, regardless of what happened in the one above it.

```java
int speed = 35;
boolean rain = false;

if (rain) {
    speed -= 10;
}
if (rain == false) {
    speed += 5;
}
if (speed > 35) {
    speed -= 2;
}
System.out.println(speed);
```

Trace it: `rain` is `false`, so the first `if` is skipped. `rain == false` is `true`, so `speed` becomes `35 + 5 = 40`. Now `speed > 35` is `true` (speed is 40), so `speed` becomes `40 - 2 = 38`. **Each `if` re-checks the current, already-updated value of `speed` — nothing resets between them.** The output is `38`.

This matters because it's easy to misread a stack of `if`s as if they were mutually exclusive the way `if`-`else` branches are. They aren't, unless you write them that way.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Treating a one-liner `if` without braces as if the next several lines are all "inside" it | Without `{ }`, only the single next statement belongs to the `if` — everything after runs unconditionally | Always use curly braces, even for a single statement |
| Writing `if (score >= 70); { ... }` with a semicolon after the condition | The semicolon ends the `if` immediately with an empty body — the block that follows runs unconditionally, every time | Never put a semicolon right after an `if` condition's closing parenthesis |
| Assuming `else` tests its own condition | `else` has no condition — it's whatever's left over when the `if`'s condition is false | Only attach `else` when you mean "everything else," not a specific second case (that's 2.4) |
| Treating several separate `if` statements as mutually exclusive like `if`-`else` branches | Each standalone `if` evaluates independently against whatever the variables currently hold — more than one, or none, can run | Trace each `if` in order, updating variable values as you go, rather than assuming only one will fire |

## Homework 2.3 if Statements

!!! attention

    1. What prints? Explain why nothing is printed for the second case.
    ```java
    int x = 10;
    if (x > 20) {
        System.out.println("big");
    }
    ```

    2. Find the bug in this code and explain what actually happens when it runs:
    ```java
    if (grade >= 90)
        System.out.println("A");
        System.out.println("Great job!");
    ```

    3. Rewrite the code in Question 2 using an `if`-`else` so that `"Great job!"` only prints alongside the `"A"`, and something else (your choice) prints otherwise.

    4. Trace this code and give the final printed value:
    ```java
    int x = 5;
    boolean flag = true;
    if (flag) {
        x = x + 10;
    }
    if (flag == false) {
        x = x - 10;
    }
    if (x > 10) {
        x = x * 2;
    }
    System.out.println(x);
    ```

    5. Write an `if`-`else` statement that prints `"Even"` if an `int` variable `n` is even, and `"Odd"` otherwise.

    6. True or False: `if (x > 5); { System.out.println("big"); }` prints `"big"` only when `x > 5`. Explain your answer — trace through what the semicolon actually does.

    7. Explain, in your own words, the difference between writing two separate `if` statements versus one `if`-`else` — give an example input where the two approaches would produce different output.
