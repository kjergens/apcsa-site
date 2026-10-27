# 2.1 Algorithms with Selection and Repetition

**CED Topics:** 2.1

---

## 1. What Is an Algorithm?

An **algorithm** is a precise, step-by-step procedure for solving a problem or completing a task — not just in computer science. A recipe is an algorithm for making a meal; driving directions are an algorithm for getting somewhere. What makes something count as an algorithm is that the steps are unambiguous enough that *anyone* (or anything — a computer included) following them correctly gets the same result.

Every method you've written so far — `getTitle()`, a constructor, `main()` — is an algorithm: a fixed sequence of instructions the computer carries out in order, every single time.

---

## 2. The Three Building Blocks

Every algorithm, no matter how complicated, is built from only three kinds of control:

**Sequence** — statements run one after another, top to bottom, in the order you wrote them. This is the default; it's what you've been doing since `main()` back in 1.3.

```java
int total = 0;
total = total + 10;
System.out.println(total);   // runs in this exact order: 30
```

**Selection** — the program *chooses* which block of code to run based on whether a condition is true or false. This is new starting this unit: `if` and `if`-`else` statements.

```java
if (score >= 90) {
    System.out.println("A");
}
```

**Repetition** (also called **iteration**) — a block of code runs over and over until some condition says to stop. This is also new this unit: `while` and `for` loops.

```java
while (count < 5) {
    System.out.println(count);
    count++;
}
```

Nothing else exists. Every program you will ever write — a video game, a search engine, a weather simulation — is some combination of these three things, nested and sequenced together.

---

## 3. Selection Only Fires on Conditions You Anticipate

An `if` statement only runs its block when the condition you wrote turns out to be true. That means selection only handles the cases you thought to check for. If a program needs a fallback for "everything else I didn't explicitly test for," that's what `else` is for — not a new idea yet, just a preview of 2.3.

A common beginner mistake is writing code that silently does nothing because no condition matched and there was no `else` to catch the leftover case. Anticipating which conditions actually need checking — and which ones need a catch-all — is itself part of designing the algorithm, before a single line of Java gets written.

---

## 4. Order Changes the Outcome

Because sequence, selection, and repetition all build on whatever state the program is already in, **the order you arrange them in can change what the algorithm actually does** — even using the exact same lines of code.

```java
int x = 5;
x = x + 1;      // x is now 6
x = x * 2;      // x is now 12
```

```java
int x = 5;
x = x * 2;      // x is now 10
x = x + 1;      // x is now 11
```

Same two operations, same starting value, different order, different final answer. This is worth internalizing now: when you start tracing selection and loops in the coming lessons, the order of the steps — not just which steps exist — will matter just as much.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Assuming "selection" and "repetition" only refer to `if`/`while` keywords specifically | They're general *categories* of control — any construct that chooses a path (selection) or repeats a block (repetition) counts, including ones you haven't learned yet | Think in terms of the three building blocks, not specific keywords |
| Writing code with no `else`/fallback and assuming some case is "impossible" | Selection only runs for conditions you explicitly anticipated — an untested case just silently does nothing | Ask "what happens if none of my conditions are true?" before finalizing an algorithm |
| Assuming code that uses the same operations in a different order gives the same result | Sequence means order is part of the algorithm's definition — reordering can change the outcome | Trace through step by step rather than assuming reordering is "safe" |

## Homework 2.1 Algorithms with Selection and Repetition

!!! attention

    1. Name the three building blocks every algorithm is made of, and give a one-sentence definition of each in your own words.

    2. Which building block(s) appear in this code? Identify each line.
    ```java
    int x = 3;
    x = x + 2;
    System.out.println(x);
    ```

    3. True or False: an algorithm must use all three building blocks to count as an algorithm. Explain your answer.

    4. Trace this code and give the final printed value of `y`:
    ```java
    int y = 2;
    y = y * 3;
    y = y - 1;
    ```

    5. Now swap the order of the last two lines above (`y = y - 1;` before `y = y * 3;`) and trace it again. Is the final value the same? What does this tell you about the role of order in an algorithm?

    6. Describe a real-world (non-coding) algorithm you follow regularly (e.g. a morning routine) and identify one part of it that uses selection and one part that uses repetition.
