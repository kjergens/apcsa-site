# 1.18 Casting and Range of Variables

**CED Topics:** 1.3, 1.4, 1.5

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

**The trap: `(int)` truncates, it does not round.** `(int) 8.8` is `8`, not `9` — the decimal portion is simply chopped off, regardless of whether it was closer to the next whole number. `(int) 8.99999` is still `8`.

**`Math.round()` is not on the AP exam's allowed subset** — don't reach for it. The technique you're actually expected to know is the casting trick: add `0.5` before truncating, for positive numbers:

```java
double score = 8.8;
int rounded = (int) (score + 0.5);   // 9
```

Adding `0.5` first pushes any value with a decimal of `.5` or higher over the next whole number, so truncating afterward lands on the correctly rounded result. `8.8 + 0.5 = 9.3`, and `(int) 9.3` truncates to `9` — correctly rounded. Try it on `8.3`: `8.3 + 0.5 = 8.8`, truncates to `8` — also correct, since `8.3` should round down.

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

**Where the parentheses go completely changes the answer — this is a major AP trap.** Compare these two, which look almost identical:

```java
int totalScore = 26;
int movieCount = 3;

System.out.println((double) totalScore / movieCount);    // 8.666666666666666 — correct
System.out.println((double) (totalScore / movieCount));  // 8.0 — wrong!
```

A cast binds to the single value immediately next to it — no parentheses needed around just `totalScore`. So `(double) totalScore / movieCount` casts `totalScore` to a `double` *first*, and the division that follows is already `double / int`, which computes as real division.

Wrapping the division in its own parentheses — `(double) (totalScore / movieCount)` — forces `totalScore / movieCount` to run *first*, entirely in `int`, truncating to `8` before the cast ever happens. Casting `8` to a `double` afterward just gives you `8.0` — the decimal information was already thrown away one step earlier, and the cast can't bring it back.

---

## 6. Mixing Numbers and Strings with `+`

The `+` operator does two completely different jobs depending on its operands: between two numbers it adds; between a `String` and anything else, it concatenates (glues them together as text). Java evaluates a chain of `+` operators strictly **left to right**, which means *where* a `String` first shows up in the expression determines everything that happens after it.

```java
System.out.println("Score: " + 5 + 5);   // "Score: 55"
System.out.println(5 + 5 + " Score");    // "10 Score"
```

In the first line, `"Score: "` is a `String` from the very start, so every `+` after it concatenates: `"Score: " + 5` becomes the text `"Score: 5"`, and adding another `5` glues on another `"5"` — giving `"Score: 55"`, not `"Score: 10"`.

In the second line, there's no `String` yet when Java reaches the first `+` — `5 + 5` adds numerically to `10`. *Then* `+ " Score"` concatenates that `10` onto the string, giving `"10 Score"`.

Same three values, same operator, two different results — entirely because of where the `String` sits in the expression.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| A large calculation produces a nonsense negative number | Integer overflow — the true result exceeded `Integer.MAX_VALUE` and wrapped around | `long` would fix this in real Java, but it's not on the AP subset — redesign the calculation to stay within `int`'s range instead (e.g., divide before multiplying, or check intermediate values) |
| `0.1 + 0.2 != 0.3` | Roundoff error — `double` stores an approximation, not an exact value | Never compare `double`s with `==`; check if they're within a small tolerance of each other |
| `(int) 8.99` evaluates to `8`, not `9` | Casting truncates, it doesn't round | Add `0.5` before truncating: `(int) (x + 0.5)` (positive numbers only) — `Math.round()` isn't on the AP subset |
| `5 / 2` evaluates to `2`, not `2.5` | Both operands are `int`, so integer division truncates before the result is ever stored | Cast at least one operand to `double` *before* the division happens |
| `(double) (totalScore / movieCount)` gives a "whole-looking" decimal like `8.0` | The division inside the parentheses ran first, as `int / int`, truncating — the cast afterward can't recover the lost decimal | Cast a single operand *before* the division: `(double) totalScore / movieCount` |
| `"Score: " + 5 + 5` prints `"Score: 55"` instead of `"Score: 10"` | `+` evaluates left to right; once a `String` appears, every `+` after it concatenates instead of adding | Put the numeric addition in parentheses first if you want it computed before concatenating: `"Score: " + (5 + 5)` |

## Homework 1.8 Casting and Range of Values

!!! attention

    **1.8 Casting and Range of Values**

    Identify the type of compilation behavior for each line. Write **Widening** (automatic conversion), **Narrowing**   (requires explicit cast), or **Compile Error**.
      1. `double x = 40;` → `____________________`
      2.  `int y = 5.5;` → `____________________`
      3. `int z = (int) 8.9;` → `____________________`
  
    4. Evaluate the following code segment. Determine the exact numeric value assigned to `result`.
  
    ```java
    int a = 10;
    int b = 4;
    double c = 2.0;
    double result = a / b + (int) c / b + (double) (a % b);
    ```

    5. Write a single line of Java code that rounds a positive double variable named `measurement` to its nearest whole `int` without using any methods from the `Math` class.  
    6. Construct a Java `if/else` block that correctly rounds both positive and negative double values stored in a variable `x` to their nearest `int`.

    7. Without running code, compute the exact decimal integer produced when the following statement executes in Java:
  
    ```java
    int value = (Integer.MAX_VALUE * 2) + 2;
    ```
