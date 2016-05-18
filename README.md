# ajq
jquery code snippets. 
In this way, take a look at it, and be careful to use.
##Use example
###atab.js
html:
```
<nav>
    <div data-groupname="tab" data-tab="item">1</div>
    <div data-groupname="tab" data-tab="item" class="active-test">2</div>
</nav>
<section data-groupname="tab" data-tab="content">1 content</section>
<section data-groupname="tab" data-tab="content">2 content</section>
```
js:
```
$(function() {
  tab('tab', 'mouseover', 'active-test');
});
```
###aselectall.js
html:
```
<div>
    <h2>select all</h2>
    <input type="checkbox" id="J_selectAll"> all
    <br>
    <input type="button" value="add checkbox" id="J_addChk">
    <br>
    <div id="J_chkContent">
        <input type="checkbox" class="J_chk"> test
        <input type="checkbox" class="J_chk"> test
        <input type="checkbox" class="J_chk"> test
    </div>
</div>
```
js:
```
selectAll('#J_selectAll', '.J_chk');
$('#J_addChk').on('click', function() {
    $('#J_chkContent').append('<input type="checkbox" class="J_chk"> test');
});
```

###cascader
warn: version 0.0.0.1