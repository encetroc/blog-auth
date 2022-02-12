## feature to add

1. add username to the user model
2. add markup feature and the updated at field to the post
   2.1. add the sanitizedHTML and the markup field to the post model

   2.2. add a pre function to your schema, to generate the sanitized HTML before saving to the database
   
   2.3. packages you will be using are `dompurify`, `jsdom` and `marked`
3. add the ability to edit a post only if the user is the author of that post (updated at field should be updated whenever you update a post)
4. add the ability to delete a post only if the user is the author of that post
5. add the ability to delete a comment only if the user is the author of that comment
6. add the ability to retract a downvote/upvote
7. add some basic layout (no need to add complex css, just some flexbox and padding to make the look nicer)

## private/public posts

### part 1

1- change the post model to accept the private field (true/false) by default it is false, type is Boolean
2- add radio inputs to the post creation form, inside of the post/create template

```
<div>
  <input type="radio" name="private" value="false"
         checked>
  <label for="huey">public</label>
</div>

<div>
  <input type="radio" name="private" value="true">
  <label for="dewey">private</label>
</div>
```

3- handle to post creation with the private field, inside of the post routes `router.post("/create"`

### part 2

4- have a private post view route
5- have a public post view route
