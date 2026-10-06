# 1.24 Comparing Strings

**CED Topics:** 1.15

---

## 1. `compareTo()`

```java
int compareTo(String anotherString)
```

`compareTo()` tells you how two Strings relate in **lexicographical order** — alphabetical order, by the underlying character codes. It returns:

- a **negative** number if the calling String comes *before* the argument
- a **positive** number if the calling String comes *after* the argument
- **`0`** if the two Strings contain exactly the same characters

```java
String firstWord = "Hello";
String secondWord = "HELLO";
String thirdWord = "Java";

System.out.println(firstWord.compareTo(thirdWord));    // -2
System.out.println(firstWord.compareTo(secondWord));   // 32
System.out.println(thirdWord.compareTo(firstWord));    // 2
```

---

## 2. The Trap: It's Not Just `-1`, `0`, or `1`

It's tempting to assume `compareTo()` only ever returns `-1`, `0`, or `1` — but it doesn't. **The exact number returned is the actual difference between the character codes** at the first position where the two Strings differ. `"Hello".compareTo("Java")` returns `-2` specifically because `'H'` and `'J'` are 2 apart in character-code order — not because of some fixed `-1`/`1` convention.

**What you can actually rely on for tracing:** the *sign* (negative, positive, or zero) — not the specific magnitude. Don't assume a `compareTo()` trace answer has to be exactly `-1` or `1`; it could legitimately be `-2`, `32`, or any other number with the right sign.

---

## 3. `compareTo()` Is Case-Sensitive

```java
firstWord.compareTo(secondWord);   // "Hello".compareTo("HELLO") → 32, not 0
```

`"Hello"` and `"HELLO"` are *not* considered equal by `compareTo()` — uppercase and lowercase letters have different character codes, so a case difference always produces a nonzero result, even when the words "look the same" to a human reader.

---

## 4. Checking Alphabetical Order

```java
String str1 = "apple";
String str2 = "banana";
System.out.println(str1.compareTo(str2));   // -1 — "apple" comes before "banana"
```

A negative result confirms `str1` is alphabetically earlier than `str2`.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Assuming `compareTo()` always returns exactly `-1`, `0`, or `1` | It returns the real character-code difference, which can be any integer with the correct sign | Only trust the *sign* when tracing — negative, positive, or zero |
| Assuming `"Hello".compareTo("HELLO")` returns `0` | `compareTo()` is case-sensitive — different case means different character codes | Treat case differences as real differences, not a match |
| Confusing which direction negative/positive means | Negative = calling String comes *before* the argument; positive = comes *after* | Read it as "how does the caller compare to the argument" |
