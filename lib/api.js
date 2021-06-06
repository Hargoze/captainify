async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`http://localhost:1337/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return data?.posts[0]
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `)
  return data?.allPosts
}

export async function getAllSongsId() {
  const data = fetchAPI(`
    {
      songs {
        id
      }
    }
  `)
  return data
}

export async function getAllAuthorsId() {
  const data = await fetchAPI(`
    {
      authors {
        id
      }
    }
  `)
  return data
}


export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 10, where: $where) {
        title
        slug
        excerpt
        date
        coverImage {
          url
        }
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `,
    {
      variables: {
        where: {
          ...(preview ? {} : { status: 'published' }),
        },
      },
    }
  )
  return data?.posts
}

export async function getAllSongsForHome() {
  const data = await fetchAPI(
    `
    query Songs{
      songs {
        id
        title
        thumbnail {
          url
        }
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `
  )
  return data?.songs
}

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      title
      slug
      content
      date
      ogImage: coverImage{
        url
      }
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }

    morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
      title
      slug
      excerpt
      date
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        where: {
          slug,
          ...(preview ? {} : { status: 'published' }),
        },
        where_ne: {
          ...(preview ? {} : { status: 'published' }),
          slug_ne: slug,
        },
      },
    }
  )
  return data
}

export async function getSongById(id) {
  const data = await fetchAPI(
    `
  query SongById($where: JSON) {
      songs(where: $where) {
        title
        link
        thumbnail {
          url
        }
        file {
          url
        }
        author {
          name
          id
          picture {
            url
          }
        }
      }
  }
  `,
    {
      variables: {
        where: {
          id,
        }
      },
    }
  )
  return data
}

export async function getAllSongsFromAuthor(id) {
  const data = await fetchAPI(
    `
    query AuthorById($where: JSON) {
      authors(where: $where) {
        name
        picture {
          url
        }
        songs {
          title
          id
          thumbnail { url }
        }
      }
    }
  `,
    {
      variables: {
        where: {
          id,
        },
      },
    }
  )
  return data
}