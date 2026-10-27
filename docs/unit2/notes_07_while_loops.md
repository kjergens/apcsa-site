# 2.7 while Loops

**CED Topics:** 2.7

---

## 1. Why Iteration Exists

You could repeat an action by just copy-pasting the same line a few times:

```java
System.out.println("Processing...");
System.out.println("Processing...");
System.out.println("Processing...");
```

That works only when you already know the exact number of repetitions ahead of time — and it falls apart completely if the number of repetitions isn't known until the program is actually running (how many lines are in a file, how many guesses it takes to get a password right, how long a user keeps answering "yes"). **Iteration** is the building block (from 2.1) that handles "repeat this until some condition says to stop," without you having to know in advance how many times that will be.

---

## 2. The while Loop

A **`while` loop** repeatedly runs a block of code for as long as its condition stays `true`:

```java
while (boolean expression) {
    statement;   // the loop body
}
```

```java
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
```

The condition is checked **before** every single execution of the body — including the very first time. If the condition is `false` from the start, the body never runs at all, not even once.

```java
int x = 10;
while (x < 5) {
    System.out.println("This never prints.");
}
```

---

## 3. Infinite Loops

An **infinite loop** happens when the condition never becomes `false`, so the loop body keeps running forever (or until the program is forcibly stopped). This almost always happens because something that's supposed to change the condition's outcome — incrementing a counter, reading new input — got left out of the loop body, or placed where it never actually runs.

```java
int count = 0;
while (count < 5) {
    System.out.println(count);
    // forgot count++  — count is stuck at 0 forever, loop never ends
}
```

Every `while` loop needs something inside its body that moves the condition closer to becoming `false`. Before you run a loop you've written, always ask: "what, inside this loop, is actually changing to eventually make the condition false?"

---

## 4. Tracing a while Loop

Tracing a loop means stepping through it iteration by iteration, tracking how each variable changes and re-checking the condition each time. A table like this makes it easy to follow:

```java
int number = 3;
while (number > 0) {
    System.out.println(number * 5);
    number--;
}
```

| `number` | Condition (`number > 0`) | Prints |
|---|---|---|
| 3 | true | 15 |
| 2 | true | 10 |
| 1 | true | 5 |
| 0 | false | *(loop ends)* |

The condition is checked, then — if true — the body runs, then the variable updates, then it loops back to re-check the condition. The console output is `15`, `10`, `5`.

---

## 5. A Sentinel-Controlled Loop

`while` loops are the natural choice when the number of repetitions depends on something you can't predict ahead of time — like user input. A **sentinel value** is a special input that signals "stop":

```java
import java.util.Scanner;

Scanner scan = new Scanner(System.in);
int total = 0;
int input = scan.nextInt();

while (input != -1) {
    total += input;
    input = scan.nextInt();
}
System.out.println("Sum: " + total);
```

This keeps adding numbers to `total` until the user types `-1` — there's no way to know in advance how many numbers that will take, which is exactly the situation `while` is built for.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Writing a `while` loop with nothing inside it that changes the condition's outcome | The loop body runs, but the condition never gets closer to `false` — it runs forever | Before running a loop, identify exactly which statement makes the condition eventually false, and confirm it's inside the loop body |
| Expecting a `while` loop's body to run at least once | The condition is checked *before* the very first execution — if it's false immediately, the body never runs | Trace the condition's value *before* the loop starts, not just during it |
| Updating the loop-controlling variable in the wrong place (e.g. before the condition check instead of at the end of the body) | Where the update happens changes which value the condition sees on the *next* check | Trace through iteration by iteration with a table — don't just assume the update "happens eventually" |
| Confusing `while (condition)` with `if (condition)` | `if` runs its body at most once; `while` repeats its body as long as the condition stays true | Ask: does this need to happen only once if true (`if`), or keep happening until false (`while`)? |

## Homework 2.7 while Loops

!!! attention

    1. Trace this loop using a table (variable, condition, output per row) and give the full console output:
    ```java
    int n = 4;
    while (n > 0) {
        System.out.println(n);
        n -= 2;
    }
    ```

    2. What happens when this code runs? Explain why, in terms of the condition.
    ```java
    int x = 0;
    while (x > 5) {
        System.out.println("Hello");
        x++;
    }
    ```

    3. Find the bug that causes an infinite loop, and fix it:
    ```java
    int i = 0;
    while (i < 10) {
        System.out.println(i);
    }
    ```

    4. Write a `while` loop that prints every multiple of 3 from 3 up to (and including) 30.

    5. Write a `while` loop using a sentinel value of `0` that keeps a running total of positive integers the user enters, stopping as soon as a `0` is entered.

    6. True or False: a `while` loop's body is guaranteed to run at least one time. Justify your answer with an example.

    7. In your own words, explain what makes a `while` loop the right choice over an `if` statement for a situation like "keep asking the user for a password until they get it right."
