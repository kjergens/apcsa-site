# 1.14 User Input

**CED Topics:** 1.7, 1.4

---

## 1. Libraries and APIs

A **library** is a collection of methods or reusable components of code that someone else already wrote, so you don't have to write them yourself. An **API** (Application Program Interface) is a library of prewritten classes — `Scanner` is one example.

---

## 2. The Scanner Class

`Scanner` lives in the `java.util` package and is the standard way to read user input. To use it:

```java
import java.util.Scanner;
```

To create a `Scanner` that reads from the keyboard:

```java
Scanner input = new Scanner(System.in);
```

---

## 3. Scanner Methods

```java
System.out.print("Enter a number: ");
int number = input.nextInt();

System.out.print("Enter your name: ");
String name = input.nextLine();
```

`nextInt()` reads the next whole number typed in. `nextLine()` reads an entire line of text, including spaces.

---

## 4. The Classic Scanner Gotcha

Mixing `nextInt()` and `nextLine()` back to back causes a very common, very confusing bug. When you press Enter after typing a number, `nextInt()` reads the number itself — but the Enter key press (a leftover newline) is still sitting there, unread. The very next `nextLine()` call doesn't wait for you to type anything; it immediately grabs that leftover Enter and returns an empty string.

The fix: add an extra, throwaway `input.nextLine()` right after `nextInt()`, specifically to consume that leftover Enter before you actually want to read a real line:

```java
System.out.print("Enter a number: ");
int number = input.nextInt();
input.nextLine();   // skips the leftover Enter key press

System.out.print("Enter your name: ");
String name = input.nextLine();

System.out.print("Enter your city: ");
String city = input.nextLine();
```

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| A `nextLine()` right after `nextInt()` seems to return nothing | It's reading the leftover Enter key press from the `nextInt()` call, not new input | Add a throwaway `input.nextLine();` between them to consume the leftover Enter |
| Forgetting `import java.util.Scanner;` | `Scanner` isn't part of Java's default toolkit — it has to be imported | Add the import line at the top of the file |
| Typing letters when `nextInt()` expects a number | `nextInt()` throws an exception if the input isn't actually a number | Make sure the prompt is clear about what kind of input is expected |
