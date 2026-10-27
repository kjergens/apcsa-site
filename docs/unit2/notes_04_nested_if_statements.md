# 2.4 Nested if Statements

**CED Topics:** 2.4

---

## 1. Putting an if Inside an if

A **nested if** is exactly what it sounds like: an `if` (or `if`-`else`) statement written inside the body of another `if` (or `if`-`else`) statement. The inner condition only even gets *evaluated* if the outer condition was `true` first.

```java
if (outer condition) {
    if (inner condition) {
        statement;   // runs only if BOTH conditions are true
    }
}
```

```java
int age = 20;
boolean hasLicense = true;

if (age >= 16) {
    if (hasLicense) {
        System.out.println("You can drive.");
    }
}
```

If `age` were `15`, the inner `if` never even runs — Java doesn't bother checking `hasLicense` at all, because the outer condition already failed.

---

## 2. Multi-Way Selection: `else if`

Chaining `if`-`else if`-`else` together lets you test a *series* of conditions, where **at most one** block in the whole chain runs — whichever condition is the first one to evaluate `true`. Once one branch fires, Java skips the rest of the chain entirely, even if a later condition would also have been `true`.

```java
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else if (score >= 70) {
    System.out.println("C");
} else {
    System.out.println("F");
}
```

If `score` is `95`, only `"A"` prints. Java never checks `score >= 80` at all, because the first condition already matched — it doesn't matter that `95 >= 80` is also true.

### The Bug That Happens When You Forget the `else`

Compare the chain above to four **separate** `if` statements with no `else`:

```java
int score = 93;
String grade = "";

if (score >= 90) { grade = "A"; }
if (score >= 80) { grade = "B"; }
if (score >= 70) { grade = "C"; }
if (score >= 60) { grade = "D"; } else { grade = "F"; }

System.out.println(grade);
```

Trace it: `score` is `93`. Every single one of the first three conditions is `true` — `93 >= 90`, `93 >= 80`, and `93 >= 70` all hold — so `grade` gets overwritten three times in a row: `"A"`, then `"B"`, then `"C"`. Only the *last* standalone `if`-`else` has an `else` attached, and `93 >= 60` is also true, so `grade` becomes `"D"` last — and `"D"` is what actually prints, for a 93. Connecting these with `else if` (as in the correct version above) fixes it, because only the *first* matching branch would run at all.

---

## 3. The Dangling Else Trap

When you nest an `if` inside another `if`, and only one of them has an `else`, Java has to decide which `if` that `else` belongs to. **The rule: an `else` always attaches to the closest unmatched `if` in the same block — regardless of how you've indented it.**

```java
if (sunny)
    if (hot)
        System.out.println("Head for the beach!");
    else
        System.out.println("Bring your umbrella!");
```

Even though the indentation makes it *look* like the `else` belongs to the outer `if (sunny)`, it actually belongs to the inner `if (hot)` — because that's the closest unmatched `if`. So this code prints an umbrella warning whenever it's sunny but not hot, which is almost certainly not what was intended. Indentation is a hint to human readers; it has no effect on what the compiler decides.

**Fix it with curly braces**, which explicitly close off the inner `if` before the `else` is written, forcing the `else` to attach to the outer one instead:

```java
if (sunny) {
    if (hot) {
        System.out.println("Head for the beach!");
    }
} else {
    System.out.println("Bring your umbrella!");
}
```

This is yet another reason (on top of 2.3's one-statement trap) to always use braces, even when Java would technically let you skip them.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Using several separate `if` statements instead of `else if` when only one branch should run | Each standalone `if` is checked independently and can overwrite a result set by an earlier one that also matched | Chain them with `else if` so only the first true branch runs, and the rest are skipped |
| Assuming an `else` attaches to the `if` it's lined up under by indentation | The compiler ignores indentation — `else` always binds to the closest unmatched `if` | Use curly braces to make the grouping explicit, don't rely on spacing |
| Writing an `if`-`else if` chain with no final `else` and assuming every case is handled | If none of the conditions match, nothing runs and no value gets set/printed | Add a final `else` as a catch-all, unless you're certain every real case is covered |
| Expecting the inner condition of a nested `if` to be checked even when the outer one is false | The inner `if` is literally inside the outer one's body — Java never reaches it if the outer condition fails | Trace the outer condition first; only read further if it's true |

## Homework 2.4 Nested if Statements

!!! attention

    1. Trace this code and give the final printed value. Explain why the inner `if` is or isn't checked:
    ```java
    int temp = 40;
    boolean raining = true;
    if (temp > 32) {
        if (raining == false) {
            System.out.println("Nice day!");
        }
    }
    System.out.println("Done.");
    ```

    2. Rewrite this chain of separate `if` statements as a single `if`-`else if`-`else` chain that produces the same intended result (one grade, not several overwrites):
    ```java
    if (score >= 90) { grade = "A"; }
    if (score >= 80) { grade = "B"; }
    if (score >= 70) { grade = "C"; }
    else { grade = "F"; }
    ```

    3. Using your rewritten version from Question 2, trace what happens when `score = 85`. Which single branch runs?

    4. Identify the dangling-else bug in this code — which `if` does the `else` actually belong to? Then fix it with curly braces so the `else` belongs to the *outer* `if`.
    ```java
    if (x > 0)
        if (x > 100)
            System.out.println("huge");
        else
            System.out.println("not positive");
    ```

    5. Write an `if`-`else if`-`else` chain that prints `"High"` for a score of 80+, `"Medium"` for 50-79, and `"Low"` below 50. Then trace it for `x = 79` and `x = 80` to confirm the boundary is handled correctly.

    6. True or False: in an `if`-`else if`-`else` chain, more than one branch can run if more than one condition is true. Explain your answer.

    7. In your own words, explain why four separate `if` statements checking `score >= 90`, `score >= 80`, `score >= 70`, `score >= 60` can produce a *different* final result than the same four conditions written as one `else if` chain, even when no `else` is missing.
