---
comments: true
layout: post
title: CodeSniffer – The PHP Coding Standards Tool
author: asheridan
excerpt: Using the CodeSniffer tool to test the PHP code at TMW
---

*Originally posted at [http://www.ashleysheridan.co.uk/blog/CodeSniffer+%E2%80%93+The+PHP+Coding+Standards+Tool](http://www.ashleysheridan.co.uk/blog/CodeSniffer+%E2%80%93+The+PHP+Coding+Standards+Tool)*

A couple of years ago I implemented a [coding standards guide for PHP development at TMW](https://github.com/tmwagency/TMW-PHP-coding-standards), as I'd noticed that they only had a document that was focused on .Net and Windows. The guide outlined mostly common sense practices, such as avoiding certain unsafe language functions, and how to best indent and document your code. Just over a year ago I made this document public on the [TMW GitHub account](https://github.com/tmwagency), and have been updating it in small ways since that time.

##Going Further

A document out on its own though, is not something that can easily be checked against, especially as it was now becoming quite lengthy. In order to be really useful, especially for freelancers who would need to follow the guide, I needed a way that code could be easily checked against the guidelines. Enter [CodeSniffer from Squiz Labs](https://github.com/squizlabs/PHP_CodeSniffer), a tool built in PHP to tokenise your code and validate it against a list of rules you want to test it against.

##Getting Started

Installing CodeSniffer is easy using PEAR:

```bash
pear install PHP_CodeSniffer
```

This will also install several groups of different rules to apply, typically in /usr/share/pear/PHP/CodeSniffer/Standards/ (but this may vary slightly from system to system, especially if you're on Windows)

Now, if you wish, you can just run the codesniffer tool with one of the existing rule groups with a line like:

```bash
phpcs --standard=PSR2 /directory/of/code/to/check/
```

This will then produce a standard report on the console with any errors found. This might be fine if you adhere to one of these standards completely, but as with any process like this, it won't be perfect for all situations. This is where you can be more specific about which rules you acually want to apply (and you can even write your own, but that's a bit more in-depth, and probably deserves its own post)

##Making a List

The first thing I did was go over each and every rule that came with CodeSniffer and pick out the ones that made sense with the TMW Coding Standards document. CodeSniffer allows you to create a rule list very easily with a ruleset.xml file, where you can either specify a single rule, a whole group, or a group with a few excluded.

You might see advice on forums and sites online that suggest you delete or rename files in the Standards directory. Do not do this! It's a lot better to make your own ruleset list to run, and there may even be times that you want that old rule back.

Creating this ruleset is easy; you just need a basic xml file like this:

```xml
<?xml version="1.0"?>
<ruleset name="TMW">
	<description>A custom coding standard for TMWs PHP work</description>

	<!-- rules here -->
</ruleset>
```

Then, within your root node, you place your rules. So for example, this snippet which is at the top of the TMW ruleset.xml file includes all the Pear rules for classes and files, and everything in the Pear commenting group except for the file and class comment rules:

```xml
<!-- Pear rules -->
<rule ref="PEAR.Classes"/>
<rule ref="PEAR.Commenting">
	<exclude name="PEAR.Commenting.FileComment"/>
	<exclude name="PEAR.Commenting.ClassComment"/>
</rule>
<rule ref="PEAR.Files"/>
```
I recommend you go through the list of rules and see what makes sense for you. Some won't work together, such as the indentation rules, one enforces tab indents, another enforces spaces. Play around until you find a good match for your own standard.

##Customising Your Rules

You might find that some of the rules go 90% of the way, but that other 10% just doesn't work for you. In this instance, you can copy out the rule into a directory called Sniffs (in the same location as your ruleset.xml file) and customise the rule. One rule I did this with was the PEAR.Functions.FunctionCallSignature rule, as I didn't like the way it enforced space indentation and a required space before the closing bracket of a function call, and I just commented out the code in the rule responsible for throwing those errors.

This makes some of the existing rules a lot more useful, as some of them, I think, try to do a bit too much and ought really to be broken down into smaller sub-rules.


##Running Your Custom Rule List

Now that you have you list of rules, you actually want to run your code against them. The fastest way is just to point to your XML file:

```bash
phpcs –standard=/path/to/ruleset.xml /directory/of/code/to/check/
```

However, it can be a bit cumbersom to constantly write out the path to your rule list, so you can make it the default with the following command (you will need to run this with root permissions):

```bash
phpcs --config-set default_standard /path/to/ruleset.xml
```

Now you can just check your code with a command like:

```bash
phpcs /directory/of/code/to/check/
```

##Choosing What to Check

So far, all the examples I've shown are just checking a directory (and all sub-directories within) for PHP files to scan and report on. That may be fine for very simple things, but what if you're building something on an existing framework or CMS. You don't want to check all the code files of WordPress or Laravel, for example, and neither do you want to check all the 3rd party libraries that you're using. You can instruct CodeSniffer to ignore specific files with the --ignore argument:

```bash
phpcs --ignore=/*/TwitterOAuth.php /directory/of/code/to/check/
```

You can use as many of these --ignore directives as you need, and the standard shell brace expansion can be used:

```bash
phpcs –ignore=laravel/app/{config,database,lang,start,storage,tests} laravel/app/
```

This can be very useful for only testing your own code, and only getting a report with your own errors, and not those that Joe Bloggs made on that library you just downloaded.

##Getting More From Your Reports

The standard report is all well and good, but there are other useful types of reports that CodeSniffer can produce for you. One is a source report, which will tally up all the specific types of issues found in your code, how many times each one was found, and gives the name and group of the exact rule that was broken. This can be especially useful when you're testing out a new rule group (or groups) and you want to know which error comes from which rule.

```bash
phpcs report=source /directory/of/code/to/check/
```

Another report type gives you a diff syntax that many other tools can use to fix your code automatically. In-face, CodeSniffer comes with a tool to fix these kinds of errors for you, called phpcbf (PHP Code Beautifier and Fixer)

A final report type that I've found useful is the git blame report (there's an svn blame one too), which will try to report on who made the code commit that contains the error. This can be useful in a team scenario where you might want the respective team members to fix their own issues.

|Report Type|Output|
|---|---|
|full|The default report type which is quite verbose|
|xml|Outputs the report as XML, useful if you're saving this to be digested by another tool|
|json|As above, but JSON format|
|csv|Again, as above, but in CSV format|
|source|A shorter list where repeat issues are grouped, along with their totals and the Sniff group the rule belongs to|
|diff|A diff format output, useful for other tools to automatically apply fixes where possible|
|svnblame/gitblame|This report shows who was responsible for each error. For code that has not been committed, the report will show no name|
|notifysend|This doesn't output a report, but triggers a message in the standard OS notification system. Useful when you're performing multiple reports from the same command and want to know when it's completed|

##Conclusion

Hopefully you'll have found some of this useful if you're just getting started with CodeSniffer. It's a powerful tool, and can do far more than what I've touched upon in this article, such as checking JavaScript code, and being able to run completely bespoke code to check for things that aren't covered in the standard rules. I encourage you to play around with this, and find a setup that works for you, whether it be as part of a continuous integration chain, or as a pre-commit hook check. I'll leave it to you to decide how best to use it.
