import type { newUser, typeUser } from "../types.js";
declare const getUsers: (limit?: number, offset?: number) => Promise<import("../database/models/models/users.js").default[]>;
declare const getUser: (id: number) => Promise<import("../database/models/models/users.js").default | null>;
declare const createUser: (object: newUser) => Promise<import("../database/models/models/users.js").default>;
declare const deleteUser: (id: number) => Promise<string>;
declare const updateUser: (object: typeUser) => Promise<import("../database/models/models/users.js").default | null>;
declare const _default: {
    getUsers: typeof getUsers;
    getUser: typeof getUser;
    createUser: typeof createUser;
    deleteUser: typeof deleteUser;
    updateUser: typeof updateUser;
};
export default _default;
//# sourceMappingURL=userServices.d.ts.map