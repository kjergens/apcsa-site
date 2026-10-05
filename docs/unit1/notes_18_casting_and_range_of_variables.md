# 1.18 Casting and Range of Variables

**CED Topics:** 1.5

---

## 1. Every Type Has a Limit, Because Every Type Has a Fixed Size

An `int` isn't infinite. It's stored in exactly 32 bits, every time, no matter what value it holds — the same fixed-size idea from how memory gets allocated for any variable. 32 bits can represent exactly 2³² distinct values, split roughly in half between negative and positive, which gives `int` a hard range:

```
Integer.MIN_VALUE  =  -2,147,483,648
Integer.MAX_VALUE  =   2,147,483,647
```

A `double` is 64 bits and can represent a vastly larger range of magnitudes — but it has its own, different kind of limit, which shows up as a different kind of problem. More on that below.

---

## 2. Overflow: What Happens Past the Limit

Java does not throw an error when an `int` calculation goes past `Integer.MAX_VALUE`. It silently wraps around to the most negative value and keeps counting from there.

```java
int score = Integer.MAX_VALUE;
score = score + 1;
System.out.println(score);   // -2147483648
```

This is called **overflow**, and it's one of the most common AP trap questions — a calculation that looks completely correct produces a wildly wrong, often negative, answer, and nothing in the code or the compiler flags it. If you're ever tracing code involving large numbers or repeated multiplication, check whether the result could plausibly have crossed `Integer.MAX_VALUE`.

---

## 3. Roundoff: `double` Has a Different Kind of Limit

A `double` can represent enormous magnitudes, but it can't represent every decimal value exactly — it stores an approximation, in binary, of the number you wrote in decimal. Most of the time the approximation is close enough to be invisible. Sometimes it isn't:

```java
double result = 0.1 + 0.2;
System.out.println(result);   // 0.30000000000000004
```

Nothing is broken here. `0.1` and `0.2` simply don't have exact binary representations, the same way `1/3` doesn't have an exact decimal representation — it's `0.333...` forever. This is called **roundoff error**, and it's why you should never compare two `double`s with `==` and expect an exact match — compare whether they're close enough instead (e.g., within `0.0001` of each other).

---

## 4. Casting: Moving Between Types

**Widening** — converting a smaller type into a bigger one, like `int` into `double` — happens automatically. Java does it for you, because nothing can be lost going from a smaller range into a bigger one.

```java
int year = 2010;
double yearAsDouble = year;   // widening, automatic — 2010.0
```

**Narrowing** — converting a bigger type into a smaller one, like `double` into `int` — is the reverse, and Java will not do it silently. You have to explicitly ask for it with a cast, because something might get lost:

```java
double score = 8.8;
int scoreAsInt = (int) score;   // narrowing, must be explicit — 8
```

**The trap: `(int)` truncates, it does not round.** `(int) 8.8` is `8`, not `9` — the decimal portion is simply chopped off, regardless of whether it was closer to the next whole number. `(int) 8.99999` is still `8`. If you actually want rounding, you need `Math.round(...)` instead of a cast.

---

## 5. Integer Division — Worth Double-Checking Even Though You've Seen It Before

This one's a CS1 idea, but it's worth re-confirming here because it's really the same casting rule in disguise: `int / int` always produces an `int`, even when the mathematically correct answer has a decimal part. The decimal isn't rounded — it's truncated, exactly like a narrowing cast.

```java
int totalScore = 26;
int movieCount = 3;
System.out.println(totalScore / movieCount);        // 8, not 8.666...
System.out.println((double) totalScore / movieCount); // 8.666666666666666
```

Casting *either* operand to `double` before the division forces the whole expression to compute as a `double` — the division only happens once the types have already been decided, so the cast has to come before it, not after.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| A large calculation produces a nonsense negative number | Integer overflow — the true result exceeded `Integer.MAX_VALUE` and wrapped around | Use a `long` if the values could get that large, or redesign the calculation |
| `0.1 + 0.2 != 0.3` | Roundoff error — `double` stores an approximation, not an exact value | Never compare `double`s with `==`; check if they're within a small tolerance of each other |
| `(int) 8.99` evaluates to `8`, not `9` | Casting truncates, it doesn't round | Use `Math.round(...)` if you actually want rounding |
| `5 / 2` evaluates to `2`, not `2.5` | Both operands are `int`, so integer division truncates before the result is ever stored | Cast at least one operand to `double` *before* the division happens |
