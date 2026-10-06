# 1.5 Instantiating Objects

**CED Topics:** 1.13

---

## 1. The Word "Instance"

You'll hear "instance" used instead of "object" constantly from here on — they mean the same thing. The full vocabulary:

| Term | Means | Also called |
|---|---|---|
| **instance** | an object | object |
| **instance variable** | a variable storing a characteristic of the object | attribute, field |
| **instance method** | a method belonging to an object | behavior |

So "an instance of a `Painter`" and "a `Painter` object" mean exactly the same thing. When you write `alice.move()`, `move()` is an instance method — specifically, it's *alice's own copy* of the `move()` method.

---

## 2. Creating an Object

```java
Painter alice = new Painter();
```

Creating an object is called **instantiating** — to instantiate means to call the constructor to create an object. A **constructor** is a block of code with the same name as the class, which tells the computer how to build a new object. When you instantiate, you're creating an instance of the class — and you can create as many separate instances of the same class as you want.

```java
Painter alice = new Painter();
Painter ben = new Painter();
```

`alice` and `ben` are two separate `Painter` instances, each with their own independent set of instance variables.

---

## 3. Default State

A new `Painter` object starts at `(0, 0)`, facing East, with `0` units of paint — not because Java invents those values, but because that's exactly what the `Painter()` constructor's own instructions say to do.

---

## 4. Errors You'll Hit

A **run-time error** is a mistake that happens *while the program is running*, not while it's compiling — it causes the program to stop unexpectedly. Example: a `Painter` tries to move off the grid or into an obstacle.

An **exception** is a specific kind of run-time error — one caused by something the compiler couldn't have caught in advance. It interrupts the normal flow of the program.

One exception worth knowing by name: **`NullPointerException`**. If a variable is assigned `null` instead of a real object —

```java
Painter ezra = null;
```

— then `ezra` doesn't actually refer to any object at all. Trying to call a method on it, like `ezra.move()`, throws a `NullPointerException`, because there's no object there to receive the call.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| `NullPointerException` | Calling a method on a variable that's `null` — it was never assigned a real object | Make sure the variable was actually instantiated (`new ClassName()`) before calling methods on it |
| Confusing "class" and "instance" in a sentence | A class is the blueprint; "instance" is just another word for a specific object made from it | "Create an instance of `Painter`" = "create a `Painter` object" |
