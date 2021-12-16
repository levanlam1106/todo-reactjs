import React from "react";

function Pagination({
    perPage,
    totalRecords,
    paginate,
    next,
    pre,
    currentPage,
}) {
    const numberPage = [];
    const number = Math.ceil(totalRecords / perPage);

    for (let i = 1; i <= number; i++) {
        numberPage.push(i);
    }
    return (
        <div className="div">
            <ul className="ul">
                <button className="button" onClick={() => pre(1)}>
                    Pre
                </button>
                {numberPage.map((number, index) => (
                    <li
                        className={`li ${
                            currentPage == index + 1 ? "active1" : ""
                        }`}
                    >
                        <a className={"a"} onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
                <button
                    className="button"
                    onClick={() => next(numberPage.length)}
                >
                    Next
                </button>
            </ul>
        </div>
    );
}

export default Pagination;
