import { Ability, AbilityBuilder, AbilityClass } from "@casl/ability";
import { useDispatch } from "react-redux";
import AuthAction from "../../Redux/Actions/AuthAction";
import AuthReducer from "../../Redux/Reducers/AuthReducer";
import { store } from "../../Redux/store"
const ability: any = new Ability();

export default (action: any, subject: any): any => {
    return ability.can(action, subject);
};
type actions = 'canAdd' | 'canView' | 'canUpdate' | 'canDelete'
type subject = 'user' | 'role'
type AppAbilityType = Ability<[actions, subject]>
const AppAbility = Ability as AbilityClass<AppAbilityType>


export const defineRules = (permissions: any): any => {
    
    // const permissions = [{
    //     name: "role",
    //     canAdd: true,
    //     canView: true,
    //     canUpdate: false,
    //     canDelete: false
    // }];
    // let permission: string | null = localStorage.getItem("permissions")
    // const permissionss: any = JSON.parse(permission||"[]")
//    console.log(ability)
//     console.log(permissions)
    const { can, rules } = new AbilityBuilder<AppAbilityType>(AppAbility)
    permissions.forEach((item: any) => {
        item.canAdd && can("canAdd", item.name)
        item.canView && can("canView", item.name)
        item.canUpdate && can("canUpdate", item.name)
        item.canDelete && can("canDelete", item.name)
    });
    // return rules
    ability.update(rules)
}

// store.subscribe(() => {
//     // const dispatch = useDispatch();
//     let user: any = store.getState().auth.user
//     // console.log(user)
//     if(user){
//         let rules = defineRules(user.role.permissions)
//     }
 
    
//     // dispatch(AuthAction.AbilitySet())
//     // console.log(ability)
// })