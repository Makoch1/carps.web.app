import { useEffect, useState } from "react";
import { Collapse } from "bootstrap";
import { useNavigate } from "@tanstack/react-router";
import { transportTypes } from '../../utils/constants.js'

/**
 * Sidebar that allows users to SORT, and FILTER the posts.
 * Filters include all transportation tags.
 */
export function FilterSidebar() {
    const navigate = useNavigate();
    const [sort, setSort] = useState('popular');
    const [activeFilters, setActiveFilters] = useState([]);
    const [filterExpanded, setFilterExpanded] = useState(false);

    // creates a setActive function for each filter
    function createActivateFilter(filter) {
        const setActive = () => {
            let newActiveFilters = activeFilters.includes(filter) ? // check if it is already active
                activeFilters.filter((flt) => flt !== filter) : // if active, remove from the array
                [...activeFilters, filter] // if not active, simply add to the array

            // set new state
            setActiveFilters(newActiveFilters)
        }

        return setActive;
    }

    // use effect updates the search params once activeFilters, and sort is updated
    useEffect(() => {
        navigate({
            to: '.',
            search: (prev) => ({ ...prev, filters: activeFilters, sort: sort }),
        })
    }, [activeFilters, sort])

    return (
        <div className="w-75 m-auto mt-5">
            <div className="d-flex flex-column gap-2 p-3 fw-bold">
                Sort by
                <div className="d-flex rounded gap-2 bg-secondary">
                    <button
                        className={`btn btn-primary ${sort !== 'popular' && 'bg-transparent'} border-0 flex-grow-1 text-white`}
                        onClick={() => setSort('popular')}>
                        Popular
                    </button>
                    <button
                        className={`btn btn-primary ${sort !== 'new' && 'bg-transparent'} border-0 flex-grow-1 text-white`}
                        onClick={() => setSort('new')}>
                        New
                    </button>
                </div>
            </div>
            <div className="d-flex flex-column p-3 border-primary border-top border-bottom">
                <button className="d-flex btn btn-primary bg-transparent border-0 p-0 text-start fw-bold"
                    data-bs-toggle="collapse"
                    data-bs-target="#transport-tags"
                    onClick={() => setFilterExpanded(!filterExpanded)}>
                    Transport Type
                    {
                        filterExpanded ?
                            <i class="ms-auto bi bi-chevron-up"></i> :
                            <i class="ms-auto bi bi-chevron-down"></i>
                    }
                </button>
                <div className="mt-4 collapse" id="transport-tags">
                    <div className="d-flex flex-column gap-2">
                        {transportTypes.map((type, index) =>
                            <Filter
                                text={type}
                                isActive={activeFilters.includes(type)}
                                activateFilter={createActivateFilter(type)}
                                key={index} />
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

function Filter({ text, isActive, activateFilter }) {
    const [active, setActive] = useState(isActive);

    function handleClick() {
        setActive(!active);
        activateFilter();
    }

    return (
        <button
            className={`btn ${active ? 'btn-primary' : 'btn-outline-secondary'} text-white text-start`}
            onClick={handleClick}>
            {text}
        </button>
    )
}
