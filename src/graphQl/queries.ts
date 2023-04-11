export const ALL_CHARACTERS = `
  query {
  characters{
    results{
      id name status species image origin{ name }
    }
  }
}
`
export const ALL_CHARACTERS_PAGED = `
  query ($page: Int!) {
characters(page: $page){
  results{
    id name status species image origin{ name }
  }
}
}
`