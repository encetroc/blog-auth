## private/public posts

### part 1

1- change the post model to accept the private field (true/false) by default it is false, type is Boolean
2- add radio inputs to the post creation form, inside of the post/create template 

<div>
  <input type="radio" name="private" value="false"
         checked>
  <label for="huey">public</label>
</div>

<div>
  <input type="radio" name="private" value="true">
  <label for="dewey">private</label>
</div>

3- handle to post creation with the private field, inside of the post routes `router.post("/create"`

### part 2

4- have a private post view route
5- have a public post view route
