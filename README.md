# A statically generated spotify like example using Next.js and Strapi

## How to use

you will first need to clone and launch [the back-end of the application](git@github.com:Hargoze/captainify-strapi.git)
and add your own element to the db

## Configuration

### Step 1. Set up Strapi locally

Open a terminal on the captainify-strapi repo you just cloned. then launch it with:

```bash
npm run develop # or: yarn develop
```

This will open http://localhost:1337/ and prompt you to create an admin user.

### Step 2. Install GraphQL for Strapi

Inside the Strapi directory, stop the server, [install GraphQL](https://strapi.io/documentation/v3.x/plugins/graphql.html), and restart the server:

```bash
# If using Yarn: yarn strapi install graphql
npm run strapi install graphql

npm run develop # or: yarn develop
```

### Step 3. Create an `Author` collection

From **Content-Types Builder**, **create a new collection type**.

- The display name should be `Author`.

Next, add these fields (you don't have to modify the settings):

- **Text** field called **`name`** (**Short text**)
- **Media** field called **`picture`** (**Single media**)

Then click **Save**.

### Step 4. Create a `Song` collection

From **Content-Types Builder**, **create a new collection type**.

- The display name should be `Song`.

Next, add these fields (you don't have to modify the settings unless specified):

- **Text** field called **`title`** (**Short text**)
- **Media** field called **`thumbnail`** (**Single media**)
- **Media** field called **`file`** (**Single media**)
- **Relation** field called **`author`** (Post **has one** Author)
**published** and **draft**)

### Step 5. Set permissions

From **Settings, Users & Permissions, Roles**, edit the **Public** role.

Then select: `count`, `find`, and `findone` permissions for both **Author** and **Post**. Click **Save**.

### Step 6. Populate Content

Select **Author** and click **Add New Author**.

- You just need **1 Author entry**.
- Use dummy data for the name.

Next, select **Songs** and click **Add New Song**.

- We recommend creating at least **2 Post records**.
- Use dummy data for the text.
- **thumbnail** is a picture, should be horizontal, **file** must be a .mp3.
- Pick the **Author** you created earlier.
- Set the **status** field to be **published**.

### Step 7. Set up environment variables

While the Strapi server is running, open a new terminal and `cd` into the Next.js app directory you created earlier.

```
cd cms-strapi-app
```

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `STRAPI_PREVIEW_SECRET` can be any random string (but avoid spaces), like `MY_SECRET` - this is used for [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode).
- `NEXT_PUBLIC_STRAPI_API_URL` should be set as `http://localhost:1337` (no trailing slash).

### Step 8. Run Next.js in development mode

Make sure that the local Strapi server is still running at http://localhost:1337. Inside the Next.js app directory, run:

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)! You should see the two posts you’ve created. If it doesn't work, make sure that:

- You’ve installed GraphQL to Strapi on Step 2.
- You’ve set the Roles & Permissions in Step 5.
- You’ve set the `status` of each post to be `published` in Step 6.