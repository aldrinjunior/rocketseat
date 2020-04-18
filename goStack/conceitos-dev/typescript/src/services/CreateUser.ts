interface TechObject {
    title: string;
    experience: number;
}
interface CreateUserData {
    name?: string;
    email: string;
    password: string;
    techs: Array<string | TechObject>; //tambem pode ser string[] se for apenas um tipo, mas se tiver tipos variaveis precisa disso;
}

export default function createUser({name, email, password}: CreateUserData) {
    const user = {
        name,
        email,
        password,
    }

    return user;

}