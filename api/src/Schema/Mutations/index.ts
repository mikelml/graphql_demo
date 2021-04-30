import { GraphQLID, GraphQLString } from 'graphql'
import { UserType } from "../TypeDefs/User";
import {Users} from '../../Entities/Users'

export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve (parent: any, args: any) {
        const {name, username, password} = args;
        await Users.insert({name, username, password});
        return args;
    }
}

export const UPDATE_USER = {
    type: UserType,
    args: {
        id: { type: GraphQLID },
        new_name: { type: GraphQLString },
        new_username: { type: GraphQLString }
    },
    async resolve (parent: any, args: any) {
        const {id, new_name, new_username} = args
        // let user = await Users.findOne({id: id})
        return await Users.update({id:id}, {
            name: new_name,
            username: new_username
        });
    }
}

export const DELETE_USER = {
    type: UserType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve (parent: any, args: any) {
        const id = args.id
        await Users.delete(id);
        return args
    }
}