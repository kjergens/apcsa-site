# 1.21 The Math Class

**CED Topics:** 1.10, 1.11

The AP exam's own reference sheet lists exactly four `Math` methods. This page covers those four, precisely — not the dozens of other methods the real `Math` class happens to have.

---

## 1. A Class You Never Instantiate

Every object class you've worked with — `NetflixMovie`, `Customer` — needs `new` before you can use it:

```java
NetflixMovie movie = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
movie.getTitle();
```

`Math` doesn't work that way. There's no such thing as `new Math()`, and you'd get a compile error if you tried. Every method on `Math` is **static** — it belongs to the class itself, not to any individual object, so you call it directly on the class name:

```java
double result = Math.sqrt(16);   // called ON the class, no object needed
```

This is the core distinction between a **static (class) method** and an **instance method**: an instance method (like `movie.getTitle()`) only makes sense once an object exists to ask — *this* movie's title. A static method doesn't depend on any particular object's data at all; `Math.sqrt(16)` is always `4.0`, no matter what object (if any) is doing the asking. `Math` is a utility class — a bundle of reusable calculations — not a blueprint for objects.

---

## 2. The Four Methods That Matter

**`Math.abs(x)`** — absolute value. Works on `int` or `double`, returns the same type you gave it.

```java
Math.abs(-7);      // 7
Math.abs(-3.2);    // 3.2
```

**`Math.pow(base, exponent)`** — raises `base` to the power of `exponent`. **Always returns a `double`**, even if both arguments are whole numbers and the mathematical answer is a whole number.

```java
double area = Math.pow(4, 2);   // 16.0 — a double, not 16
```

If you need that result as an `int`, you have to cast it yourself — exactly the narrowing-cast rule from 1.18.

**`Math.sqrt(x)`** — square root. Also always returns a `double`.

```java
Math.sqrt(25);   // 5.0
```

**`Math.random()`** — returns a random `double`, always greater than or equal to `0.0` and strictly less than `1.0`. It never returns exactly `1.0`.

```java
double chance = Math.random();   // somewhere in [0.0, 1.0)
```

On its own, `Math.random()` only gives you a decimal between 0 and 1 — turning that into a random integer in a useful range (like simulating a die roll) takes a bit more work, and a classic off-by-one trap if you're not careful. That's covered fully in 1.22.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| `Math movie = new Math();` | `Math` has no constructor to call — it's a static utility class, never instantiated | Call its methods directly on the class: `Math.methodName(...)` |
| `int area = Math.pow(4, 2);` won't compile | `Math.pow()` returns a `double`, even for whole-number results | Cast explicitly: `(int) Math.pow(4, 2)` |
| Expecting `Math.random()` to ever return exactly `1.0` | The range is `[0.0, 1.0)` — inclusive of 0, exclusive of 1 | Design range calculations knowing `1.0` itself never occurs |
