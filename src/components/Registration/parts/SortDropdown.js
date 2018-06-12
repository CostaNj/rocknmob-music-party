import React, {Component} from 'react'
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

export class SortDropdown extends Component {

    constructor() {
        super();

        this.state = {
            dropdownOpen: false
        }
    }

    render() {
        return (
            <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                style={{margin:'3px'}}
                toggle={this.toggle}
                size="sm"
            >
                <DropdownToggle caret>
                    {this.props.sortText}
                </DropdownToggle>
                {this.state.dropdownOpen ?
                    <DropdownMenu>
                        <DropdownItem onClick={this.setSortDate}>
                            По дате добавления
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={this.setSortFullness}>
                            По заполненности
                        </DropdownItem>
                    </DropdownMenu>
                    :
                    null
                }
            </ButtonDropdown>
        )
    }

    setSortFullness = () => {
        this.props.setSort('fullness', 'По заполненности')
    };

    setSortDate = () => {
        this.props.setSort('date', 'По дате добавления')
    };

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
}
