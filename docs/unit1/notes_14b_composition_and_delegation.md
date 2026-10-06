# Putting It Together: Composition and Delegation

**CED Topics:** 1.12–1.13, previews Unit 3 (Class Creation)

This page isn't tied to one specific lesson — it ties several ideas together: instance variables, constructors, and calling instance methods, all combined into one new skill. You already put this into practice in the DogWalker FRQ; this page names what you were actually doing.

---

## 1. Composition: An Object That Has Another Object

You already know an instance variable can hold a primitive (`int`, `double`) or a `String`. It can also hold a **reference to another object entirely**.

**Composition** happens when a class has an instance variable that's a reference to another object — not just a primitive or a plain `String`. When that's true, the first object **"has-a"** second object.

```java
public class Person {
    private Leg m_Leg;    // Composition: Person has-a Leg
    private Hand m_Hand;  // Composition: Person has-a Hand
}
```

A `Person` object isn't just a name and an age — it actually *contains* a real `Leg` object and a real `Hand` object as part of what it is.

---

## 2. Delegation: Passing the Job Along

Once an object is composed of other objects, it can hand off work to them instead of doing everything itself. **Delegation** happens when an object's method fulfills its task by calling a method on one of its composed objects — passing the responsibility along instead of handling it directly.

```java
public class Person {
    private Leg m_Leg;
    private Hand m_Hand;

    public void swingLeg() {
        m_Leg.kick(); // Delegation: Person delegates kicking to the Leg
    }

    public void flexHand() {
        m_Hand.grab(); // Delegation: Person delegates grabbing to the Hand
    }
}
```

`Person` doesn't know *how* to kick — it doesn't have kicking logic written inside `swingLeg()` at all. It just asks its own `m_Leg` object to do it. The actual work lives inside `Leg`; `Person` only knows *who* to ask.

---

## 3. Why This Matters

This is the same pattern behind almost every multi-class program you'll write from here on: a class doesn't have to do everything itself. If a `Person` needs to kick, and a `Leg` object already knows how to kick, the `Person` class doesn't duplicate that logic — it just delegates to the `Leg` it already has.

---

## Check Your Understanding

!!! information

    Which of the following best defines a composition ("has-a") relationship in Java classes?

    A) A class extending another class using the `extends` keyword.
    B) A class having an object of another class as an instance variable (attribute).
    C) A method calling another method inside the same class.
    D) An interface defining abstract methods that a class must implement.

    ---

    **Answer: B.** Composition occurs when an object contains other objects as its own attributes, creating a "has-a" relationship. (A describes inheritance, not composition; C is just a regular method call, not necessarily delegation unless it's calling a method on a *composed* object; D describes an interface.)

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Writing the kicking logic directly inside `Person.swingLeg()` instead of calling `m_Leg.kick()` | Not actually using composition/delegation — just writing everything in one class | If `Leg` already has the logic, call it — don't duplicate it |
| Confusing composition ("has-a") with inheritance ("is-a") | A `Person` *has* a `Leg` (composition); a `Person` is not a kind of `Leg` | "Has-a" = an instance variable holding another object. "Is-a" = `extends` |
