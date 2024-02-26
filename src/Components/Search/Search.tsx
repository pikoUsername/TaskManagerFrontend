import "./Search.css"
import searchIcon from "../../Static/Images/search-icon.png"
import data from "../../TestData/Search.json"
import { useState } from "react";

type propsType = { width: number, placeholder?: string}

const SearchComponent: React.FC<propsType> = (props: propsType) => { 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [foundTasks, setFoundTasks] = useState<Array<any>>(data)

    const handleInputClick = () => {
        setIsMenuOpen(true);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        event.preventDefault()
        data.map((value) => {
            if (event.target.value === value.projectName) { 
                setFoundTasks([...foundTasks, value])
            }
        })
    }

    const handleClickOutside = () => {
        setIsMenuOpen(false);
    };  
    return (
        <div className="search-root" style={{width: props.width}}>
            <img src={searchIcon} alt="" className="serach-button" width={22} height={22}/>
            <input 
                type="text"
                className="search-input"
                placeholder={props.placeholder || 'Поиск'}
                onClick={handleInputClick}
                onInput={handleSearchChange}
            />
            {isMenuOpen && (
                <div className="search-menu" onClick={handleClickOutside}>
                    <div className="search-menu-header">
                        <h2>Задания </h2>
                        <span className="tasks-counter">{foundTasks.length}</span>
                    </div>
                    {foundTasks.map((value) => { 
                        return (
                            <div className="">

                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchComponent 
