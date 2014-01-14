---
layout: post
title: "A Dead Simple Way to Get Up and Running with Lisp in Vim"
date: 2012-06-07 15:15
comments: true
categories: [posterous, old blog, lisp, vim]
published: true
author: Byron Gibson
---
The [web is replete][1] with people trying to create, or learn, an efficient workflow for programming Lisp in Vim.  I'm the latter.  A vim amateur/intermediate, a Lisp noob.  
I want a quick and easy way to hack Lisp in Vim, save it in a file, load it into the REPL, hack some more in the REPL, and push the file to Github, without having to take the time to learn Emacs and [SLIME][2], or even [SLIMV][3] (I'll get around to these later after I've learned the language somewhat).

My solution:  two terminal windows (three if you want one for vcs commits).  One with vim and your code, the second with a REPL, the third with command prompt in your working/project directory for git commits.

1.  In vim, make your changes and save :w.  Leave the editor open.

2.  Alt-tab to the REPL terminal, use (load 'filename.lisp) to reload your code after changing it.

3.  In the third terminal, add, commit, and push to vcs as necessary.

[1]:    http://www.google.com/search?q=how+to+use+lisp+with+vim
[2]:    http://common-lisp.net/project/slime/
[3]:    http://www.vim.org/scripts/script.php?script_id=2531
