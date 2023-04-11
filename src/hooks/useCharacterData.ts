import { ALL_CHARACTERS_PAGED } from "../graphQl/queries"
import {useQuery} from "react-query"
import axios from "axios"

const fetchCharactersWithPage = (query:string,pageNumber:number)=>{
    let body =  { 
        query: query, 
        variables: {page: pageNumber}
    }
    return axios.post("https://rickandmortyapi.com/graphql",body)
    }
export const useCharacterData = (onSuccess:()=>void,onError:()=>void,pageNumber:number)=>{
    return useQuery(["characters",pageNumber],()=>fetchCharactersWithPage(ALL_CHARACTERS_PAGED,pageNumber),{onSuccess})
}
