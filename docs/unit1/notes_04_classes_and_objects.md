# 1.4 Classes and Objects

**CED Topics:** 1.12

---

## 1. A Class Is a Blueprint

**Object-oriented programming (OOP)** organizes code by grouping variables and the methods that work on them into **object classes** — classes hide their implementation details, and are modeled after and named for real-world things. Java is an OOP language.

A **class** is the code from which objects are created — a blueprint. An **object** is an instance of that class: a specific thing built from the blueprint, with its own variable name and its own unique set of information. Each object is created by calling the class's constructor, and one class can produce many separate objects.

Without the class, there's nothing to build an object from.

---

## 2. Attributes and Behaviors

Every object has two kinds of things associated with it:

- **Attribute** — a characteristic of an object, what it *has*. Also called an **instance variable**.
- **Behavior** — an action an object can perform, what it *can do*. Also called an **instance method**.

Objects have a **"has-a" relationship** with their attributes — a `Dog` object *has a* name — and they perform their behaviors — a `Dog` object *can bark*.

---

## 3. UML Diagrams

A **UML diagram** is a standard way to visualize a class's design, in three stacked sections: the class name on top, its attributes in the middle, its behaviors at the bottom.

```
┌─────────────────────┐
│       Painter        │
├─────────────────────┤
│ xLocation             │
│ yLocation             │
│ direction             │
│ remainingPaint        │
├─────────────────────┤
│ turnLeft()             │
│ move()                 │
│ paint(color)           │
│ takePaint()            │
└─────────────────────┘
```

Reading this diagram: `Painter` objects have four attributes (`xLocation`, `yLocation`, `direction`, `remainingPaint`) and four behaviors (`turnLeft()`, `move()`, `paint(color)`, `takePaint()`). Every `Painter` object you create will have all four attributes and be able to do all four behaviors — what differs between objects is the specific *values* those attributes hold.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Treating "class" and "object" as interchangeable | A class is the blueprint; an object is a specific thing built from it | You write one class, but can create many objects from it |
| Listing a behavior under "attributes" on a UML diagram (or vice versa) | Attributes are things an object *has*; behaviors are things it *can do* | Ask: is this a characteristic (noun) or an action (verb)? |
