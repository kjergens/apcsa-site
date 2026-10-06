# 1.12 No-Argument Constructors

**CED Topics:** 1.13

---

## 1. Components of a Constructor

```java
// Example constructor for a Painter with these attributes/instance variables
public Painter() {
    xLocation = 0;
    yLocation = 0;
    direction = "East";
    remainingPaint = 0;
}
```

- **`public`** — the access modifier. A constructor needs to be `public` so it can be called from outside the class (that's what `new Painter()` is doing).
- **`Painter`** — the name of the class. A constructor's name must exactly match its class's name.
- **`()`** — empty parentheses, since there are no parameters. That's what makes this a **no-argument constructor**.

Together, `public Painter()` is the **constructor signature** — the first line of the constructor, including the access modifier, the name, and any parameters.

Inside the curly braces is the constructor's **body**, where values actually get assigned to the instance variables.

---

## 2. Default Values

A no-argument constructor often sets its instance variables to **default values** — predefined values used whenever the program doesn't get a value from the user. That's exactly what's happening above: every new `Painter` starts at `(0, 0)`, facing East, with no paint, because the no-argument constructor says so.

One more fact worth knowing: **if you don't write a no-argument constructor yourself, Java automatically provides one for you**, and it assigns default values based on each field's data type (`0` for numbers, `false` for booleans, `null` for objects/Strings).

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Constructor name doesn't match the class name | A constructor *must* share its class's exact name | Rename the constructor to match the class exactly, including capitalization |
| Expecting instance variables to start out `null`/`0` without a constructor doing anything | Java *does* give every field a default based on its type — but only if no constructor explicitly sets it | Write a no-argument constructor if you want specific (non-default) starting values |
