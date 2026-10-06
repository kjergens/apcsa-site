# 1.16 Variables

**CED Topics:** 1.2

This is review — you've been declaring variables since CS1. This page is a fast, precise recap, not a first introduction. (For what's actually happening in memory when you create one, and how reference types like objects behave differently from primitives, see [1.19 Printing Objects](notes_19_printing_objects.md) — that's the deep dive; this page stays at the surface, on purpose.)

---

## 1. The Primitive Types You Need

| Type | Holds | Example |
|---|---|---|
| `int` | whole numbers | `int year = 2010;` |
| `double` | decimal numbers | `double score = 8.8;` |
| `boolean` | `true` or `false` | `boolean isReleased = true;` |

`String` isn't on this list — it's a reference type, not a primitive, even though it acts a lot like one day-to-day. See 1.19 for why that distinction matters.

---

## 2. Declaring and Initializing

```java
int year;          // declared — a slot exists, but has no value you can use yet
year = 2010;        // initialized — now it holds 2010

double score = 8.8; // declared and initialized in one line, the usual style
```

A declared-but-uninitialized local variable can't be read — Java won't compile code that tries to use one before it's been given a value.

---

## 3. Naming Rules and Conventions

**Rules (break these and it won't compile):**

- Must start with a letter, `_`, or `$` — never a digit
- Can't be a Java reserved word (`int`, `class`, `return`, etc.)
- Case-sensitive — `score` and `Score` are different variables

**Conventions (legal either way, but expected style, including on the AP exam's own code):**

- Variables and methods: `camelCase` — `movieScore`, not `moviescore` or `movie_score`
- Classes: `PascalCase` — `NetflixMovie`, not `netflixMovie`
- Constants (`final` variables): `ALL_CAPS` — `MAX_SCORE`

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| "variable might not have been initialized" | Declared a variable but tried to use it before giving it a value | Initialize before you read it, even to a placeholder value |
| Treating `score` and `Score` as the same variable | Java is case-sensitive | Match capitalization exactly, every time |
| Naming a variable starting with a digit (`2ndScore`) | Illegal identifier — doesn't compile | Start with a letter instead (`secondScore`) |
