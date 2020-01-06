---
title: "How to achieve grid layouts using Flexbox"
date: 2019-02-14T10:56:16Z
author: Ben McLaren
draft: false
excerpt: "Flexbox is a very powerful tool and it is one that can be used to create layouts as well as responsive navigation bars."
---

Flexbox is a very powerful tool and it is one that can be used to create layouts as well as responsive navigation bars.
<br>
<br>
Let's say that you wish to lay out a selection of images on a page in a grid style. By default, the browser will stack your images vertically down the page. However, we can easily achieve this effect using Flexbox.
<br>
<br>
Firstly, ensure that all the images you wish to be formatted this way are grouped together in a `<section>`.
<br>
<br>
Now we can target the photos with a few key properties.
<br>
<br>
```
display: flex;
flex-wrap: wrap;
align-items: center;
```
<br>
`display: Flex;`: Specifies that we are using Flexbox and the children become flex items.
<br>
<br>
`flex-wrap: wrap;`: This property means that the items will now wrap onto a new line if they are too large to fit on one line.
<br>
<br>
`justify-content; center:` This will align the grid in the center of the page. Of course you can choose any value for this.
<br>
<br>
