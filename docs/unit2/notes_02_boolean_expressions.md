# 2.2 Boolean Expressions

**CED Topics:** 2.2

---

## 1. What Counts as a Boolean Expression

A **Boolean expression** is anything that evaluates to exactly one of two values: `true` or `false`. It doesn't have to look like a comparison — `boolean isActive = true;` is a Boolean expression too — but most of the ones you'll write compare two values using a **relational operator**.

| Operator | Meaning |
|---|---|
| `==` | equal to |
| `!=` | not equal to |
| `<` | less than |
| `>` | greater than |
| `<=` | less than or equal to |
| `>=` | greater than or equal to |

```java
int age = 16;
boolean canDrive = (age >= 16);   // true
```

---

## 2. `==` Means Something Different for Objects

For **primitive types** (`int`, `double`, `boolean`, `char`), `==` compares the actual values:

```java
int a = 5;
int b = 5;
System.out.println(a == b);   // true — same value
```

For **reference types** (any object, like `NetflixMovie` or `String`), `==` compares the **object references** — whether both variables point to the exact same object in memory — not whether the objects' contents look the same. You saw this in 1.19: two separately-constructed objects with identical data are still `==`-unequal, because they're two different objects sitting at two different addresses.

```java
NetflixMovie m1 = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
NetflixMovie m2 = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
System.out.println(m1 == m2);   // false — two different objects, even though the data matches
```

This is a one-way trap: it only bites you with objects. For primitives, `==` always does what you'd expect.

---

## 3. The Remainder Operator in Boolean Expressions

`%` (remainder/modulus) shows up constantly inside Boolean expressions, because it's the standard way to test divisibility:

```java
int num = 7;
boolean isEven = (num % 2 == 0);     // false — 7 is odd
boolean divisibleByThree = (num % 3 == 0);   // false
```

`num % 2 == 0` reads as "the remainder of `num` divided by 2 is 0" — which is true exactly when `num` is even.

---

## 4. Tracing a Boolean Expression Step by Step

Just like arithmetic expressions, Boolean expressions follow an order of operations: arithmetic and `%` happen first, then relational comparisons, left to right.

```java
boolean result = (5 % 3 == 0) == (3 > 5);
```

Trace it piece by piece:
1. `5 % 3` → `2`
2. `2 == 0` → `false`
3. `3 > 5` → `false`
4. `false == false` → `true`

`result` is `true` — note that the final `==` here is comparing two **boolean** values to each other, not comparing numbers. `==` works on booleans the same way it works on any primitive: it's `true` exactly when both sides match.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Using `=` instead of `==` in a condition | `=` is assignment, not comparison — `if (x = 5)` won't even compile in Java (it does in some other languages, which is where this habit comes from) | Use `==` for comparison; reserve `=` for assignment |
| Expecting `m1 == m2` to be `true` for two objects with identical data | `==` compares references for objects, not contents | Use `.equals()` to compare object contents (covered in 1.22) — save `==` for checking if two variables point to the *same* object |
| Assuming `%` only matters for even/odd checks | `%` tests divisibility by *any* number, not just 2 | Generalize: `n % k == 0` means "n is divisible by k," for any `k` |
| Skipping the order of operations when tracing | Boolean expressions compute their arithmetic/relational pieces before combining them with `==`/`!=` | Trace innermost pieces first, same as any nested expression |

## Homework 2.2 Boolean Expressions

!!! attention

    1. Evaluate: `(10 % 4 == 2)`. Show your work.

    2. True or False, and explain why: for two `int` variables with the same value, `==` always returns `true`.

    3. True or False, and explain why: for two `NetflixMovie` objects built from identical data, `==` always returns `true`.

    4. Trace this expression step by step and give the final value:
    ```java
    boolean x = (8 % 2 == 0) == (10 > 20);
    ```

    5. Write a Boolean expression that is `true` exactly when an `int` variable `n` is divisible by both 2 and leaves no remainder — just using `%` and `==` (you don't need `&&` yet, just the single divisibility test).

    6. Assume `int x` and `int y` have been declared and initialized. Write values for `x` and `y` that make `(x >= 10) == (y < 12)` evaluate to `true`. Then write a different pair of values that also makes it `true`.

    7. Explain in your own words why `==` behaves differently for objects than for primitives like `int`.
