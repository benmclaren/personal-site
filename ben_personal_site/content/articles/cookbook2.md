---
title: "Cookbook2"
date: 2020-04-19T14:38:32+01:00
author: Ben McLaren
draft: false
---

We want to build upon our cookbook program by implementing a way for it to search for recipes on the web. Lets establish what we need to do in order for our cookbook to be able to do this.

1. Ask a user for a keyword to search
2. Make an HTTP request to the recipe’s website with our keyword
3. Parse the HTML document to extract the first 5 recipes suggested and store them in an Array
4. Display them in an indexed list
5. Ask the user which recipe they want to import (ask for an index)
6. Add it to the Cookbook
