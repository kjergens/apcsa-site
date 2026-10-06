# 1.23 Substrings

**CED Topics:** 1.15

---

## 1. `substring(int beginIndex)`

Returns a new String containing everything from `beginIndex` to the end of the original.

```java
String message = "Hello World!";
System.out.println(message.substring(5));   // " World!" — includes the space at index 5
```

Remember indices start at `0`: `H`=0, `e`=1, `l`=2, `l`=3, `o`=4, the space=5, `W`=6... `beginIndex = 5` lands on the space itself, so the result *includes* that leading space before `World!`.

---

## 2. `substring(int beginIndex, int endIndex)`

Returns a new String starting at `beginIndex`, **up to but not including** the character at `endIndex`.

```java
String message = "Hello World!";
System.out.println(message.substring(0, 5));   // "Hello"
System.out.println(message.substring(2, 7));   // "llo W"
```

`substring(0, 5)` takes indices `0` through `4` — index `5` (the space) is the stop point, not included. That "up to but not including" rule is the single most important thing to get right about this method — it's exactly like a `for` loop condition `i < endIndex`.

---

## 3. Getting a Single Character

You can pull out one character by making `endIndex` exactly one more than `beginIndex`:

```java
String message = "Hello World!";
System.out.println(message.substring(1, 2));   // "e"
System.out.println(message.substring(6, 7));   // "W"
```

---

## 4. Strings Are Immutable

A `String` object's contents can never change after it's created. Every String method — `substring()` included — returns a **brand-new** String; none of them modify the original.

```java
String message = "Hello World!";
message.substring(0, 5);
System.out.println(message);   // "Hello World!" — completely unchanged
```

That line calling `substring()` computed `"Hello"` and then threw it away — it was never stored anywhere. If you want to keep the result, you have to assign it:

```java
String greeting = message.substring(0, 5);   // now greeting holds "Hello"
```

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Off-by-one on `endIndex` — missing the last character you wanted, or getting one extra | `endIndex` is exclusive — the character *at* that index is never included | Count carefully, or think "up to, not through" |
| Calling `message.substring(0, 5);` and expecting `message` itself to change | Strings are immutable — `substring()` returns a new String, it never modifies the original | Assign the result to a variable if you want to keep it |
| Forgetting that indices start at `0`, not `1` | Same indexing rule as arrays | The first character is always at index `0` |
