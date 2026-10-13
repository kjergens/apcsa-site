# 1.19 Objects in Memory

**CED Topics:** 1.12–1.13, 2.4, 3.6

You already know the mechanism this chapter runs on — 1.16 covered the stack/heap split: a reference variable lives on the stack and holds an *address*, the actual object lives on the heap. This chapter doesn't re-derive that. It applies it to one specific, very common situation: what actually happens when you try to print an object.

---

## 1. One Quick Reminder, Then We Build

```java
NetflixMovie movie = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
```

`movie` — the variable — lives on the stack and holds an address. The real `NetflixMovie`, with its `title`, `year`, `rating`, `score`, lives on the heap at that address. One more fact worth adding to what 1.16 already gave you: **a reference always takes the same small, fixed amount of space on the stack, no matter how big the object it points to is.** `movie` takes exactly as much stack space as any other reference — whether it points to a four-field `NetflixMovie` or a `Customer` with a hundred-movie queue attached. The size difference lives entirely on the heap, never in the reference.

---

## 2. Two Variables, One Object

Because a reference is just an address, nothing stops two different variables from holding the *same* address — pointing at the *same* object.

```java
NetflixMovie original = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
NetflixMovie alias = original;

alias.setScore(9.5);

System.out.println(original.getScore());   // 9.5 — not 8.8!
```

`alias = original` doesn't copy the object. It copies the *address* — now both variables point to the exact same object on the heap. Changing the object through `alias` is visible through `original`, because there was only ever one object; they're just two names for the same place. This is called **aliasing**.

Compare that to reassigning `alias` to a brand-new object:

```java
alias = new NetflixMovie("The Matrix", 1999, "R", 8.7);

System.out.println(original.getTitle());   // still "Inception"
System.out.println(alias.getTitle());      // "The Matrix"
```

`alias` now points somewhere new. `original` never changed — it never knew `alias` existed. Reassigning a reference just points *that one variable* elsewhere; it never affects any object, and never affects any other variable that happened to share the old address.

---

## 3. Passing Object References to Methods

You'll sometimes hear objects described as "passed by reference" in Java. **That's not accurate, and it's worth unlearning now** — the AP exam's own vocabulary (Topic 3.6, "Passing and Returning *References* of an Object") is deliberately precise about it.

**Java is always pass-by-value. No exceptions.** For a primitive, the value copied is the number itself. For an object, the value copied is the *reference* — not the object.

```java
public static void main(String[] args) {
    NetflixMovie movie = new NetflixMovie("Inception", 2010, "PG-13", 8.8);

    rename(movie);
    System.out.println(movie.getTitle());    // "Renamed!" — the object itself was mutated

    replace(movie);
    System.out.println(movie.getTitle());    // still "Renamed!" — replace() only reassigned its own copy
}

public static void rename(NetflixMovie m) {
    m.setTitle("Renamed!");        // mutates the object the reference points to
}

public static void replace(NetflixMovie m) {
    m = new NetflixMovie("New Movie", 2024, "PG", 7.0);   // only reassigns the LOCAL copy
}
```

`rename` and `replace` both receive a *copy* of the reference — same address, different variable. `rename` uses that copy to reach into the object and change a field, so `main`'s `movie` sees it too, since there's only one object. `replace` reassigns its own local copy `m` to point somewhere new entirely — but that's just `replace`'s copy. `main`'s `movie` is unaffected.

The precise sentence to hold onto: **the reference is passed by value.** Not "the object is passed by reference" — there's no such thing in Java.

---

## 4. Why Printing an Object Shows Something Like `NetflixMovie@1a2b3c`

Here's the payoff of 1.16's stack/heap picture: `println` has to show you *something* when you hand it an object directly, and all it actually has access to, by default, is the reference itself — not the object's contents.

```java
NetflixMovie movie = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
System.out.println(movie);
```

```
NetflixMovie@7a81197d
```

Every class, even if you never ask for it, automatically inherits a `toString()` method from Java's `Object` class — the ancestor of every class. Its default version returns the class name, an `@`, and a value derived from the object's identity on the heap. `System.out.println(movie)` is really calling `movie.toString()` behind the scenes — and without your own version, it falls back to that inherited one, which has no idea what a "title" or a "score" is. All it can report is *where this object lives*, because that's all a bare reference actually tells you.

**This is the exact same mechanism behind arrays, which you'll cover properly in a later chapter — but it's worth seeing now, since it's not a new rule.** An array variable is a reference too, so printing one directly does the same thing:

```java
int[] scores = {88, 72, 95};
System.out.println(scores);
```
```
[I@15db9742
```

Same idea, same reason: `scores` is a reference on the stack, the array's actual contents live on the heap, and without a special method to print the *contents*, Java can only report the reference's identity.

That mindset is 100% correct, highly intuitive, and exactly how professional programmers think when writing code!
By initializing a variable to null on purpose, you are telling Java: "Hey, I am creating a placeholder name right now. I don't have the real object data ready yet, but I promise I will point this name to a real place on the heap later."
Here is how that exact mindset maps perfectly to how Java handles memory:

## 5. Understanding `null`
## Creating the Placeholder (setting to null)

When you write:
``` java
NetflixMovie favoredMovie = null;
```

- On the Stack: Java reserves a small, fixed slot for the variable name favoredMovie.
- On the Heap: Absolutely nothing is created. No memory is used for object data. The stack variable just holds a special blank signpost (null) that says "I point to no address right now."
- Why it's safe: Because you explicitly gave it the value null, the compiler is happy. It will let your code run, and you can even print it safely.

## Filling the Placeholder Later (Two Options)

Once you are ready to use it, you can point that placeholder to an object in one of two ways:

1. Creating a brand-new object

``` java
// You finally know what movie it is!
favoredMovie = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
```

* What happens: Java goes to the heap, builds a fresh NetflixMovie object, and drops its new heap address right into your stack placeholder.

2. Pointing it to an existing reference (Aliasing)

``` java
NetflixMovie matrix = new NetflixMovie("The Matrix", 1999, "R", 8.7);

// You decide this is your favored movie!
favoredMovie = matrix; 
```

* What happens: Java looks at the address matrix is already pointing to, and copies that exact same heap address into favoredMovie. Now both names point to the same single movie on the heap.

### Be careful: do not try to call methods on null

Because null means "no address in the heap yet," you cannot look inside the object until you actually complete Step 2.
If you try to call a method while it is still a placeholder:

```java
NetflixMovie favoredMovie = null;
System.out.println(favoredMovie.getTitle()); // ❌ CRASH! NullPointerException
```

Java crashes because you told it to go to the heap and grab a title, but `favoredMovie` doesn't have a heap address yet!


---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| "I changed it through one variable and a *different* variable also changed!" | Not a bug — both variables were aliases pointing to the same object the whole time | Expected behavior; if you need a truly separate copy, you have to build one explicitly |
| Assuming a method can permanently redirect a caller's variable to a new object | Confusing mutating the object (visible to the caller) with reassigning the local reference copy (invisible to the caller) | Only changes made *through* the reference are visible outside the method — reassigning the parameter itself never is |
