---
layout: post
title: "Sync Chrome and Chromium Bookmarks locally with git"
date: 2012-06-08 18:24
categories: [chrome, google chrome, google-chrome, chromium, bookmark, bookmarks, sync, git, local]
comments: true
published: true
author: Byron Gibson
---
If you use both [Google Chrome][1] browser and its upstream development version, [Chromium][2], on the same machine, you may, like me, want a way to sync your Bookmarks between the two locally, without using some third party cloud sync/backup service.

Well there's an easy way to do this with a software version control control system like Git, Mercurial, Subversion, etc.  I use Linux and Git, but this technique should work on any operating system with any version control system.

<!-- more -->

There are three pertinent filesystem locations - the Chrome Bookmarks file, the Chromium Bookmarks file, and the Git repo you will create to sync the two:

```
~/.config/google-chrome/Default/Bookmarks
~/.config/chromium/Default/Bookmarks
~/bin/backup/bookmarks/chromium/Bookmarks.git
```

Howto:

1.  Create a bare git repository that will serve as the parent or hub for syncing the two Bookmarks files.  

```
$> mkdir -p ~/bin/backup/bookmarks/chromium/ && cd ~/bin/backup/bookmarks/chrome-ium
$> git --bare init Bookmarks.git
``` 

2.  Initialize a child git repository in each of Chrome and Chromium's settings directories where the Bookmarks file resides.  
Primary browser (Chromium, for this example):

```
$> $> cd ~/.config/chromium/Default
$> git init
```

3.  Set remote origin to the hub repo for both.  

```
$> git remote add origin ~/bin/backup/bookmarks/chrome-ium/Bookmarks.git
```

4.  Include a `.gitignore` file that ignores everything except 'Bookmarks' and '.gitignore'.

```
$> vim .gitignore
```
``` 
*
!Bookmarks
!.gitignore
```

4.  Add, Commit, and Push the Bookmarks repo of your primary browser (say Chromium).  Pull the repo to your secondary browser (Chrome in this case).

Primary browser (Chromium for this example):

```
$> git add -A  (should only add the files "Bookmarks" and ".gitignore", no others.  Verify with 'git status')
$> git commit -m 'init'
$> git pull origin master
$> git push -u origin master
```

Secondary browser (Chrome for this example)

```
$> git remote add origin ~/bin/backup/bookmarks/chrome-ium/Bookmarks.git
$> git add -A  (should only add the files "Bookmarks" and ".gitignore", no others.  Verify with 'git status')
$> git commit -m 'init'
$> git pull origin master
```

5.  The tricky part - Chrome and Chromium both calculate the hash of the Bookmark file every time it is changed from within the browser, and add that hash as the first entry in the top of the Bookmarks file.  It is included in every new hash as well.  If that recorded hash does not match the calculated hash when Chrome/ium starts up, it will assume the file is corrupt and fall back to Bookmarks.bak instead.  Hence, you have to be careful when synching - you can never merge the remote hub repo if you have made changes locally, or it will cause the calculated hash to diverge from the recorded one, and Chrome/ium will think the file is corrupt and will ignore it in favor of the older Bookmarks.bak.  The simple solution is to make sure that when you add new bookmarks to one, you also pull those changes into the other browser before adding new bookmarks to the other.

I'm working on a post-commit hook that will automatically do this, but not done yet.

Done.  Now whenever you add bookmarks to one browser, keep the parent repo updated with:
```
$> cd ~/.config/[browser]/Default
$> git add -A
$> git commit -m 'update'
$> git pull origin master
$> git push -u origin master
``` 

And finally just remember to also do a `git pull origin master` from the other browser *before* adding any new bookmarks to it as well.

[1]:    https://www.google.com/chrome
[2]:    http://www.chromium.org/
