declare namespace actionServiceTypes {
  export interface AddTodoListRequest {
    todo_title: string;
    todo_description: string;
    todo_date: string;
    todo_status: string;
    todo_success: boolean;
  }
  export interface UpdateTodoListRequest {
    id:number,
    todo_title: string;
    todo_description: string;
    todo_status: string;
    todo_success: boolean;
  }
}

export default actionServiceTypes;
