# 1.10 Programming Style and Feedback

**CED Topics:** 1.8

---

## 1. Programming Style

**Programming style** is a set of guidelines and best practices for formatting code — not about whether code *works*, but about whether another human (including future-you) can read it. A few basics:

- Use consistent, clear indentation.
- Use names that explain themselves (`remainingPaint`, not `rp`).
- Add comments to explain a method's purpose, and to clarify anything that needs it.

---

## 2. Documentation

**Documentation** means written descriptions of what your code is for and what it does — most often, comments:

```java
// Creates a Painter object called nova
Painter nova = new Painter();
// Moves forward one space
nova.move();
// Turns right by turning left three times
nova.turnLeft();
nova.turnLeft();
nova.turnLeft();
// Moves forward one space
nova.move();
// Takes all the paint from the paint bucket
while (nova.isOnBucket()) {
    nova.takePaint();
}
```

Notice the comments explain *why* a line exists (`// Turns right by turning left three times` — not obvious just from reading three `turnLeft()` calls), not just restate what the code obviously does.

---

## 3. Commits

A **commit** saves the latest changes to your code as a snapshot of the project at that moment. Committing regularly lets you keep a version history and go back to an earlier version if something breaks.

---

## 4. Code Reviews

A **code review** is the process of examining someone else's code and giving feedback to improve its quality and functionality. One structured way to give that feedback is the **TAG framework**:

- **T**ell them something you like about their code.
- **A**sk them something about the code.
- **G**ive a suggestion for improvement.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| Comments that just restate the code (`// move the painter` above `nova.move();`) | Doesn't add information a reader couldn't already see | Explain *why*, not *what* — what the code does is usually obvious from reading it |
| Giving code-review feedback as only criticism | Skips the "Tell" and "Ask" parts of TAG | Lead with something genuine you noticed working, then ask, then suggest |
