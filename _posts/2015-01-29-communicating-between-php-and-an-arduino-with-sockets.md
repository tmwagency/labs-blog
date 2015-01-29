---
comments: true
layout: post
title: Communicating Between PHP and an Arduino with Sockets
author: asheridan
excerpt: A brief introduction into getting a an Arduino listening over a USB connection with a PHP script on the other end
---

The reasons for putting a demo together that allowed PHP to talk with an Arduino are twofold:

1. to serve as a demo about how quickly a PHP script can be set up to communicate over a socket connection, and
1. to act as a basis for an event-driven server for a multiplexed LED cube I built for my Arduino.

A common misconception is that PHP is not good for realtime applications, and it follows a request-response model. While this is true of the typical uses, it can quite happily be used for a variety of other purposes, including as a daemon communicating over sockets.

The first thing I did was set up the PHP script that would behave as the deamon:

```php
<?php
$port = 'COM4';

while(true)
{
	$fh = fopen($port, 'w');

	fwrite($fh, 'a');

	fclose($fh);

	sleep(1);
}
```

And that's it! Really simple. The script just opens a connection to the <code>COM4</code> port (which is where an Arduino typically connects on a Windows environment, other operating systems will use a different port) and outputs a single letter 'a' once second, ad infinitum.

Some people have mentioned issues when attempting to open sockets up with <code>fopen()</code> on Windows. I was running this over XAMPP on a fairly vanilla setup and didn't run into any issues, but your mileage may vary. The concept is the same for Linux and MacOS, just the name of the port changes.

The slightly more complicated part comes with the Arduino code, which is C++ with some additional built-in methods:

```c++
#include <string.h>

int pin = 13;
int buffer_length = 10;
String buffer;

void setup()
{
	Serial.begin(9600);
	pinMode(pin, OUTPUT);
}

void loop()
{
	if (Serial.available() > 0)
	{
		char c = Serial.read();

		// ignore the newline - not necessary if you set no line ending in the serial monitor or you communicate directly via sockets
		//if(c != 13)
		{
			buffer = buffer + c;

			Serial.println(buffer);

			if(buffer == "aaaaa")
			{
				digitalWrite(pin, HIGH);
				buffer = "";
				delay(1000);
			}
			else
				digitalWrite(pin, LOW);

			if(buffer.length() > buffer_length)  // don't let the buffer grow too large and cause an out of memory error!
				buffer = "";
		}
	}
}
```
The example here just checks if there is any data sitting in the serial buffer (set up when the Arduino is connected to the computer via USB) and if so, reads it, one byte for each iteration of the <code>loop()</code> function.

An output line is used if you're testing this with the serial monitor that is part of the Arduino IDE. You may note the commented out if condition above it which just ignores new lines. When I was testing this I just set the serial monitor to not append newline characters to the input, but you can uncomment this line if you prefer to keep the default settings when testing.

The <code>if/else</code> chunk simply checks to see if the built-up buffer string equals 5 letter 'a's (which will happen every 5 seconds when combined with the PHP script) and if so, it lights up the on-board LED for a second (because of the 1000 millisecond delay).

Finally, the very last part ensures that the string buffer is emptied out after 10 characters (as specified by <code>buffer_length</code>). This is important as the variable will continue to grow otherwise over time, and will eventually lead to an out of memory error on the Arduino when it grows too large.

Once you have this code on the Arduino then you can fire up the PHP daemon and watch it in action. If you run the PHP first, you will notice a lot of permission errors about opening up the port, because it is in use by the Arduino serial monitor. You can ignore these errors though, they are only warnings and when you close the serial monitor it will be able to open the port connection up again.


