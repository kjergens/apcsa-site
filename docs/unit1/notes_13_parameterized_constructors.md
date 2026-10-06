# 1.13 Parameterized Constructors

**CED Topics:** 1.13

---

## 1. State

**State** means all of an object's instance variables together, and whatever values they currently hold — the full picture of that object's current status. When a constructor runs, it sets an object's initial state by assigning values to its instance variables.

---

## 2. Parameterized Constructors

A **parameterized constructor** takes a specific number of arguments, used to assign values to an object's instance variables — instead of always falling back to the same defaults, the caller gets to choose.

```java
public class Painter {
    private int xLocation;
    private int yLocation;
    private Direction direction;
    private int remainingPaint;

    public Painter() {
        xLocation = 0;
        yLocation = 0;
        direction = Direction.EAST;
        remainingPaint = 0;
    }

    public Painter(int x, int y, String dir, int paint) {
        xLocation = x;
        yLocation = y;
        direction = new Direction(dir);
        remainingPaint = paint;
    }
}
```

Notice this class has *two* constructors with the same name (`Painter`) but different parameter lists. Defining two or more constructors or methods with the same name but different signatures is called **overloading**.

---

## 3. Formal Parameters and Local Variables

```java
public Painter(int x, int y, String dir, int paint) {
    xLocation = x;
    yLocation = y;
    direction = new Direction(dir);
    remainingPaint = paint;
}
```

`int x, int y, String dir, int paint` are the **formal parameters** — the placeholder variables defined right in the constructor's signature. Inside the body, `x`, `y`, `dir`, and `paint` behave as **local variables**: variables declared and usable only within this specific block of code.

---

## 4. Calling a Parameterized Constructor

```java
Painter katie = new Painter(2, 3, "North", 4);
```

`2`, `3`, `"North"`, `4` are the **actual parameters** (also called arguments) — the specific values being handed to the constructor. Each actual parameter's value gets *copied* into its matching formal parameter — this copying is called **call by value**.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Calling `new Painter(2, 3)` on a constructor that takes 4 parameters | Wrong number of arguments for that constructor | Match the argument count (and types, and order) to one of the overloaded constructors |
| Confusing "formal parameter" and "actual parameter" | Formal = the placeholder variable in the constructor's own definition. Actual = the real value supplied when calling it | "The actual parameter `4` gets copied into the formal parameter `paint`." |
| Assuming changing a formal parameter inside the constructor changes the caller's original value | Call by value means the formal parameter only ever holds a *copy* | This matters more once you're passing objects/arrays — covered later |
