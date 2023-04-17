import {rest} from "msw"

export const handlers = [
    rest.post("https://rickandmortyapi.com/graphql",(req,res,ctx)=>{
        return res(ctx.status(200),ctx.json(
            {
                data:{
                    characters:{
                        info:{
                            count:826,
                            next: 2,
                            pages: 42,
                            prev:null
                        },
                        results:[
                            {
                                id: "1",
                                image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                                name: "Rick Sanchez",
                                origin: { name: "Earth (C-137)"},
                                species: "Human",
                                status: "Alive"
                            },  {
                                id: "2",
                                image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                                name: "Rick Sanchez",
                                origin: { name: "Earth (C-137)"},
                                species: "Human",
                                status: "Alive"
                            },
                            {
                                id: "3",
                                image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                                name: "Rick Sanchez",
                                origin: { name: "Earth (C-137)"},
                                species: "Human",
                                status: "Alive"
                            }
                        ]
                    }
                }
                
            }
        ))
    })
]