import { ILogin } from "../../../types/components/auth.type";

export default class SignInService {
    static login({ user, password }: ILogin) {
        if (user === "daniel" && password === "oscar") {
            return "auth-success";
        }
    }
}
