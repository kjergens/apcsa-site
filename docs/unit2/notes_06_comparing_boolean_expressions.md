# 2.6 Comparing Boolean Expressions

**CED Topics:** 2.6

---

## 1. Equivalent Boolean Expressions

Two Boolean expressions are **equivalent** if they produce the same result for every possible combination of inputs — even though they're written completely differently. You don't have to guess or trust your intuition to check this: build a **truth table** for both expressions and compare them row by row. If every row matches, the expressions are equivalent.

---

## 2. De Morgan's Laws

**De Morgan's Laws** describe exactly how a `!` (NOT) distributes across an `&&` or `||` — they're not something you need to memorize by name for the exam, but you do need to be able to show two expressions are equivalent, and this is the most common pair that comes up:

$$!(a \text{ \&\& } b) \equiv !a \text{ } || \text{ } !b$$

$$!(a \text{ } || \text{ } b) \equiv !a \text{ \&\& } !b$$

In words: negating an AND flips it into an OR of the negations, and negating an OR flips it into an AND of the negations. The truth table below confirms the first law — the last two columns are identical for every row:

| a | b | `!(a && b)` | `!a \|\| !b` |
|---|---|---|---|
| true | true | false | false |
| true | false | true | true |
| false | true | true | true |
| false | false | true | true |

```java
boolean a = true, b = false;
System.out.println(!(a && b));      // true
System.out.println(!a || !b);       // true — same result, every time
```

---

## 3. Simplifying Boolean Expressions

De Morgan's Laws are most useful as a tool for **removing an outer `!`** from a compound expression, which usually makes it easier to read. The process is two steps:

1. Apply De Morgan's Law: flip `&&`/`||`, and push the `!` onto each individual piece.
2. Flip each relational operator to absorb its own `!` (e.g. `!(x < 3)` becomes `x >= 3`).

```java
!(x < 3 && y > 2)
```

**Step 1** (distribute the `!`): `!(x < 3) || !(y > 2)`

**Step 2** (flip each relational operator, dropping the `!`s): `(x >= 3 || y <= 2)`

These three expressions are all equivalent — the last one is just easier to read at a glance, with no negation to untangle.

| Original relational operator | Flips to (under negation) |
|---|---|
| `<` | `>=` |
| `>` | `<=` |
| `<=` | `>` |
| `>=` | `<` |
| `==` | `!=` |
| `!=` | `==` |

---

## 4. Comparing with `null`

A very common real use of short-circuit evaluation (from 2.5) is guarding against calling a method on an object that doesn't actually exist yet. If a reference variable is `null`, calling *any* method on it crashes the program with a `NullPointerException`:

```java
String s = null;
if (s.indexOf("a") >= 0) {   // CRASH — s is null, can't call .indexOf() on it
    System.out.println(s + " contains an a");
}
```

The fix is to check `s != null` **first**, in an `&&`, relying on short-circuiting to skip the dangerous second check whenever the first one already fails:

```java
String s = null;
if (s != null && s.indexOf("a") >= 0) {
    System.out.println(s + " contains an a");
}
// no crash — s != null is false, so Java never evaluates s.indexOf("a")
```

This is the same pattern as the `x > 0 && (y / x) == 3` divide-by-zero guard from 2.5 — a safety check on the left, short-circuiting to protect a riskier check on the right. **Order matters here too**: `s.indexOf("a") >= 0 && s != null` would crash, because the dangerous call now runs first.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Assuming two Boolean expressions are equivalent just because they "look similar" | Equivalence is only confirmed when every row of both truth tables matches | Actually build out the truth table rather than eyeballing it |
| Forgetting to flip the relational operator when removing a `!` (e.g. leaving `!(x < 3)` as `x < 3`) | De Morgan's Law removes the `!`, but the operator itself still has to flip to preserve the original meaning | Use the flip table: `<`↔`>=`, `>`↔`<=`, `==`↔`!=` |
| Writing `s.someMethod() != null && s != null` (null check second) | By the time Java reaches a method call on `s`, it's too late — if `s` is `null`, the crash already happened | Always put the `!= null` guard *first* in the `&&`, so short-circuiting protects the method call |
| Applying De Morgan's Law to only one side of an `&&`/`\|\|` | Both operands need the `!` distributed to them, and the connector itself needs to flip | Apply both steps — flip the connector AND distribute the negation to each operand |

## Homework 2.6 Comparing Boolean Expressions

!!! attention

    1. Build the full truth table for `!(a || b)` and for `!a && !b`. Confirm they're equivalent.

    2. Simplify `!(x >= 10 && y != 5)` using De Morgan's Law — show both steps (distribute the `!`, then flip each relational operator).

    3. Simplify `!(x < 0 || y == 0)` the same way.

    4. Trace this code for `x = 4`, `y = 3` and give the printed output:
    ```java
    if (!(x < 3 && y > 2)) {
        System.out.println("first case");
    } else {
        System.out.println("second case");
    }
    ```

    5. Find and fix the bug: this code is supposed to safely check whether a `String name` contains the letter `"z"`, but it crashes when `name` is `null`.
    ```java
    if (name.indexOf("z") >= 0 && name != null) {
        System.out.println("found it");
    }
    ```

    6. True or False: `!(a && b)` is always equivalent to `!a && !b`. Justify your answer using a truth table (not just intuition).

    7. In your own words, explain why the *order* of the two conditions matters in `s != null && s.indexOf("a") >= 0`, even though `&&` is mathematically symmetric (A && B always equals B && A in a plain truth table).
