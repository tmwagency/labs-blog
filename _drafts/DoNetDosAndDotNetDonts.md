---
comments: false
layout: post
title: "Post title"
categories:
- general

author: eacheampong
excerpt: This is the part of the post that is shown on the home page
---
# My Top 3 DotNETDos and DotNETDonts!

## 1. Checking for NULL!
It really never surprises me how many times you can view code in which the developer just doesn’t expect to receive an input into from some unpredictable source and then use the unchecked value in a method or property for it to acrimoniously self-combust..usually just when you really need it not to i.e 4pm on a Friday Afternoon!

Here’s a classic example 

    var id = Request.QueryString["uAccountId"];
    var userAccount = _accountRepository.Get(id);
    if (userAccount.Debt >= _maxDebt)
    {
        SendDebtWarningMsg(userAccount);
    } 

Obviously if that userAccount object is null, then all below will throw an exception.

So REMEMBER DO:
*Sanity check objects returned from methods for Null IF there is even a small chance that the objects value may not be set as desired.

And DON’T:
*Risk your code crumbling embarrassingly simply because you thought there was “no way at all” for an input value to be any different than you expect and program optimistically for.


## 2. Implicit local variable declarations – USE THEM!

Since version 3.0 of C#, Implicitly typed local variable declarations by use of the keyword var has been a well adopted and accepted addition to the language and an ever present in the majority of good C# coders work.
However I often do see code in which the developer sticks to the traditional declarative approach, and that’s fine, but also its almost always unesseccesary and they simply show me they don’t have an understanding of what is going on behind the scenes in regards to development with the C# compiler and the latest syntax associated with well written C# code. 

There are no drawbacks: Modern editors work in the background with the C# compiler in understanding what the type a variable should be at compile time helping the developer to write the code.
The compiler works out at runtime what the implicit variable should and will be. There is normally no need to have to clutter up your code further with these statements. Furthermore, changing the return type of a method, which sets a declarative variable can include (not automated at least) a lot of refactoring the remove the old declared type and replace with the changed type. Using the implicit var keyword, removes this worry.

So REMEMBER DO:
*Use Implicit local variables when the type expected of an assigned value to a variable can be inferred at compile time.

And DON’T:
*Hard code rigidly declared types which eventually may change and force you to do some hefty refactoring.

## 3. LINQ and Lambda expressions – “With great power comes great responsibility” – Uncle Ben, Spiderman Fame, Marvel Comics.

LINQ  is powerful and unfortunately too many times I see an abhorrent abuse of this power. 

This comes in the form of unnecessarily  complex queries written, when something far simpler or quicker could be used.
I’ve had to work for companies in the past where speed was the most important part of a data access layer. Business logic layers and ultimately presentation layers need to have that data layer working as quick as possible, whenever caches have expired and they are summoned to be utilised. 

LINQ queries are objects that retain a query definition and the equivalent SQL is only instantiate at the moment the query is actually iterated. The query can accommodate new filters, joins and more from every component in the processing pipeline, until it reaches the final form that is eventually iterated. Often found in the heart of many a developers repository patterns, LINQ is widely adopted and can be a joy to work with for a developer, especially in combination with Lambda expressions.

Lambda expressions are simply local anonymous functions that can be used to create delegated types or rather expression trees. These local anonymous functions can be passed as arguments or returned as the value of function calls.

In combination, they both are valued tools at the dispense of most modern C# developers.  The problems arise when developers:
a.	Fail to realise what they could do better using LINQ and lambda expressions
b.	Use LINQ that they shouldn’t or don’t need to 

Example of (a) 

    var numOfMonths = 12
    var bankStatements = _accountRepository.GetBankStatements(accountNo, numOfMonths);
    foreach (var statement in bankStatements)
    {
        Print(statement);
    }
    // lambda expression equivalent
    _accountRepository.GetBankStatements(accountNo, numOfMonths).Select(Print);

Example of (b) 

    foreach(var statement in _accountRepository.GetBankStatements(accountNo, numOfMonths).Select(x => x.Statement))
    {
        Print(statement);
    }
    // lambda expression equivalent
    _accountRepository.GetBankStatements(accountNo, numOfMonths).Select(Print);

Here you see the use of LINQ within the foreach loop. Using LINQ in foreach loops is fine as long as the LINQ expression doesn’t go totally unreasonably complex.
So REMEMBER DO:
*Use LINQ and  local variables when the type expected of an assigned value to a variable can be inferred at compile time.

And DON’T:
*Hard code rigidly declared types which eventually may change and force you to do some hefty refactoring.

## Summary	
There are many other issues I’ve seen with using LINQ unnecessarily or abusing its power, creating large LINQ queries which may be served better simply firing off a stored procedure exposed on the data context itself.
Then again, database programming skills amongst .NET Development are dying in my mind but that’s going to be saved for another post…
Thanks
Ed

