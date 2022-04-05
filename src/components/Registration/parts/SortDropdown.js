import React, { useState } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export const SortDropdown = ({ setSort, sortInfo }) =>  {

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const setSortFullness = () => {
        setSort('fullness', 'По заполненности')
    };

    const setSortDate = () => {
        setSort('date', 'По дате добавления')
    };

    const setSortSetlist = () => {
        setSort('setlist', 'Сетлист')
    };

    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <ButtonDropdown
            isOpen={dropdownOpen}
            style={{margin:'3px'}}
            toggle={toggle}
        >
            <DropdownToggle caret>
                {sortInfo?.text}
            </DropdownToggle>
            {dropdownOpen ?
                <DropdownMenu>
                    <DropdownItem onClick={setSortDate}>
                        По дате добавления
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem onClick={setSortFullness}>
                        По заполненности
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem onClick={setSortSetlist}>
                       Сетлист
                    </DropdownItem>
                </DropdownMenu>
                :
                null
            }
        </ButtonDropdown>
    )
}
