---
layout: content
title: Editing labs@tmw
---

To edit labs@tmw, you must first have a github account and have permissions to edit tmwagency projects.  If you don’t have an account, create one and then let either Zander or Ash know your username so they can add you to the permission set.

From there on, you have two possible options:

- - -

## 1. Editing using prose.io

If you don’t want to have to build the entire site yourself to see what you article will look like in situ, then there is a simple alternative.

[prose.io](http://prose.io/) let’s you add and edit markdown files in the browser, so you can write your article, commit it into the repo and then we can move it into the published folder once reviewed.



- - -

## 2. Building the site locally

If you want to view your article on the site itself, you’ll need to setup the environment locally.

### Before you start

To build the site, make sure you have installed the latest versions of the following

* **Ruby** – v2 is needed. Update using [rvm](http://rvm.io/)
* **Jekyll** – install globally by running `sudo gem install jekyll` from the command line
* **rdiscount** – run `sudo gem install rdiscount`
* **Sass** – run `sudo gem install sass --pre`
* **Node** – follow instructions at [nodejs.org](http://nodejs.org/)
* **Grunt CLI** – run `npm install -g grunt-cli`

- - -

Once you have these dependencies installed, follow the steps below:

- - -

### Step 1

In your command line, run `git clone https://github.com/tmwagency/labs-blog.git tmw-labs-blog && cd tmw-labs-blog`

- - -

### Step 2

Run `jekyll serve`

- - -

### Step 3

Create (or copy an existing post) a markdown file in the `_drafts` folder of the site.  The file should be in the format YYYY-MM-DD-post-title-goes-here.md where dashes in the post title get converted into spaces.

Then you can start writing your article using [markdown](http://daringfireball.net/projects/markdown/basics).

- - -

### Step 4

When you are ready to preview your post on the site, open the javascript file `Gruntfile.js` – which is located in the root of the repo – and search for `drafts : false`.

Changing this to true will automatically rebuild the site **including draft posts**, and so enable you to view your post as it will look on the site when it’s published.

- - -

## And we’re done!

That’s it – once you are happy with your article, make sure you let either me or Zander know and we will push it live.


