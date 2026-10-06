# 1.3 Java Lab

**CED Topics:** 1.1

---

## 1. From Code to a Running Program

A computer doesn't understand Java directly. When you write Java, you're writing **source code** — the commands a programmer writes, in a form humans can read. Before any of it can run, a **compiler** translates that source code into machine code the computer can actually execute, going through a few steps along the way: `Program.java` → Java Compiler → `Program.class` → JVM → running program.

Along the way, the compiler checks your code for **syntax errors** — places where your code breaks Java's grammatical rules, which stops it from compiling into machine code at all. This is different from a program that compiles fine but does the wrong thing (that's a *logic* error, covered later) — a syntax error means the compiler couldn't even finish translating your code.

The tool you write and run Java in is called an **IDE** (Integrated Development Environment) — software built to help you write, edit, and manage code efficiently. Java Lab is the IDE used in this course.

---

## 2. Java's Syntax Rules

- **Case-sensitive:** `HELLO` and `hello` are two completely different names to Java.
- **camelCase:** multi-word names capitalize each word after the first — `painterEmma`, not `painteremma` or `painter_emma`.
- **Keywords:** words like `public` and `class` have a predefined meaning in Java — you can't use them as your own variable or method names.
- **File names:** usually start with a capital letter and end in `.java` for Java source files.

---

## 3. Anatomy of a Java File

```java
public class NeighborhoodRunner {
    public static void main(String[] args) {
    }
}
```

- **Class header** (`public class NeighborhoodRunner`): the `class` keyword plus the class's name. **The class name and the file name must match exactly** — `NeighborhoodRunner` must live in a file called `NeighborhoodRunner.java`. A mismatch is a syntax error.
- **Block of code**: any section wrapped in curly braces `{ }` — a class, a method, a loop body. The braces mark where that section starts and ends.
- **The `main` method** (`public static void main(String[] args)`): this is where a Java program starts running. `main` is the exact name Java looks for to know where to begin. `public`, `static`, and `void` each have their own meaning — covered in later lessons, along with what `String[] args` is for.
- **Comment** (`// This is a note!`): text meant for a human reader, completely ignored when the program runs.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| `class Neighborhoodrunner is public, should be declared in a file named NeighborhoodRunner.java` | The class name and the file name don't match exactly (case matters) | Rename one to match the other, exactly, including capitalization |
| Code won't compile at all | A syntax error — code that breaks Java's grammar rules | Read the compiler's error message carefully; it usually points at the exact line |
| Forgetting a closing `}` | Every `{` needs a matching `}` to close its block | Count your braces, or let your editor's auto-formatting show you where one's missing |
