---
layout: post
title: "The Pathology of Big Data"
date: 2012-07-04 12:17
categories: [big data, data science, statistics, critiques]
comments: true
published: true
author: Byron Gibson
---
Two notable posts on the subtle problems of big data, forecasting, statistical significance, and false positives.  [The first][1] by [Nassim Taleb][3], [the second][17] by [Nate Silver][16].  These posts and their ensuing comments discussions illuminate an issue that all data science practitioners should be aware of.

>[Nassim Nicholas Taleb][3] The pathology of Big Data: the more variables, the DISPROPORTIONATELY higher the number of spurious results that appear "statistically significant". For a real-life application see [this busted article in The N E Journal of Medicine][2].

Additional clarification in the comments:

<!-- more -->

>[Nassim Nicholas Taleb][3] This is called the Wigner Effect in physics: a random matrix with orthogonal components will show a series of declining Principal components... In the Lebanese dialect, the more data, the more illusion of patterns.

>[Nassim Nicholas Taleb][3] Geert, the problem is that nobody corrects for multiple testing in social science and epidemiology.

>[Nassim Nicholas Taleb][3] Geert Van Damme, furthermore the researcher is implicitly doing multiple testing throught his career even if he submits to Bonferoni adjustments within a single paper.

>[Mark Weaver][4] ... Stan Young rocks! ([http://www.significancemagazine.org/details/magazine/1324539/Deming-data-and-observational-studies.html][5]).

>[Mark Weaver][4] Iva, just a correction... ALL statistical analysis is not futile! However, if the analysis was based on a method developed after 1955, say, and does not have one of these names attached (Fisher, Tukey, Kempthorne, Neyman) then it most likely is futile because it's likely based on completely insane assumptions... and, you shouldn't really need a "statistician" to understand it!

>[Bob Sundahl][6] There are two separate types of misuse of statistics to prove a hypothesis. The data dredging fallacy examines a very large set of data to discover possible "statistically significant" coincidences, ignoring the certainty that a large data set will always have some coincidences, if enough relationships are examined. The second involves the interpretation of these coincidences, real or imaginary. It is common to conclude that coincidence implies causality, ignoring the possibility (likelihood?) that hidden variables affect both of the observed parameters.  When seeing these fallacious arguments used so often, one always asks the same question: Stupidity or mendacity?

>[Kimmo Vehkalahti][7] Recommended reading: "The Cult of Statistical Significance", see: [http://goo.gl/yYQXM][8].

>[Bob Sundahl][6] Here is a useful link to the article identified by Mark Weaver (with excellent cartoons) [http://goo.gl/vuTIf][9].

>[Bob Sundahl][6] The phenomenon we are describing was diagnoses as "apophenia" By William Gibson is one of his books.  Humans have an inate predisposition to look for patterns, and often find them where none exist. This tendency is strongly enhanced when rewards are given for discovering trends. And, as Nassim points out, the lack of punishment for finding false trends is also encouragement. Apophenia is a critical attribute for success in many professions - sports reporters, economists, stock market analysts, astrologers (but I repeat myself).

>[Guru Anaerobic][10] One manifestation of this are books like 'The Bible Code' \[Ed: eg, many false positives of pattern identification in large data, the data in this case being the text of the Bible\]

>[Nicholas Teague][11] Concept summed up neatly in this simple cartoon: [http://nohype.tumblr.com/post/225060683/confusion-information-graph-a-simple-index-card][12]

>[Marcelo Schafranski][13] Which one is more accurate: Bonferroni´s correction or False Discovery Rate?

>[Nassim Nicholas Taleb][3] both inaccurate, of course, but same principle

>[Marcelo Schafranski][13] I completely lost faith on Fisher´s/Pearson´s p, as long as it refers to the data and not to the hypothesis. It makes the Bonferroni/false discovery rate (which encourages "salame-slicing") discussion pointless. But unfortunately, in medical science, which is my field, peolpe seem hypnotized by the p value. I sincerely wish they knew efect sizes. Totally agree with you: hard findings do not need statistics.

>[Pedro Peloso][14] MORE ON CORRELATIONS. 

>Think you will like this: 

>[http://www.pnas.org/content/105/45/17436][15]

>It is related to your post on spurrious correlations. These guys reply to a paper "claiming"climate change is the cause of some amphibian extinctions. They found better correlation of the extinctions with beer production and local production of bananas.

See [next post for Nate's orthogonal take][18].

[1]:    https://www.facebook.com/photo.php?fbid=10150935763253375&set=a.10150109720973375.279515.13012333374&type=1
[2]:    http://www.fooledbyrandomness.com/NEJM.pdf
[3]:    https://www.facebook.com/pages/Nassim-Nicholas-Taleb/13012333374
[4]:    https://www.facebook.com/mark.weaver.756
[5]:    http://www.significancemagazine.org/details/magazine/1324539/Deming-data-and-observational-studies.html
[6]:    https://www.facebook.com/bob.sundahl
[7]:    https://www.facebook.com/kimmo.vehkalahti
[8]:    http://www.deirdremccloskey.com/articles/stats/preface_ziliak.php
[9]:    http://goo.gl/vuTIf
[10]:   https://www.facebook.com/GuruAnaerobic
[11]:   https://www.facebook.com/nick.teague
[12]:   http://nohype.tumblr.com/post/225060683/confusion-information-graph-a-simple-index-card
[13]:   https://www.facebook.com/marcelo.schafranski.5 
[14]:   https://www.facebook.com/pedropeloso
[15]:   http://www.pnas.org/content/105/45/17436
[16]:   http://fivethirtyeight.com
[17]:   http://fivethirtyeight.blogs.nytimes.com/2012/06/25/the-problems-with-forecasting-and-how-to-improve/
[18]:   http://expectedpayoff.com/blog/2012/07/04/the-problems-of-forecasting/
