import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import * as _ from "lodash";

//type
import actionServiceTypes from "./model";

const actionService = {
  Login: async (username: string, password: string) => {
    // Clear data of example in Redux
    const client = new ApolloClient({
      uri: `https://darling-bird-58.hasura.app/v1/graphql`,
      cache: new InMemoryCache(),
      headers: {
        "x-hasura-admin-secret":
          "qF9GGL5Y7eMZvhOluN1r0AmijwS2DWuYF3i61BHGfGxVG6wyKwp3pye7P1f3FyjP",
        "content-type": "application/json",
      },
    });

    const LOGIN_QUERY = gql`
      query login($username: String!, $password: String!) {
        user(
          where: { username: { _eq: $username }, password: { _eq: $password } }
        ) {
          username
        }
      }
    `;
    try {
      let result = await client.query({
        query: LOGIN_QUERY,
        variables: {
          username: username,
          password: password,
        },
      });

      const response = {
        success: false,
        data: "",
      };
      if (result.data.user.length > 0) {
        window.localStorage.setItem("user", result.data.user[0].username);
        response.success = true;
        response.data = result.data.user[0].username;
      } else {
        response.success = false;
      }
      return response;
    } catch (error) {
      const response = {
        success: false,
        data: "",
      };
      return response;
    }
  },
  Register: async (username: string, password: string) => {
    // Clear data of example in Redux
    const client = new ApolloClient({
      uri: `https://darling-bird-58.hasura.app/v1/graphql`,
      cache: new InMemoryCache(),
      headers: {
        "x-hasura-admin-secret":
          "qF9GGL5Y7eMZvhOluN1r0AmijwS2DWuYF3i61BHGfGxVG6wyKwp3pye7P1f3FyjP",
        "content-type": "application/json",
      },
    });

    const REGISTER_QUERY = gql`
      mutation register($username: String!, $password: String!) {
        insert_user_one(object: { username: $username, password: $password }) {
          password
          username
        }
      }
    `;
    try {
      let result = await client.mutate({
        mutation: REGISTER_QUERY,
        variables: {
          username: username,
          password: password,
        },
      });

      const response = {
        success: false,
        data: "",
      };
      if (result.data.insert_user_one.username) {
        response.success = true;
        response.data = result.data.insert_user_one.username;
      } else {
        response.success = false;
      }
      return response;
    } catch (error) {
      const response = {
        success: false,
        data: "Username already exists!",
      };
      return response;
    }
  },
  GetTodoList: async () => {
    // Clear data of example in Redux
    const username = window.localStorage.getItem("user");
    if (!username) {
      return {
        success: false,
        data: "",
      };
    }
    const client = new ApolloClient({
      uri: `https://darling-bird-58.hasura.app/v1/graphql`,
      cache: new InMemoryCache(),
      headers: {
        "x-hasura-admin-secret":
          "qF9GGL5Y7eMZvhOluN1r0AmijwS2DWuYF3i61BHGfGxVG6wyKwp3pye7P1f3FyjP",
        "content-type": "application/json",
      },
    });

    const TODO_LIST_QUERY = gql`
      query list($username: String!) {
        todo(
          where: { todo_username: { _eq: $username } }
          order_by: { id: asc }
        ) {
          id
          todo_title
          todo_date
          todo_status
          todo_username
          todo_description
          todo_success
        }
      }
    `;
    try {
      let result = await client.query({
        query: TODO_LIST_QUERY,
        variables: {
          username: username,
        },
      });

      const response = {
        success: false,
        data: {
          false: [],
          true: [],
        },
      };
      let task = _.groupBy(result.data.todo, "todo_success") as any;

      if (result.data.todo) {
        response.success = true;
        response.data = { false: task.false, true: task.true };
      } else {
        response.success = false;
      }
      return response;
    } catch (error) {
      const response = {
        success: false,
        data: "Something was wrong!",
      };
      return response;
    }
  },
  AddTodoList: async (todoTask: actionServiceTypes.AddTodoListRequest) => {
    // Clear data of example in Redux
    const username = window.localStorage.getItem("user");
    if (!username) {
      return {
        success: false,
        data: "",
      };
    }
    const client = new ApolloClient({
      uri: `https://darling-bird-58.hasura.app/v1/graphql`,
      cache: new InMemoryCache(),
      headers: {
        "x-hasura-admin-secret":
          "qF9GGL5Y7eMZvhOluN1r0AmijwS2DWuYF3i61BHGfGxVG6wyKwp3pye7P1f3FyjP",
        "content-type": "application/json",
      },
    });

    const ADD_TODO_QUERY = gql`
      mutation addTodo(
        $username: String!
        $todo_title: String!
        $todo_date: String!
        $todo_status: String!
        $todo_description: String!
        $todo_success: Boolean!
      ) {
        insert_todo_one(
          object: {
            todo_title: $todo_title
            todo_date: $todo_date
            todo_status: $todo_status
            todo_username: $username
            todo_description: $todo_description
            todo_success: $todo_success
          }
        ) {
          id
        }
      }
    `;

    try {
      let result = await client.mutate({
        mutation: ADD_TODO_QUERY,
        variables: {
          username: username,
          todo_title: todoTask.todo_title,
          todo_date: todoTask.todo_date,
          todo_status: todoTask.todo_status,
          todo_description: todoTask.todo_description,
          todo_success: todoTask.todo_success,
        },
      });

      const response = {
        success: false,
        data: "",
      };
      if (result.data.insert_todo_one) {
        response.success = true;
        response.data = result.data.insert_todo_one.id;
      } else {
        response.success = false;
      }
      return response;
    } catch (error) {
      const response = {
        success: false,
        data: "Something was wrong!",
      };
      return response;
    }
  },
  DeleteTodoList: async (id: number) => {
    // Clear data of example in Redux
    const username = window.localStorage.getItem("user");
    if (!username) {
      return {
        success: false,
        data: "",
      };
    }
    const client = new ApolloClient({
      uri: `https://darling-bird-58.hasura.app/v1/graphql`,
      cache: new InMemoryCache(),
      headers: {
        "x-hasura-admin-secret":
          "qF9GGL5Y7eMZvhOluN1r0AmijwS2DWuYF3i61BHGfGxVG6wyKwp3pye7P1f3FyjP",
        "content-type": "application/json",
      },
    });

    const DELETE_TODO_QUERY = gql`
      mutation deleteTodo($id: Int!) {
        delete_todo_by_pk(id: $id) {
          id
        }
      }
    `;

    try {
      let result = await client.mutate({
        mutation: DELETE_TODO_QUERY,
        variables: {
          id: id,
        },
      });

      const response = {
        success: false,
        data: "",
      };
      if (result.data.delete_todo_by_pk) {
        response.success = true;
        response.data = result.data.delete_todo_by_pk.id;
      } else {
        response.success = false;
      }
      return response;
    } catch (error) {
      const response = {
        success: false,
        data: "Something was wrong!",
      };
      return response;
    }
  },
  UpdateTodoList: async (
    todoTask: actionServiceTypes.UpdateTodoListRequest
  ) => {
    // Clear data of example in Redux
    const username = window.localStorage.getItem("user");
    if (!username) {
      return {
        success: false,
        data: "",
      };
    }
    const client = new ApolloClient({
      uri: `https://darling-bird-58.hasura.app/v1/graphql`,
      cache: new InMemoryCache(),
      headers: {
        "x-hasura-admin-secret":
          "qF9GGL5Y7eMZvhOluN1r0AmijwS2DWuYF3i61BHGfGxVG6wyKwp3pye7P1f3FyjP",
        "content-type": "application/json",
      },
    });

    const UPDATE_TODO_QUERY = gql`
      mutation updateTodo(
        $id: Int!
        $todo_title: String!
        $todo_status: String!
        $todo_success: Boolean!
        $todo_description: String!
      ) {
        update_todo_by_pk(
          pk_columns: { id: $id }
          _set: {
            todo_title: $todo_title
            todo_status: $todo_status
            todo_success: $todo_success
            todo_description: $todo_description
          }
        ) {
          id
        }
      }
    `;

    try {
      let result = await client.mutate({
        mutation: UPDATE_TODO_QUERY,
        variables: {
          id: todoTask.id,
          todo_title: todoTask.todo_title,
          todo_status: todoTask.todo_status,
          todo_description: todoTask.todo_description,
          todo_success: todoTask.todo_success,
        },
      });

      const response = {
        success: false,
        data: "",
      };
      if (result.data.update_todo_by_pk.id) {
        response.success = true;
        response.data = result.data.update_todo_by_pk.id;
      } else {
        response.success = false;
      }
      return response;
    } catch (error) {
      const response = {
        success: false,
        data: "Something was wrong!",
      };
      return response;
    }
  },
  Logout: () => {
    window.localStorage.removeItem('user')
    window.location.href = '/login'
  }
};

export default actionService;
