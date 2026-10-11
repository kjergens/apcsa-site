# 1.22 String Objects

**CED Topics:** 1.15

---
## String - using new


## String - why .equals() instead of ==?


## Strings Are Immutable

A `String` object's contents can never change after it's created. Every String method — `substring()` included — returns a **brand-new** String; none of them modify the original.

```java
String message = "Hello World!";
message.substring(0, 5);
System.out.println(message);   // "Hello World!" — completely unchanged
```

That line calling `substring()` computed `"Hello"` and then threw it away — it was never stored anywhere. If you want to keep the result, you have to assign it:

```java
String greeting = message.substring(0, 5);   // now greeting holds "Hello"
```

---

