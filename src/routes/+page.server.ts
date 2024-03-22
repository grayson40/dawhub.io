type User = {
    ID: number;
	Username: string;
	Email: string;
};

export const load = async () => {
	// load
    const data = await fetch('http:/localhost:8080/api/v1/users');

    // parse
    const sendData: User[] = await data.json();

	return { users: sendData };
};
