---
layout: code
title: PHP coding standards
subtitle: TMW frontend guidelines for developers
pageid: code
github_url: https://github.com/tmwagency/TMW-PHP-coding-standards
team:
- asheridan

weight: 6
---

## Coding Standards and Best Programming Practices for PHP

## Contents

1. [Naming Conventions and Standards](#naming-conventions-and-standards)
	1. [Code Indentation](#code-indentation)
	1. [Brace Usage](#brace-usage)
	1. [Trailing Whitespace](#trailing-whitespace)
	1. [Naming Conventions](#naming-conventions)
	1. [Code Commenting](#code-commenting)
	1. [String Concatenation](#string-concatenation)
1. [Good Programming Practices](#good-programming-practices)
	1. [KISS Principles](#kiss-principles)
	1. [Be Mindful of the Language](#be-mindful-of-the-language)
	1. [Clear Commenting](#clear-commenting)
	1. [Frameworks and Platforms](#frameworks-and-platforms)
	1. [Character Encoding](#character-encoding)
	1. [Complicated If Else Constructs](#complicated-if-else-constructs)
1. [Databases](#databases)
	1. [Encoding Issues &amp; Database](#encoding-issues-&amp;-database)
1. [Security](#security)
	1. [Treat All Incoming Data as Tainted](#treat-all-incoming-data-as-tainted)
	1. [SQL Injection](#sql-injection)
	1. [Handling File Uploads](#handling-file-uploads)
	1. [Databases](#databases)
	1. [Email Spam Relay Prevention](#email-spam-relay-prevention)
		1. [Do Not Reinvent the Wheel](#do-not-reinvent-the-wheel)
1. [Local Development Environment](#local-development-environment)
1. [Server Environment Settings](#server-environment-settings)
	1. [Handling Redirects](#handling-redirects)
	1. [PHP Parsing](#php-parsing)

<a name="naming-conventions-and-standards"> </a>Naming Conventions and Standards
--------------------------------
### <a name="code-indentation"> </a>Code Indentation
Generally you should use the Allman style ([http://en.wikipedia.org/wiki/Indent_style#Allman_style](http://en.wikipedia.org/wiki/Indent_style#Allman_style)) of indenting code. This puts opening braces onto a new line of their own, such that they line up vertically:

```php
<?php
if(expression)
{
	// statements
}

```

This will differ slightly from the indentation style mainly used for Javascript (like K&amp;R), but there are valid cases where the Allman style would cause syntactic differences in code execution (such as implied return values in Javascript because the semicolon is optional). The advantage to the Allman style (aside from visually outlining logical blocks of code) is that the expression part can be commented out leaving the statements part intact and others easily added during testing and development:

```php
<?php
//for($i=0; $i<count($array); $i++)
foreach($array as $key => $value)
{
	// statements
}

```

Also, tabs should be used to indent code rather than spaces. The reason for this is to preserve the formatting of code when multiple people are working on it, as a tab is an unspecified indentation amount (e.g. 2, 4, or 8 spaces), which people can set to their own preference on their machines without affecting the way it's presented for you. This avoids issues with code not formatting correctly for different developers working on the same project.

### <a name="brace-usage"> </a>Brace Usage
If your  `if()`  or loop only contains one executable statement, the containing braces are optional, and should be omitted:

```php
<?php
if(expression)
	// statement

// or...

foreach($array as $key => $value)
	// statement

```

The statement should still be indented as usual, and kept on a separate line for readability.

### <a name="trailing-whitespace"> </a>Trailing Whitespace
Avoid this if you can. Most IDEs and advanced text editors have an option to automatically strip trailing whitespace upon saving of a file, and you should enable this option if it exists.

### <a name="naming-conventions"> </a>Naming Conventions
Classes, constants and variables should follow the Python/Ruby naming conventions ([http://en.wikipedia.org/wiki/Naming\_convention\_%28programming%29\#Python\_and\_Ruby](http://en.wikipedia.org/wiki/Naming\_convention\_%28programming%29\#Python\_and\_Ruby)) where class names use camel case, constants are all caps with underscores used to space, and other variables and method/function names are lower-case with underscores used to space. All variables, constants and functions should use logical names without unnecessary abbreviations but not be overly verbose. So, the following are good:

```php
<?php
$error_message
DB_USERNAME
get_all_news_content()

```

But the following are not:

```php
<?php
$a
LONG_CONSTANT_DESCRIBING_THE_NATURE_OF_THE_VALUE_IT_CONTAINS_WHERE_A_COMMENT_WOULD_DO
do_something()

```

There are a few occasions where single-letter variables can be used, such as counters in small loops, or when dealing with coordinate systems or colour models, for example, but in the main variable names should always reflect the data they contain. If you feel there might be any ambiguity when initially declaring them, add a comment to indicate this. It can also be helpful to make variable names for things like arrays plural and simple objects singular, such as:

```php
<?php
$images = array(1, 2, 3, 4);
foreach($images as $image)
{}

```

### <a name="code-commenting"> </a>Code Commenting
It's best practice if code is sufficiently commented to aid future developers who may have to pick it up. At the very least, all functions and class methods should be commented in the [DocBlock](http://phpdoc.org/docs/latest/glossary.html#term-docblocks) format, and should contain a brief description about that function, and details on the inputs and outputs. A decent IDE should be able to automatically supply a lot of these details for you when you open the DocBlock with `/**` and hit enter.

Below is an example:

```php
<?php
/**
* return a filtered string
* @param string $filter_line the string to be filtered
* @param string $replace_char optional character to use as the replacement - defaults to *
* @return string
*/
public function filter_string($filter_line, $replace_char='*')
{
	...

```

### <a name="string-concatenation"> </a>String Concatenation
It's typical in JavaScript to build up strings with lots of concatenation like this:

```js
var greeting = 'hello ' + name[0] + ' ' + name[1] + ', welcome.';

```

This is bad practice in PHP; it makes the code look messy. Instead, something like one of these is preferred:

```php
<?php
$greeting = "hello {$name[0]} {$name[1]}, welcome.";

$greeting =<<<GREETING
	hello {$name[0]} {$name[1]}, welcome.
GREETING;

```

The second example is better for large text blocks that might themselves contain quotes where escaping them becomes too messy.

<a name="good-programming-practices"> </a>Good Programming Practices
--------------------------
### <a name="kiss-principles"> </a>KISS Principles
As with any language, avoid functions/methods in PHP that are overly long. Typically, anything that can not fit comfortably into a standard screen of code (this is deliberately subjective, as it may vary from project to project) is too long, and should be refactored. Follow the Unix philosophy and write small methods that do one job well. If you have a method or function which performs several tasks then consider splitting these out.

Avoid over engineering a solution to a problem. A simple holding page does not necessarily need a large framework and database behind it. Be aware that a sledgehammer is not always the ideal tool to crack a nut.

Also, omit the closing  `?>`  tag on scripts if there is no output to follow within the same file, the PHP parser will automatically close it if it's left out. This negates the chance of running into a “headers already sent” error, which can be cause by trailing whitespace (a space, newline, etc) after the closing PHP tag.

### <a name="be-mindful-of-the-language"> </a>Be Mindful of the Language
PHP is a loose-typed language, and as such can often behave in what looks like an unexpected way if you're used to stricter languages. One main thing to bear in mind is comparison operators. For example:

```php
<?php
$string = "Test string";
if(strpos($string, "T"))
{
	// do something
}

```

This example will never execute the statements inside the braces because the first character position match (0, as strings are treated somewhat similarly to C++ strings in PHP) equates to a false value due to the loose typing. Instead, this should be used:

```php
<?php
$string = "Test string";
if(strpos($string, "T") !== false)  // test explicitly for non-false values
{
	// do something
}

```

PHP is also quite forgiving of some things, so code might still work if you try to treat a string as an array of characters, but it might exhibit strange behaviour in certain circumstances, just as code will function if you try treating a variable of one type as another, but it may not work as expected under all conditions, even though PHP is a loosely typed language. The following illustrates this:

```php
<?php
$string = "tested";
$chess = "♔♕♖♗♘♙";

$string[0] = 'b';
$chess[0] = 'a';

var_dump($string);
var_dump($chess);

//output:
string(6) "bested"
string(18) "a��♕♖♗♘♙"

```

While the string replacement works for the  `$string`  variable, it breaks for  `$chess`  because the array syntax only works for plain ASCII strings, not any of the multibyte encodings.

### <a name="clear-commenting"> </a>Clear Commenting
If possible, all class methods and functions you write should be documented with PHPDoc syntax. This gives a consistent commenting style that can be used to generate documentation if needed. Try to be verbose in the comments if something is not immediately obvious, and explain all inputs and outputs. So, this would be an example of good commenting:

```php
<?php
/**
* returns an array containg the data count for the 'other' portion and the 
* index of the key at which the other count was started
* the cutoff is hard-coded at 2%, i.e. if the value is less than 2% of the
* total, it gets shoved into the $other total
* @param array $data the original data
* @param array $labels the datasets keys
* @return bool 
*/
function _aportion_other(&$data, &$labels)
{}

```

But this, not so much:

```php
<?php
/**
* modifies the data and label arrays
* @param array $data
* @param array $labels
*/
function _aportion_other(&$data, &$labels)
{}

```

### <a name="frameworks-and-platforms"> </a>Frameworks and Platforms
If you're using a framework or other platform you should follow the best practices of that to ensure code consistency. If it's an MVC framework, make sure your code is split accordingly, e.g. file and database access should be done only from within a model, not a controller, and view code shouldn't be in a controller either. If the framework/platform offers something like Eloquent or Active Record, then you should try to use that rather than roll your own database library. There may be some valid exceptions to this, such as queries that would be too complex to create in Active Record, or validation libraries that are sub-standard (e.g. CodeIgniters validation library), and it may just be more efficient to write your own methods.

As a general rule though, you should try to adhere to the guidelines given by the framework of choice.

Our preferred MVC frameworks are:

- Laravel

- Zend

- CodeIgniter (this should be used only on older PHP hosting that cannot support newer frameworks and PHP functionality)

Some of the CMS platforms we use are:

- WordPress

- Expression Engine (

- EZPublish

### <a name="character-encoding"> </a>Character Encoding
To avoid unnecessary encoding issues ensure that all PHP scripts are saved as UTF8 files. Most editors and IDEs will do this automatically, although some on Windows platforms might need some 'encouragement' in this regard. Occassionally you might run into files saved as UTF8 not behaving correctly in the PHP parser. You should check to see if the file has been saved with a BOM (byte order mark) which has been known to cause strange output.

That is usually enough to trigger Apache to output the right encoding headers, but if it's been set to a different default, or you're using PHP on IIS, then it may be necessary to use the following code to force the correct encoding:

```php
<?php
header('Content-Type: text/html; charset=utf-8');

```

### <a name="complicated-if-else-constructs"> </a>Complicated If Else Constructs
An if/else construct should never go beyond a few else cases. If you're writing code with more than 2 or 3 else parts, then you should be using a switch/case instead.

If you are using the else cases to check different variables, then you may still use a switch, but of this form:

```php
<?php
switch(true)
{
	case ($a == 'test'):
		break;
	case ($b < 10):
		break;
	case (count($c)):
		break;
}

```

This slight abuse of the switch also works in JavaScript!

<a name="databases"> </a>Databases
---------
While not strictly PHP, it's important that you can develop a well structured and flexible schema. This includes the following:

- Using the right database encodings. Generally using utf8 for your character set, and 

- Selecting the right table engine. Typically, most MySQL tools default to MyISAM or InnoDB, but it's useful to know the differences between the two. MyISAM is faster for reads, slower for writes, and employs table-level locking on writes, which is a potential bottleneck. InnoDB is faster for writes, slower than MyISAM for reads, but employs row-level locking and allows you to use foreign key constraints.

- Use the most appropriate field types. If you need a column for simple yes/no values, don't use 

- Generate appropriate indexes on tables. Don't just index everything, but focus on the fields that you are going to be using in joins and searches. This can have a tremendous impact on your application when done correctly

- Don't be too worried about multiple joins across tables to retrieve a dataset. With good indexes this won't be an issue, and embracing a good relational schema allows your data to be used in more flexible ways in the future as the nature of an application changes. It's also a 

- Wherever possible, join on integers (this includes dates and 

- Plan your schema in advance and think about how different parts of the data interact with each other. Your database is not a spreadsheet, and you shouldn't treat it like it is.

### <a name="encoding-issues-&amp;-database"> </a>Encoding Issues &amp; Database
It is always best to ensure that the correct encoding is set for your database(es). MySQL has three levels of encoding: database, table, and field. Typically, setting it to  `utf8_general_ci`  when you create the database will ensure that it cascades down automatically when you create tables and fields. If you set it wrongly though, and attempt to retroactively correct it, you will need to do so at each level, as such changes only propagate downwards upon creation, not modification. You may also run into issues with the connection that PHP has with MySQL, which must also be made as UTF8. The exact implementation varies slightly for the different connection methods, PDO uses this for example:

```php
<?php
$pdo = new PDO("mysql:dbname=$dbname;host=$dbhost",$dbuser,$dbpass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"));

```

Also, when creating tables, try to use the field types that are most appropriate for the data they will be carrying, so things like telephone numbers, email addresses, names, etc, will suit the varchar type, small finite lists suit an enum type, etc. It can be worth being overly generous when specifying lengths for varchar fields also; entries won't use more space than they need to, but it will prevent accidental truncation of data. As mentioned above, take care when inserting data into the database, and ensure that all data is properly filtered to prevent SQL injection. The best method is to use parameterised PDO queries, but if you're using a framework or platform it may have an abstracted interface for something like this.

**Avoid using the** `mysql_*` **functions at all costs!**

If you run into issues with the "headers already sent" error, and you're sure there is no output occurring before you're attempting a (either explicitly or implied)  `header()`  call, then check to see if your editor/IDE has added a byte order mark (BOM). PHP doesn't play well with these, and it can trigger some unusual bugs, so BOMs should be removed whenever possible in source code.

<a name="security"> </a>Security
--------
### <a name="treat-all-incoming-data-as-tainted"> </a>Treat All Incoming Data as Tainted
It's always important to remember that any data coming from the user has the potential to be malicious, so you should always treat all user data as if it were anyway. This includes the following:

- All form data – take advantage of the 

- Select list values, checkbox &amp; radio button values, and hidden fields - just because you're setting these from code, does not mean that they will contain your predefined values when the form is submitted. Always check these values on the server.

- URL query string parameters – as above, make sure these are filtered. So for example, tacking this onto a stock Joomla site URL would reveal an injection vulnerability with an unsanitised URL being output directly to the page: 

- The URLs themselves can be altered in such a way as to inject code onto a page, which is particularly an issue with some frameworks and CMSs such as Joomla. Utilise functions such as 

- Uploaded images – it's not always enough to check a files extension as this can be faked. A good method is using something like GD or Imagick (PHPs ImageMagick extension) to read in some data about the image. If it's not an image, try using the PECL FileInfo extension to get the mime type of the file which reads in the header bytes of a file to determine its type. Typically, resizing or resampling the image to the same dimensions that it should be will be sufficient. At a pinch, analysing the first few bytes of a file can help determine the validity of a file. See 

- Cookie values can be tampered with, do not store anything important in them which you don't mind being altered, and do not rely on any value retrieved from a cookie.

- Avoid incremental identifiers for sensitive information - rather than using an auto-incremented ID to retrieve information over the URL, consider using a GUID instead. Incremental IDs are an invitation for people to tamper, and could allow people to see information which is not intended for them. Sequential identifiers like this make it an easy task to guess more within an application, whereas a GUID is in effect random, and does not lead to more identifiers to be inferred easily.

- Header values in a request can be altered, so do not rely on these to be untampered.

#### <a name="do-not-reinvent-the-wheel"> </a>Do Not Reinvent the Wheel
As tempting as it might be to write the best regular expression of your life to validate an email address, don't do it. It will never match the ISO specification, and it will be cumbersome to ever debug. Here's an example of a regular expression that is the closest case to matching the ISO specification for email address format [http://www.ex-parrot.com/pdw/Mail-RFC822-Address.html](http://www.ex-parrot.com/pdw/Mail-RFC822-Address.html) :
 `
		
(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t]
)+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:
\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(
?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ 
\t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\0
31]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\
](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+
(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:
(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z
|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)
?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\
r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[
\t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)
?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t]
)*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[
\t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*
)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t]
)+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)
*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+
|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r
\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:
\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t
]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031
]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](
?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?
:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?
:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?
:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?
[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] 
\000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|
\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>
@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"
(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t]
)*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\
".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?
:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[
\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-
\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(
?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;
:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([
^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\"
.\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\
]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\
[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\
r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] 
\000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]
|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \0
00-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\
.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,
;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?
:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*
(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".
\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[
^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]
]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(
?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\
".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(
?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[
\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t
])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t
])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?
:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|
\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:
[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\
]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)
?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["
()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)
?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>
@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[
\t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,
;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t]
)*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\
".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?
(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".
\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:
\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[
"()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])
*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])
+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\
.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z
|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(
?:\r\n)?[ \t])*))*)?;\s*)

		` 
This is not something you want in your code, ever. Use the filter_var() function, which has email validation support built in. 

### <a name="sql-injection"> </a>SQL Injection
You should always use a method of connecting to a database that offers some form of protection against SQL injection, whether it be through parameterised queries, or prepared statements. You should never use the deprecated  `mysql_*`  functions, as these are old and not secure. Note that use of stored procedures does not protect against SQL injection. A recent webex by Jerry Hoff from White Hat Security explicitely mentioned that parameterised queries were the defacto way to protect against SQL injection. 

While it's essential to validate and filter incoming data, be mindful of the use to which that data is being put, so don't apply  `htmlentities()`  to data that's only being put into a database, apply that only once you're actually outputting it, as this may cause issues with how you wish to use that data later on (see [https://www.google.co.uk/search?q=htmlentities+before+db](https://www.google.co.uk/search?q=htmlentities+before+db) for more details on why this should be avoided).

If the framework you're using has a built-in database layer (like ActiveRecord, or Eloquent) then use that, as that will (used correctly) naturally protect against SQL injection. Be mindful here that each of the frameworks' database layers behaves differently in terms of what it escapes before sending to the database, and it's still possible to abuse the DB layer object to create an SQL injection point.

### <a name="handling-file-uploads"> </a>Handling File Uploads
File uploads can often be used as an attack vector just as easily as bad form and URL data, more so in some situations. As such, validating and sanitising your file uploads is extremely important. There is a great PECL extension for this called  `finfo` , which detects the mime type of a file based on its contents rather than the extensions (as the extension comes from the user and must be treated as tainted). This may not always be available on all servers though. If that's the case, then you have to go a bit “old-school”. For example, if you're expecting an image upload, check to see that it is indeed a valid image by using GD to detect its dimensions. Likewise, if it's a PDF, us a library like fPDF to identify it.  `DomDocument`  can handle the XML/HTML/SVG files, and in conjunction with Zip can handle modern office documents.

It's also best practice to store user generated content outside of the web document root if possible so that it is not accessible directly from a web browser. For example, if your website is in a  `httpdocs`  directory, consider creating a sibling directory next to it to store user content and then using PHP to pass through the file data.

### <a name="databases"> </a>Databases
If you're using a framework or CMS, use the database methods and connections that it provides. Do not try rolling your own, as this can lead to opening yourself up to security vulnerabilities. Most good frameworks will provide methods for making data safe for use in queries, and some of the better ones use things like PDO which allows you to parameterise your queries. Always use these where they exist, even it slightly increases your development time.

In no case should you ever store unencrypted passwords. At the very least use  `md5()`  to generate a hash of the password before storing it. Ideally this would be salted with another piece of user data (to lessen the chance of it being brute forced from an md5-hash list). If the nature of your application requires it, then use more powerful encryption methods in PHP to secure the passwords, like the  `crypt()`  function, using a suitably strong algorithm. **In no circumstances is **

Also, don't blindly apply all levels of sanitisation to your data as soon as you receive it. Only use functions like  `strip_tags`  and  `htmlentities`  when presenting data to a browser, it's not necessary before inserting into a database. With the exception of passwords, you should try to store user data in the database as close to the original as possible.

### <a name="email-spam-relay-prevention"> </a>Email Spam Relay Prevention
When your application is sending out any emails, you should pay attention to what user data you're passing into it, as there are ways to inject parameters into that and effectively turn your email code into a spam relay. So, for example, pass all the user variables through something like this to strip out any attempt to inject email headers into a message: 

```php
function remove_headers($string)
{
	$headers = array(
		"/to\:/i",
		"/from\:/i",
		"/bcc\:/i",
		"/cc\:/i",
		"/Content\-Transfer\-Encoding\:/i",
		"/Content\-Type\:/i",
		"/Mime\-Version\:/i"
		);
	return preg_replace($headers, '', $string);
}

```

This will at the least ensure that the user is not injecting an extra  `Cc`  header, for example, into your email code, which could be used to send out their message to more recipients using your email server! 

<a name="local-development-environment"> </a>Local Development Environment
-----------------------------
Your local development environment should always have all errors and warnings displayed. The best way to do this is from within the php.ini file, with the following configuration:

```ini
display_errors = On
error_reporting = E_ALL

```

It will also help to install the Xdebug PECL extension, as this will give better debugging and error output. The package you'll need to install for this is  `php-pecl-xdebug` . Where possible your local environment should mirror the live servers in terms of PHP version, enabled libraries/modules and general config settings. Particularly settings such as  `upload_max_filesize` , and `post_max_size`. When you produce release notes you should highlight these settings so that they are correctly set on the server.

**Do not turn off error display on your local machine to hide warnings and other errors and use of @ to suppress runtime errors is to be avoided always.**

You should ensure that your code does not produce any errors or warnings. Warnings might oft-times appear to be harmless, but they can often indicate a larger logic bomb hidden within the code, and these result in unexpected behaviour. Most typical warnings are usually around issues of undeclared variable use, or using functions on the wrong types of scaler (even though PHP is a loosely typed language, the type conversion is subject to certain rules, and not all types can be converted on the fly)

<a name="server-environment-settings"> </a>Server Environment Settings
---------------------------
If possible, always avoid setting site-wide server settings from within PHP itself. Ideally, they should be set from the php.ini (if you have access and it's not a setting which would have a detrimental effect on other sites sharing the setting), the virtual host configuration file (if you have access), or an .htaccess file (if the web server is Apache). There are two main reasons for never setting these values from within PHP itself:

- Problems become more difficult to diagnose as these values do not present themselves from a 

- Specific functions can be disabled from being set by PHP for security reasons at a server level

Sometimes setting these may be unavoidable, but when this happens, make sure it's documented in any release notes and in the wiki to ensure any future work isn't hindered by this. It's also preferable to keep all configuration settings to a minimum set of files. Some frameworks split configuration into specific files for general config, database connections, mail, etc. In cases like this, document the files that may need to be edited for a server deployment in the wiki page for the project.

### <a name="handling-redirects"> </a>Handling Redirects
Throughout the lifecycle of an application, it may be necessary to employ permanent (301) redirects for the purposes of SEO and domain addition and re-pointing.

These ideally would be handled from either an  `.htaccess`  file, or through the Apache (or other web server) virtual host configuration file. The main reason for this is to avoid hitting the PHP parser which incurs an extra load on the server to process, which can have an effect on the site as a whole for all visitors. Loading in any kind of framework or CMS to perform the redirect is definitely overkill and not recommended at all, as this then incurs extra memory requirements and an impact on speed (dictated by the general speed of the framework/CMS in question as opposed to a raw Apache request)

There may be valid time for exceptions, e.g. where the redirects become too complicated to manage via a standard redirect list in a file (such as for the Infiniti website which uses an XML mapping for the many hundreds of redirects across all of its domains). These should be looked at an weighed up on a case-by-case basis.

### <a name="php-parsing"> </a>PHP Parsing
It's never recommended to have the PHP parser invoked for non-PHP files, as this will incur the overhead of running the parser when plain Apache output would do. The exception to this is when you might be running files through the parser as part of a security process, e.g. authenticating user credentials before passing a files contents downstream.

