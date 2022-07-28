import React, {useCallback, useState} from 'react'
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

export const Dropdown = ({ activeItem, list, onClick}) => {

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleClick = useCallback((newValue) => () => {
    onClick(newValue)
  }, [activeItem, list, onClick])

  return (
    <ButtonDropdown
      isOpen={dropdownOpen}
      style={{margin: '3px'}}
      toggle={toggle}
    >
      <DropdownToggle caret>
        {activeItem.label}
      </DropdownToggle>
      {dropdownOpen ?
        <DropdownMenu>
          {
            list.map((item) => (
              <DropdownItem onClick={handleClick(item)}>
                {item.label}
              </DropdownItem>
            ))
          }
        </DropdownMenu>
        :
        null
      }
    </ButtonDropdown>
  )
}
