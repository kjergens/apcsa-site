# 2.5 Compound Boolean Expressions

**CED Topics:** 2.5

---

## 1. The Three Logical Operators: `&&`, `||`, `!`

A **compound Boolean expression** combines two or more Boolean expressions into one, using **logical operators**:

| Operator | Name | Meaning |
|---|---|---|
| `&&` | AND | `true` only if **both** sides are `true` |
| `\|\|` | OR | `true` if **either** side (or both) is `true` |
| `!` | NOT | flips a Boolean value — `true` becomes `false` and vice versa |

You've already seen `!` once, inside `!=`. On its own, `!` negates whatever Boolean expression follows it: `!(x > 5)` is `true` exactly when `x > 5` is `false`.

```java
int age = 20;
boolean hasID = true;

boolean canEnter = (age >= 18) && hasID;    // both must be true
boolean getsDiscount = (age < 12) || (age >= 65);   // either qualifies
```

---

## 2. Truth Tables

A **truth table** lists every possible combination of `true`/`false` inputs and shows what the compound expression evaluates to for each one. For two Boolean values `P` and `Q`:

| P | Q | `P && Q` | `P \|\| Q` |
|---|---|---|---|
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

Notice `&&` only produces `true` in the single row where both sides are `true`. `||` produces `true` in every row *except* the one where both sides are `false`.

---

## 3. Precedence: `!` Before `&&` Before `||`

Just like `*` binds tighter than `+` in arithmetic, `!` is evaluated before `&&`, and `&&` is evaluated before `||`, when there are no parentheses to force a different order. Use parentheses whenever the default order isn't the one you mean — it costs nothing and removes all ambiguity.

```java
int x = 10, y = 5;
boolean result = x % 2 == 0 && y % 2 == 0 || x > y;
```

Trace it with precedence: `x % 2 == 0` → `true`, `y % 2 == 0` → `false`, so `true && false` → `false`. Then `x > y` → `true`. Finally `false || true` → `true`.

---

## 4. Short-Circuit Evaluation

`&&` and `||` are **short-circuit** operators: Java stops evaluating as soon as the overall answer is already determined, without ever checking the second half.

- For `&&`: if the **left** side is `false`, the whole expression must be `false` no matter what the right side is — so the right side is **never evaluated**.
- For `||`: if the **left** side is `true`, the whole expression must be `true` no matter what the right side is — so the right side is **never evaluated**.

This isn't just a performance detail — it's a tool for writing *safe* conditions. The classic use case is guarding against a calculation that would otherwise crash:

```java
int x = 0;
int y = 3;

if (x > 0 && (y / x) == 3) {
    System.out.println("first case");
} else {
    System.out.println("second case");
}
```

`x > 0` is `false`, so Java short-circuits — it never evaluates `y / x`, which would have thrown a division-by-zero error. The output is `"second case"`, with no crash. If the two conditions were swapped — `(y / x) == 3 && x > 0` — the division would run *first* and the program would crash before `x > 0` is ever checked. **Order matters when a later condition depends on an earlier one being true.**

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Writing `x > 0 && (y / x) == 3` with the operands in the wrong order when `x` might be `0` | `&&` evaluates left to right — a risky calculation on the right only stays safe if the left side's guard condition comes first | Put the "is it safe to continue" check on the left, so short-circuiting protects the riskier check on the right |
| Assuming `&&` always evaluates both sides | Java stops at the first side that already determines the answer — the second side may never run at all | Don't rely on side effects (like a method call with a printout) in the second half of `&&`/`\|\|` — it might get skipped |
| Misreading `!` combined with `&&`/`\|\|` | `!` only negates whatever expression directly follows it, and binds *tighter* than `&&`/`\|\|` | Use parentheses to make exactly what's being negated explicit, don't rely on memorized precedence under time pressure |
| Confusing `&&`'s truth table with `\|\|`'s | They differ in exactly one row each — easy to mix up without actually building the table | When unsure, build the 4-row table rather than guessing from memory |

## Homework 2.5 Compound Boolean Expressions

!!! attention

    1. Build the full truth table for `!A && B` for all four combinations of `A` and `B`.

    2. Evaluate, showing your steps: `(7 % 2 == 1) && (10 > 20)`

    3. Evaluate, showing your steps: `(7 % 2 == 1) || (10 > 20)`

    4. Trace this code for `x = 0`, `y = 8`. Does it crash? Explain using short-circuit evaluation.
    ```java
    if (x != 0 && (y / x) > 1) {
        System.out.println("first");
    } else {
        System.out.println("second");
    }
    ```

    5. Now trace the same logic but with the operands swapped: `(y / x) > 1 && x != 0`, still with `x = 0`. What happens, and why?

    6. Write a single Boolean expression using `&&`/`||`/`!` that is `true` exactly when an `int` variable `age` represents someone who is a minor (under 18) **or** a senior (65 or older).

    7. Consider `x % 2 == 0 && y % 2 == 0 || x > y` with `x = 7`, `y = 3`. Trace it step by step, respecting precedence (`!` before `&&` before `||`), and give the final Boolean value.
