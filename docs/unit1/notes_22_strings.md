# 1.22 String Objects

**CED Topics:** 1.15

Strings in Java are objects of the String class. Strings represent sequences of characters and are used to store text like names, addresses, or messages. The String class is part of the java.lang package which is available by default in all Java programs.

---
## String References

``` java
String greeting;
```

The code above declares an object variable named `greeting` and sets the value of `greeting` to the Java keyword `null` to show that it doesn’t refer to any object yet. So `System.out.println(greeting);` will print `null`.

Reminder: object variables refer to objects in memory. A **reference** is a way to find the actual object, like adding a contact to your phone lets you reach someone without knowing exactly where they are. The value of `greeting` is `null` since the string object has not been created yet.


In Java there are two ways to create an object of the String class. You can use the `new` keyword followed by a space and then the class constructor and then in parentheses you can include values used to initialize the fields of the object. This is the standard way to create a new object of a class in Java.

```java
String greeting = new String("Hello");
```

In Java you can also use just a string literal, which is a set of characters enclosed in double quotes ("), to create a String object.

```java
String greeting = "Hello";
```

In both cases an object of the `String` class will be created in memory and the value of the variable greeting will be set to an object **reference**, a way to find that object.


## String: Why .equals() instead of == ?

As you learned in section 1.16, reference types store the reference or heap address in the stack. The == operator compares stack values. Two independently created strings will have their own address, therefore == will return false.

```java
String s1 = "Panda";
String s2 = new String("Panda"); // Forces the creation of a brand NEW object

System.out.println(s1 == s2);      // FALSE (They point to different locations)
System.out.println(s1.equals(s2)); // TRUE (The text content is identical)
```

```java
String s1 = "Panda";
String s2 = s1;  
System.out.println(s1 == s2);   // TRUE - they BOTH have the same reference
```


## String Index and Length
A string holds characters in a sequence. Each character is at a position or index which starts with 0 as shown below. An index is a number associated with a position in a string. The length of a string is the number of characters in it including any spaces or special characters.

	* length() method returns the number of characters in the string, including spaces and special characters like punctuation.

	* indexOf(String str) method searches for the string str in the current string and returns the index of the beginning of str in the current string or -1 if it isn’t found.


```java
String msg = "This is a test";
System.out.println(msg.indexOf("test"));
System.out.println(msg.length());
```

The output to the above code would be:
```
10
14
```

The first character in a string is at index 0 and the last character is at length -1.


## String concatenation and immutability
Strings can be added to each other to create a new string using the `+` or `+=` operator . This is also called **concatenation**. You can also add any other kind of value to a String with `+` or `+=` and the other value will be converted to a String automatically.

A String object is **immutable**, meaning once a String object is created, its attributes cannot be changed. So when we add two Strings (or a String and another value converted to a String) we get a new String without making any change to the values being added together just like when we add the ints 1 + 2 the original 1 and 2 aren’t changed. When we use += we are making a new String by adding something to the current value of a variable and then assigning that new value back into the variable, again just like with numbers.

This is just true for concatenation. A `String` object's contents can never change after it's created. Every String method, e.g., `toLowerCase()`, `toUpperCase()`, `substring()`, returns a **brand-new** String; none of them modify the original.


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


