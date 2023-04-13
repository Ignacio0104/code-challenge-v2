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
  info{
    count pages next prev
  }
  results{
    id name status species image origin{ name }
  }
}
}
`