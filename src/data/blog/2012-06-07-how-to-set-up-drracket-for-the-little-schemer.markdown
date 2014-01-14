---
layout: post
title: "How to set up DrRacket for The Little Schemer"
date: 2012-06-07 21:57
comments: true
categories: [posterous, old blog, programming, scheme, DrRacket]
published: true
author: Byron Gibson
---

[Racket][1], formerly PLT Scheme, is one of the easiest Scheme programming environments to set up, making it a convenient environment for learners to use to work through all the problems in [The Little Schemer][2]. It only needs two modifications after installation:

1. Start DrRacket

2. Change the language to Module. In the Language menu at the top (or the bottom left):

    {% blockquote %}
    Language -&gt; Choose Language -&gt; Module -&gt; OK
    {% endblockquote %}

3. DrRacket lacks the primitive `atom?` used extensively in The Little Schemer, so you have to define it yourself.  atom? simply returns true if the input is an atom, false if not. In the top window, the Definitions window, add:

    {% codeblock %}
    (define atom? (lambda (a)  (not (list? a))))
    {% endcodeblock %}

That's all, you're ready to start.

[1]:    http://racket-lang.org/
[2]:    http://www.ccs.neu.edu/home/matthias/BTLS/
