export default function userReducer(state = [], action) {
    switch(action.type) {
        case 'CREATE_USER':
            return [...state,
                Object.assign({}, action.user)
            ];
            case 'USER_LIST':
            //return [...state,
                //Object.assign({}, action.users)
                return action.users;
            //];
        default:
            return state;
    }
}