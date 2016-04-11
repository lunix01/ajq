# atab
tab, jquery code snippets. 
In this way, take a look at it, and be careful to use.

##Use example
html:
```
<nav>
    <div data-groupname="tab" data-tab="item" class="active">1</div>
    <div data-groupname="tab" data-tab="item">2</div>
</nav>
<section data-groupname="tab" data-tab="content">1 content</section>
<section data-groupname="tab" data-tab="content">2 content</section>
```

js:
```
$(function() {
  tab('tab', 'mouseover');
});
```
