# 2.10 Implementing String Algorithms

**CED Topics:** 2.10

---

## 1. Processing a String One Character at a Time

Combining loops (2.7-2.9) with the String methods from 1.22-1.23 lets you process every character of a String individually, instead of treating the whole String as one unbreakable block. The standard way to isolate a single character at index `i` is `substring(i, i + 1)` — a two-argument call where the end index is exactly one more than the start, extracting just that one character as a one-character String.

```java
String word = "cat";
for (int i = 0; i < word.length(); i++) {
    String current = word.substring(i, i + 1);
    System.out.println(current);
}
// c
// a
// t
```

The loop bound is always `word.length()`, not a hardcoded number — that's what makes this pattern work for a String of *any* length, not just the one example you happened to test it with.

---

## 2. Building a New String, Character by Character

This is the String version of the accumulator pattern from 2.9 — except instead of accumulating a running total, you're accumulating a running String, using `+=` to append one character onto the end each time through the loop.

```java
String palindrome = "racecar";
String forward = "";                 // start with an empty String, same idea as starting total = 0

for (int i = 0; i < palindrome.length(); i++) {
    String current = palindrome.substring(i, i + 1);
    forward += current;
}
System.out.println(forward);   // racecar
```

Just like the int accumulator bug from 2.9, declaring `forward` *inside* the loop instead of before it would reset it to `""` every single iteration — the same "initialize before, update inside" rule applies here too.

---

## 3. Reversing a String

To build the String *backward*, change which direction the loop counts: start at the last valid index (`length() - 1`) and count down to `0`, instead of counting up from `0`.

```java
String word = "hello";
String backward = "";

for (int i = word.length() - 1; i >= 0; i--) {
    backward += word.substring(i, i + 1);
}
System.out.println(backward);   // olleh
```

The accumulation logic — appending one character per iteration onto a result String — is identical to the forward version. **Only the loop's direction changed** (counting down instead of up), not the accumulation itself. This is a useful thing to notice: the order you append characters in, not the appending step itself, is what determines forward vs. backward.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Using `word.length()` as a valid index | Valid indices only go up to `length() - 1` — `substring(word.length(), ...)` or indexing at `length()` throws a `StringIndexOutOfBoundsException` | Loop condition should be `i < word.length()`, never `i <= word.length()` |
| Writing `backward = word.substring(i, i+1)` instead of `backward += word.substring(i, i+1)` | `=` replaces the accumulated result every iteration instead of appending onto it — same bug as any accumulator (2.9) | Use `+=` whenever you're building up a result across iterations |
| Trying to reverse a String by just changing `+=` to `=` or swapping operand order | Reversal comes from the loop's *direction* (counting down vs. up), not from how the characters are combined | Keep the same `+=` accumulation; change only the loop's starting index, ending condition, and step direction |
| Hardcoding a String's length as a number instead of calling `.length()` | Breaks the moment the algorithm is used on a different String | Always call `.length()` on the actual String being processed, never assume a fixed size |

## Homework 2.10 Implementing String Algorithms

!!! attention

    1. Trace this loop for `word = "dog"` and give the full console output:
    ```java
    for (int i = 0; i < word.length(); i++) {
        System.out.println(word.substring(i, i + 1));
    }
    ```

    2. Write a loop that builds and prints every character of a String `word` in uppercase, one at a time (hint: look up `String`'s `toUpperCase()` method, or apply it to each single-character substring).

    3. Trace this code for `palindrome = "level"` step by step and give the final value of `forward`:
    ```java
    String forward = "";
    for (int i = 0; i < palindrome.length(); i++) {
        forward += palindrome.substring(i, i + 1);
    }
    ```

    4. Write a loop that reverses a String called `input` and stores the result in a variable called `reversed`.

    5. A palindrome reads the same forward and backward (like `"racecar"`). Using the forward-building and reverse-building patterns from this lesson, write code that checks whether a String `s` is a palindrome.

    6. Find the bug in this code and explain what it actually does when run:
    ```java
    for (int i = 0; i <= word.length(); i++) {
        System.out.println(word.substring(i, i + 1));
    }
    ```

    7. In your own words, explain why reversing a String only requires changing the loop's direction, not the accumulation step itself.
