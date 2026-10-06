# 1.6 Methods

**CED Topics:** 1.14

---

## 1. Behaviors Are Written as Methods

A **method** is a named set of instructions that perform a task. A method that belongs to an object is an **instance method** — it's how a behavior (from 1.4) actually gets written in Java.

The `Painter` class's `turnLeft()` and `move()` methods are the code behind the behaviors a `Painter` object can do.

---

## 2. Calling an Instance Method

```java
alice.move();
```

The `.` here is the **dot operator** — it's what you use to call a method that belongs to a specific object. `alice.move()` reads as "tell `alice` to run her `move()` method" — not "run `move()` in general." A different `Painter` object, like `ben`, has its own separate `move()` call: `ben.move()` moves `ben`, not `alice`.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Calling a method without the dot operator (`alice move();`) | Java needs `.` to connect an object to the method you're calling on it | `objectName.methodName()` |
| Forgetting the parentheses (`alice.move;`) | A method call always needs `()`, even with no arguments | `alice.move();` |
| Calling a method on the wrong object | Each object only runs its *own* copy of a method when you call it | Double-check which variable name is in front of the dot |
