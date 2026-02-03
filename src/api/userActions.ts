export const logInUser = async (email: string, password: string) => {
  return new Promise<{
    email: string;
    password: string;
  }>((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const existingUser = users.find(
        (user: { email: string }) => user.email === email,
      );

      if (existingUser && existingUser.password === password) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: existingUser.name,
            login: existingUser.login,
            email: existingUser.email,
            posts: existingUser.posts,
          }),
        );

        resolve({
          ...existingUser,
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

export const registerUser = async (
  name: string,
  login: string | undefined,
  email: string,
  password: string,
) => {
  return new Promise<{
    name: string;
    login?: string;
    email: string;
    posts: string[];
  }>((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const existingUser = users.find(
        (user: { email: string }) => user.email === email,
      );

      if (existingUser && existingUser.password === password) {
        resolve({
          ...existingUser,
        });
      } else if (existingUser) {
        reject(new Error("User with this email already exists"));
      } else {
        localStorage.setItem(
          "users",
          JSON.stringify([
            ...users,
            { name, login, email, password, posts: [] },
          ]),
        );

        localStorage.setItem(
          "user",
          JSON.stringify({ name, login, email, posts: [] }),
        );

        resolve({ name, login, email, posts: [] });
      }
    }, 1000);
  });
};

