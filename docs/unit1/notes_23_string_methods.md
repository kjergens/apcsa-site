# 1.23 String Methods

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

### The `compareTo` Trap: It's Not Just `-1`, `0`, or `1`

It's tempting to assume `compareTo()` only ever returns `-1`, `0`, or `1` — but it doesn't. **The exact number returned is the actual difference between the character codes** at the first position where the two Strings differ. `"Hello".compareTo("Java")` returns `-2` specifically because `'H'` and `'J'` are 2 apart in character-code order — not because of some fixed `-1`/`1` convention.

**What you can actually rely on for tracing:** the *sign* (negative, positive, or zero) — not the specific magnitude. Don't assume a `compareTo()` trace answer has to be exactly `-1` or `1`; it could legitimately be `-2`, `32`, or any other number with the right sign.

---

### `compareTo()` Is Case-Sensitive

```java
firstWord.compareTo(secondWord);   // "Hello".compareTo("HELLO") → 32, not 0
```

`"Hello"` and `"HELLO"` are *not* considered equal by `compareTo()` — uppercase and lowercase letters have different character codes, so a case difference always produces a nonzero result, even when the words "look the same" to a human reader.

---

### Checking Alphabetical Order

```java
String str1 = "apple";
String str2 = "banana";
System.out.println(str1.compareTo(str2));   // -1 — "apple" comes before "banana"
```

A negative result confirms `str1` is alphabetically earlier than `str2`.

---

### `compareTo` Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Assuming `compareTo()` always returns exactly `-1`, `0`, or `1` | It returns the real character-code difference, which can be any integer with the correct sign | Only trust the *sign* when tracing — negative, positive, or zero |
| Assuming `"Hello".compareTo("HELLO")` returns `0` | `compareTo()` is case-sensitive — different case means different character codes | Treat case differences as real differences, not a match |
| Confusing which direction negative/positive means | Negative = calling String comes *before* the argument; positive = comes *after* | Read it as "how does the caller compare to the argument" |


## 2. `substring(int beginIndex)`

Returns a new String containing everything from `beginIndex` to the end of the original.

```java
String message = "Hello World!";
System.out.println(message.substring(5));   // " World!" — includes the space at index 5
```

Remember indices start at `0`: `H`=0, `e`=1, `l`=2, `l`=3, `o`=4, the space=5, `W`=6... `beginIndex = 5` lands on the space itself, so the result *includes* that leading space before `World!`.

---

### `substring(int beginIndex, int endIndex)`

Returns a new String starting at `beginIndex`, **up to but not including** the character at `endIndex`.

```java
String message = "Hello World!";
System.out.println(message.substring(0, 5));   // "Hello"
System.out.println(message.substring(2, 7));   // "llo W"
```

`substring(0, 5)` takes indices `0` through `4` — index `5` (the space) is the stop point, not included. That "up to but not including" rule is the single most important thing to get right about this method — it's exactly like a `for` loop condition `i < endIndex`.

---

### Getting a Single Character

You can pull out one character by making `endIndex` exactly one more than `beginIndex`:

```java
String message = "Hello World!";
System.out.println(message.substring(1, 2));   // "e"
System.out.println(message.substring(6, 7));   // "W"
```

---

### Strings Are Immutable

Remember from the last section, a `String` object's contents can never change after it's created. Every String method — `substring()` included — returns a **brand-new** String; none of them modify the original.

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

### `substring` Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Off-by-one on `endIndex` — missing the last character you wanted, or getting one extra | `endIndex` is exclusive — the character *at* that index is never included | Count carefully, or think "up to, not through" |
| Calling `message.substring(0, 5);` and expecting `message` itself to change | Strings are immutable — `substring()` returns a new String, it never modifies the original | Assign the result to a variable if you want to keep it |
| Forgetting that indices start at `0`, not `1` | Same indexing rule as arrays | The first character is always at index `0` |

## Homework 1.23 Strings and String methods

!!! attention

    1. Consider the following code segment:
    ```java
    String s1 = "Apple";
    String s2 = "Apple";
    String s3 = new String("Apple");
    String s4 = s1;

    System.out.print((s1 == s2) + " " + (s1 == s3) + " " + (s1 == s4) + " " + s1.equals(s3));
    ```

    What is printed as a result of executing this code segment?
    
     - A) true false true true
     - B) false false true true
     - C) true false false true
     - D) true true true true
     - E) false false false true
  
    2. Consider the following code segment:
    ```java
    String fruit = "banana";
    fruit.substring(2, 4);
    fruit += "s";
    System.out.println(fruit.indexOf("an"));
    ```
    What is printed as a result of executing this code segment?
    
     - A) 0
     - B) 1
     - C) 2
     - D) 3
     - E) -1

    3. Consider the following code segment:
    ```java
    String message = "APCSA\n\tClass";
    int len = message.length();
    System.out.println(message.substring(len - 1, len + 1));
    ```
    What happens when this code segment is executed?
  
    - A) It prints the last character of the string followed by a blank space.
    - B) It prints the last character of the string successfully.
    - C) It throws an IndexOutOfBoundsException.
    - D) It throws a compilation syntax error due to illegal escape characters inside the length bounds.
    - E) It prints nothing because the substring parameters simplify down to 0.

    4. What is printed as a result of executing the code segment?
    ```java
    String word1 = "Cat";
    String word2 = "cat";

    if (word1.compareTo(word2) < 0) {
        System.out.print("1");
    } else if (word1.compareTo(word2) > 0) {
        System.out.print("2");
    } else {
        System.out.print("3");
    }
    ```
    
    - A) 1
    - B) 2
    - C) 3
    - D) No output is produced because compareTo returns an exact value, not a boolean condition.
    - E) A runtime exception is thrown because of case conflict mismatch.

    5. Which of the following can be used to replace /* missing condition */ in the code below so that the method works as intended?
    ```java
    public static int findNextWord(String[] list, String target) {
        for (int i = 0; i < list.length; i++) {
            /* missing condition */ {
                return i;
            }
        }
        return -1;
    }
    ```
    
    - A) if (list[i].compareTo(target) == 1)
    - B) if (list[i].compareTo(target) > 0)
    - C) if (target.compareTo(list[i]) > 0)
    - D) if (list[i].compareTo(target) < 0)
    - E) if (list[i].equals(target))

