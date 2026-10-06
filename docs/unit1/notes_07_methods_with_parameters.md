# 1.7 Methods with Parameters

**CED Topics:** 1.14

---

## 1. Why Some Methods Need Extra Information

`move()` doesn't need any information to do its job — a `Painter` always just moves forward. But `paint()` can't work the same way: it needs to know *what color*.

```java
public void paint(String color)
```
```
Parameters
  Name    Type     Description
  color   String   the color of the paint — can be a color name or a hex value
```

That extra piece of information a method needs is called a **parameter** — the variable that *receives* a value when the method is called.

---

## 2. Calling a Method with an Argument

```java
alice.paint("green");
```

The value you actually hand over when calling the method — here, `"green"` — is called the **argument**: a value sent into a method or constructor. `color` is the parameter waiting to receive it; `"green"` is the argument actually sent.

`"green"` is a **String** — a sequence of characters enclosed in quotation marks (`" "`).

---

## 3. Logic Errors

Not every bug stops your program from running. A **logic error** happens when a program compiles and runs fine, but behaves incorrectly or unexpectedly — nothing crashes, it just doesn't do what you intended. A method called with the wrong argument (`alice.paint("gren")` — a typo that's still technically a valid String) is a classic source of one: it compiles, it runs, and it quietly does the wrong thing.

**Testing your code early and often is one of the most effective ways to catch logic errors** before they pile up.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Passing the wrong type as an argument | A parameter expects a specific type (`String`, `int`, etc.) — passing the wrong type won't compile | Match the argument's type to the parameter's declared type |
| Code runs but produces the wrong result | A logic error — the code is syntactically valid but doesn't do what you meant | Trace through your code step by step, or test with a simple known case |
| Confusing "parameter" and "argument" | Parameter = the variable in the method's definition that *receives* a value. Argument = the actual value *sent* when calling it | "I passed the argument `"green"` into the `color` parameter." |
