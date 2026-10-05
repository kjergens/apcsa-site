# 1.19 Printing Objects

**CED Topics:** 1.12–1.13, 2.4, 3.6

---

## 1. Two Places Things Live: the Stack and the Heap

Every variable you've written so far — `int`, `double`, `String`, and now object references — lives somewhere while your program runs. Java keeps two separate regions of memory, and they behave very differently.

**The stack** holds local variables and parameters, one frame per method call. When `main()` calls another method, that method gets its own frame, stacked on top. When the method returns, its frame — and everything in it — disappears.

**The heap** holds every object you create with `new`. Objects don't belong to any one method's frame; they live on the heap until nothing refers to them anymore, and they stay there even after the method that created them has returned.

```java
public static void main(String[] args) {
    NetflixMovie firstMovie = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
    System.out.println(firstMovie.getTitle());
}
```

Here, `firstMovie` — the variable itself — lives on the stack, inside `main()`'s frame. The actual `NetflixMovie` object — its `title`, `year`, `rating`, `score` fields — lives on the heap. `firstMovie` doesn't *contain* the object. It contains the object's **address**: a reference to where that object lives on the heap.

This is the single most important fact in this chapter, and everything else follows from it: **a reference variable is not the object. It's directions to the object.**

---

## 2. Creating a Variable: Finding Room

When you write `int year = 2010;`, Java doesn't just conjure space out of nowhere. It finds a free, contiguous chunk of memory big enough to hold an `int` (a fixed, small size, always the same no matter the value), reserves it, and writes `2010` there. `year` is now the *name* your code uses to refer to that specific chunk.

`new NetflixMovie(...)` works the same way, but on the heap, and at a different scale. Java finds enough free, contiguous space to hold *all* of a `NetflixMovie`'s fields together — `title`, `year`, `rating`, `score` — reserves that whole block, and writes the constructor's values into it. The reference that comes back and gets stored in your stack variable is just the address of where that block starts.

This is also why a reference variable always takes the same small, fixed amount of memory, no matter how big the object it points to is. `firstMovie` takes exactly as much space as any other reference — enough to hold one address — whether it points to a `NetflixMovie` with four fields or a `Customer` with a hundred-movie queue attached. The size difference lives entirely on the heap, never in the reference itself.

---

## 3. Two Variables, One Object

Because a reference is just an address, nothing stops two different variables from holding the *same* address — pointing at the *same* object.

```java
NetflixMovie original = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
NetflixMovie alias = original;

alias.setScore(9.5);

System.out.println(original.getScore());   // 9.5 — not 8.8!
```

`alias = original` doesn't make a copy of the `NetflixMovie` object. It copies the *address* — now both `original` and `alias` point to the exact same object on the heap. Changing the object through `alias` is visible through `original`, because there was only ever one object; `original` and `alias` are just two names for the same place. This is called **aliasing**, and it's the source of a whole category of bugs where a program mutates something through one variable and is surprised another variable "also changed" — it never changed twice. It only existed once.

Compare that to reassigning `alias` to a brand-new object:

```java
alias = new NetflixMovie("The Matrix", 1999, "R", 8.7);

System.out.println(original.getTitle());   // still "Inception"
System.out.println(alias.getTitle());      // "The Matrix"
```

Now `alias` points somewhere new. `original` never changed — it never knew `alias` existed in the first place. Reassigning a reference just points that one variable elsewhere; it has no effect on any object, and no effect on any other variable that happened to share the old address.

---

## 4. Passing Objects to Methods: Get the Vocabulary Right

You'll sometimes hear objects described as "passed by reference" in Java. **That's not accurate, and it's worth unlearning now rather than later** — the AP exam's own vocabulary for this (Topic 3.6, "Passing and Returning *References* of an Object") is deliberately precise about it.

**Java is always pass-by-value. No exceptions.** For a primitive, the value copied is the number itself. For an object, the value copied is the *reference* — the address — not the object.

```java
public static void rename(NetflixMovie m) {
    m.setTitle("Renamed!");        // mutates the object the reference points to
}

public static void replace(NetflixMovie m) {
    m = new NetflixMovie("New Movie", 2024, "PG", 7.0);   // only reassigns the LOCAL copy
}

public static void main(String[] args) {
    NetflixMovie movie = new NetflixMovie("Inception", 2010, "PG-13", 8.8);

    rename(movie);
    System.out.println(movie.getTitle());    // "Renamed!" — the object itself was mutated

    replace(movie);
    System.out.println(movie.getTitle());    // still "Renamed!" — replace() only reassigned its own copy
}
```

`rename` and `replace` both receive a *copy* of the reference — same address, different variable. `rename` uses that copy to reach into the object and change a field — and since there's only one object, `main`'s `movie` sees the change too. `replace` reassigns its own local copy `m` to point somewhere new entirely — but that's just `replace`'s copy. `main`'s `movie` still points to the original object, completely unaffected.

The precise sentence to hold onto: **the reference is passed by value.** Not "the object is passed by reference" — there's no such thing in Java.

---

## 5. Why Printing an Object Shows Something Like `NetflixMovie@1a2b3c`

Try this before `NetflixMovie` has a `toString()` method of its own:

```java
NetflixMovie movie = new NetflixMovie("Inception", 2010, "PG-13", 8.8);
System.out.println(movie);
```

```
NetflixMovie@7a81197d
```

This isn't a bug, and it isn't random. Every class you write, even if you don't ask for it, automatically inherits a `toString()` method from Java's `Object` class — the ancestor of every class in Java. Its default implementation returns the class name, an `@`, and a hexadecimal number derived from the object's identity on the heap. `System.out.println(movie)` is really calling `movie.toString()` behind the scenes, and without your own version, it falls back to that inherited one — which has no idea what a "title" or a "score" is. All it can report is roughly *where this object lives*.

---

## 6. Writing Your Own `toString()`

This is why you `@Override toString()` — to replace that inherited, address-based default with one that actually describes your object:

```java
@Override
public String toString() {
    return title + " (" + year + ") | " + rating + " | " + score + "/10";
}
```

Now `System.out.println(movie)` prints `Inception (2010) | PG-13 | 8.8/10` instead of a hex code — because `println` is still calling `toString()`, it's just calling *your* version now, which shadows the inherited one. Nothing about *how* `println` works changed; what changed is which `toString()` it finds.

---

## Common Errors

| Error | What's actually happening | Fix |
|---|---|---|
| `System.out.println(someObject)` prints something like `ClassName@1a2b3c` | No `toString()` override — Java is using the inherited default from `Object` | Write your own `toString()` |
| "I changed it through one variable and a *different* variable also changed!" | Not a bug — both variables were aliases pointing to the same object the whole time | Expected behavior; if you need a truly separate copy, you have to build one explicitly |
| Assuming a method can permanently redirect a caller's variable to a new object | Confusing mutating the object (visible to the caller) with reassigning the local reference copy (invisible to the caller) | Only changes made *through* the reference (calling setters, etc.) are visible outside the method — reassigning the parameter itself never is |
| Calling it "pass by reference" | Java has no pass-by-reference. The *reference* is passed by value | Say "the reference is copied," not "the object is passed by reference" |
