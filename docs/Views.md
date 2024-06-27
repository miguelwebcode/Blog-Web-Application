1. **Home Page:**

   - **Route:** `/` or `/home`
   - **Functionality:**
     - Displays a list of all blog posts created by users.
     - Each post is shown with its title and creation date.
     - Includes links to view full details of each post.
   - **View (EJS):** `home.ejs`

2. **Create Post Page:**

   - **Route:** `/create`
   - **Functionality:**
     - Allows users to write a new blog post.
     - Provides fields to enter the title and content of the post.
     - Clicking "Publish" adds the post temporarily in memory.
   - **View (EJS):** `create.ejs`

3. **Edit Post Page:**

   - **Route:** `/edit/:postId` (where `:postId` is the unique post ID)
   - **Functionality:**
     - Allows users to edit an existing blog post.
     - Loads the post with the provided ID.
     - Allows modification of the title and content.
     - Clicking "Save changes" updates the post in memory.
     - Allows deletion of the post.
   - **View (EJS):** `edit.ejs`

4. **View Post Details Page:**
   - **Route:** `/post/:postId` (where `:postId` is the unique post ID)
   - **Functionality:**
     - Displays full details of a specific blog post.
     - Includes the title, content, and creation date.
     - Provides a link to return to the home page.
   - **View (EJS):** `view.ejs`
