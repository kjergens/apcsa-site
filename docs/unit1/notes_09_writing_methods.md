# 1.9 Writing Methods

**CED Topics:** 3.5, 1.9

Everything so far has been about *using* methods someone else wrote. This lesson flips to *writing* your own — officially a Unit 3 topic (Methods: How to Write Them), taught here early because it's needed to get anywhere with the rest of Unit 1.

---

## 1. Method Signature

```java
public void square()
```

The **method signature** is just the name plus the parameter list — `square()` — not the whole line. The return type (`void` here) and access modifier (`public`) aren't part of the signature itself.

---

## 2. What Actually Happens When You Call a Method

```java
// NeighborhoodRunner.java
public class NeighborhoodRunner {
    public static void main(String[] args) {
        Painter lisa = new Painter();
        lisa.move();       // <-- call happens here
        lisa.takePaint();
    }
}

// Painter.java
public class Painter {
    public void move() {
        . . .
    }
    public void takePaint() {
        . . .
    }
}
```

When `lisa.move()` runs, Java looks inside the `Painter` class for a method named `move()` and jumps there — this **interrupts** the normal top-to-bottom flow of `main()`. Java runs every statement inside `move()`, and once the last statement finishes (or a `return` statement runs), control jumps back to exactly where it left off — right after the call — and `lisa.takePaint()` runs next.

**`return`** means exactly that: exit the method and go back to the calling code, carrying along whatever value was requested.

---

## 3. `void` Methods

```java
public void move() { ... }
```

`void` as the return type means this method doesn't hand anything back to its caller — it does its job, and that's it. Every method you've called so far (`move()`, `turnLeft()`, `paint()`) has been `void`.

---

## 4. Writing a Method, Step by Step

```java
public class Dog extends Pet {
    public void bark() {
        // code to execute
    }
}
```

1. Make sure you're inside the class's curly braces `{ }`.
2. Write `public`, the return type, and the method signature — e.g., `public void bark()`.
3. Write the code the method should execute.

---

## 5. Calling a Method from Inside the Same Class

```java
public void bark() {
    sit();   // not dog.sit() — no object needed here
    // additional code to execute
}
```

When a method calls *another method in the same class* (or inherited from a superclass), you don't use a variable name and the dot operator — a class is a blueprint, not a specific object, so there's no object to refer to yet. Just call it directly: `sit()`, not `dog.sit()`.

---

## 6. Subclasses Can See the Superclass — Not the Other Way Around

```java
Painter lisa = new Painter();
lisa.turnRight();   // ERROR if turnRight() only exists in a PainterPlus subclass, not in Painter itself
```

```
error: cannot find symbol
    lisa.turnRight();
symbol:   method turnRight()
location: variable lisa of type Painter
```

A subclass can use everything its superclass defines. The reverse isn't true: a superclass has no idea what methods its subclasses might add later, so calling a subclass-only method on a superclass-typed variable is a compile error.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| `cannot find symbol` calling a method | The method doesn't exist on that class — often because it's only defined in a *subclass* | Check which class actually declares the method you're trying to call |
| Writing `dog.sit();` inside `Dog`'s own class | No object reference needed when calling a method on the current class (or its superclass) from inside that class | Just call `sit();` directly |
| Expecting a `void` method to return something usable | `void` means nothing comes back | If you need a usable result, the method needs a real return type, not `void` |
