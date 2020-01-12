# Kotlin 

## Table of Contents

[TOC]

## Introduction

- Java Virtual Machine (JVM) Language

## Why use Kotlin

- Marketed towards Android Developers 
  - Should have a good UI interface
- 2019 Adopted by Google
  - Long term support
- Can interoperate with Java (ie. you can call Java functions)
- Supports native for android and apple

## Hello World

```kotlin
fun main() {
    println("Hello World!")
}
```

- Don't use semicolons! Not needed

## First Project

Type: `Kotlin JS Client and JVM Server: Gradle`

## Variables

| Keyword | Type      |
| ------- | --------- |
| var     | Mutable   |
| val     | Immutable |

 ### Type inference vs Dynamic Typing

Kotlin **does not use** dynamic typing, instead it **infers** the type. This means that **you cannot change the variable type** after creating it

### String Formatting / Interpolation

Use the `$` sign to replace strings with variables. ie `"Hello $user"`

### Safe Call Operator

Using the `?` condition, you can 

- Tell variables to accept Null values
- Specify to only call/run a function if it is not null

example 

```kotlin
val dog: Dog? = null
dog?.bark()
```

### Not null Assertion Operator

Assert dog is not null, otherwise throw error

```kotlin
dog!!.bark() 
```

### The Elvis Operator

```kotlin
dog?: return
```



## Functions

Uses the keyword fun

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
```

One line equivalent

```kotlin
fun sum(a: Int, b: Int): Int = a + b 
// or, using type inference
fun sum(a: Int, b: Int): Int = a + b 
```

## Flow Control

```kotlin
// Conditionals
if (num > 10) {
    // ...
} else { /*...*/ }

// While
while () {
    // ...
}

// For: 0-10 inclusive
for (i in 0..10) {
   /**
}
```

## When Statement

Switch statement on steroids

```kotlin
when (age) {
    0 -> println("Hello World")
    in 2..10 -> println("so tall") //Range
    11, 12 -> println ("kk") // Multi-values
    is Cow -> println // Type check
}
```

## Classes

```kotlin
class Animal(var name: String, var age: Int) {
    var owner: String = ""
    	set (value) { 
        	println(value)
        }
} 
val animal = Animal("john", 100)
```

Optionally, a data class auto implements compare operator

```kotlin
data class animal(var name: String, var age: Int)
```

## Lambdas

```kotlin
val list = listOf("Hello", "World", "test")
list
	.map { text -> text.toUpperCase() }
	.foreach { text -> println(text) } 
```

An interesting function case

```kotlin
// Function of Type T
fun <T> Iterable<T>.makeNull(): Iterable<T?> {
    return map { _ -> null }
}

fun <T> makeNull(list: Iterable<T>): Iterable<T?> {
 	return list.map { _ -> null }   
}
```

