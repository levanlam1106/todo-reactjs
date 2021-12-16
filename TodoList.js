import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import Pagination from "./Pagination";
import Login from "./Login";

function TodoList() {
    const userAdmin = {
        user: "admin",
        email: "admin@gmail.com",
        password: "123",
    };
    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(2);
    const [searchData, setSearchData] = useState("");
    const [sort, setSort] = useState("");

    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };

    const removeTodo = (id) => {
        const removeArr = [...todos].filter((todo) => todo.id !== id);
        setTodos(removeArr);
    };
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos((prev) =>
            prev.map((item) => (item.id === todoId ? newValue : item))
        );
    };

    const completeTodo = (id) => {
        let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isisComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const next = (maxNumberPage) => {
        setCurrentPage(currentPage + 1);
        if (currentPage >= maxNumberPage) {
            setCurrentPage(maxNumberPage);
        }
    };

    const pre = (minNumberPage) => {
        setCurrentPage(currentPage - 1);
        if (currentPage <= minNumberPage) {
            setCurrentPage(minNumberPage);
        }
    };

    const handleChange = (e) => {
        setPerPage(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (e) => {
        if (sort === "" || sort === "desc") {
            setSort("asc");
        } else if (sort === "asc") {
            setSort("desc");
        }
    };

    const applyFilterSearch = (list) => {
        let newList = list.slice(0);
        if (sort === "asc") {
            newList = newList.sort((a, b) => a.text.localeCompare(b.text));
        }
        if (sort === "desc") {
            newList = newList.sort((a, b) => b.text.localeCompare(a.text));
        }
        if (searchData) {
            newList = newList.filter(
                (data) =>
                    data.text.toLowerCase().indexOf(searchData.toLowerCase()) >
                    -1
            );
        }
        let a = newList.length;

        if (currentPage) {
            newList = newList.slice(
                (currentPage - 1) * perPage,
                currentPage * perPage
            );
        }
        return { newList, a };
    };
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const login = (detail) => {
        if (
            detail.user === userAdmin.user &&
            detail.email === userAdmin.email &&
            detail.password === userAdmin.password
        ) {
            setUser({
                name: detail.user,
                email: detail.email,
                password: detail.password,
            });
        } else {
            console.log("logot");
        }
    };
    const logout = () => {
        setUser({
            name: "",
            email: "",
            password: "",
        });
    };
    return (
        <div>
            {user.email != "" ? (
                <div>
                    <TodoForm onSubmit={addTodo} />

                    <div className="search">
                        <div>
                            <input
                                className="todo-input"
                                placeholder="search......"
                                type="text"
                                value={searchData}
                                onChange={(e) => {
                                    setSearchData(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        <div>
                            <button
                                className="todo-button"
                                onClick={handleSort}
                            >
                                {sort === ""
                                    ? "sort"
                                    : sort === "asc"
                                    ? "tang dan"
                                    : "giam dan"}
                            </button>
                            <button className="todo-button" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                    <Todo
                        todos={applyFilterSearch(todos).newList}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                    />
                    <Pagination
                        perPage={perPage}
                        totalRecords={
                            searchData
                                ? applyFilterSearch(todos).a
                                : todos.length
                        }
                        paginate={paginate}
                        next={next}
                        pre={pre}
                        currentPage={currentPage}
                    />
                    <select value={perPage} onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            ) : (
                <Login Login={login} />
            )}
        </div>
    );
}

export default TodoList;
