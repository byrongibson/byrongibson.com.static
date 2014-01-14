---
layout: post
title: "Manage Multiple Java, Scala, Haskell, etc. packages in Debian with Update Alternatives"
date: 2012-06-08 13:53
categories: [debian, ubuntu, debian derivatives, update-alternatives, linux, unix, java, jvm, scala, haskell, haskell platform, ant, maven]
comments: true
published: true
author: Byron Gibson
---
Sun/Oracle Java was [removed from Linux distros][1] in 2011 due to licensing issues.  
It can only be downloaded directly from Oracle's website now and installed manually.
There are many different ways of doing that, but for Debian and Debian-derivatives,
I prefer using Debian's excellent `update-alternatives` tool.  

<!-- more -->

####[How To][2]

1.  Download the package, extract or build to `/usr/lib/jvm/[version]`, 
`/opt/java/[version]`, `/opt/scala/[version]`, `/opt/haskell/[version]`,
or anywhere else in the system file system (except `~/`).  

2.  Change owner:group to root:root

```
sudo chown -Rv root:root /opt/java/[version]
```

3.  Run the `update-alternatives` script ([Java][3], [Scala][4], [Haskell][5]). Feel
free to fork and modify for other languages.

See my installation guide for [Haskell][2] for more details. The same process works 
for any package.  The tricky part is writing the `update-alternatives` script, but it 
should be clear how it works upon closer inspection of those scripts.

The `update-alternatives` commands take the form:

{% codeblock Install %}
update-alternatives --install [destination] [identifier] [source] [priority] \
 --slave [destination] [identifier] [source] \
 ...
 --slave [destination] [identifier] [source]
{% endcodeblock %}

{% codeblock Change active package %}
update-alternatives --config [identifier]
{% endcodeblock %}

{% codeblock Remove all %}
update-alternatives --remove [identifier]
{% endcodeblock %}

{% gist 2898928 %}

Read on for why...

<!-- more -->

####[Why?][2]

1.  It can be used with any package, not just Java.  I currently use it to manage
multiple versions of Java, Scala, Haskell GHC, Haskell Platform, Ant, and Maven.

2.  Debian repos are known for providing stable software, but sometimes at the cost of 
being up to date.  Great for production machines, not so great when you want to 
experiment with the latest and greatest on your dev box.  `update-alternatives` 
solves that, by letting you easily bypass the repos to manually add current versions 
of software to the system (linking them into /usr/bin/, /usr/lib, /usr/share, etc.) 
without conflicting with the version from the repos.  With `update-alternatives` you 
can install both, and toggle among the active one depending on what you're working on.

3.  Upgrade to a new version without deleting the old.  Both can co-exist on the system
at the same time, unlike installing the software via repo.  If the new version breaks 
something that depends on it, easily rollback to the prior version with just a 
`sudo update-alternatives --config`.

4.  Keep your system cleaner by putting software in a single location like 
/opt/java/jdk/1.6.0\_34 and soft linking it to system directories like /usr/bin,
/usr/lib, /usr/share, etc.  A typical \*nix install is messy - files are deposited 
throughout the system in /usr/bin, /usr/lib, /usr/share, etc.  `update-alternatives` 
solves that problem.

5.  Easily uninstall any package.  For example, switch the current active package to 
another version with `update-alternatives --config java` and delete the unwanted one
with `rm -rf /opt/java/jdk/1.7.0_04`.

6.  Run the software via System PATH instead of user PATH.  `update-alternatives` 
automatically installs software to the system path it is designed for, usually 
/usr/bin.

####Final Thoughts

This system reminds me a bit of [Gobo Linux][6], which seeks to [redesign the Linux
filesystem][7] by putting full package distributions in a single location, like 
`/Programs/Bash/3.0`.  A great idea that would make Linux much more user-friendly.
`update-alternatives` is one small step in that direction.
 
[1]:    http://askubuntu.com/questions/67909/how-do-i-install-oracle-jdk-6 
[2]:    https://github.com/byrongibson/scripts/tree/master/install/haskell#readme 
[3]:    https://github.com/byrongibson/scripts/tree/master/install/java
[4]:    https://github.com/byrongibson/scripts/tree/master/install/scala
[5]:    https://github.com/byrongibson/scripts/tree/master/install/haskell
[6]:    http://www.gobolinux.org/
