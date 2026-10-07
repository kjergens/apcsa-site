# 1.17 Operators and Expressions

**CED Topics:** 1.3, 1.6

Basic arithmetic (`+`, `-`, `*`, `/`, `%`) is review — you've used all of it before. Two pieces here aren't review, and they're both common AP trace traps: compound assignment, and increment/decrement.

---

## 1. Compound Assignment Operators

`x = x + 5;` and `x += 5;` do exactly the same thing — `+=` is just shorthand. The same shorthand exists for every arithmetic operator:

```java
int score = 10;
score += 5;   // same as score = score + 5;   → 15
score -= 3;   // same as score = score - 3;   → 12
score *= 2;   // same as score = score * 2;   → 24
score /= 4;   // same as score = score / 4;   → 6
score %= 4;   // same as score = score % 4;   → 2
```

They're not just shorter to write — the AP exam uses them freely in free-response and multiple-choice code, so reading `score *= 2;` as fast and correctly as `score = score * 2;` matters for tracing speed, not just your own code style.

---

## 2. Increment and Decrement: `++` and `--`

`x++` and `x--` add or subtract 1 from `x`. The trap isn't what they do — it's *when* they do it, which depends on whether the operator comes before or after the variable.

**Postfix (`x++`)**: use the current value of `x` in the expression first, *then* increment it.

**Prefix (`++x`)**: increment `x` first, *then* use the new value in the expression.

```java
int x = 5;
int a = x++;   // a gets 5 (the value BEFORE incrementing), then x becomes 6
System.out.println(a + " " + x);   // 5 6

int y = 5;
int b = ++y;   // y becomes 6 FIRST, then b gets that new value
System.out.println(b + " " + y);   // 6 6
```

When `x++` or `++x` is its own complete statement on its own line, prefix and postfix behave identically — `x++;` and `++x;` both just increment `x` by 1. The difference only shows up when the increment is embedded inside a larger expression that also *uses* the value, like `int a = x++;` above. This is a very common AP trace question: if you see `arr[i++]` or `total += x--`, trace carefully which value gets used before the change happens.

---

## 3. Precedence and Order of Evaluation

Java evaluates expressions in a fixed order: parentheses first, then multiplication/division/modulus (left to right), then addition/subtraction (left to right).

```java
int result = 2 + 3 * 4;        // 14, not 20 — multiplication happens first
int result2 = (2 + 3) * 4;     // 20 — parentheses force addition first
```

When operators are at the *same* precedence level, Java evaluates left to right:

```java
int result3 = 20 / 4 * 2;   // (20 / 4) * 2 = 10, not 20 / (4 * 2) = 2.5
```

When you're not sure what order something evaluates in, add parentheses — it costs nothing and removes the ambiguity, for you and for anyone tracing your code.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Misreading `score *= 2;` as addition, or forgetting what it expands to | Compound assignment operators aren't always read as fluently as the spelled-out version | Mentally expand `x op= y` to `x = x op y` until it's automatic |
| Tracing `int a = x++;` and assuming `a` gets the *new* value of `x` | Postfix uses the value first, increments second | Prefix (`++x`) changes first; postfix (`x++`) changes after it's used |
| Assuming `20 / 4 * 2` groups as `20 / (4 * 2)` | `/` and `*` share precedence and evaluate left to right, not by "division first" | When in doubt, add parentheses to make the intended order explicit |

## Homework 1.7

!!! attention

  1. Determine the final value of the variable `balance` after this code segment runs completely:
  
  ```java
  int balance = 50;
  balance /= 4;
  balance *= 3;
  balance %= 5;
  ```
  
  - Evaluate the mathematical expression and determine the exact integer value assigned to `result`.
    **Show your operator precedence steps.**
  
    ```java
    int result = 5 + 12 / 3 * 2 - 7 % 4;
    ```
  
  - List all the values that `val` will hold sequentially throughout the execution of these two lines of code. Then calculate the final value of `total`.
  
    ```java
    int val = 15;
    int total = val++ + val / 2 - --val;
    ```

  - Predict the exact integer outputs of the following independent modulo expressions:
    * `12 % 5` = `_____`
    * `5 % 12` = `_____`
    * `-7 % 3` = `_____`
